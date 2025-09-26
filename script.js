// =====================================================
// MODERN CV PORTFOLIO - JAVASCRIPT FUNCTIONALITY
// Author: Rubén D. Quispe
// Description: Interactive functionality for modern CV
// =====================================================

// DOM Ready State
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeFormValidation();
    initializeSkillBars();
    initializeSmoothScroll();
    initializeAccessibility();
    initializeAudienceToggle();
}

// =====================================================
// NAVIGATION FUNCTIONALITY
// =====================================================

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            // Align with CSS which uses .active (also keep legacy class for safety)
            navMenu.classList.toggle('active');
            navMenu.classList.toggle('nav-links--open');

            // Prevent body scroll when menu is open
            document.body.classList.toggle('nav-open', !isExpanded);
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active') || navMenu.classList.contains('nav-links--open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                navMenu.classList.remove('nav-links--open');
                document.body.classList.remove('nav-open');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && (navMenu.classList.contains('active') || navMenu.classList.contains('nav-links--open'))) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            navMenu.classList.remove('nav-links--open');
            document.body.classList.remove('nav-open');
        }
    });

    // Active navigation highlighting
    initializeActiveNavigation();
}

function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                // Update active navigation link
                navLinks.forEach(link => {
                    link.classList.remove('nav-link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav-link--active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// =====================================================
// AUDIENCE TOGGLE (Clientes / Reclutadores)
// =====================================================

function initializeAudienceToggle() {
    const buttons = document.querySelectorAll('.audience-toggle .toggle-option');
    if (!buttons.length) return;

    // load preference
    const saved = localStorage.getItem('preferredAudience');
    const defaultAudience = saved === 'reclutadores' ? 'reclutadores' : 'clientes';
    setAudience(defaultAudience);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const audience = btn.getAttribute('data-audience');
            setAudience(audience);
        });
    });

    function setAudience(audience) {
        document.body.setAttribute('data-audience', audience);
        localStorage.setItem('preferredAudience', audience);

        // update button states
        buttons.forEach(b => {
            const isActive = b.getAttribute('data-audience') === audience;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================

function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Special handling for skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }

                // Special handling for stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .section-header,
        .about-content,
        .timeline-item,
        .project-card,
        .skill-category,
        .contact-content,
        .hero-stats
    `);

    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

function animateStats(statsContainer) {
    const statNumbers = statsContainer.querySelectorAll('.stat-number');

    statNumbers.forEach(statElement => {
        const finalValue = statElement.textContent.replace(/[^0-9]/g, '');
        const suffix = statElement.textContent.replace(/[0-9]/g, '');
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 50);

        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            statElement.textContent = currentValue + suffix;
        }, 30);
    });
}

// =====================================================
// SKILL BARS ANIMATION
// =====================================================

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');

    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-skill') || bar.style.width;

        setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = targetWidth + '%';
        }, index * 100);
    });
}

// =====================================================
// FORM VALIDATION
// =====================================================

function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input, .form-textarea');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(form);
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);

    let errorMessage = '';

    // Required field validation
    if (!value) {
        errorMessage = 'Este campo es obligatorio.';
    }
    // Email validation
    else if (fieldName === 'email' && !isValidEmail(value)) {
        errorMessage = 'Por favor, ingresa un email válido.';
    }
    // Name validation
    else if (fieldName === 'name' && value.length < 2) {
        errorMessage = 'El nombre debe tener al menos 2 caracteres.';
    }
    // Subject validation
    else if (fieldName === 'subject' && value.length < 5) {
        errorMessage = 'El asunto debe tener al menos 5 caracteres.';
    }
    // Message validation
    else if (fieldName === 'message' && value.length < 10) {
        errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
    }

    // Show/hide error
    if (errorMessage) {
        showFieldError(field, errorElement, errorMessage);
        return false;
    } else {
        hideFieldError(field, errorElement);
        return true;
    }
}

function showFieldError(field, errorElement, message) {
    field.classList.add('form-input--error');
    field.setAttribute('aria-invalid', 'true');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('form-error--visible');
    }
}

function hideFieldError(field, errorElement) {
    field.classList.remove('form-input--error');
    field.setAttribute('aria-invalid', 'false');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('form-error--visible');
    }
}

function clearFieldError(field) {
    if (field.value.trim()) {
        const errorElement = document.getElementById(`${field.name}-error`);
        hideFieldError(field, errorElement);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleFormSubmission(form) {
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    const statusElement = document.getElementById('form-status');
    let isValid = true;

    // Validate all fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (isValid) {
        // Show success message
        showFormStatus(statusElement, 'success', 'Mensaje enviado correctamente. Te contactaré pronto.');
        form.reset();

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            hideFormStatus(statusElement);
        }, 5000);
    } else {
        // Show error message
        showFormStatus(statusElement, 'error', 'Por favor, corrige los errores en el formulario.');
        setTimeout(() => {
            hideFormStatus(statusElement);
        }, 5000);
    }
}

function showFormStatus(element, type, message) {
    if (!element) return;

    element.textContent = message;
    element.className = `form-status form-status--${type} form-status--visible`;
}

function hideFormStatus(element) {
    if (!element) return;
    element.classList.remove('form-status--visible');
}

// =====================================================
// SMOOTH SCROLLING
// =====================================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================================

function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Keyboard navigation for custom elements
    initializeKeyboardNavigation();

    // Focus management for mobile menu
    initializeFocusManagement();
}

function initializeKeyboardNavigation() {
    // Handle keyboard navigation for interactive elements
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (navMenu && (navMenu.classList.contains('active') || navMenu.classList.contains('nav-links--open'))) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                navMenu.classList.remove('nav-links--open');
                document.body.classList.remove('nav-open');
                navToggle.focus();
            }
        }
    });
}

function initializeFocusManagement() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // When opening menu, focus first menu item
                setTimeout(() => {
                    const firstMenuItem = navMenu.querySelector('.nav-link');
                    if (firstMenuItem) firstMenuItem.focus();
                }, 100);
            }
        });
    }
}

// =====================================================
// PERFORMANCE OPTIMIZATIONS
// =====================================================

// Throttle function for performance optimization
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =====================================================
// ERROR HANDLING AND FALLBACKS
// =====================================================

// Global error handler for graceful degradation
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    // Implement fallback functionality if needed
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Note: Implement service worker if needed for offline functionality
        console.log('Service Worker support detected');
    });
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get element's offset from top of page
function getOffsetTop(element) {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

// =====================================================
// LEGACY COMPATIBILITY (if needed)
// =====================================================

// Polyfill for IntersectionObserver (for older browsers)
if (!window.IntersectionObserver) {
    // Implement fallback scroll-based animations
    window.addEventListener('scroll', throttle(function() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll:not(.animate-in)');
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate-in');

                if (element.classList.contains('skill-category')) {
                    animateSkillBars(element);
                }
                if (element.classList.contains('hero-stats')) {
                    animateStats(element);
                }
            }
        });
    }, 100));
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        isValidEmail,
        throttle,
        debounce
    };
}
