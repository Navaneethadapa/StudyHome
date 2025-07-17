import React from 'react';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function AnimatedLogo({ size = 'md', onClick }: AnimatedLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 cursor-pointer cursor-hover"
      onClick={onClick}
    >
      <motion.div
        className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center relative overflow-hidden`}
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8 }}
        />
        
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <HomeIcon className={`${sizeClasses[size]} text-white`} />
        </motion.div>
      </motion.div>
      
      <motion.span
        className={`${textSizes[size]} font-bold text-gray-900 dark:text-white`}
        whileHover={{ 
          background: 'linear-gradient(45deg, #3b82f6, #14b8a6, #8b5cf6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
        transition={{ duration: 0.3 }}
      >
        StudyHome
      </motion.span>
    </motion.div>
  );
}