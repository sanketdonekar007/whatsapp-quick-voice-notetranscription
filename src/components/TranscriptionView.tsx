
import React, { useState, useEffect } from 'react';
import TranscriptionItem from './TranscriptionItem';
import { useAnimationOnMount } from '@/lib/animations';

interface TranscriptionSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  highlighted?: boolean;
}

interface TranscriptionViewProps {
  segments: TranscriptionSegment[];
  currentTime?: number;
  searchQuery?: string;
  onSegmentClick?: (startTime: number) => void;
}

const TranscriptionView: React.FC<TranscriptionViewProps> = ({
  segments,
  currentTime = 0,
  searchQuery = '',
  onSegmentClick
}) => {
  const [filteredSegments, setFilteredSegments] = useState<TranscriptionSegment[]>(segments);
  const isAnimated = useAnimationOnMount(300);
  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredSegments(segments.map(segment => ({ ...segment, highlighted: false })));
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = segments.map(segment => ({
      ...segment,
      highlighted: segment.text.toLowerCase().includes(query)
    }));
    
    setFilteredSegments(filtered);
  }, [segments, searchQuery]);
  
  const getActiveSegmentId = () => {
    if (!currentTime) return null;
    
    for (const segment of segments) {
      if (currentTime >= segment.startTime && currentTime <= segment.endTime) {
        return segment.id;
      }
    }
    
    return null;
  };
  
  const activeSegmentId = getActiveSegmentId();
  
  const handleSegmentClick = (startTime: number) => {
    if (onSegmentClick) {
      onSegmentClick(startTime);
    }
  };

  return (
    <div className={`transition-default ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-card rounded-xl border shadow-sm p-4">
        <h3 className="text-base font-medium mb-3">Transcription</h3>
        
        <div className="max-h-[450px] overflow-y-auto pr-2">
          {filteredSegments.length > 0 ? (
            filteredSegments.map((segment, index) => (
              <TranscriptionItem
                key={segment.id}
                segment={segment}
                isActive={segment.id === activeSegmentId}
                onClick={() => handleSegmentClick(segment.startTime)}
                index={index}
              />
            ))
          ) : (
            <div className="text-muted-foreground text-center py-8">
              No transcription available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptionView;
