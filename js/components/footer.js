// Footer Component - Footer content and privacy functionality

export function initFooter() {
    loadFooter();
    initPrivacyModal();
}

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
    // Ensure footer CSS is loaded
    ensureFooterCSSLoaded();
    
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    // Set navigation paths based on current location
    let basePath, pagesPath;
    
    if (isInServicePage) {
        // We're in /pages/service-page/ - need different paths for different targets
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../../'; // To reach root for clean URLs
    } else if (isInPagesDir) {
        // We're in /pages/ - stay in pages directory for other pages
        basePath = '../';     // To reach root for index.html
        pagesPath = '../';    // To reach root for clean URLs
    } else {
        // We're in root directory
        basePath = '';
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
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
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

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadFooter = loadFooter;
    window.initPrivacyModal = initPrivacyModal;
    window.ensureFooterCSSLoaded = ensureFooterCSSLoaded;
}