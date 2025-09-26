/**
 * MODERN CV PORTFOLIO - JavaScript
 * Author: Rubén D. Quispe
 * Features: Mobile navigation, form validation, scroll animations, accessibility
 */

// DOM Content Loaded - Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeFormValidation();
    initializeScrollAnimations();
    initializeAccessibility();

    console.log('🚀 Modern CV Portfolio initialized successfully');
});

// ============================================
// MOBILE NAVIGATION
// ============================================

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on nav links
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
}

function toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';

    navToggle.setAttribute('aria-expanded', !isOpen);
    navLinks.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
}

function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ============================================
// FORM VALIDATION
// ============================================

function initializeFormValidation() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    // Add event listeners for real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });

    // Handle form submission
    contactForm.addEventListener('submit', handleFormSubmission);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearError(field);

    // Required field validation
    if (!value) {
        errorMessage = `${getFieldLabel(fieldName)} es requerido`;
        isValid = false;
    } else {
        // Specific field validations
        switch (fieldName) {
            case 'email':
                if (!isValidEmail(value)) {
                    errorMessage = 'Por favor ingresa un email válido';
                    isValid = false;
                }
                break;
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                    isValid = false;
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    errorMessage = 'El asunto debe tener al menos 5 caracteres';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                    isValid = false;
                }
                break;
        }
    }

    if (!isValid) {
        showError(field, errorMessage);
    }

    return isValid;
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.add('error');
    errorElement.textContent = message;

    // Focus on field for accessibility
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id);
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    formGroup.classList.remove('error');
    errorElement.textContent = '';

    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
}

function handleFormSubmission(e) {
    e.preventDefault();

    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;

    // Validate all fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        submitForm(form);
    } else {
        // Focus on first error field
        const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
        if (firstError) {
            firstError.focus();
        }
    }
}

async function submitForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        showFormMessage('¡Gracias! Tu mensaje ha sido enviado correctamente.', 'success');
        form.reset();

    } catch (error) {
        // Show error message
        showFormMessage('Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function showFormMessage(message, type) {
    // Create or update message element
    let messageEl = document.querySelector('.form-message');

    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.className = 'form-message';
        document.querySelector('.contact-form').appendChild(messageEl);
    }

    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getFieldLabel(fieldName) {
    const labels = {
        name: 'Nombre',
        email: 'Email',
        subject: 'Asunto',
        message: 'Mensaje'
    };
    return labels[fieldName] || fieldName;
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.project-card, .experience-item, .skill-category, .contact-item, .hero-content'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Skill chip hover effects
    initializeSkillChips();
}

function initializeSkillChips() {
    const skillChips = document.querySelectorAll('.skill-chip');

    skillChips.forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            // Add subtle animation on hover
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

function initializeAccessibility() {
    // Focus management
    manageFocus();

    // Keyboard navigation
    enhanceKeyboardNavigation();

    // ARIA live regions for dynamic content
    createLiveRegions();

    // High contrast mode detection
    detectHighContrastMode();
}

function manageFocus() {
    // Add focus-visible polyfill behavior
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
}

function enhanceKeyboardNavigation() {
    // Enhanced card navigation
    const cards = document.querySelectorAll('.project-card, .experience-item');

    cards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Skip to main content link
    addSkipLink();
}

function addSkipLink() {
    if (document.querySelector('.skip-link')) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link sr-only';
    skipLink.style.cssText = `
        position: fixed;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        z-index: 10000;
        border-radius: 4px;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
        this.classList.remove('sr-only');
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
        this.classList.add('sr-only');
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
}

function createLiveRegions() {
    // Create ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
}

function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

function detectHighContrastMode() {
    // Detect Windows High Contrast Mode
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.classList.add('high-contrast');
    }

    // Listen for changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-contrast: high)');
        mediaQuery.addListener(function(mq) {
            if (mq.matches) {
                document.documentElement.classList.add('high-contrast');
            } else {
                document.documentElement.classList.remove('high-contrast');
            }
        });
    }
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy loading images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Debounce utility
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle utility
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ============================================
// LEGACY COMPATIBILITY
// ============================================

// Keep some legacy functionality for smooth transition
const terminal = document.getElementById('terminal');
const aiAssistant = document.getElementById('aiAssistant');

// Legacy terminal toggle
function toggleTerminal() {
    if (terminal) {
        terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
    }
}

// Legacy AI assistant commands
function aiAssistantCommand(command) {
    const responses = {
        skills: 'Mis principales habilidades incluyen Python, SQL, análisis de datos y machine learning.',
        projects: 'He trabajado en proyectos de análisis de datos, desarrollo web y realidad aumentada.',
        contact: 'Puedes contactarme en ruben.quispev@gmail.com o a través de LinkedIn.'
    };

    if (aiAssistant && responses[command]) {
        const content = aiAssistant.querySelector('#aiAssistantContent p');
        if (content) {
            content.textContent = responses[command];
        }
    }
}

// Make functions globally available for legacy HTML
window.toggleTerminal = toggleTerminal;
window.aiAssistantCommand = aiAssistantCommand;

// ============================================
// ERROR HANDLING
// ============================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // Could send to analytics service here
});

// Promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to analytics service here
});

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        isValidEmail,
        toggleMobileMenu,
        closeMobileMenu
    };
}