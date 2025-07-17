import { Property } from '../types';

// Global cities and universities data
export const globalCities = [
  // United States
  'New York', 'Los Angeles', 'Chicago', 'Boston', 'San Francisco', 'Seattle', 'Washington DC', 
  'Philadelphia', 'Atlanta', 'Miami', 'Austin', 'Denver', 'San Diego', 'Portland', 'Minneapolis',
  
  // United Kingdom
  'London', 'Manchester', 'Edinburgh', 'Birmingham', 'Liverpool', 'Leeds', 'Glasgow', 'Bristol',
  'Newcastle', 'Sheffield', 'Nottingham', 'Cardiff', 'Belfast', 'Oxford', 'Cambridge',
  
  // Australia
  'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Gold Coast', 'Newcastle (AU)',
  'Wollongong', 'Hobart', 'Darwin', 'Cairns',
  
  // Canada
  'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Winnipeg', 'Quebec City',
  'Halifax', 'Victoria', 'Saskatoon', 'London (CA)',
  
  // Europe
  'Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Amsterdam', 'Rotterdam', 'The Hague',
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Rome', 'Milan', 'Florence', 'Bologna',
  'Madrid', 'Barcelona', 'Valencia', 'Seville', 'Vienna', 'Salzburg', 'Zurich', 'Geneva',
  'Basel', 'Stockholm', 'Gothenburg', 'Copenhagen', 'Aarhus', 'Oslo', 'Bergen', 'Helsinki',
  'Dublin', 'Cork', 'Prague', 'Budapest', 'Warsaw', 'Krakow', 'Lisbon', 'Porto'
];

export const globalUniversities = [
  // US Universities
  'Harvard University', 'MIT', 'Stanford University', 'Yale University', 'Princeton University',
  'Columbia University', 'University of Chicago', 'University of Pennsylvania', 'Cornell University',
  'Dartmouth College', 'Brown University', 'Northwestern University', 'Duke University',
  'Johns Hopkins University', 'Washington University in St. Louis', 'Rice University',
  'Vanderbilt University', 'University of Notre Dame', 'Emory University', 'Georgetown University',
  'Carnegie Mellon University', 'University of Virginia', 'Wake Forest University',
  'University of Michigan', 'University of North Carolina', 'New York University',
  'Boston College', 'College of William & Mary', 'University of Rochester', 'Brandeis University',
  'Case Western Reserve University', 'Tulane University', 'Boston University', 'Northeastern University',
  'University of Miami', 'University of Southern California', 'University of California Berkeley',
  'UCLA', 'UC San Diego', 'UC Davis', 'UC Irvine', 'UC Santa Barbara', 'University of Washington',
  'Georgia Institute of Technology', 'University of Texas at Austin', 'University of Wisconsin',
  'University of Illinois', 'Ohio State University', 'Penn State University', 'University of Florida',
  
  // UK Universities
  'University of Oxford', 'University of Cambridge', 'Imperial College London', 'UCL',
  'King\'s College London', 'LSE', 'University of Edinburgh', 'University of Manchester',
  'University of Warwick', 'University of Bristol', 'University of Glasgow', 'Durham University',
  'University of Sheffield', 'University of Birmingham', 'University of Leeds', 'University of Southampton',
  'University of York', 'Lancaster University', 'University of Exeter', 'University of Bath',
  'Loughborough University', 'University of Surrey', 'Royal Holloway', 'Queen Mary University',
  'University of Leicester', 'University of Liverpool', 'University of Reading', 'Cardiff University',
  'Queen\'s University Belfast', 'University of Aberdeen', 'University of St Andrews',
  'University of Strathclyde', 'Heriot-Watt University', 'University of Dundee',
  
  // Australian Universities
  'University of Melbourne', 'Australian National University', 'University of Sydney',
  'University of Queensland', 'University of New South Wales', 'Monash University',
  'University of Western Australia', 'University of Adelaide', 'University of Technology Sydney',
  'Queensland University of Technology', 'RMIT University', 'Curtin University',
  'Deakin University', 'Griffith University', 'La Trobe University', 'Macquarie University',
  'University of South Australia', 'University of Tasmania', 'University of Wollongong',
  'Flinders University', 'James Cook University', 'University of Newcastle',
  
  // Canadian Universities
  'University of Toronto', 'McGill University', 'University of British Columbia',
  'University of Alberta', 'McMaster University', 'University of Montreal', 'University of Waterloo',
  'Queen\'s University', 'University of Calgary', 'Western University', 'University of Ottawa',
  'Simon Fraser University', 'Dalhousie University', 'University of Victoria', 'Carleton University',
  'York University', 'Concordia University', 'University of Saskatchewan', 'University of Manitoba',
  
  // European Universities
  'Technical University of Munich', 'University of Heidelberg', 'Humboldt University Berlin',
  'RWTH Aachen University', 'University of Freiburg', 'University of Göttingen',
  'University of Amsterdam', 'Delft University of Technology', 'Leiden University',
  'Utrecht University', 'Erasmus University Rotterdam', 'VU Amsterdam',
  'Sorbonne University', 'École Normale Supérieure', 'Sciences Po', 'HEC Paris',
  'University of Bologna', 'Sapienza University of Rome', 'Bocconi University',
  'Politecnico di Milano', 'University of Padua', 'University of Florence',
  'Complutense University of Madrid', 'University of Barcelona', 'Autonomous University of Madrid',
  'Pompeu Fabra University', 'IE University', 'ESADE Business School',
  'University of Vienna', 'Vienna University of Technology', 'University of Innsbruck',
  'ETH Zurich', 'University of Zurich', 'EPFL', 'University of Basel',
  'KTH Royal Institute of Technology', 'Stockholm University', 'Lund University',
  'University of Copenhagen', 'Technical University of Denmark', 'Aarhus University',
  'University of Oslo', 'Norwegian University of Science and Technology', 'University of Bergen',
  'University of Helsinki', 'Aalto University', 'Trinity College Dublin', 'University College Dublin',
  'Charles University', 'Czech Technical University', 'Budapest University of Technology',
  'Eötvös Loránd University', 'University of Warsaw', 'Jagiellonian University',
  'University of Lisbon', 'University of Porto'
];

// Generate 200+ properties across global destinations
export const generateGlobalProperties = (): Property[] => {
  const properties: Property[] = [];
  const propertyTypes = [
    'Student Residence', 'University Lodge', 'Campus Apartments', 'Student Village',
    'International House', 'Graduate Housing', 'Student Towers', 'Academic Quarters',
    'Scholar\'s Den', 'University Heights', 'Student Commons', 'Campus View',
    'International Student Center', 'Academic Residence', 'Student Plaza'
  ];

  const amenitiesList = [
    'WiFi', 'Gym', 'Laundry', 'Study Room', 'Common Area', 'Security', '24/7 Reception',
    'Bike Storage', 'Cinema Room', 'Roof Terrace', 'Game Room', 'Kitchen', 'Parking',
    'Swimming Pool', 'Sauna', 'Library', 'Coworking Space', 'Cafe', 'Cleaning Service',
    'Mail Service', 'Concierge', 'Air Conditioning', 'Heating', 'Balcony', 'Garden',
    'BBQ Area', 'Music Room', 'Art Studio', 'Dance Studio', 'Yoga Room', 'Meditation Room'
  ];

  const roomTypes = [
    { type: 'Standard Single', basePrice: 200 },
    { type: 'Premium Single', basePrice: 280 },
    { type: 'Studio', basePrice: 350 },
    { type: 'Shared Twin', basePrice: 150 },
    { type: 'Deluxe Single', basePrice: 320 },
    { type: 'One Bedroom Apartment', basePrice: 400 },
    { type: 'Two Bedroom Shared', basePrice: 250 },
    { type: 'Penthouse Suite', basePrice: 500 }
  ];

  // Property images from Pexels
  const propertyImages = [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2029734/pexels-photo-2029734.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2029694/pexels-photo-2029694.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1454805/pexels-photo-1454805.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2029737/pexels-photo-2029737.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  // Generate properties for each city
  globalCities.forEach((city, cityIndex) => {
    const cityUniversities = globalUniversities.filter(() => Math.random() > 0.7).slice(0, 3 + Math.floor(Math.random() * 3));
    const propertiesPerCity = Math.floor(Math.random() * 4) + 3; // 3-6 properties per city

    for (let i = 0; i < propertiesPerCity; i++) {
      const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const basePrice = 150 + Math.floor(Math.random() * 350);
      const rating = 3.5 + Math.random() * 1.5;
      const reviewCount = 20 + Math.floor(Math.random() * 300);
      
      // Select random amenities
      const selectedAmenities = amenitiesList
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 + Math.floor(Math.random() * 8));

      // Generate room types for this property
      const propertyRoomTypes = roomTypes
        .sort(() => 0.5 - Math.random())
        .slice(0, 2 + Math.floor(Math.random() * 3))
        .map((room, index) => ({
          id: `${cityIndex}-${i}-${index}`,
          type: room.type,
          price: room.basePrice + Math.floor(Math.random() * 100) - 50,
          available: Math.floor(Math.random() * 8),
          total: 5 + Math.floor(Math.random() * 15)
        }));

      // Select random images
      const selectedImages = propertyImages
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 + Math.floor(Math.random() * 3));

      const property: Property = {
        id: `${cityIndex}-${i}`,
        name: `${propertyType} ${city}`,
        city,
        universityNearby: cityUniversities.length > 0 ? cityUniversities : ['Local University', 'City College'],
        address: `${100 + Math.floor(Math.random() * 900)} ${['Main St', 'University Ave', 'College Rd', 'Academic Way', 'Student Blvd'][Math.floor(Math.random() * 5)]}, ${city}`,
        pricePerWeek: basePrice,
        pricePerMonth: Math.floor(basePrice * 4.33),
        description: `Modern student accommodation in the heart of ${city} with excellent transport links to major universities. Features contemporary design, premium amenities, and a vibrant community atmosphere perfect for international students.`,
        images: selectedImages,
        videoTour: Math.random() > 0.7 ? 'https://www.youtube.com/watch?v=example' : undefined,
        floorPlan: Math.random() > 0.5 ? 'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&cs=tinysrgb&w=800' : undefined,
        amenities: selectedAmenities,
        verified: Math.random() > 0.2,
        rating: Math.round(rating * 10) / 10,
        reviewCount,
        location: {
          lat: 40 + Math.random() * 20,
          lng: -120 + Math.random() * 140
        },
        roomTypes: propertyRoomTypes,
        availableFrom: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        distanceToUniversity: Math.round((0.2 + Math.random() * 3) * 10) / 10
      };

      properties.push(property);
    }
  });

  return properties; // Return all generated properties (should be 250+ now)
};

export const globalMockProperties = generateGlobalProperties();