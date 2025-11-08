// Forms Component - Contact forms and validation

export function initForms() {
    initContactForm();
    initNewsletterForm();
    initFormValidation();
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const privacyCheckbox = document.getElementById('privacy-checkbox');
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const messageDiv = document.getElementById('form-message');
            
            // Check privacy checkbox
            if (privacyCheckbox && !privacyCheckbox.checked) {
                showFormMessage('Musíte súhlasiť s podmienkami ochrany osobných údajov pred odoslaním formulára.', 'error');
                return false;
            }
            
            // Validate form
            if (!validateContactForm()) {
                return false;
            }
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            try {
                const response = await fetch('/.netlify/functions/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    showFormMessage(result.message, 'success');
                    contactForm.reset();
                } else {
                    showFormMessage(result.error || 'Nastala chyba pri odosielaní formulára.', 'error');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showFormMessage('Nastala chyba pri odosielaní formulára. Skúste to znovu alebo nás kontaktujte priamo na telefóne +421 908 383 815.', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });
    }
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                showFormMessage('Ďakujeme za prihlásenie k odberu!', 'success');
                this.reset();
            } else {
                showFormMessage('Prosím, zadajte platný email.', 'error');
            }
        });
    }
}

function initFormValidation() {
    // Real-time validation for form inputs
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateContactForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type || field.tagName.toLowerCase();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Toto pole je povinné.';
    }
    
    // Email validation
    if (fieldType === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Prosím, zadajte platný email.';
    }
    
    // Phone validation
    if (field.name === 'phone' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Prosím, zadajte platné telefónne číslo.';
    }
    
    // Name validation
    if (field.name === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Meno musí mať aspoň 2 znaky.';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFormMessage(message, type = 'info') {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide after 8 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 8000);
        }
    } else {
        // Fallback: create new message div
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        const newMessageDiv = document.createElement('div');
        newMessageDiv.className = `form-message form-message-${type}`;
        newMessageDiv.textContent = message;
        
        const form = document.querySelector('#contact-form');
        if (form) {
            form.appendChild(newMessageDiv);
            
            setTimeout(() => {
                newMessageDiv.remove();
            }, 8000);
        }
    }
}

// Export validation functions for external use
export { validateEmail, validatePhone, validateField };