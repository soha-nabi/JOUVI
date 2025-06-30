import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { elevenLabsService } from '../services/elevenLabsService';

interface VoiceButtonProps {
  text: string;
  context?: 'welcome' | 'instruction' | 'encouragement' | 'mentor';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export function VoiceButton({ 
  text, 
  context = 'instruction',
  size = 'sm',
  variant = 'outline',
  className = '',
  disabled = false
}: VoiceButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayText = async () => {
    if (isPlaying) {
      elevenLabsService.stopCurrentAudio();
      setIsPlaying(false);
      return;
    }

    if (!text.trim()) {
      console.warn('No text provided for voice synthesis');
      return;
    }

    try {
      setIsLoading(true);
      const voiceSettings = elevenLabsService.getVoiceSettings(context);
      
      await elevenLabsService.playText(text, voiceSettings);
      setIsPlaying(true);
      
      // Monitor audio playback
      const checkPlayback = setInterval(() => {
        if (!elevenLabsService.isPlaying()) {
          setIsPlaying(false);
          clearInterval(checkPlayback);
        }
      }, 100);
      
    } catch (error) {
      console.error('Failed to play text:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8';
      case 'md': return 'w-10 h-10';
      case 'lg': return 'w-12 h-12';
      default: return 'w-8 h-8';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      default: return 'w-4 h-4';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={variant}
        size="icon"
        onClick={handlePlayText}
        disabled={disabled || isLoading}
        className={`${getButtonSize()} ${className} ${
          isPlaying 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent' 
            : ''
        } transition-all duration-200`}
        title={isPlaying ? 'Stop audio' : 'Play audio'}
      >
        {isLoading ? (
          <Loader2 className={`${getIconSize()} animate-spin`} />
        ) : isPlaying ? (
          <VolumeX className={getIconSize()} />
        ) : (
          <Volume2 className={getIconSize()} />
        )}
      </Button>
    </motion.div>
  );
}