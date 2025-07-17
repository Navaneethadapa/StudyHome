import { Property, User, Booking, Review } from '../types';
import { globalMockProperties } from './globalMockData';

// Use global properties with 200+ listings
export const mockProperties: Property[] = globalMockProperties;

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  isAdmin: false,
  savedProperties: ['1', '3'],
  bookings: []
};

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    propertyId: '1',
    rating: 5,
    comment: 'Amazing place with great facilities. The location is perfect for university students!',
    createdAt: '2024-01-15',
    userName: 'Sarah M.'
  },
  {
    id: '2',
    userId: '2',
    propertyId: '1',
    rating: 4,
    comment: 'Good value for money. Staff is very helpful and responsive.',
    createdAt: '2024-01-10',
    userName: 'Mike K.'
  }
];

export const amenities = [
  'WiFi', 'Gym', 'Laundry', 'Study Room', 'Common Area', 'Security', 
  '24/7 Reception', 'Bike Storage', 'Cinema Room', 'Roof Terrace'
];