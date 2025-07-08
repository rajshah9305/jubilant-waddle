# Cerebras Studio - AI Creative Platform

## Overview

Cerebras Studio is a full-stack AI creative platform that provides four specialized AI studios: Text Generation, Code Generation, Document AI, and Creative Writing. The platform features a modern, responsive interface with a chat-style interaction model, project management capabilities, and comprehensive API key management.

## System Architecture

### Frontend Architecture
- **Framework**: React with Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **Animations**: Framer Motion for smooth interactions and transitions
- **3D Graphics**: Three.js for animated background elements and visual effects
- **State Management**: TanStack React Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Type Safety**: TypeScript throughout the entire frontend

### Backend Architecture
- **Framework**: Express.js with TypeScript for type-safe server development
- **API Design**: RESTful endpoints with consistent error handling
- **Middleware**: Custom logging, CORS enabled, request/response transformation
- **Mock AI Integration**: Simulated Cerebras API responses for development/demo
- **Storage**: Abstracted storage interface with in-memory implementation for development

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect for production
- **Schema Location**: Shared between client and server in `/shared/schema.ts`
- **Key Tables**:
  - `users`: User accounts with encrypted API keys
  - `projects`: User projects with content and metadata
  - `chatMessages`: Chat history and AI conversations
- **Development**: Uses in-memory storage with MemStorage class
- **Production**: Configured for PostgreSQL with Neon Database integration

## Key Components

### Frontend Components
- **Enhanced Layout System**: 
  - Fixed header with premium navigation design using rounded pills and gradient effects
  - Professional user profile dropdown with usage statistics, plan indicators, and account management
  - Responsive mobile menu with enhanced animations and visual hierarchy
- **Advanced Studio Interface**: 
  - Enhanced sidebar navigation with backdrop blur and card-based design
  - Professional chat interface with glassmorphism effects and real-time performance metrics
  - File upload with drag-and-drop functionality and visual feedback
  - Comprehensive metrics dashboard (response time, token usage, quality scores)
  - Action buttons for analytics, sharing, and settings functionality
- **Project Management**: Card-based project display with search and filtering capabilities
- **API Key Management**: Secure modal-based configuration with validation indicators and visual status

### Backend Services
- **AI Generation Service**: Mock responses simulating different studio types
- **Project Service**: CRUD operations for user projects
- **Chat Service**: Message handling and conversation management
- **Storage Abstraction**: Interface-based design for easy database switching

### Shared Types and Schema
- **Studio Types**: Strongly typed studio configurations and message structures
- **Database Schema**: Shared Drizzle schema definitions with Zod validation
- **API Contracts**: Type-safe request/response interfaces

## Data Flow

1. **User Authentication**: API key-based authentication with local storage persistence
2. **Studio Interaction**: 
   - User selects studio type → validates API key → initializes chat
   - Messages sent through React Query → Express API → mock AI service
   - Streaming responses simulated with chunked data and typing indicators
3. **Project Management**:
   - Auto-save functionality for chat sessions
   - Project metadata including token usage and timestamps
   - Cross-studio project compatibility

## External Dependencies

### Production Dependencies
- **Database**: Neon Database (PostgreSQL) with connection pooling
- **AI Service**: Cerebras API integration (currently mocked)
- **UI Components**: Radix UI primitives with custom styling
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build Tool**: Vite with React plugin and TypeScript support
- **CSS Framework**: Tailwind CSS with custom design tokens
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Server**: Hot module replacement with error overlay

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds optimized React application to `dist/public`
2. **Server Build**: esbuild bundles TypeScript server to `dist/index.js`
3. **Static Assets**: Client assets served from built directory

### Environment Configuration
- **Development**: Uses in-memory storage and mock AI responses
- **Production**: PostgreSQL database with real Cerebras API integration
- **Environment Variables**: Database URL and API keys managed securely

### Scaling Considerations
- **Database**: Drizzle ORM supports connection pooling and migrations
- **Storage**: Abstracted interface allows easy switching between storage backends
- **API Rate Limiting**: Ready for implementation with user-specific quotas

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **Professional Landing Page Design Overhaul** (July 08, 2025):
  - Fixed 3D model rendering cut-off issues with improved canvas sizing (500x500px) and proper overflow handling
  - Implemented darker, more professional 3D wireframe model (dark gray #1a1a1a) with subtle lighting for enterprise aesthetic
  - Refined typography hierarchy with smaller, more professional font sizes (5xl-8xl) and improved line spacing
  - Enhanced hero section with cleaner layout, reduced max-width (xl), and better visual balance
  - Replaced vibrant orange floating elements with subtle gray accents for professional appearance
  - Added professional background gradients with minimal opacity for clean, non-AI-generated look
  - Improved button styling with more conservative hover effects and refined shadows
  - Enhanced overall visual hierarchy to appear more human-designed and enterprise-appropriate

- **Enterprise UI Improvements & Enhanced User Experience** (July 08, 2025):
  - Removed API Keys button from header navigation as per enterprise design requirements
  - Significantly enlarged 3D wireframe model (6.5 radius) with improved camera positioning for better visual correspondence with hero content
  - Enhanced 3D visual area from 400x400px to 550x550px with proportionally scaled floating elements
  - Implemented fully functional notification system with real-time interaction, read/unread states, and timestamp display
  - Added comprehensive notification management with clear all functionality and visual feedback indicators
  - Enhanced Settings page integration with complete API key management, user preferences, and security controls
  - Improved visual hierarchy and professional enterprise aesthetics throughout the platform

- **Robust API Key Management & Settings Integration** (July 08, 2025):
  - Implemented comprehensive API key management system with multi-provider support
  - Added advanced settings page with API key management, user preferences, and security controls
  - Enhanced API key validation with real-time status monitoring and usage analytics
  - Integrated tabbed interface for API keys, usage analytics, and security settings
  - Added support for multiple API key providers (Cerebras, OpenAI, Claude, Custom)
  - Implemented secure key storage with masked display and validation indicators
  - Added usage tracking, rate limiting, and permission management
  - Enhanced navigation with Settings page integration and improved user experience

- **Premium Professional Interface Refinement & Advanced Features** (July 08, 2025):
  - Enhanced header with notifications system, dark mode toggle preparation, and improved navigation
  - Developed floating Quick Actions FAB with contextual shortcuts for common tasks
  - Created enhanced collapsible sidebar with usage indicators, tier badges, and progress tracking
  - Implemented comprehensive analytics dashboard with trend visualization and interactive data charts
  - Added TrendChart component for real-time performance metrics visualization
  - Enhanced analytics cards with mini trend charts and improved data presentation
  - Integrated notification system with toast components and real-time updates
  - Prepared theme provider infrastructure for dark/light mode switching
  - Added enterprise-grade visual hierarchy with backdrop blur effects and premium animations
  - Implemented accessibility improvements and mobile-responsive design enhancements

- **Enterprise-Grade Design System & Professional UI Overhaul** (July 08, 2025):
  - Enhanced header with larger enterprise logo, premium navigation pills, and advanced animations
  - Redesigned studio sidebar with enhanced background patterns, status badges, and professional styling
  - Upgraded studio cards with premium hover effects, floating elements, and enterprise-grade animations
  - Implemented comprehensive dashboard with trust indicators, floating metrics, and enhanced call-to-action
  - Added sophisticated visual hierarchy with backdrop blur effects, gradient overlays, and premium shadows
  - Created enterprise-grade component styling with consistent theme throughout platform
  - Enhanced professional typography, spacing, and visual elements for award-worthy design standards

- **Professional User Profile Management & Studio Enhancements** (July 08, 2025):
  - Implemented comprehensive user profile dropdown with avatar, usage stats, and plan indicators
  - Added enhanced header navigation with rounded pill design and gradient logo
  - Redesigned studio pages with professional layout, performance metrics, and action buttons
  - Created advanced dropdown menu system with animations and detailed user information
  - Added Analytics navigation option for future feature expansion
  - Enhanced studio interface with backdrop blur effects and modern card layouts
  - Integrated real-time performance indicators (response time, tokens, quality score)

- **Enhanced Visual Design & Typography Overhaul** (July 08, 2025):
  - Dramatically increased hero title font sizes (6xl to 9xl) for maximum visual impact
  - Enhanced subtitle typography (2xl to 3xl) with improved spacing and readability
  - Redesigned studio cards with consistent 3-tag layout and enhanced visual hierarchy
  - Improved studio card styling with gradient backgrounds, glowing borders, and premium animations
  - Enhanced CTA button with larger size, better gradients, and advanced hover effects
  - Standardized all section headings to 5xl-7xl sizes for consistent visual hierarchy
  - Applied premium design principles throughout for award-winning aesthetic appeal

- **Enhanced Landing Page with Trust & Conversion Features** (July 08, 2025):
  - Added comprehensive "How It Works" section with 3-step visual guide
  - Implemented social proof section with success metrics and user testimonials
  - Added key benefits section emphasizing user value (save time, eliminate blocks, boost productivity)
  - Created detailed FAQ section addressing common questions and concerns
  - Added enterprise-grade security and trust badges section
  - Implemented final CTA section for improved conversion
  - Enhanced overall page structure for better user engagement and trust building

- **Replit Agent to Replit Migration** (July 08, 2025):
  - Successfully migrated project from Replit Agent to standard Replit environment
  - All dependencies installed and verified working
  - Server running on port 5000 with API endpoints responding properly
  - Client application accessible with Vite development server
  - Both "Start Game" and "Start application" workflows configured (using Start Game as primary)
  - Project ready for continued development and enhancement

- **Simplified 3D Visual Design** (July 07, 2025):
  - Simplified Three.js 3D model to show only wireframe globe for cleaner, futuristic look
  - Removed orbital rings, inner sphere, and particles for better visual focus
  - Increased wireframe globe size (4.5 radius) to establish clear visual hierarchy
  - Added complementary floating gradient elements around the 3D model

- **Improved Studio Cards Layout** (July 07, 2025):
  - Redesigned studio cards for consistent vertical layout across all breakpoints
  - Centered content alignment with larger gradient icons and improved hover effects
  - Updated grid layout for better visual balance (xl:grid-cols-4 for larger screens)

- **Interactive File Upload Integration** (July 07, 2025):
  - Added file upload button next to the send button in chat interface
  - Created FileUploadButton component with attachment indicator and preview
  - Integrated file context into chat messages with automatic file analysis prompts
  - Different file type support based on studio type (document studio supports more formats)

- **Document AI Studio Interface Refinement** (July 07, 2025):
  - Removed file upload section from Document AI Studio page for cleaner UI
  - Focused interface purely on chat and interaction area
  - Kept file upload option only next to the send button for streamlined experience

- **Premium Landing Page Design Overhaul** (July 07, 2025):
  - Enhanced hero section with modern typography, larger fonts (6xl-8xl), and premium animations
  - Added animated gradient text effects and progressive reveals for visual sophistication
  - Redesigned CTA buttons with advanced hover effects, shadows, and micro-interactions
  - Enhanced 3D visual area with premium floating elements and coordinated animations
  - Upgraded studio cards with glass morphism, animated borders, and enhanced hover states
  - Applied award-worthy design principles for Awwwards-level aesthetic quality

- **Mobile-Optimized Compact Design** (July 07, 2025):
  - Decreased hero title font sizes (4xl-6xl) and subtitle text for better mobile fit
  - Removed "Watch Demo" button and "Powered by Advanced AI Technology" badge for cleaner layout
  - Removed "Four Powerful AI Studios" text from studios section
  - Reduced hero section height (80vh) and component padding to fit content on single screen
  - Compact metrics cards and 3D visual area for better mobile/laptop viewing

- **PostgreSQL Database Integration** (July 07, 2025):
  - Added PostgreSQL database with Neon Database integration
  - Implemented PostgresStorage class with full CRUD operations for users, projects, and chat messages
  - Configured database migrations with Drizzle ORM
  - Added fallback to in-memory storage for development environments
  - Environment variables configured for secure database connection

- **Enhanced Visual Hierarchy** (July 07, 2025):
  - Increased hero title font sizes (5xl-7xl) for stronger visual impact
  - Enhanced subtitle text size (xl) and maximum width for better readability
  - Enlarged "Start Creating" button with larger padding and text (xl) for clear call-to-action
  - Increased studios section heading size (4xl-5xl) for better section hierarchy
  - Maintained consistent typography scaling across all breakpoints

## Changelog

Changelog:
- July 07, 2025. Initial setup and major UI enhancements