// Fallback script - loads components when ES6 modules fail
console.log('Fallback script file loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting fallback initialization');
    
    // Check if ES6 modules already loaded and initialized
    setTimeout(() => {
        if (document.querySelector('.navbar-transparent')) {
            console.log('ES6 modules already initialized navigation, skipping fallback');
            return;
        }
        
        // Immediate load - no timeout needed for fallback
        const navContainer = document.getElementById('navigation-container');
        const footerContainer = document.getElementById('footer-container');
        const faqContainer = document.getElementById('faq-container');
    
    console.log('Found containers:', {
        nav: navContainer ? 'exists' : 'missing',
        footer: footerContainer ? 'exists' : 'missing', 
        faq: faqContainer ? 'exists' : 'missing'
    });
    
    // Force load all components immediately
    if (navContainer) {
        console.log('Loading header component...');
        try {
            loadHeaderComponent();
            console.log('Header component loaded successfully');
        } catch (error) {
            console.error('Failed to load header:', error);
        }
    } else {
        console.error('Navigation container not found!');
    }
    
    if (footerContainer) {
        console.log('Loading footer component...');
        try {
            loadFooterComponent();
            console.log('Footer component loaded successfully');
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
    } else {
        console.error('Footer container not found!');
    }
    
    if (faqContainer) {
        console.log('Loading FAQ component...');
        try {
            loadFAQComponent();
            console.log('FAQ component loaded successfully');
        } catch (error) {
            console.error('Failed to load FAQ:', error);
        }
    }
    
        // Initialize sliders on home page
        const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
        if (isHomePage) {
            console.log('Initializing sliders for home page...');
            try {
                initSliders();
                console.log('Sliders initialized successfully');
            } catch (error) {
                console.error('Failed to initialize sliders:', error);
            }
        }
        
        // Initialize portfolio on references page
        const isReferencesPage = window.location.pathname.includes('referencie');
        if (isReferencesPage) {
            console.log('Initializing portfolio for references page...');
            try {
                loadPortfolioComponent();
                console.log('Portfolio initialized successfully');
            } catch (error) {
                console.error('Failed to initialize portfolio:', error);
            }
        }
    }, 100);
});

// Load header component (loads from header.js functionality)
function loadHeaderComponent() {
    console.log('loadHeaderComponent called');
    try {
        // Check if functions exist globally first (from ES6 modules)
        if (typeof window.loadNavigation === 'function') {
            console.log('Using ES6 module functions');
            window.loadNavigation();
            window.initMobileNavigation();
            window.initScrollEffects();
            window.initNavigationListeners();
        } else {
            console.log('Using fallback embedded functions');
            // Fallback - load our embedded versions
            loadNavigation();
            initMobileNavigation();
            initScrollEffects();
            initNavigationListeners();
        }
    } catch (error) {
        console.error('Failed to load header component:', error);
    }
}

// Load footer component (loads from footer.js functionality)  
function loadFooterComponent() {
    try {
        // Check if functions exist globally first (from ES6 modules)
        if (typeof window.loadFooter === 'function') {
            window.loadFooter();
            window.initPrivacyModal();
        } else {
            // Fallback - load our embedded versions
            loadFooter();
            initPrivacyModal();
        }
    } catch (error) {
        console.warn('Failed to load footer component:', error);
    }
}

// Load FAQ component (loads from FAQ.js functionality)
function loadFAQComponent() {
    try {
        // Check if functions exist globally first (from ES6 modules)
        if (typeof window.loadFAQ === 'function') {
            window.loadFAQ();
            window.observeFAQItems();
        } else {
            // Fallback - load our embedded versions
            loadFAQ();
            observeFAQItems();
        }
    } catch (error) {
        console.warn('Failed to load FAQ component:', error);
    }
}

// Load portfolio component (loads from portfolio.js functionality)
function loadPortfolioComponent() {
    try {
        // Check if functions exist globally first (from ES6 modules)
        if (typeof window.loadPortfolioFilter === 'function') {
            window.loadPortfolioFilter();
            window.initPortfolioFunctionality();
        } else {
            // Fallback - load our embedded versions
            loadPortfolioFilter();
            initPortfolioFunctionality();
        }
    } catch (error) {
        console.warn('Failed to load portfolio component:', error);
    }
}

// Initialize sliders (loads from slider.js functionality)
function initSliders() {
    if (typeof window.initHeroImageSlider === 'function') {
        window.initHeroImageSlider();
        // window.initHeroTextSlider(); // Disabled - using static subtitle now
    } else {
        initHeroImageSlider();
        // initHeroTextSlider(); // Disabled - using static subtitle now
    }
}

// =============================================================================
// HEADER COMPONENT FUNCTIONALITY (from header.js)
// =============================================================================

function loadNavigation() {
    console.log('loadNavigation function called');
    
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    console.log('Navigation path debug (fallback):', {
        currentPath,
        isInServicePage,
        isInPagesDir
    });
    
    // Set navigation paths based on current location
    let basePath, pagesPath;
    
    if (isInServicePage) {
        // We're in /pages/service-page/
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../../'; // To reach root for clean URLs
    } else if (isInPagesDir) {
        // We're in /pages/
        basePath = '../';     // To reach root for index.html
        pagesPath = '../';    // To reach root for clean URLs
    } else {
        // We're in root directory
        basePath = '';        // index.html is in same directory
        pagesPath = '';       // Clean URLs at root level
    }
    
    console.log('Resolved paths (fallback):', {
        basePath,
        pagesPath,
        homeLink: `${basePath}index.html`,
        produktyLink: `${pagesPath}produkty-sluzby`
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
                    <li><a href="${pagesPath}produkty-sluzby" class="nav-link">Produkty a služby</a></li>
                    <li><a href="${pagesPath}o-nas" class="nav-link">O nás</a></li>
                    <li><a href="${pagesPath}referencie" class="nav-link">Referencie</a></li>
                    <li><a href="${pagesPath}kontakt" class="nav-link">Kontakt</a></li>
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
                <li><a href="${pagesPath}produkty-sluzby" class="mobile-nav-link">Produkty a služby</a></li>
                <li><a href="${pagesPath}o-nas" class="mobile-nav-link">O nás</a></li>
                <li><a href="${pagesPath}referencie" class="mobile-nav-link">Referencie</a></li>
                <li><a href="${pagesPath}kontakt" class="mobile-nav-link">Kontakt</a></li>
            </ul>
            <div class="mobile-cta">
                <a href="tel:+421908383815" class="mobile-cta-btn">+421 908 383 815</a>
            </div>
        </div>
    `;
    
    const navigationContainer = document.getElementById('navigation-container');
    console.log('Navigation container found:', navigationContainer);
    if (navigationContainer) {
        console.log('Inserting navigation HTML');
        navigationContainer.innerHTML = navigationHTML;
        console.log('Navigation HTML inserted, calling setActiveNavLink');
        setActiveNavLink();
    } else {
        console.error('Navigation container not found!');
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
            
            if (hamburger.classList.contains('active')) {
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

// =============================================================================
// FOOTER COMPONENT FUNCTIONALITY (from footer.js)
// =============================================================================

function ensureFooterCSSLoaded() {
    // Check if footer CSS is already loaded
    const existingLink = document.querySelector('link[href*="footer.css"]');
    if (existingLink) return;
    
    // Determine CSS path based on current location
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    let cssPath;
    if (isInServicePage) {
        cssPath = '../../css/components/footer.css';
    } else if (isInPagesDir) {
        cssPath = '../css/components/footer.css';
    } else {
        cssPath = 'css/components/footer.css';
    }
    
    // Create and inject CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}

function loadFooter() {
    console.log('loadFooter function called');
    
    // Ensure footer CSS is loaded
    ensureFooterCSSLoaded();
    
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    // Set navigation paths based on current location
    let basePath, pagesPath;
    
    if (isInServicePage) {
        // We're in /pages/service-page/
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../../'; // To reach root for clean URLs
    } else if (isInPagesDir) {
        // We're in /pages/
        basePath = '../';     // To reach root for index.html
        pagesPath = '../';    // To reach root for clean URLs
    } else {
        // We're in root directory
        basePath = '';        // index.html is in same directory
        pagesPath = '';       // Clean URLs at root level
    }
    
    const footerHTML = `
        <footer id="footer" class="footer">
            <!-- CTA Section -->
            <div class="footer-cta-section">
                <div class="footer-cta-content">
                    <h2>Potrebujete oceľové konštrukcie na mieru?</h2>
                    <div class="footer-phone-cta">
                        <a href="tel:+421908383815" class="phone-cta-btn">+421 908 383 815</a>
                    </div>
                    <div class="footer-cta-text">
                        <p>Plánujete výstavbu oceľových konštrukcií, brán, oplotení, schodov alebo zábradlí? Či už máte pripravené presné plány alebo potrebujete pomoc s návrhom a projektovaním, náš skúsený tím zabezpečí kvalitné riešenie na mieru. Od návrhu až po montáž - všetko pod jednou strechou.</p>
                    </div>
                    <div class="footer-cta-link">
                        <a href="${pagesPath}kontakt">Získajte bezplatnú ponuku</a>
                    </div>
                </div>
            </div>
            
            <div class="footer-divider"></div>
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="footer-main">
                    <div class="footer-logo">
                        <span class="logo-triangle">▲</span>
                    </div>
                    <div class="footer-nav-col">
                        <a href="${basePath}index.html">Domov</a>
                        <a href="${pagesPath}o-nas">O nás</a>
                        <a href="${pagesPath}produkty-sluzby">Služby</a>
                    </div>
                    <div class="footer-nav-col">
                        <a href="${pagesPath}kontakt">Kontakt</a>
                        <a href="${pagesPath}referencie">Portfólio</a>
                    </div>
                    <div class="footer-contact">
                        <p>Bratislavská 2558,<br>Šamorín,<br>93101</p>
                        <p><a href="tel:+421908383815">+421 908 383 815</a><br>
                        <a href="mailto:kpweldsro@gmail.com">kpweldsro@gmail.com</a></p>
                    </div>
                    <div class="footer-social">
                        <a href="https://www.facebook.com/kpweldsro" target="_blank">f</a>
                    </div>
                </div>
                
                <div class="footer-copyright">
                    <p>&copy; KP-WELD 2025 &nbsp;&nbsp; <a href="#" onclick="openPrivacyPopup(); return false;">Ochrana osobných údajov</a> / <a href="https://aebdigital.com" target="_blank">Tvorba stránky - AEB Digital</a></p>
                </div>
            </div>
        </footer>
        
        <!-- Privacy Policy Popup -->
        <div id="privacy-popup" class="privacy-popup">
            <div class="privacy-popup-content">
                <div class="privacy-popup-header">
                    <h2>Ochrana osobných údajov</h2>
                    <button class="privacy-popup-close" onclick="closePrivacyPopup()">&times;</button>
                </div>
                <div class="privacy-popup-body">
                    <div class="company-info">
                        <strong>KP WELD, s.r.o.</strong><br>
                        <a href="https://maps.google.com/?q=Bratislavsk%C3%A1+2558,+931+01+%C5%A0amor%C3%ADn" target="_blank" rel="noopener" style="text-decoration: underline; color: #F5821E;">Bratislavská 2558, 931 01 Šamorín</a><br>
                        Slovenská republika<br>
                        IČO: 53126432<br>
                        DIČ: 2121273077<br>
                        IČ DPH: SK2121273077, podľa §4, registrácia od 22.7.2020<br>
                        E-mail: kpweldsro@gmail.com<br>
                        Tel.: +421 908 383 815
                    </div>
                    
                    <p>Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.</p>
                    
                    <h3>I. Kontaktný formulár</h3>
                    <p>Na stránke www.kpweld.sk prevádzkujeme kontaktný formulár ktorého účelom je umožniť vám:</p>
                    <p>Položiť otázku k našim produktom a službám<br>
                    Požiadať o cenovú ponuku</p>
                    
                    <p><strong>Rozsah spracúvaných údajov:</strong></p>
                    <p>Meno a priezvisko<br>
                    E-mailová adresa<br>
                    Telefónne číslo<br>
                    Správu</p>
                    
                    <p><strong>Účel spracovania:</strong><br>
                    Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.</p>
                    
                    <p><strong>Právny základ:</strong><br>
                    Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>
                    
                    <p><strong>Doba uchovávania:</strong><br>
                    Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.</p>
                    
                    <h3>II. Súbory cookies</h3>
                    <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
                    <p>Nevyhnutné cookies – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).<br>
                    Štatistické (analytické) cookies – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</p>
                    
                    <p><strong>Správa súhlasov:</strong><br>
                    Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.</p>
                    
                    <h3>III. Práva dotknutej osoby</h3>
                    <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
                    <p>Prístup k osobným údajom, ktoré spracúvame<br>
                    Oprava nepresných alebo neúplných údajov<br>
                    Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ<br>
                    Obmedzenie spracovania<br>
                    Prenosnosť údajov<br>
                    Odvolanie súhlasu – stane sa účinným dňom odvolania<br>
                    Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)</p>
                    
                    <p>V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na kpweldsro@gmail.com alebo telefónnom čísle +421 908 383 815.</p>
                    
                    <p><strong>Tieto Zásady nadobúdajú účinnosť dňom 25. 7. 2025.</strong></p>
                </div>
            </div>
        </div>
    `;
    
    const footerContainer = document.getElementById('footer-container');
    console.log('Footer container found:', footerContainer);
    if (footerContainer) {
        console.log('Inserting footer HTML');
        footerContainer.innerHTML = footerHTML;
        console.log('Footer HTML inserted');
    } else {
        console.error('Footer container not found!');
    }
}

function initPrivacyModal() {
    // Make privacy functions globally available
    window.openPrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closePrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('privacy-popup');
        if (popup && e.target === popup) {
            window.closePrivacyPopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closePrivacyPopup();
        }
    });
}

// =============================================================================
// FAQ COMPONENT FUNCTIONALITY (from FAQ.js)
// =============================================================================

const faqData = [
    {
        question: "Aké typy oceľových konštrukcií vyrábate?",
        answer: "Vyrábame širokú škálu oceľových konštrukcií vrátane priemyselných hál, garáží, lávok, prístreškov, schody, zábradlia, brány a oplotenia.",
        type: "white"
    },
    {
        question: "Poskytujete aj montáž konštrukcií?",
        answer: "Áno, poskytujeme kompletné služby - od výroby až po montáž všetkých typov oceľových konštrukcií. Máme vlastný montážny tím s dlhoročnými skúsenosťami.",
        type: "white"
    },
    {
        question: "Koľko trvá výroba a montáž?",
        answer: "Doba závisí od veľkosti projektu. Menšie práce (brány, zábradlia) 3-7 dní, väčšie konštrukcie 1-3 týždne. Po obhliadke vám dáme presný termín.",
        type: "white"
    },
    {
        question: "Aké záruky poskytujete?",
        answer: "Na všetky naše výrobky poskytujeme minimálne 2-ročnú záruku na výrobu a montáž. Používame kvalitné materiály a moderne technológie.",
        type: "white"
    },
    {
        question: "Vyrábate podľa individuálnych požiadaviek?",
        answer: "Áno, všetky naše výrobky vyrábame na mieru podľa Vašich potrieb a rozmerov. Môžeme pracovať aj podľa Vašich návrhov.",
        type: "black"
    },
    {
        question: "Poskytujete bezplatné cenové ponuky?",
        answer: "Áno, bezplatné konzultácie a cenové ponuky sú samozrejmosťou. Kontaktujte nás mailom alebo telefónne +421 908 383 815.",
        type: "black"
    }
];

function loadFAQ() {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer) return;

    const faqHTML = `
        <section id="faq" class="faq">
            <div class="container">
                <h2 class="faq-title">Často kladené otázky</h2>
                <div class="faq-container">
                    ${faqData.map(item => `
                        <div class="faq-item ${item.type === 'black' ? 'faq-new' : ''}">
                            <div class="faq-question">
                                <h3>${item.question}</h3>
                            </div>
                            <div class="faq-answer">
                                <p>${item.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
    
    faqContainer.innerHTML = faqHTML;
}

// FAQ toggle functionality removed - questions are now always open

function observeFAQItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// =============================================================================
// SLIDER FUNCTIONALITY (from slider.js)
// =============================================================================

function initHeroImageSlider() {
    const heroImages = document.querySelectorAll('.hero-bg-image');
    let currentImageIndex = 0;
    
    if (heroImages.length === 0) return;
    
    function cycleHeroImages() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }
    
    // Cycle images every 4 seconds to sync with text
    setInterval(cycleHeroImages, 4000);
}

function initHeroTextSlider() {
    const slides = document.querySelectorAll('.hero-subtitle-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active', 'slide-out');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add slide-out class to current slide
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('slide-out');
        }
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and dot after delay
        setTimeout(() => {
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        }, 200);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                showSlide(index);
            }
        });
    });
    
    // Auto-advance slides every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Initialize first slide as active
    setTimeout(() => {
        if (slides[0]) {
            slides[0].classList.add('active');
        }
        if (dots[0]) {
            dots[0].classList.add('active');
        }
    }, 500);
}

// =============================================================================
// PORTFOLIO COMPONENT FUNCTIONALITY (from portfolio.js)
// =============================================================================

function loadPortfolioFilter() {
    // Portfolio filter is already in the HTML, no need to inject
}

function initPortfolioFunctionality() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) {
        return; // Elements not found, probably not on portfolio page
    }
    
    // Show only Brány initially
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (category === 'brany') {
            item.classList.remove('hidden');
            item.style.display = 'block';
        } else {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
            
            // Update visible images for lightbox
            updateVisibleImages();
        });
    });
    
    // Initialize lightbox functionality
    initLightbox();
}

function initLightbox() {
    window.currentImageIndex = 0;
    window.visibleImages = [];
    
    updateVisibleImages();
    
    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            previousImage();
        }
    });
    
    // Close lightbox when clicking outside the image
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
}

function updateVisibleImages() {
    if (typeof window !== 'undefined') {
        window.visibleImages = Array.from(document.querySelectorAll('.portfolio-item')).filter(item => 
            !item.classList.contains('hidden')
        ).map(item => item.querySelector('img'));
    }
}

// Lightbox functions - make them globally available
function openLightbox(img) {
    updateVisibleImages();
    if (typeof window !== 'undefined') {
        window.currentImageIndex = window.visibleImages.indexOf(img);
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        
        if (lightbox && lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function nextImage() {
    if (typeof window !== 'undefined' && window.visibleImages && window.visibleImages.length > 0) {
        window.currentImageIndex = (window.currentImageIndex + 1) % window.visibleImages.length;
        const lightboxImage = document.getElementById('lightbox-image');
        if (lightboxImage && window.visibleImages[window.currentImageIndex]) {
            lightboxImage.src = window.visibleImages[window.currentImageIndex].src;
            lightboxImage.alt = window.visibleImages[window.currentImageIndex].alt;
        }
    }
}

function previousImage() {
    if (typeof window !== 'undefined' && window.visibleImages && window.visibleImages.length > 0) {
        window.currentImageIndex = (window.currentImageIndex - 1 + window.visibleImages.length) % window.visibleImages.length;
        const lightboxImage = document.getElementById('lightbox-image');
        if (lightboxImage && window.visibleImages[window.currentImageIndex]) {
            lightboxImage.src = window.visibleImages[window.currentImageIndex].src;
            lightboxImage.alt = window.visibleImages[window.currentImageIndex].alt;
        }
    }
}

// Make functions globally available for fallback and onclick handlers
if (typeof window !== 'undefined') {
    window.loadPortfolioFilter = loadPortfolioFilter;
    window.initPortfolioFunctionality = initPortfolioFunctionality;
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.nextImage = nextImage;
    window.previousImage = previousImage;
    window.updateVisibleImages = updateVisibleImages;
}