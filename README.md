# 🏠 StudyHome - Global Student Accommodation Platform

> A modern, full-featured student accommodation platform built with React, TypeScript, and Framer Motion. Find your perfect student home across 60+ cities worldwide.

<img width="1456" height="797" alt="Screenshot 2025-07-17 at 3 34 42 PM" src="https://github.com/user-attachments/assets/72ca7f51-92e6-4f72-abe3-35f064dc7e4d" />



## 🌟 Features

### 🔍 **Advanced Search & Discovery**
- **Smart Autocomplete**: Real-time search suggestions for cities and universities
- **Global Coverage**: 250+ properties across US, UK, Australia, Canada, and Europe
- **Advanced Filtering**: Price range, amenities, room types, lease duration
- **Multiple Sorting**: By price, popularity, rating, distance to university

### 🏢 **Property Management**
- **Detailed Listings**: High-quality images, virtual tours, floor plans
- **Interactive Maps**: Location visualization with university proximity
- **Verified Properties**: Trust badges and verification system
- **Real-time Availability**: Live room availability and pricing

### 💳 **Complete Booking System**
- **3-Step Booking Flow**: Personal details → Booking details → Payment
- **Payment Integration**: Stripe-ready payment processing
- **Booking Management**: User dashboard with booking history
- **Email Confirmations**: Automated booking confirmations

### 🎨 **Premium User Experience**
- **Custom Cursor**: Advanced animated cursor with magnetic effects
- **Smooth Animations**: Framer Motion powered transitions
- **Dark Mode**: Seamless theme switching with persistence
- **Fully Responsive**: Mobile-first design for all devices

### 👥 **User Management**
- **Authentication**: JWT-based login/register system
- **User Dashboard**: Saved properties, bookings, profile management
- **Admin Panel**: Property management and booking oversight
- **Role-based Access**: User and admin permission levels

### 💬 **Customer Support**
- **WhatsApp Integration**: Direct WhatsApp support button
- **Live Chat Interface**: Real-time customer support
- **Help Center**: Comprehensive FAQ and support documentation
- **Legal Pages**: Terms, Privacy Policy, Safety Guidelines

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/studyhome-platform.git
cd studyhome-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Booking/         # Booking flow components
│   ├── Home/            # Homepage components
│   ├── Layout/          # Header, Footer, Navigation
│   ├── Legal/           # Legal pages (Terms, Privacy)
│   ├── Property/        # Property detail components
│   ├── Search/          # Search and filter components
│   ├── Support/         # Customer support components
│   └── UI/              # Reusable UI components
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeContext.tsx # Theme management
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions and data
│   ├── globalMockData.ts # Global property database
│   └── mockData.ts      # Mock data utilities
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🧪 Testing Strategy

### Component Testing
```bash
# Run component tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

### Environment Variables
```env
# Add to .env.local
VITE_API_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_GOOGLE_MAPS_API_KEY=your_maps_key
```

### Build Optimization
```bash
# Analyze bundle size
npm run build
npm run preview

# Check for unused dependencies
npx depcheck

# Optimize images
npm run optimize:images
```

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] **Real Backend**: Node.js/Express API with MongoDB
- [ ] **Payment Integration**: Full Stripe payment processing
- [ ] **Real-time Chat**: Socket.io live chat system
- [ ] **Email System**: Automated email notifications
- [ ] **Admin Dashboard**: Comprehensive admin panel

### Phase 3 Features
- [ ] **Mobile App**: React Native mobile application
- [ ] **AI Recommendations**: ML-powered property suggestions
- [ ] **Virtual Tours**: 360° property tours
- [ ] **Multi-language**: i18n internationalization
- [ ] **Advanced Analytics**: User behavior tracking

### Technical Improvements
- [ ] **PWA Support**: Progressive Web App features
- [ ] **Offline Mode**: Cached content for offline viewing
- [ ] **Push Notifications**: Real-time booking updates
- [ ] **Advanced Search**: Elasticsearch integration
- [ ] **CDN Integration**: Global content delivery

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- **TypeScript**: Full type coverage required
- **ESLint**: Follow configured linting rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Semantic commit messages

### Component Guidelines
- **Single Responsibility**: One component, one purpose
- **Props Interface**: TypeScript interfaces for all props
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: React.memo for expensive components

## 🙏 Acknowledgments

- **Design Inspiration**: AmberStudent.com
- **Icons**: Heroicons by Tailwind Labs
- **Images**: Pexels.com for stock photography
- **Animations**: Framer Motion community
- **UI Components**: Headless UI components

---

**Built with ❤️ for students worldwide**

*Find your perfect student home with StudyHome - where comfort meets convenience.*
