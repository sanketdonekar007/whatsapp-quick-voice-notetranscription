
import React, { useState, useEffect, useRef } from 'react';
import WhatsAppHeader from '@/components/WhatsAppHeader';
import VoiceNote from '@/components/VoiceNote';
import TranscriptionBox from '@/components/TranscriptionBox';
import WhatsAppSearch from '@/components/WhatsAppSearch';
import TranscriptionSettings from '@/components/TranscriptionSettings';
import { Settings } from 'lucide-react';

// Mock data for demo purposes
const mockVoiceNotes = [
  {
    id: '1',
    audioUrl: 'https://cdn.freesound.org/previews/707/707865_5674468-lq.mp3',
    duration: 36,
    timestamp: '10:24 AM',
    isOutgoing: false,
    transcription: "Hey there! I wanted to follow up on our meeting yesterday about the project timeline. We need to adjust some of the milestones we discussed, especially for the design phase. I think we should allocate at least two more weeks for user testing before the final release."
  },
  {
    id: '2',
    audioUrl: 'https://cdn.freesound.org/previews/707/707681_14001589-lq.mp3',
    duration: 19,
    timestamp: '10:30 AM',
    isOutgoing: true,
    transcription: "That sounds reasonable. I was actually thinking the same thing. The current timeline is too tight for proper testing. Let's discuss this in our next team meeting and adjust the roadmap accordingly."
  },
  {
    id: '3',
    audioUrl: 'https://cdn.freesound.org/previews/707/707865_5674468-lq.mp3',
    duration: 42,
    timestamp: '10:35 AM',
    isOutgoing: false,
    transcription: "Great! Also, can you send me the latest mockups when you get a chance? I'd like to review them before our call tomorrow. Oh, and don't forget we have that client meeting on Thursday at 10 AM. Make sure to prepare your presentation slides by Wednesday."
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleVoiceNotePlay = (id: string) => {
    setPlayingId(id);
  };
  
  // Scroll to bottom on mount
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-whatsapp-chat-bg text-gray-800 pb-safe">
      {/* WhatsApp Header */}
      <WhatsAppHeader />
      
      {/* Settings button */}
      <div className="fixed top-16 right-4 z-10">
        <button 
          onClick={() => setShowSettings(true)} 
          className="bg-white rounded-full p-2 shadow-md"
        >
          <Settings size={20} className="text-whatsapp-teal-green" />
        </button>
      </div>
      
      {/* Search */}
      <WhatsAppSearch onSearch={handleSearch} />
      
      {/* Chat Content */}
      <div className="flex-1 pt-[120px] pb-4 px-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          {/* Date indicator */}
          <div className="flex justify-center">
            <div className="bg-white text-xs px-3 py-1 rounded-lg shadow-sm text-gray-500">
              TODAY
            </div>
          </div>
          
          {/* Messages */}
          {mockVoiceNotes.map((note) => (
            <div key={note.id} className="space-y-1">
              <VoiceNote 
                audioUrl={note.audioUrl}
                duration={note.duration}
                isOutgoing={note.isOutgoing}
                timestamp={note.timestamp}
                onPlay={() => handleVoiceNotePlay(note.id)}
              />
              <TranscriptionBox 
                text={note.transcription}
                searchQuery={searchQuery}
                isExpanded={playingId === note.id}
              />
            </div>
          ))}
          
          <div ref={messageEndRef} />
        </div>
      </div>
      
      {/* Settings Modal */}
      {showSettings && (
        <TranscriptionSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default Index;
