import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Volume2, Play, Pause } from 'lucide-react';
import { elevenLabsService } from '../services/elevenLabsService';

interface VoiceSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceSettings({ isOpen, onClose }: VoiceSettingsProps) {
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState(elevenLabsService.getVoiceId());
  const [stability, setStability] = useState([0.5]);
  const [similarityBoost, setSimilarityBoost] = useState([0.75]);
  const [style, setStyle] = useState([0.0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadVoices();
    }
  }, [isOpen]);

  const loadVoices = async () => {
    try {
      setIsLoading(true);
      const availableVoices = await elevenLabsService.getVoices();
      setVoices(availableVoices);
    } catch (error) {
      console.error('Failed to load voices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testVoice = async () => {
    if (isPlaying) {
      elevenLabsService.stopCurrentAudio();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      const testText = "Hello! This is how I sound with your current voice settings. I'm here to help guide you through your career journey.";
      
      await elevenLabsService.playText(testText, {
        stability: stability[0],
        similarity_boost: similarityBoost[0],
        style: style[0],
        use_speaker_boost: true
      });

      // Monitor playback
      const checkPlayback = setInterval(() => {
        if (!elevenLabsService.isPlaying()) {
          setIsPlaying(false);
          clearInterval(checkPlayback);
        }
      }, 100);
    } catch (error) {
      console.error('Failed to test voice:', error);
      setIsPlaying(false);
    }
  };

  const saveSettings = () => {
    elevenLabsService.setVoiceId(selectedVoice);
    // Save settings to localStorage for persistence
    localStorage.setItem('jouvi-voice-settings', JSON.stringify({
      voiceId: selectedVoice,
      stability: stability[0],
      similarityBoost: similarityBoost[0],
      style: style[0]
    }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="bg-white border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Voice Settings</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ×
              </Button>
            </div>

            <div className="space-y-6">
              {/* Voice Selection */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">Voice</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.voice_id} value={voice.voice_id}>
                        <div className="flex items-center space-x-2">
                          <span>{voice.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {voice.category}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stability */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Stability: {stability[0].toFixed(2)}
                </Label>
                <Slider
                  value={stability}
                  onValueChange={setStability}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher values make the voice more stable and consistent
                </p>
              </div>

              {/* Similarity Boost */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Similarity Boost: {similarityBoost[0].toFixed(2)}
                </Label>
                <Slider
                  value={similarityBoost}
                  onValueChange={setSimilarityBoost}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher values make the voice more similar to the original
                </p>
              </div>

              {/* Style */}
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Style: {style[0].toFixed(2)}
                </Label>
                <Slider
                  value={style}
                  onValueChange={setStyle}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher values add more expressiveness and emotion
                </p>
              </div>

              {/* Test Voice */}
              <Button
                onClick={testVoice}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Test
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Test Voice
                  </>
                )}
              </Button>

              {/* Save Settings */}
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={saveSettings}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}