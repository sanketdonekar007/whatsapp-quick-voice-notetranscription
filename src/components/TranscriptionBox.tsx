
import React, { useState, useEffect } from 'react';
import { useAnimationOnMount } from '@/lib/animations';

interface TranscriptionBoxProps {
  text: string;
  searchQuery?: string;
  isExpanded?: boolean;
}

const TranscriptionBox: React.FC<TranscriptionBoxProps> = ({ 
  text, 
  searchQuery = '', 
  isExpanded = false 
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const isAnimated = useAnimationOnMount(200);
  
  // Function to highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) {
      return <span>{text}</span>;
    }
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 text-black px-1 rounded">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };
  
  return (
    <div className={`w-full max-w-xs ml-12 mt-1 transition-default ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-gray-100 rounded-lg p-2 text-sm text-gray-700">
        <p className={`${expanded ? '' : 'line-clamp-3'}`}>
          {highlightText(text, searchQuery)}
        </p>
        
        {text.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-whatsapp-teal-green text-xs font-medium mt-1"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TranscriptionBox;
