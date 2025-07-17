import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { globalCities, globalUniversities } from '../../utils/globalMockData';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function AutocompleteInput({ 
  value, 
  onChange, 
  onSelect, 
  placeholder = "Enter city or university",
  className = ""
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{type: 'city' | 'university', name: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      const cityMatches = globalCities
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
        .map(city => ({ type: 'city' as const, name: city }));
      
      const universityMatches = globalUniversities
        .filter(uni => uni.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
        .map(uni => ({ type: 'university' as const, name: uni }));

      const allSuggestions = [...cityMatches, ...universityMatches].slice(0, 8);
      setSuggestions(allSuggestions);
      setIsOpen(allSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    onSelect(suggestion);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="relative">
        <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          className={`w-full pl-12 pr-4 py-3 sm:py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none text-base sm:text-lg ${className}`}
          data-cursor="text"
        />
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={`${suggestion.type}-${suggestion.name}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                onClick={() => handleSelect(suggestion.name)}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center space-x-3 first:rounded-t-xl last:rounded-b-xl"
                data-cursor="pointer"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  suggestion.type === 'city' 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : 'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  {suggestion.type === 'city' ? (
                    <MapPinIcon className={`w-4 h-4 ${
                      suggestion.type === 'city' 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-purple-600 dark:text-purple-400'
                    }`} />
                  ) : (
                    <AcademicCapIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {suggestion.name}
                  </div>
                  <div className={`text-xs ${
                    suggestion.type === 'city' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-purple-600 dark:text-purple-400'
                  }`}>
                    {suggestion.type === 'city' ? 'City' : 'University'}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}