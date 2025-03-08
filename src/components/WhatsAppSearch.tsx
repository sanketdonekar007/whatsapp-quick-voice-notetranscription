
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAnimationOnMount } from '@/lib/animations';

interface WhatsAppSearchProps {
  onSearch: (query: string) => void;
  isVisible: boolean;
}

const WhatsAppSearch: React.FC<WhatsAppSearchProps> = ({ onSearch, isVisible }) => {
  const [query, setQuery] = useState('');
  const isAnimated = useAnimationOnMount(100);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  
  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };
  
  useEffect(() => {
    if (!isVisible) {
      setQuery('');
      onSearch('');
    }
  }, [isVisible, onSearch]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`bg-white p-2 mb-2 rounded-lg transition-all duration-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search in transcript"
          value={query}
          onChange={handleChange}
          className="w-full py-2 pl-10 pr-10 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-whatsapp-teal-green text-sm"
          autoFocus
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WhatsAppSearch;
