
import React, { useState, useRef } from 'react';
import { useAnimationOnMount } from '@/lib/animations';
import { Copy, Check } from 'lucide-react';
import { toast } from "sonner";

interface TranscriptionBoxProps {
  text: string;
  searchQuery?: string;
  isExpanded?: boolean;
  isVisible: boolean;
}

const TranscriptionBox: React.FC<TranscriptionBoxProps> = ({ 
  text, 
  searchQuery = '', 
  isExpanded: initialExpanded = false,
  isVisible = false
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [copied, setCopied] = useState(false);
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
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("Transcription copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={`w-full max-w-xs ml-12 mt-1 transition-all duration-300 ${isAnimated ? 'opacity-100 transform-none' : 'opacity-0 translate-y-2'}`}>
      <div className="bg-gray-100 rounded-lg p-2 text-sm text-gray-700 relative">
        <div className={`${expanded ? '' : 'line-clamp-3'}`}>
          {highlightText(text, searchQuery)}
        </div>
        
        <div className="flex justify-between items-center mt-1">
          {text.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-whatsapp-teal-green text-xs font-medium"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
          
          <button
            onClick={copyToClipboard}
            className="text-whatsapp-teal-green ml-auto flex items-center gap-1 text-xs font-medium"
          >
            {copied ? (
              <>
                <Check size={12} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionBox;
