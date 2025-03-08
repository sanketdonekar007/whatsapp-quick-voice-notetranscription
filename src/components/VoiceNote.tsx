
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Clock, Check, Forward, Rotate3D } from 'lucide-react';
import { useAnimationOnMount } from '@/lib/animations';

interface VoiceNoteProps {
  audioUrl: string;
  duration: number;
  isOutgoing?: boolean;
  onPlay?: () => void;
  timestamp?: string;
}

const VoiceNote: React.FC<VoiceNoteProps> = ({ 
  audioUrl, 
  duration, 
  isOutgoing = true,
  onPlay,
  timestamp = "10:30 AM"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isAnimated = useAnimationOnMount();
  
  // Generate bars for the waveform visualization
  const generateBars = () => {
    const bars = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      const height = Math.random() * 0.7 + 0.3; // Random height between 0.3 and 1
      const animationDelay = `${i * 60}ms`;
      
      bars.push(
        <div 
          key={i}
          className={`audio-bar ${isPlaying ? 'animate-audio-wave' : ''}`}
          style={{ 
            transform: `scaleY(${height})`,
            animationDelay
          }}
        />
      );
    }
    
    return bars;
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      if (onPlay) onPlay();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const togglePlaybackRate = () => {
    const rates = [1, 1.5, 2];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
    
    if (audioRef.current) {
      audioRef.current.playbackRate = rates[nextIndex];
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className={`w-full max-w-xs transition-default ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
      <div className={isOutgoing ? 'whatsapp-bubble-out ml-auto' : 'whatsapp-bubble-in'}>
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-full bg-whatsapp-teal-green flex items-center justify-center text-white"
          >
            {isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-1" />
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center h-9">
              {generateBars()}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
            <button 
              onClick={togglePlaybackRate}
              className="text-xs text-whatsapp-teal-green font-medium"
            >
              {playbackRate === 1 ? '' : `${playbackRate}x`}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={12} />
            <span className="text-xs">{timestamp}</span>
          </div>
          
          {isOutgoing && (
            <Check size={16} className="text-whatsapp-teal-green" />
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceNote;
