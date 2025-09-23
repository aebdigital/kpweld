// Main JavaScript file - Initialize all components
import { initHeader } from './components/header.js?v=2.0';
import { initFooter } from './components/footer.js?v=2.0';
import { initFAQ } from './components/faq.js?v=2.0';
import { initSliders } from './components/slider.js?v=2.0';
import { initAnimations } from './components/animations.js?v=2.0';
import { initForms } from './components/forms.js?v=2.0';
import { initPortfolio } from './components/portfolio.js?v=2.0';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js ES6 modules loaded successfully');
    
    // Core components
    initHeader();
    initFooter();
    
    // Feature components
    initSliders();
    initAnimations();
    initForms();
    initFAQ();
    initPortfolio();
    
    // Additional functionality
    initBackToTopButton();
    initTestimonials();
    initUtilities();
});

// Back to Top Button functionality
function initBackToTopButton() {
    createBackToTopButton();
    
    window.addEventListener('scroll', toggleBackToTopButton);
    window.addEventListener('resize', handleBackToTopResize);
}

function createBackToTopButton() {
    if (window.innerWidth <= 768 && !document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Späť na vrch');
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTopBtn);
    }
}

function toggleBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn && window.innerWidth <= 768) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
}

function handleBackToTopResize() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (window.innerWidth <= 768) {
        createBackToTopButton();
    } else if (backToTopBtn) {
        backToTopBtn.remove();
    }
}

// Testimonials cycling
function initTestimonials() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonialIndex = 0;
    
    if (testimonialSlides.length === 0) return;
    
    function cycleTestimonials() {
        testimonialSlides[currentTestimonialIndex].classList.remove('active');
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
        testimonialSlides[currentTestimonialIndex].classList.add('active');
    }
    
    setInterval(cycleTestimonials, 6000);
}


// Utility functions
function initUtilities() {
    // External link handling
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[target="_blank"]');
        if (link) {
            link.rel = 'noopener noreferrer';
        }
    });
    
    // Image lazy loading fallback
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}