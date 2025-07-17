import React from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  MapPinIcon, 
  CheckBadgeIcon, 
  HeartIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onCardClick: (propertyId: string) => void;
  isSaved?: boolean;
  onSave?: (propertyId: string) => void;
}

export default function PropertyCard({ property, onCardClick, isSaved, onSave }: PropertyCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(property.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality would go here
    navigator.share?.({
      title: property.name,
      text: property.description,
      url: window.location.href
    });
  };

  return (
    <motion.div
      data-magnetic
      data-cursor="view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-hover"
      onClick={() => onCardClick(property.id)}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex space-x-2">
            {property.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
              >
                <CheckBadgeIcon className="w-3 h-3" />
                <span>Verified</span>
              </motion.div>
            )}
          </div>

          <div className="flex space-x-2">
            <motion.button
              data-cursor="pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 bg-black/20 backdrop-blur-sm text-white rounded-full hover:bg-black/40 transition-colors cursor-hover"
            >
              <ShareIcon className="w-4 h-4" />
            </motion.button>
            <motion.button
              data-cursor="pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className="p-2 bg-black/20 backdrop-blur-sm text-white rounded-full hover:bg-black/40 transition-colors cursor-hover"
            >
              {isSaved ? (
                <HeartSolidIcon className="w-4 h-4 text-red-500" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
            <div className="text-sm font-medium">£{property.pricePerWeek}/week</div>
            <div className="text-xs opacity-80">£{property.pricePerMonth}/month</div>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {property.roomTypes.some(room => room.available > 0) ? 'Available' : 'Fully Booked'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {property.name}
          </h3>
        </div>

        <div className="flex items-center space-x-1 mb-3">
          <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
            {property.city} • {property.distanceToUniversity}km to campus
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Universities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.universityNearby.slice(0, 2).map((uni) => (
              <span
                key={uni}
                className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs rounded-full"
              >
                {uni}
              </span>
            ))}
            {property.universityNearby.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{property.universityNearby.length - 2} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              {property.rating}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              ({property.reviewCount} reviews)
            </span>
          </div>

          <div className="text-right">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Available from
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
              {new Date(property.availableFrom).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Room Types */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 gap-2">
            {property.roomTypes.slice(0, 2).map((room) => (
              <div key={room.id} className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {room.type}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    £{room.price}/week
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    room.available > 0 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  }`}>
                    {room.available > 0 ? `${room.available} left` : 'Full'}
                  </span>
                </div>
              </div>
            ))}
            {property.roomTypes.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                +{property.roomTypes.length - 2} more room types
              </div>
            )}
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}