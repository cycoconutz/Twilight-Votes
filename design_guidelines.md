# Player Voting Application - Design Guidelines

## Design Approach
**Hybrid System**: Material Design foundation with gaming-inspired visual elements. Drawing from Discord's organized data display + Apple Arcade's clean aesthetics + Riot Games' faction/character presentation.

## Core Design Principles
- Clarity over decoration: Voting mechanics must be instantly understandable
- Faction-first hierarchy: Clear visual separation between groups
- Data-driven design: Vote counts and stats prominently displayed
- Scannable cards: Users need to compare players quickly

---

## Typography System
**Font Stack**: Inter (headings), System UI (body)
- Hero/Page Title: 3xl/4xl, bold (700)
- Faction Headers: 2xl, semibold (600)
- Player Names: lg, medium (500)
- Stats/Labels: sm, regular (400)
- Vote Counts: xl, bold (700) - emphasize numbers

---

## Layout System
**Spacing**: Use Tailwind units of 3, 4, 6, 8, 12 for consistent rhythm
**Grid Strategy**: 
- Desktop: 3-4 column player cards (grid-cols-3 lg:grid-cols-4)
- Tablet: 2 columns (md:grid-cols-2)
- Mobile: Single column stacked

**Container**: max-w-7xl centered with px-4 padding

---

## Component Library

### Hero Section
- Compact header (not full-screen): h-64 with gradient overlay
- Background: Gaming/competition themed image (stadium, arena, or abstract competitive visual)
- Content: App title + tagline + total votes counter
- CTA: "View All Players" or "Start Voting" button with backdrop-blur-lg background

### Faction Sections
- Horizontal tabs or segmented controls for faction switching
- Each faction has distinct accent treatment (border-l-4 with faction color)
- Section header with faction name + total faction votes
- Collapsible option for space efficiency

### Player Cards
**Card Structure**:
- Avatar/image at top (aspect-square with rounded-xl)
- Player name + role/position
- Stats grid (2x2 or 3x1 depending on data)
- Vote count badge (top-right corner, elevated)
- Vote button (full-width at bottom)

**Card Styling**:
- border with subtle shadow
- rounded-xl corners
- hover:scale-[1.02] transform (subtle lift)
- Active state: ring-2 ring-blue-500

### Voting Interface
**Vote Button**: 
- Pill-shaped (rounded-full)
- Icon + "Vote" text
- Disabled state when already voted
- Success state animation on click

**Vote Counter**:
- Circular badge or rectangular pill
- Floating on card top-right
- Shows current vote total
- Increments with smooth number animation

### Reset Functionality
- Floating action button (bottom-right corner, fixed position)
- OR: Top nav bar button
- Confirmation modal before reset
- Icon: Refresh/Restart symbol

### Navigation Bar
- Sticky top position
- Logo + app name left
- Total votes display center
- Reset button + user profile right
- backdrop-blur-md with border-b

### Footer
- Minimalist: Copyright + Links
- py-8 spacing

---

## Interaction Patterns
- Click card to expand details (optional drawer or modal)
- Vote button ripple effect on click
- Real-time vote count updates
- Toast notifications for actions
- Smooth scrolling between factions

---

## Responsive Behavior
**Breakpoints**:
- Mobile: Stacked cards, tabs convert to dropdown
- Tablet: 2-column grid
- Desktop: 3-4 column grid with sidebar navigation

---

## Images

### Hero Image
**Type**: Wide banner (16:9 aspect ratio)
**Placement**: Full-width background for hero section at top
**Description**: Competition/gaming themed - stadium crowd, esports arena, or abstract geometric patterns suggesting competition/factions. Dark overlay (40% opacity) to ensure text readability.

### Player Avatars
**Type**: Square portraits (1:1 aspect ratio)
**Placement**: Top of each player card
**Description**: Character portraits or player photos with consistent styling - consider circular masks or faction-colored borders for cohesion.

---

## Accessibility
- ARIA labels on vote buttons with vote counts
- Keyboard navigation for card grid
- Focus states: ring-2 ring-offset-2
- Screen reader announcements for vote updates
- Minimum touch target: 44x44px for buttons