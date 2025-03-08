
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useAnimationOnMount } from '@/lib/animations';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const isAnimated = useAnimationOnMount(250);

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
    <div className={`transition-default ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search within transcription..."
          value={query}
          onChange={handleChange}
          className="w-full py-2 pl-10 pr-10 bg-background border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-ring transition-default"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-default"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
