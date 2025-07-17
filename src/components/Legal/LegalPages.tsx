import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';

interface LegalPageProps {
  type: 'help' | 'safety' | 'guidelines' | 'terms' | 'privacy';
  onClose: () => void;
}

export default function LegalPages({ type, onClose }: LegalPageProps) {
  const pageConfig = {
    help: {
      title: 'Help Center',
      icon: QuestionMarkCircleIcon,
      color: 'blue',
      content: {
        sections: [
          {
            title: 'Getting Started',
            items: [
              'How to search for accommodation',
              'Creating your account',
              'Booking your first property',
              'Payment methods and security'
            ]
          },
          {
            title: 'Booking Process',
            items: [
              'How to book a property',
              'Understanding booking fees',
              'Cancellation policies',
              'Moving in procedures'
            ]
          },
          {
            title: 'Account Management',
            items: [
              'Updating your profile',
              'Managing saved properties',
              'Viewing booking history',
              'Changing password'
            ]
          }
        ]
      }
    },
    safety: {
      title: 'Safety Guidelines',
      icon: ShieldCheckIcon,
      color: 'green',
      content: {
        sections: [
          {
            title: 'Property Verification',
            items: [
              'All properties are verified by our team',
              'Regular safety inspections conducted',
              'Fire safety compliance checked',
              'Secure access systems verified'
            ]
          },
          {
            title: 'Personal Safety',
            items: [
              'Never share personal information publicly',
              'Meet landlords in safe, public places',
              'Report suspicious activities immediately',
              'Use our secure messaging system'
            ]
          },
          {
            title: 'Emergency Contacts',
            items: [
              '24/7 emergency support hotline',
              'Local emergency services information',
              'Property management contacts',
              'University security services'
            ]
          }
        ]
      }
    },
    guidelines: {
      title: 'Community Guidelines',
      icon: UserGroupIcon,
      color: 'purple',
      content: {
        sections: [
          {
            title: 'Respectful Communication',
            items: [
              'Be respectful in all interactions',
              'No harassment or discrimination',
              'Use appropriate language',
              'Respect privacy of others'
            ]
          },
          {
            title: 'Property Reviews',
            items: [
              'Provide honest and constructive feedback',
              'No fake or misleading reviews',
              'Focus on property features and experience',
              'Respect landlord and tenant privacy'
            ]
          },
          {
            title: 'Prohibited Activities',
            items: [
              'No fraudulent listings or bookings',
              'No spam or promotional content',
              'No sharing of inappropriate content',
              'No violation of local laws'
            ]
          }
        ]
      }
    },
    terms: {
      title: 'Terms of Service',
      icon: DocumentTextIcon,
      color: 'orange',
      content: {
        sections: [
          {
            title: 'Service Agreement',
            items: [
              'By using StudyHome, you agree to these terms',
              'We provide a platform connecting students with accommodation',
              'Users are responsible for their own bookings',
              'We reserve the right to modify these terms'
            ]
          },
          {
            title: 'User Responsibilities',
            items: [
              'Provide accurate information',
              'Comply with all applicable laws',
              'Respect intellectual property rights',
              'Pay all fees and charges on time'
            ]
          },
          {
            title: 'Limitation of Liability',
            items: [
              'StudyHome acts as an intermediary platform',
              'We are not responsible for property conditions',
              'Users book at their own risk',
              'Disputes should be resolved directly with landlords'
            ]
          }
        ]
      }
    },
    privacy: {
      title: 'Privacy Policy',
      icon: LockClosedIcon,
      color: 'indigo',
      content: {
        sections: [
          {
            title: 'Information We Collect',
            items: [
              'Personal information you provide',
              'Usage data and preferences',
              'Device and browser information',
              'Location data (with permission)'
            ]
          },
          {
            title: 'How We Use Your Data',
            items: [
              'To provide and improve our services',
              'To communicate with you about bookings',
              'To personalize your experience',
              'To ensure platform security'
            ]
          },
          {
            title: 'Data Protection',
            items: [
              'We use industry-standard encryption',
              'Your data is stored securely',
              'We never sell your personal information',
              'You can request data deletion anytime'
            ]
          }
        ]
      }
    }
  };

  const config = pageConfig[type];
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r from-${config.color}-600 to-${config.color}-500 p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
              >
                <IconComponent className="w-6 h-6" />
              </motion.div>
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold"
                >
                  {config.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/80"
                >
                  Everything you need to know
                </motion.p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {config.content.sections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + sectionIndex * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className={`w-2 h-2 bg-${config.color}-500 rounded-full mr-3`}></div>
                  {section.title}
                </h3>
                <div className="grid gap-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                      className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className={`w-2 h-2 bg-${config.color}-400 rounded-full mt-2 group-hover:bg-${config.color}-500 transition-colors`}
                      ></motion.div>
                      <p className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-6 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Need More Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 bg-${config.color}-600 hover:bg-${config.color}-700 text-white rounded-lg font-medium transition-colors`}
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Live Chat
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}