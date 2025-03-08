
import React, { useState, useRef } from 'react';
import { Upload, Mic } from 'lucide-react';
import { useAnimationOnMount } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UploaderProps {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
}

const Uploader: React.FC<UploaderProps> = ({ onFileSelected, isLoading = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const isAnimated = useAnimationOnMount(100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check if file is an audio file
    if (!file.type.startsWith('audio/')) {
      toast.error('Please upload an audio file');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit');
      return;
    }
    
    onFileSelected(file);
  };

  return (
    <div 
      className={`transition-default animate-scale-in ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`
          relative p-8 md:p-12 
          rounded-xl w-full h-64
          flex flex-col items-center justify-center
          text-center transition-default
          border-2 border-dashed
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border bg-secondary/50'}
          hover:bg-secondary/80 cursor-pointer
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={`transition-default ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-background shadow-sm">
            {isLoading ? (
              <span className="loader" />
            ) : (
              <Mic className="h-8 w-8 text-primary opacity-80" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Upload Voice Note</h3>
          <p className="text-muted-foreground mb-4 max-w-xs mx-auto">
            Drag and drop your audio file here, or click to browse
          </p>
          
          <div className="flex justify-center">
            <Button
              size="sm"
              className="rounded-full"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Upload className="h-4 w-4 mr-2" /> Select File
            </Button>
          </div>
        </div>
        
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="audio/*"
          className="hidden"
        />
      </div>
      
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Supports MP3, WAV, OGG, M4A • Max file size: 10MB
      </div>
    </div>
  );
};

export default Uploader;
