import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { globalCities } from '../../utils/globalMockData';
import AutocompleteInput from '../UI/AutocompleteInput';

interface HeroProps {
  onSearch: (city: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500 dark:from-blue-800 dark:via-purple-800 dark:to-teal-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 20],
              x: [null, -10, 10],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Student Home
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl sm:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Discover verified student accommodations worldwide. Safe, affordable, and close to your university.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <AutocompleteInput
                value={searchCity}
                onChange={setSearchCity}
                onSelect={handleSearch}
                placeholder="Enter city or university"
              />
              <motion.button
                data-magnetic
                data-cursor="pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-hover"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* Popular Cities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8"
          >
            <p className="text-white/80 mb-4 text-sm sm:text-base">Popular cities:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {globalCities.slice(0, 8).map((city, index) => (
                <motion.button
                  data-magnetic
                  data-cursor="pointer"
                  key={city}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSearch(city)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-200 text-sm sm:text-base cursor-hover"
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-lg mx-auto"
          >
            {[
              { number: '50K+', label: 'Happy Students' },
              { number: '100+', label: 'Cities' },
              { number: '1000+', label: 'Properties' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.2, type: 'spring' }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white"
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/80 mt-1 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}