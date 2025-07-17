import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  MapPinIcon, 
  CheckBadgeIcon,
  HeartIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Property } from '../../types';

interface PropertyDetailProps {
  property: Property;
  onBookNow: (propertyId: string) => void;
  onBack: () => void;
  isSaved?: boolean;
  onSave?: (propertyId: string) => void;
}

export default function PropertyDetail({ property, onBookNow, onBack, isSaved, onSave }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleSave = () => {
    onSave?.(property.id);
  };

  const handleShare = () => {
    navigator.share?.({
      title: property.name,
      text: property.description,
      url: window.location.href
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back to search</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8"
            >
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Video Tour Button */}
                {property.videoTour && (
                  <button className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                    <PlayIcon className="w-4 h-4" />
                    <span>Video Tour</span>
                  </button>
                )}
              </div>

              {/* Thumbnail Strip */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-600'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {property.name}
                    </h1>
                    {property.verified && (
                      <CheckBadgeIcon className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{property.address}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ShareIcon className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSave}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {isSaved ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {property.rating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({property.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {property.distanceToUniversity}km to university
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {property.description}
              </p>

              {/* Universities Nearby */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Universities Nearby
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.universityNearby.map((uni) => (
                    <span
                      key={uni}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(showAllAmenities ? property.amenities : property.amenities.slice(0, 6)).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
                {property.amenities.length > 6 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    {showAllAmenities ? 'Show less' : `Show ${property.amenities.length - 6} more amenities`}
                  </button>
                )}
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Location
              </h3>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Interactive map would be displayed here
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    £{property.pricePerWeek}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">per week</div>
                  <div className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    £{property.pricePerMonth}/month
                  </div>
                </div>

                {/* Room Types */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Available Rooms
                  </h4>
                  <div className="space-y-3">
                    {property.roomTypes.map((room) => (
                      <div
                        key={room.id}
                        className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {room.type}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            £{room.price}/week
                          </div>
                        </div>
                        <div className={`text-sm px-2 py-1 rounded-full ${
                          room.available > 0
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        }`}>
                          {room.available > 0 ? `${room.available} available` : 'Full'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available From */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Available from
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {new Date(property.availableFrom).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Book Now Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onBookNow(property.id)}
                  disabled={!property.roomTypes.some(room => room.available > 0)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {property.roomTypes.some(room => room.available > 0) ? 'Book Now' : 'Fully Booked'}
                </motion.button>

                <div className="mt-4 text-center">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    Schedule a Virtual Tour
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                    <div className="flex justify-between">
                      <span>Security Deposit:</span>
                      <span>£{property.pricePerWeek * 2}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Admin Fee:</span>
                      <span>£50</span>
                    </div>
                    <div className="flex justify-between font-medium text-gray-900 dark:text-white">
                      <span>Total First Payment:</span>
                      <span>£{property.pricePerWeek * 3 + 50}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}