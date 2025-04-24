import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <div
      className={`relative flex items-center w-full ${className}`}
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-10 pr-10 py-2 w-full text-sm text-gray-900 bg-white rounded-md border ${
          isFocused ? 'border-amber-500 ring-1 ring-amber-500' : 'border-gray-300'
        } focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200`}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
          type="button"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};