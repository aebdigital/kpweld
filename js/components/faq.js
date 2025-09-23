// FAQ Component - Frequently Asked Questions functionality

// FAQ Data
const faqData = [
    {
        question: "Aké typy oceľových konštrukcií vyrábate?",
        answer: "Vyrábame širokú škálu oceľových konštrukcií vrátane priemyselných hál, garáží, lávok, prístreškoy, schody, zábradlia, brány a oplotenia.",
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

export function initFAQ() {
    loadFAQ();
    observeFAQItems();
}

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

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadFAQ = loadFAQ;
    window.observeFAQItems = observeFAQItems;
}