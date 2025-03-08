
import React from 'react';
import { staggeredAnimation } from '@/lib/animations';

interface TranscriptionSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  highlighted?: boolean;
}

interface TranscriptionItemProps {
  segment: TranscriptionSegment;
  isActive?: boolean;
  onClick?: () => void;
  index: number;
}

const TranscriptionItem: React.FC<TranscriptionItemProps> = ({ 
  segment, 
  isActive = false,
  onClick,
  index
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const { style } = staggeredAnimation(index);

  return (
    <div 
      onClick={onClick}
      className={`
        p-3 rounded-lg mb-2 transition-default animate-slide-up
        ${isActive ? 'bg-primary/5 border-primary/20' : 'hover:bg-secondary/80'} 
        ${segment.highlighted ? 'border border-primary/20 bg-primary/5' : 'border border-transparent'}
        cursor-pointer
      `}
      style={style}
    >
      <div className="flex items-start gap-3">
        <div className="bg-muted/50 text-muted-foreground text-xs font-medium px-2 py-1 rounded mt-0.5 select-none">
          {formatTime(segment.startTime)}
        </div>
        <div className="flex-1">
          <p className="text-sm leading-relaxed">{segment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionItem;
