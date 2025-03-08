
import React, { useState } from 'react';
import { Languages, AlignJustify, X, ChevronDown, Check } from 'lucide-react';
import { useAnimationOnMount } from '@/lib/animations';

interface TranscriptionSettingsProps {
  onClose: () => void;
  onSettingsChange?: (settings: { autoTranscribe: boolean, language: string }) => void;
}

const TranscriptionSettings: React.FC<TranscriptionSettingsProps> = ({ 
  onClose,
  onSettingsChange 
}) => {
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [language, setLanguage] = useState('english');
  const [showLanguages, setShowLanguages] = useState(false);
  const isAnimated = useAnimationOnMount();
  
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'korean', label: 'Korean' },
    { value: 'arabic', label: 'Arabic' },
  ];
  
  const handleAutoTranscribeToggle = () => {
    const newValue = !autoTranscribe;
    setAutoTranscribe(newValue);
    if (onSettingsChange) {
      onSettingsChange({ autoTranscribe: newValue, language });
    }
  };
  
  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setShowLanguages(false);
    if (onSettingsChange) {
      onSettingsChange({ autoTranscribe, language: selectedLanguage });
    }
  };
  
  const toggleLanguageDropdown = () => {
    setShowLanguages(!showLanguages);
  };
  
  const handleSaveSettings = () => {
    if (onSettingsChange) {
      onSettingsChange({ autoTranscribe, language });
    }
    onClose();
  };
  
  const selectedLanguage = languages.find(lang => lang.value === language)?.label || 'English';
  
  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-50 flex justify-center items-end transition-default
        ${isAnimated ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-xl w-full max-w-md p-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Voice Notes Settings</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3">
              <AlignJustify size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Auto-Transcribe Voice Notes</p>
                <p className="text-sm text-gray-500">Automatically transcribe all received voice notes</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={autoTranscribe}
                onChange={handleAutoTranscribeToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-whatsapp-teal-green"></div>
            </label>
          </div>
          
          {autoTranscribe && (
            <>
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <Languages size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Transcription Language</p>
                    <p className="text-sm text-gray-500">Set preferred language for voice transcription</p>
                  </div>
                </div>
                
                <button 
                  onClick={toggleLanguageDropdown}
                  className="flex items-center gap-1 text-whatsapp-teal-green px-2 py-1 rounded hover:bg-gray-50"
                >
                  <span>{selectedLanguage}</span>
                  <ChevronDown size={16} className={`transition-transform ${showLanguages ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {showLanguages && (
                <div className="mt-2 max-h-60 overflow-y-auto bg-white rounded-lg shadow-md border">
                  {languages.map(lang => (
                    <button 
                      key={lang.value} 
                      className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-50 text-left"
                      onClick={() => handleLanguageSelect(lang.value)}
                    >
                      <span>{lang.label}</span>
                      {language === lang.value && <Check size={16} className="text-whatsapp-teal-green" />}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        
        <button 
          className="w-full py-2.5 bg-whatsapp-teal-green text-white rounded-lg font-medium hover:bg-whatsapp-teal-green-dark transition-colors"
          onClick={handleSaveSettings}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default TranscriptionSettings;
