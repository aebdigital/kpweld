// Header Component - Navigation functionality

export function initHeader() {
    loadNavigation();
    initMobileNavigation();
    initScrollEffects();
    initNavigationListeners();
}

// Make functions globally available for fallback - after function declarations

function loadNavigation() {
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    console.log('Navigation path debug:', {
        currentPath,
        isInServicePage,
        isInPagesDir
    });
    
    // Set navigation paths based on current location
    let basePath, pagesPath;
    
    if (isInServicePage) {
        // We're in /pages/service-page/
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../';    // To reach /pages/ directory
    } else if (isInPagesDir) {
        // We're in /pages/
        basePath = '../';     // To reach root for index.html
        pagesPath = '';       // Other pages are in same directory (just filename.html)
    } else {
        // We're in root directory
        basePath = '';        // index.html is in same directory
        pagesPath = 'pages/'; // Other pages are in pages/ subdirectory
    }
    
    console.log('Resolved paths:', {
        basePath,
        pagesPath,
        homeLink: `${basePath}index.html`,
        produktyLink: `${pagesPath}produkty-sluzby.html`
    });
    
    const navigationHTML = `
        <!-- Scroll Progress Indicator -->
        <div class="scroll-progress">
            <div class="scroll-progress-bar"></div>
        </div>

        <!-- Transparent Navigation -->
        <nav class="navbar navbar-transparent">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="${basePath}index.html" class="logo-link logo-text">
                        KP WELD
                    </a>
                </div>
                <ul class="nav-menu">
                    <li><a href="${basePath}index.html" class="nav-link">Domov</a></li>
                    <li><a href="${pagesPath}produkty-sluzby.html" class="nav-link">Produkty a služby</a></li>
                    <li><a href="${pagesPath}o-nas.html" class="nav-link">O nás</a></li>
                    <li><a href="${pagesPath}referencie.html" class="nav-link">Referencie</a></li>
                    <li><a href="${pagesPath}kontakt.html" class="nav-link">Kontakt</a></li>
                </ul>
                <div class="nav-cta">
                    <a href="tel:+421908383815" class="nav-cta-btn">+421 908 383 815</a>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>

        <!-- Mobile Sidebar -->
        <div class="mobile-overlay"></div>
        <div class="mobile-sidebar">
            <div class="mobile-sidebar-header">
                <div class="mobile-logo">
                    <a href="${basePath}index.html" class="mobile-logo-link">KP WELD</a>
                </div>
                <button class="mobile-close-btn" aria-label="Zavrieť menu">✕</button>
            </div>
            <ul class="mobile-nav-menu">
                <li><a href="${basePath}index.html" class="mobile-nav-link">Domov</a></li>
                <li><a href="${pagesPath}produkty-sluzby.html" class="mobile-nav-link">Produkty a služby</a></li>
                <li><a href="${pagesPath}o-nas.html" class="mobile-nav-link">O nás</a></li>
                <li><a href="${pagesPath}referencie.html" class="mobile-nav-link">Referencie</a></li>
                <li><a href="${pagesPath}kontakt.html" class="mobile-nav-link">Kontakt</a></li>
            </ul>
            <div class="mobile-cta">
                <a href="tel:+421908383815" class="mobile-cta-btn">+421 908 383 815</a>
            </div>
        </div>
    `;
    
    const navigationContainer = document.getElementById('navigation-container');
    if (navigationContainer) {
        navigationContainer.innerHTML = navigationHTML;
        setActiveNavLink();
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPage === '/' || currentPage.includes('index.html')) {
            if (href.includes('index.html')) {
                link.classList.add('active');
            }
        } else if (currentPage.includes(href.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

function initMobileNavigation() {
    console.log('initMobileNavigation called - setting up event listeners');
    document.addEventListener('click', function(e) {
        // Toggle mobile sidebar
        if (e.target.closest('.hamburger')) {
            console.log('Hamburger clicked!');
            const hamburger = e.target.closest('.hamburger');
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const navbar = document.querySelector('.navbar-transparent');
            
            console.log('Elements found:', {
                hamburger: !!hamburger,
                mobileSidebar: !!mobileSidebar,
                mobileOverlay: !!mobileOverlay,
                navbar: !!navbar
            });
            
            if (hamburger) hamburger.classList.toggle('active');
            if (mobileSidebar) mobileSidebar.classList.toggle('active');
            if (mobileOverlay) mobileOverlay.classList.toggle('active');
            
            console.log('After toggle - Classes:', {
                hamburgerActive: hamburger?.classList.contains('active'),
                sidebarActive: mobileSidebar?.classList.contains('active'),
                overlayActive: mobileOverlay?.classList.contains('active')
            });
            
            if (hamburger && hamburger.classList.contains('active')) {
                navbar.classList.add('mobile-menu-open');
                document.body.style.overflow = 'hidden';
            } else {
                navbar.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        }
        
        // Close mobile sidebar when clicking overlay, mobile link, or close button
        if (e.target.classList.contains('mobile-overlay') || e.target.classList.contains('mobile-nav-link') || e.target.classList.contains('mobile-close-btn')) {
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar-transparent');
            
            mobileSidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            navbar.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
    });
    
    // Close sidebar on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar-transparent');
            
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                mobileSidebar.classList.remove('active');
                mobileOverlay.classList.remove('active');
                hamburger.classList.remove('active');
                navbar.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        }
    });
}

function initScrollEffects() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const transparentNavbar = document.querySelector('.navbar-transparent');
    
    // Set initial navbar state on page load
    updateNavbarBackground();
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update scroll progress
        if (scrollProgress) {
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            scrollProgress.style.height = `${scrollPercentage}%`;
        }
        
        // Update navbar background
        updateNavbarBackground();
    });
}

function updateNavbarBackground() {
    const scrollPosition = window.scrollY;
    const currentPage = window.location.pathname;
    const transparentNavbar = document.querySelector('.navbar-transparent');
    
    if (!transparentNavbar) return;
    
    let triggerPoint;
    const isHomePage = currentPage === '/' || currentPage.includes('index.html');
    
    if (isHomePage) {
        triggerPoint = window.innerHeight * 0.3;
    } else {
        triggerPoint = window.innerHeight * 0.1;
    }
    
    if (scrollPosition > triggerPoint) {
        transparentNavbar.classList.add('scrolled');
    } else {
        transparentNavbar.classList.remove('scrolled');
    }
}

function initNavigationListeners() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadNavigation = loadNavigation;
    window.initMobileNavigation = initMobileNavigation;
    window.initScrollEffects = initScrollEffects;
    window.initNavigationListeners = initNavigationListeners;
    window.updateNavbarBackground = updateNavbarBackground;
}