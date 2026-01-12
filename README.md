# Twilight Voting

## Overview

A voting tracker application for the board game Twilight Imperium. Players can create voting sessions, add players with their chosen factions, and track vote allocations across multiple agendas. The app uses a sci-fi themed UI with smooth animations and stores session data in browser localStorage for persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with custom sci-fi theme (Orbitron/Rajdhani fonts, space-themed colors)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for card animations and transitions
- **Build Tool**: Vite with custom path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod validation schemas
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: connect-pg-simple for PostgreSQL session storage

### Data Storage
- **Primary Storage**: Browser localStorage for session data (client-side persistence)
- **Database Schema**: PostgreSQL with Drizzle ORM (players table with faction, vote tracking fields)
- **Migrations**: Drizzle Kit for database migrations (./migrations folder)

### Key Design Patterns
- **Shared Types**: Schema definitions in shared/schema.ts used by both frontend and backend
- **API Contract**: Route definitions with input/output Zod schemas in shared/routes.ts
- **Storage Abstraction**: IStorage interface in server/storage.ts for data access layer
- **Component Architecture**: Reusable UI components in client/src/components/ui/

### Build Process
- **Development**: tsx for running TypeScript directly, Vite dev server with HMR
- **Production**: Custom build script bundles server with esbuild, client with Vite
- **Output**: dist/index.cjs (server) and dist/public (static assets)

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database queries with drizzle-zod for schema validation

### UI Libraries
- **Radix UI**: Headless component primitives (dialog, dropdown, popover, etc.)
- **shadcn/ui**: Pre-styled component library using Tailwind CSS
- **Framer Motion**: Animation library for React
- **cmdk**: Command palette component for searchable combobox

### Development Tools
- **Vite**: Frontend build tool and dev server
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment

### Fonts
- **Google Fonts**: Orbitron (display) and Rajdhani (body) for sci-fi aesthetic
