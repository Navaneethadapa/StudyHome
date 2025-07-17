export interface Property {
  id: string;
  name: string;
  city: string;
  universityNearby: string[];
  address: string;
  pricePerWeek: number;
  pricePerMonth: number;
  description: string;
  images: string[];
  videoTour?: string;
  floorPlan?: string;
  amenities: string[];
  verified: boolean;
  rating: number;
  reviewCount: number;
  location: {
    lat: number;
    lng: number;
  };
  roomTypes: RoomType[];
  availableFrom: string;
  distanceToUniversity: number;
}

export interface RoomType {
  id: string;
  type: string;
  price: number;
  available: number;
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  savedProperties: string[];
  bookings: Booking[];
}

export interface Booking {
  id: string;
  userId: string;
  propertyId: string;
  roomType: string;
  rent: number;
  durationMonths: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  moveInDate: string;
}

export interface Review {
  id: string;
  userId: string;
  propertyId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
}

export interface SearchFilters {
  city?: string;
  university?: string;
  priceRange?: [number, number];
  roomType?: string;
  amenities?: string[];
  sortBy?: 'price' | 'popularity' | 'rating' | 'distance';
}