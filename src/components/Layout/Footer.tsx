import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import AnimatedLogo from '../UI/AnimatedLogo';

interface FooterProps {
  onLegalClick: (type: 'help' | 'safety' | 'guidelines' | 'terms' | 'privacy') => void;
}

export default function Footer({ onLegalClick }: FooterProps) {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', action: () => onLegalClick('help') },
        { name: 'Safety', action: () => onLegalClick('safety') },
        { name: 'Community Guidelines', action: () => onLegalClick('guidelines') },
        { name: 'Terms of Service', action: () => onLegalClick('terms') },
        { name: 'Privacy Policy', action: () => onLegalClick('privacy') }
      ]
    },
    {
      title: 'Discover',
      links: [
        { name: 'London', href: '#' },
        { name: 'New York', href: '#' },
        { name: 'Sydney', href: '#' },
        { name: 'Toronto', href: '#' },
        { name: 'All Cities', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <AnimatedLogo />
            </motion.div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              Find your perfect student accommodation worldwide. Safe, verified, and affordable housing for students.
            </p>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-2">
              <PhoneIcon className="w-4 h-4" />
              <span>+44 20 7946 0958</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
              <EnvelopeIcon className="w-4 h-4" />
              <span>hello@studyhome.com</span>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{section.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {section.links.map((link) => (
                  <li key={typeof link === 'string' ? link : link.name}>
                    <motion.a
                      data-magnetic
                      data-cursor="pointer"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof link === 'object' && link.action) {
                          link.action();
                        }
                      }}
                      whileHover={{ x: 4 }}
                      className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors block cursor-hover"
                    >
                      {typeof link === 'string' ? link : link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © 2025 StudyHome. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <motion.a 
              href="#" 
              data-magnetic
              data-cursor="pointer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-400 hover:text-white transition-colors cursor-hover"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              data-magnetic
              data-cursor="pointer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="text-gray-400 hover:text-white transition-colors cursor-hover"
            >
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              data-magnetic
              data-cursor="pointer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-400 hover:text-white transition-colors cursor-hover"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}