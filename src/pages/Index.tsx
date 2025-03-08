
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Uploader from '@/components/Uploader';
import AudioPlayer from '@/components/AudioPlayer';
import TranscriptionView from '@/components/TranscriptionView';
import SearchBar from '@/components/SearchBar';
import { toast } from 'sonner';

// Mock data for demo purposes
const mockTranscriptionData = [
  { id: '1', text: "Hey there! I wanted to follow up on our meeting yesterday about the project timeline.", startTime: 0, endTime: 4.5 },
  { id: '2', text: "We need to adjust some of the milestones we discussed, especially for the design phase.", startTime: 4.5, endTime: 9 },
  { id: '3', text: "I think we should allocate at least two more weeks for user testing before the final release.", startTime: 9, endTime: 14 },
  { id: '4', text: "Also, can you send me the latest mockups when you get a chance? I'd like to review them before our call tomorrow.", startTime: 14, endTime: 19 },
  { id: '5', text: "Let me know if you have any questions or concerns about these adjustments.", startTime: 19, endTime: 23 },
  { id: '6', text: "I'm available to chat anytime after 2 PM today. Thanks!", startTime: 23, endTime: 27 },
  { id: '7', text: "Oh, and don't forget we have that client meeting on Thursday at 10 AM. Make sure to prepare your presentation slides by Wednesday.", startTime: 27, endTime: 33 },
  { id: '8', text: "Looking forward to seeing the progress on this project!", startTime: 33, endTime: 36 },
];

const Index = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [transcription, setTranscription] = useState<typeof mockTranscriptionData>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileSelected = (file: File) => {
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    
    // Simulate processing with a delay
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTranscription(mockTranscriptionData);
      toast.success('Transcription completed successfully!');
    }, 2000);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleSegmentClick = (startTime: number) => {
    // This would control the audio player to jump to this time
    setCurrentTime(startTime);
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.currentTime = startTime;
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Main Content */}
        <div className="container px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            {!audioFile ? (
              <div className="mb-10">
                <Uploader
                  onFileSelected={handleFileSelected}
                  isLoading={isProcessing}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col gap-6">
                  <div>
                    <h3 className="text-base font-medium mb-3">Audio</h3>
                    <AudioPlayer 
                      audioUrl={audioUrl} 
                      onTimeUpdate={handleTimeUpdate}
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium mb-3">Search</h3>
                    <SearchBar onSearch={handleSearch} />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <TranscriptionView 
                    segments={transcription}
                    currentTime={currentTime}
                    searchQuery={searchQuery}
                    onSegmentClick={handleSegmentClick}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2023 VoiceToText. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
