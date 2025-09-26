# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, interactive CV/portfolio website for Rubén D. Quispe with advanced visual effects and AI-themed elements. The site features animated backgrounds, interactive terminal, AI assistant, and dynamic visual elements to showcase technical skills in data science and AI.

## Architecture

### Core Files Structure
- **index.html**: Main HTML structure with semantic sections (header, experience, education, projects, skills, etc.)
- **styles.css**: Complete CSS styling with animations, gradients, and responsive design
- **script.js**: Interactive JavaScript functionality including scroll animations, terminal simulation, and AI assistant

### Key Features & Components
- **Animated Background**: Gradient animations with flowing code effect
- **Interactive Terminal**: Simulated command-line interface with AI commands
- **AI Assistant**: Floating helper with contextual interactions
- **Data Flow Effects**: Visual representation of neural networks and data streams
- **Scroll Animations**: Intersection Observer API for progressive element reveals
- **Responsive Design**: Mobile-first approach with modern CSS Grid/Flexbox

### Visual Effects System
- **Particle Systems**: Animated elements representing data flow and neural networks
- **Progress Bars**: Animated skill level indicators with smooth transitions
- **Hover Effects**: Enhanced interactivity on portfolio items and navigation
- **Theme Controls**: Dynamic color scheme adjustments

## Development Commands

This is a pure frontend project with no build system. Simply open `index.html` in a browser or serve with a local HTTP server:

```bash
# Serve locally (Python)
python -m http.server 8000

# Serve locally (Node.js)
npx serve .
```

## Key JavaScript Modules

### Animation System (`script.js`)
- **Scroll Observer**: Handles element visibility and progressive animations
- **Terminal Simulator**: Command execution and response generation
- **AI Assistant**: Interactive help system with predefined responses
- **Visual Effects**: Particle generation, data flow, and background animations

### Styling Architecture (`styles.css`)
- **CSS Custom Properties**: Theme colors and animation timings
- **Animation Keyframes**: Complex multi-stage animations for various effects
- **Responsive Breakpoints**: Mobile, tablet, and desktop layouts
- **Component Styling**: Modular approach for reusable UI elements

## Content Management

### Personal Information Updates
- Contact details in header section of `index.html`
- Professional photo: `ruben foto.jpeg` referenced in header
- Experience, education, and skills sections are data-driven from HTML structure

### Adding New Sections
1. Update HTML structure in `index.html`
2. Add corresponding CSS styles in `styles.css`
3. Implement interactive behavior in `script.js` if needed
4. Ensure scroll animations are applied to new elements

## Interactive Features

### Terminal Commands
- `about`: Display personal information
- `skills`: Show technical skills
- `projects`: List portfolio projects
- `experience`: Display work history
- `contact`: Show contact information

### AI Assistant Commands
- Contextual help based on current page section
- Dynamic response generation
- Integration with terminal functionality

## Performance Considerations

- External CDN dependencies: Font Awesome icons and Google Fonts
- Intersection Observer API for efficient scroll handling
- CSS transforms and transitions for smooth animations
- Optimized image loading with error handling

## Mobile Responsiveness

The site uses a mobile-first responsive design with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Key responsive features include collapsible navigation, stacked layouts on mobile, and touch-friendly interactive elements.