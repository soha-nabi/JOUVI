interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  baseUrl: string;
}

interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

interface TextToSpeechRequest {
  text: string;
  model_id?: string;
  voice_settings?: VoiceSettings;
}

class ElevenLabsService {
  private config: ElevenLabsConfig;
  private audioContext: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;

  constructor() {
    this.config = {
      apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY || '',
      voiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL', // Default voice
      baseUrl: 'https://api.elevenlabs.io/v1'
    };
  }

  private async initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  async generateSpeech(text: string, options?: Partial<VoiceSettings>): Promise<string> {
    if (!this.config.apiKey) {
      console.warn('ElevenLabs API key not configured');
      return '';
    }

    try {
      const requestBody: TextToSpeechRequest = {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
          ...options
        }
      };

      const response = await fetch(
        `${this.config.baseUrl}/text-to-speech/${this.config.voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.config.apiKey
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  async playText(text: string, options?: Partial<VoiceSettings>): Promise<void> {
    try {
      await this.initAudioContext();
      
      // Stop any currently playing audio
      this.stopCurrentAudio();

      const audioUrl = await this.generateSpeech(text, options);
      
      if (audioUrl) {
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
        };
        
        await this.currentAudio.play();
      }
    } catch (error) {
      console.error('Error playing text:', error);
      throw error;
    }
  }

  stopCurrentAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  isPlaying(): boolean {
    return this.currentAudio !== null && !this.currentAudio.paused;
  }

  // Predefined voice settings for different contexts
  getVoiceSettings(context: 'welcome' | 'instruction' | 'encouragement' | 'mentor'): VoiceSettings {
    const settings = {
      welcome: {
        stability: 0.7,
        similarity_boost: 0.8,
        style: 0.2,
        use_speaker_boost: true
      },
      instruction: {
        stability: 0.6,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true
      },
      encouragement: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.3,
        use_speaker_boost: true
      },
      mentor: {
        stability: 0.8,
        similarity_boost: 0.7,
        style: 0.1,
        use_speaker_boost: true
      }
    };

    return settings[context];
  }

  // Get available voices (requires API key)
  async getVoices(): Promise<any[]> {
    if (!this.config.apiKey) {
      return [];
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.config.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch voices: ${response.status}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching voices:', error);
      return [];
    }
  }

  // Set voice ID
  setVoiceId(voiceId: string): void {
    this.config.voiceId = voiceId;
  }

  // Get current voice ID
  getVoiceId(): string {
    return this.config.voiceId;
  }
}

export const elevenLabsService = new ElevenLabsService();
export default elevenLabsService;