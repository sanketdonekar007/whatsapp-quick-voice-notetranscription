
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface WhatsAppSearchProps {
  onSearch: (query: string) => void;
}

const WhatsAppSearch: React.FC<WhatsAppSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  
  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };
  
  return (
    <div className="sticky top-[64px] z-10 bg-white p-2 border-b">
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
