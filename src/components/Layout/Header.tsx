import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  UserIcon, 
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import AnimatedLogo from '../UI/AnimatedLogo';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: 'home', icon: HomeIcon },
    { name: 'Search', href: 'search', icon: MagnifyingGlassIcon },
    { name: 'Blog', href: 'blog', icon: HomeIcon },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <AnimatedLogo onClick={() => onNavigate('home')} />

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <motion.button
              data-magnetic
              data-cursor="pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-hover"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </motion.button>

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <motion.button
                  data-magnetic
                  data-cursor="pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onNavigate('dashboard')}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 cursor-hover"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.button>
                <motion.button
                  data-magnetic
                  data-cursor="pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={logout}
                  className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 cursor-hover"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.button
                data-magnetic
                data-cursor="pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('login')}
                className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 cursor-hover"
              >
                Sign In
              </motion.button>
            )}

            {/* Mobile menu button */}
            <motion.button
              data-cursor="pointer"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 cursor-hover"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 pb-4"
          >
            <div className="space-y-1">
              {navigation.map((item) => (
                <button
                  data-cursor="pointer"
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium cursor-hover ${
                    currentPage === item.href
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    data-cursor="pointer"
                    onClick={() => {
                      onNavigate('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 cursor-hover"
                  >
                    Dashboard
                  </button>
                  <button
                    data-cursor="pointer"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium text-red-600 dark:text-red-400 cursor-hover"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  data-cursor="pointer"
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 cursor-hover"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}