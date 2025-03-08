
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAnimationOnMount } from '@/lib/animations';

interface AudioPlayerProps {
  audioUrl: string;
  onTimeUpdate?: (currentTime: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onTimeUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isAnimated = useAnimationOnMount(200);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(audio.currentTime);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className={`transition-default ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="p-4 rounded-xl glass">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSliderChange}
              className="flex-1"
            />
            <span className="text-sm font-medium w-10">{formatTime(duration)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full opacity-80 hover:opacity-100"
                onClick={skipBackward}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="default" 
                size="icon" 
                className="rounded-full shadow-sm"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full opacity-80 hover:opacity-100"
                onClick={skipForward}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
