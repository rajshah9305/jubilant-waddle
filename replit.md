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
- **Layout System**: Fixed header with responsive navigation and mobile menu
- **Studio Interface**: 
  - Sidebar navigation for studio switching
  - Chat interface with message bubbles and streaming responses
  - File upload with drag-and-drop functionality
  - Real-time metrics display (tokens used, processing speed)
- **Project Management**: Card-based project display with search and filtering
- **API Key Management**: Secure modal-based configuration with validation indicators

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

## Changelog

Changelog:
- July 07, 2025. Initial setup and major UI enhancements