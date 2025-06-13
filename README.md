# Shrayash_editz - Video Editor Portfolio

A modern, interactive portfolio website for video editing services featuring 3D animations, custom cursor effects, and seamless user experience.

## Features

- **Modern Design**: Dark theme with purple and pink gradient accents
- **3D Elements**: Interactive Three.js particle animations
- **Custom Cursor**: Enhanced cursor experience with hover effects
- **Video Showcase**: Portfolio section with video player and modal functionality
- **Contact Form**: Functional contact form with validation
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations with scroll reveal effects

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom components
- **3D Graphics**: Three.js for particle effects
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Backend**: Express.js with TypeScript
- **State Management**: TanStack Query
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd shrayash-editz-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── sections/       # Page sections (Hero, About, Portfolio, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configurations
│   │   └── pages/          # Main page components
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory data storage
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schemas and validation
└── package.json           # Dependencies and scripts
```

## Key Components

### Custom Cursor
Interactive cursor with hover effects that enhance user experience on desktop devices.

### Three.js Scene
Animated particle system that responds to mouse movement, creating an engaging background effect.

### Video Player
Custom video player with controls, progress tracking, and modal functionality for portfolio showcase.

### Contact Form
Validated contact form that handles submissions and provides user feedback.

## Customization

### Colors
Update the color scheme in `tailwind.config.ts` and `client/src/index.css`:

```css
--primary: 262 84% 57%;     /* Purple */
--secondary: 245 72% 60%;   /* Indigo blue */
--accent: 330 80% 60%;      /* Pink */
```

### Content
- Update portfolio items in `client/src/sections/PortfolioSection.tsx`
- Modify contact information in `client/src/sections/ContactSection.tsx`
- Edit about section content in `client/src/sections/AboutSection.tsx`

## Deployment

The project is configured for easy deployment on platforms like:
- Vercel
- Netlify
- Replit Deployments

Make sure to set up environment variables for production if needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or collaboration inquiries, please use the contact form on the website or reach out through the provided social media links.