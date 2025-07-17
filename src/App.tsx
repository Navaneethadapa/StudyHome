import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import CursorAnimation from './components/UI/CursorAnimation';
import WhatsAppSupport from './components/Support/WhatsAppSupport';
import LegalPages from './components/Legal/LegalPages';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Home/Hero';
import FeaturedProperties from './components/Home/FeaturedProperties';
import SearchFilters from './components/Search/SearchFilters';
import PropertyCard from './components/Search/PropertyCard';
import PropertyDetail from './components/Property/PropertyDetail';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import BookingPage from './components/Booking/BookingPage';
import { SearchFilters as FilterType } from './types';
import { globalMockProperties } from './utils/globalMockData';

type PageType = 'home' | 'search' | 'property' | 'booking' | 'login' | 'register' | 'dashboard' | 'blog';
type LegalPageType = 'help' | 'safety' | 'guidelines' | 'terms' | 'privacy';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterType>({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(globalMockProperties);
  const [legalPage, setLegalPage] = useState<LegalPageType | null>(null);

  // Handle hash-based navigation for "View All Properties"
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#search') {
        setCurrentPage('search');
        window.location.hash = '';
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    if (page !== 'search') {
      setFiltersOpen(false);
    }
  };

  const handleSearch = (city: string) => {
    setFilters({ ...filters, city });
    setCurrentPage('search');
    
    // Filter properties based on city
    const filtered = globalMockProperties.filter(property => 
      property.city.toLowerCase().includes(city.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handlePropertyClick = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentPage('property');
  };

  const handleBookNow = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setCurrentPage('booking');
  };

  const handleBookingComplete = () => {
    alert('Booking completed successfully! You will receive a confirmation email shortly.');
    setCurrentPage('home');
  };

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    
    // Apply filters to search results
    let filtered = [...globalMockProperties];

    if (newFilters.city) {
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(newFilters.city!.toLowerCase())
      );
    }

    if (newFilters.university) {
      filtered = filtered.filter(property => 
        property.universityNearby.some(uni => 
          uni.toLowerCase().includes(newFilters.university!.toLowerCase())
        )
      );
    }

    if (newFilters.priceRange) {
      filtered = filtered.filter(property => 
        property.pricePerWeek >= newFilters.priceRange![0] && 
        property.pricePerWeek <= newFilters.priceRange![1]
      );
    }

    if (newFilters.amenities && newFilters.amenities.length > 0) {
      filtered = filtered.filter(property => 
        newFilters.amenities!.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }

    // Apply sorting
    if (newFilters.sortBy) {
      filtered.sort((a, b) => {
        switch (newFilters.sortBy) {
          case 'price':
            return a.pricePerWeek - b.pricePerWeek;
          case 'rating':
            return b.rating - a.rating;
          case 'distance':
            return a.distanceToUniversity - b.distanceToUniversity;
          default:
            return b.reviewCount - a.reviewCount; // popularity
        }
      });
    }

    setSearchResults(filtered);
  };

  const selectedProperty = selectedPropertyId 
    ? globalMockProperties.find(p => p.id === selectedPropertyId)
    : null;

  const handleLegalClick = (type: LegalPageType) => {
    setLegalPage(type);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onSearch={handleSearch} />
            <FeaturedProperties onPropertyClick={handlePropertyClick} />
          </motion.div>
        );

      case 'search':
        return (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Student Accommodation
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchResults.length} properties found
                  </p>
                  <SearchFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    isOpen={filtersOpen}
                    onToggle={() => setFiltersOpen(!filtersOpen)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onCardClick={handlePropertyClick}
                  />
                ))}
              </div>

              {searchResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">No properties found</div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your filters or search criteria
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'property':
        return selectedProperty ? (
          <PropertyDetail
            property={selectedProperty}
            onBookNow={handleBookNow}
            onBack={() => setCurrentPage('search')}
          />
        ) : null;

      case 'booking':
        return selectedProperty ? (
          <BookingPage
            property={selectedProperty}
            onBack={() => setCurrentPage('property')}
            onComplete={handleBookingComplete}
          />
        ) : null;

      case 'login':
        return (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center"
          >
            <div className="max-w-md w-full mx-auto px-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <LoginForm
                  onClose={() => setCurrentPage('home')}
                  onSwitchToRegister={() => setCurrentPage('register')}
                />
              </div>
            </div>
          </motion.div>
        );

      case 'blog':
        return (
          <motion.div
            key="blog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Student Life Blog
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    title: 'Ultimate Guide to Student Life in London',
                    image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
                    excerpt: 'Discover the best tips for living as a student in one of the world\'s greatest cities...'
                  },
                  {
                    title: 'Budget-Friendly Student Accommodation Tips',
                    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                    excerpt: 'Learn how to find affordable housing without compromising on quality and location...'
                  },
                  {
                    title: 'International Student Visa Guide 2024',
                    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
                    excerpt: 'Everything you need to know about student visas for studying abroad...'
                  },
                  {
                    title: 'Best Universities in Australia for International Students',
                    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
                    excerpt: 'Explore top Australian universities and what makes them special for international students...'
                  },
                  {
                    title: 'Student Safety: Essential Tips for Living Abroad',
                    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
                    excerpt: 'Stay safe while studying abroad with these essential safety tips and guidelines...'
                  },
                  {
                    title: 'Making Friends as an International Student',
                    image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800',
                    excerpt: 'Build meaningful connections and create lasting friendships during your studies...'
                  }
                ].map((post, i) => (
                  <motion.div 
                    data-magnetic
                    data-cursor="view"
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group cursor-hover"
                  >
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleDateString()}
                        </span>
                        <motion.span 
                          whileHover={{ x: 4 }}
                          className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium"
                        >
                          Read more →
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'register':
        return (
          <motion.div
            key="register"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center"
          >
            <div className="max-w-md w-full mx-auto px-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <RegisterForm
                  onClose={() => setCurrentPage('home')}
                  onSwitchToLogin={() => setCurrentPage('login')}
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 flex items-center justify-center"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Coming Soon
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                This page is under development
              </p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
          <CursorAnimation />
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
          
          {currentPage !== 'property' && currentPage !== 'login' && currentPage !== 'register' && (
            <Footer onLegalClick={handleLegalClick} />
          )}
          
          <WhatsAppSupport />
          
          <AnimatePresence>
            {legalPage && (
              <LegalPages 
                type={legalPage} 
                onClose={() => setLegalPage(null)} 
              />
            )}
          </AnimatePresence>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;