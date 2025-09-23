# KP-WELD Project Documentation

## Project Overview

KP-WELD is a modern website for a Slovak steel construction company (KP-WELD s.r.o.) based in Samorín, Slovakia. The website showcases their services including steel constructions, gates, fencing, stairs, railings, and locksmith work. The company has been operating since 2014 with over 500 completed projects.

## Project Structure

```
KP-WELD/
├── css/                     # Stylesheets
│   ├── base.css            # CSS variables, reset, utility classes, design system
│   ├── home.css            # Homepage-specific styles
│   ├── produkty-sluzby.css # Products/services page styles  
│   ├── kontakt.css         # Contact page styles
│   ├── o-nas.css           # About page styles
│   ├── referencie.css      # References/portfolio page styles
│   └── components/         # Component-specific styles
│       ├── header.css      # Navigation and header styles
│       ├── footer.css      # Footer component styles
│       ├── FAQ.css         # FAQ accordion styles
│       └── hero.css        # Shared hero section styles
├── js/                     # JavaScript modules
│   ├── main.js            # Main entry point, component orchestration
│   ├── fallback.js        # ES6 module fallback for older browsers
│   └── components/        # Individual component modules
│       ├── animations.js   # Scroll animations, counters, observers
│       ├── forms.js        # Form validation and handling
│       ├── header.js       # Navigation component logic
│       ├── footer.js       # Footer component logic
│       ├── faq.js          # FAQ accordion functionality
│       └── slider.js       # Image and text slider components
├── pages/                 # HTML pages
│   ├── index.html         # Homepage with hero slider
│   ├── produkty-sluzby.html # Services and products
│   ├── kontakt.html       # Contact with map and form
│   ├── o-nas.html         # About company page
│   └── referencie.html    # Portfolio/references gallery
└── sources/              # Images and media assets
    └── *.jpg             # Product images, backgrounds, portfolio photos
```

## Technologies Used

- **HTML5**: Semantic markup with comprehensive SEO meta tags
- **CSS3**: Modern CSS with custom properties, grid, flexbox, glassmorphism effects
- **Vanilla JavaScript**: ES6 modules with comprehensive fallback system
- **No external frameworks**: Lightweight, pure vanilla implementation
- **Intersection Observer API**: For scroll animations and lazy loading
- **Structured Data**: JSON-LD for SEO and rich snippets

## Architecture Overview

### Component System
The project uses a modular component architecture where each component is self-contained with its own CSS and JavaScript files. Components are dynamically loaded and injected into designated containers.

### Fallback Strategy
The project implements a sophisticated fallback system:
1. **Primary**: ES6 modules loaded via `main.js`
2. **Fallback**: `fallback.js` provides complete functionality backup
3. **Global Functions**: All component functions exposed globally for compatibility
4. **Progressive Enhancement**: Components check for existing functionality before loading

## Key Components

### Header Component (`js/components/header.js` + `css/components/header.css`)
- Dynamic navigation injection into `#navigation-container`
- Scroll-based navbar transparency with different triggers for home vs other pages
- Mobile hamburger menu with smooth animations
- Active link highlighting based on current page
- Smooth scroll functionality for anchor links
- Scroll progress indicator

### Footer Component (`js/components/footer.js` + `css/components/footer.css`)
- Dynamic footer content injection into `#footer-container`
- GDPR-compliant privacy policy modal
- Company contact information and social links
- Call-to-action section for quotes

### Slider Component (`js/components/slider.js`)
- **Hero Image Slider**: 5-second intervals, smooth transitions
- **Hero Text Slider**: 4-second intervals with dot indicators
- **Services Carousel**: Navigation controls and responsive design

### FAQ Component (`js/components/faq.js` + `css/components/FAQ.css`)
- Dynamic FAQ generation from data array
- Accordion-style toggle functionality with smooth animations
- Grid layout (3x2) with alternating black/white styling
- Scroll-based reveal animations

### Animations Component (`js/components/animations.js`)
- Intersection Observer-based scroll animations
- Counter animations for statistics (500+ projects, 10+ years)
- Section title animations with special effects
- Performance-optimized observers

### Forms Component (`js/components/forms.js`)
- Contact form validation (Slovak language)
- Real-time field validation
- Email and phone number validation
- Error message display system

## CSS Architecture

### Design System (base.css)
```css
:root {
    --primary-color: #333333;
    --secondary-color: #666666;
    --accent-color: #ffffff;
    --font-family: 'Montserrat', sans-serif;
    --container-max-width: 95%;
    --border-radius: 8px;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --transition-smooth: 0.3s ease;
}
```

### Styling Patterns
- **Component-based CSS**: Each component has its own stylesheet
- **CSS Custom Properties**: Consistent design tokens throughout
- **Modern CSS Features**: Grid, Flexbox, backdrop-filter, CSS animations
- **Mobile-first**: Responsive design with progressive enhancement
- **BEM-style naming**: Component-based class organization

## Page Structure

### Common Elements
All pages include:
- SEO-optimized meta tags (title, description, keywords, Open Graph, Twitter Cards)
- Structured data (JSON-LD) for local business information
- Responsive viewport meta tag
- Proper favicon and language attributes
- Navigation container (`#navigation-container`)
- Footer container (`#footer-container`)

### Homepage (`pages/index.html`)
- Full-screen hero with synchronized image/text sliders
- About section with company statistics and highlights  
- Process workflow with step-by-step visualization
- Project gallery grid
- Testimonials section
- FAQ integration

### Services Page (`pages/produkty-sluzby.html`)
- Service-specific hero section
- Alternating layout for service descriptions
- Individual service details with features
- Process workflow (shared component)

### Contact Page (`pages/kontakt.html`) 
- Interactive Google Maps integration with custom styling
- Split layout: company info (left) + contact form (right)
- Company registration details
- Social media links

### About Page (`pages/o-nas.html`)
- Company story and values
- Team member profiles
- Statistics and certifications
- Call-to-action integration

### References Page (`pages/referencie.html`)
- Portfolio filter system
- Project gallery with modal details
- Client testimonials
- Awards and achievements

## JavaScript Module System

### Main Entry Point (`js/main.js`)
```javascript
import { initHeader } from './components/header.js';
import { initFooter } from './components/footer.js';
// ... other imports

document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initFooter();
    initSliders();
    initAnimations();
    initForms();
    initFAQ();
});
```

### Fallback System (`js/fallback.js`)
- Complete embedded versions of all components
- Checks for ES6 module availability before loading fallback
- 1-second delay to allow ES6 modules to load first
- Global function exposure for cross-compatibility

### Component Pattern
Each component follows this pattern:
```javascript
export function initComponentName() {
    loadComponent();
    initComponentFunctionality();
}

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadComponent = loadComponent;
    window.initComponentFunctionality = initComponentFunctionality;
}
```

## Content and Localization

- **Language**: Slovak (SK)
- **Business Context**: Steel construction company in Samorín, Slovakia
- **Services**: Oceľové konštrukcie (steel constructions), brány (gates), oplotenia (fencing), schody (stairs), zábradlia (railings), zámočnícke práce (locksmith work)
- **Contact**: +421 908 383 815, kpweldsro@gmail.com
- **Address**: Bratislavská 2558, 931 01 Samorín

## Development and Maintenance Guidelines

### File Naming Conventions
- **CSS**: kebab-case for files and classes
- **JavaScript**: camelCase for functions and variables
- **HTML**: semantic element names
- **Images**: descriptive names with project context

### Code Organization
- **Separation of Concerns**: HTML, CSS, and JS in separate files
- **Component Isolation**: Each component is self-contained
- **Global Fallback**: All functions exposed globally for compatibility
- **Performance First**: Lazy loading, efficient animations, minimal DOM manipulation

### Testing Strategy
- **Cross-browser Compatibility**: ES6 modules with fallback system
- **Mobile Responsiveness**: All breakpoints tested
- **Performance**: Lighthouse optimization
- **Accessibility**: ARIA labels and semantic markup

### SEO Optimization
- **Meta Tags**: Complete SEO meta tag implementation
- **Structured Data**: Local business JSON-LD markup
- **Performance**: Fast loading times and optimized images
- **Content**: Keyword-optimized content in Slovak

## Common Tasks and Commands

### Running the Project
- Serve files through a local server (required for ES6 modules)
- No build process required - runs directly in browser

### Adding New Components
1. Create component files in `js/components/` and `css/components/`
2. Export init function and expose globally for fallback
3. Add component to `main.js` imports
4. Add embedded version to `fallback.js`
5. Include CSS in relevant HTML pages

### Updating Content
- FAQ data: Edit `faqData` array in `js/components/faq.js`
- Company info: Update in `js/components/footer.js`
- Services: Edit service data in respective components
- Images: Add to `sources/` folder with descriptive names

### Performance Considerations
- Images are lazy-loaded where possible
- Components only load when needed
- Intersection Observer used for scroll animations
- Minimal DOM manipulation for smooth performance
- CSS animations preferred over JavaScript animations

This documentation provides a comprehensive understanding of the KP-WELD project architecture, enabling efficient development and maintenance.