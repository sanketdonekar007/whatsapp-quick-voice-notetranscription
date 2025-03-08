
import React, { useState, useEffect, useRef } from 'react';
import WhatsAppHeader from '@/components/WhatsAppHeader';
import VoiceNote from '@/components/VoiceNote';
import TranscriptionBox from '@/components/TranscriptionBox';
import TranscriptionSettings from '@/components/TranscriptionSettings';
import { Settings } from 'lucide-react';

// Message component for regular text messages
const TextMessage = ({ text, timestamp, isOutgoing }: { text: string, timestamp: string, isOutgoing: boolean }) => (
  <div className={`w-full max-w-xs mb-3 ${isOutgoing ? 'ml-auto' : ''}`}>
    <div className={isOutgoing ? 'whatsapp-bubble-out' : 'whatsapp-bubble-in'}>
      <p className="text-sm">{text}</p>
      <div className="flex justify-end mt-1">
        <span className="text-xs text-gray-500">{timestamp}</span>
        {isOutgoing && (
          <span className="ml-1 text-whatsapp-teal-green">
            <svg className="w-4 h-4 inline-block" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 2L5.5 7L3.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.5 2L9.5 7L8.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>
    </div>
  </div>
);

// Combined messages data (both text and voice)
const mockMessages = [
  {
    id: 'text-1',
    type: 'text',
    content: "Hey there! How's the project coming along?",
    timestamp: '10:20 AM',
    isOutgoing: false
  },
  {
    id: 'text-2',
    type: 'text',
    content: "It's going well, just finishing up the presentation slides.",
    timestamp: '10:21 AM',
    isOutgoing: true
  },
  {
    id: 'text-3',
    type: 'text',
    content: "Great! Let me explain some changes we need to make.",
    timestamp: '10:23 AM',
    isOutgoing: false
  },
  {
    id: 'voice-1',
    type: 'voice',
    audioUrl: 'https://cdn.freesound.org/previews/707/707865_5674468-lq.mp3',
    duration: 36,
    timestamp: '10:24 AM',
    isOutgoing: false,
    transcription: "Hey there! I wanted to follow up on our meeting yesterday about the project timeline. We need to adjust some of the milestones we discussed, especially for the design phase. I think we should allocate at least two more weeks for user testing before the final release."
  },
  {
    id: 'text-4',
    type: 'text',
    content: "Those are some good points. Let me think about it.",
    timestamp: '10:29 AM',
    isOutgoing: true
  },
  {
    id: 'voice-2',
    type: 'voice',
    audioUrl: 'https://cdn.freesound.org/previews/707/707681_14001589-lq.mp3',
    duration: 19,
    timestamp: '10:30 AM',
    isOutgoing: true,
    transcription: "That sounds reasonable. I was actually thinking the same thing. The current timeline is too tight for proper testing. Let's discuss this in our next team meeting and adjust the roadmap accordingly."
  },
  {
    id: 'text-5',
    type: 'text',
    content: "Perfect! I'll update the team on Slack.",
    timestamp: '10:32 AM',
    isOutgoing: false
  },
  {
    id: 'text-6',
    type: 'text',
    content: "Also, can you send me the latest mockups?",
    timestamp: '10:33 AM',
    isOutgoing: false
  },
  {
    id: 'voice-3',
    type: 'voice',
    audioUrl: 'https://cdn.freesound.org/previews/707/707865_5674468-lq.mp3',
    duration: 42,
    timestamp: '10:35 AM',
    isOutgoing: false,
    transcription: "Great! Also, can you send me the latest mockups when you get a chance? I'd like to review them before our call tomorrow. Oh, and don't forget we have that client meeting on Thursday at 10 AM. Make sure to prepare your presentation slides by Wednesday."
  },
  {
    id: 'text-7',
    type: 'text',
    content: "Will do! I'll send them by EOD.",
    timestamp: '10:37 AM',
    isOutgoing: true
  },
];

const Index = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [transcriptionEnabled, setTranscriptionEnabled] = useState(true);
  const [transcriptionLanguage, setTranscriptionLanguage] = useState('english');
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [visibleTranscripts, setVisibleTranscripts] = useState<Record<string, boolean>>({});
  const [visibleSearchbars, setVisibleSearchbars] = useState<Record<string, boolean>>({});
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const handleVoiceNotePlay = (id: string) => {
    setPlayingId(id);
  };
  
  const handleShowTranscript = (id: string, show: boolean) => {
    if (transcriptionEnabled) {
      setVisibleTranscripts(prev => ({
        ...prev,
        [id]: show
      }));
    }
  };
  
  const handleShowSearch = (id: string, show: boolean) => {
    if (transcriptionEnabled) {
      setVisibleSearchbars(prev => ({
        ...prev,
        [id]: show
      }));
    }
  };
  
  const handleSearch = (id: string, query: string) => {
    setSearchQueries(prev => ({
      ...prev,
      [id]: query
    }));
  };
  
  const handleSettingsChange = (settings: { autoTranscribe: boolean, language: string }) => {
    setTranscriptionEnabled(settings.autoTranscribe);
    setTranscriptionLanguage(settings.language);
    
    // If transcription is disabled, hide all transcripts and search bars
    if (!settings.autoTranscribe) {
      setVisibleTranscripts({});
      setVisibleSearchbars({});
    }
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
      
      {/* Chat Content */}
      <div className="flex-1 pt-[64px] pb-4 px-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {/* Date indicator */}
          <div className="flex justify-center">
            <div className="bg-white text-xs px-3 py-1 rounded-lg shadow-sm text-gray-500">
              TODAY
            </div>
          </div>
          
          {/* Messages */}
          {mockMessages.map((message) => (
            <div key={message.id} className="space-y-1">
              {message.type === 'text' ? (
                <TextMessage 
                  text={message.content} 
                  timestamp={message.timestamp} 
                  isOutgoing={message.isOutgoing} 
                />
              ) : (
                <>
                  <VoiceNote 
                    audioUrl={message.audioUrl}
                    duration={message.duration}
                    isOutgoing={message.isOutgoing}
                    timestamp={message.timestamp}
                    onPlay={() => handleVoiceNotePlay(message.id)}
                    onShowTranscript={(show) => handleShowTranscript(message.id, show)}
                    onShowSearch={(show) => handleShowSearch(message.id, show)}
                    onSearchChange={(query) => handleSearch(message.id, query)}
                  />
                  {transcriptionEnabled && (
                    <TranscriptionBox 
                      text={message.transcription}
                      searchQuery={searchQueries[message.id] || ''}
                      isExpanded={playingId === message.id}
                      isVisible={visibleTranscripts[message.id] || false}
                    />
                  )}
                </>
              )}
            </div>
          ))}
          
          <div ref={messageEndRef} />
        </div>
      </div>
      
      {/* Settings Modal */}
      {showSettings && (
        <TranscriptionSettings 
          onClose={() => setShowSettings(false)} 
          onSettingsChange={handleSettingsChange}
        />
      )}
    </div>
  );
};

export default Index;
