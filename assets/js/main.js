/* ========================================
   D4SD MOROCCO HUB - REFINED JAVASCRIPT
   Smooth animations and interactions
======================================== */

'use strict';

// ========================================
// GLOBAL VARIABLES
// ========================================

const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const sections = document.querySelectorAll('section[id]');

// ========================================
// HEADER SCROLL BEHAVIOR
// ========================================

let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    
    // Add 'scrolled' class when page is scrolled
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = mobileToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                // Transform to X
                if (index === 0) bar.style.transform = 'rotate(45deg) translateY(8px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                // Reset to hamburger
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const bars = mobileToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS WITH OFFSET
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

function highlightActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - header.offsetHeight - 150;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) correspondingLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveNav);

// ========================================
// SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger child animations
            const children = entry.target.querySelectorAll('.challenge-card-compact, .pillar-card-compact, .flagship-card, .partner-card-inline, .approach-card');
            
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(30px)';
                    child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 80);
            });
            
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all major sections
const sectionsToAnimate = document.querySelectorAll('.about, .pillars, .approaches, .flagship, .partnerships, .contact');
sectionsToAnimate.forEach(section => scrollObserver.observe(section));

// ========================================
// HERO PARALLAX EFFECT (SUBTLE)
// ========================================

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (hero && heroContent && scrolled < window.innerHeight) {
        // Subtle parallax effect
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = Math.max(1 - (scrolled / window.innerHeight) * 1.3, 0);
    }
});

// ========================================
// SCROLL INDICATOR (HERO)
// ========================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '0.8';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

// ========================================
// PILLAR CARDS - INTERACTIVE FEEDBACK
// ========================================

const pillarCards = document.querySelectorAll('.pillar-card-compact');

pillarCards.forEach(card => {
    card.addEventListener('click', function() {
        const pillarNumber = this.getAttribute('data-pillar');
        const pillarTitle = this.querySelector('h3').textContent;
        
        console.log(`Pillar ${pillarNumber} clicked: ${pillarTitle}`);
        
        // Add visual feedback
        this.style.transform = 'scale(0.98) translateY(-8px)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ========================================
// FLAGSHIP CARDS - FLIP ANIMATION
// ========================================

const flagshipCards = document.querySelectorAll('.flagship-card');

flagshipCards.forEach(card => {
    // Touch/mobile support for flip
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const data = {
            country: formData.get('country'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        console.log('Form submitted:', data);
        
        // Show success message
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            submitBtn.style.background = 'var(--emerald-green)';
            submitBtn.style.opacity = '1';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2500);
        }, 1200);
    });
    
    // Form input animations
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// CARD HOVER SUBTLE 3D EFFECT (DESKTOP ONLY)
// ========================================

if (window.innerWidth > 768) {
    const interactiveCards = document.querySelectorAll('.challenge-card-compact, .pillar-card-compact, .partner-card-inline');

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========================================
// ANIMATE NUMBERS (COUNTER EFFECT)
// ========================================

function animateNumber(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuad = progress * (2 - progress); // Easing function
        const currentValue = Math.floor(easeOutQuad * (end - start) + start);
        
        // Format large numbers with commas
        if (end >= 1000) {
            element.textContent = currentValue.toLocaleString();
        } else {
            element.textContent = currentValue;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = end >= 1000 ? end.toLocaleString() : end;
        }
    }
    
    requestAnimationFrame(animation);
}

// Observe stats or number elements
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const endValue = parseInt(element.getAttribute('data-count') || 100);
            
            animateNumber(element, 0, endValue, 2000);
            numberObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

// Observe number elements with data-count attribute
document.querySelectorAll('[data-count]').forEach(el => {
    numberObserver.observe(el);
});

// ========================================
// PARTNERSHIP LOGOS - SUBTLE FLOAT ANIMATION
// ========================================

const logoItems = document.querySelectorAll('.partner-logo-img');

logoItems.forEach((logo, index) => {
    logo.style.animation = `float 3s ease-in-out infinite`;
    logo.style.animationDelay = `${index * 0.3}s`;
});

// Add float keyframe animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
    }
`;
document.head.appendChild(style);

// ========================================
// SOCIAL LINKS - ANIMATED ICONS
// ========================================

const socialLinks = document.querySelectorAll('.footer-social a');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    link.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    // Fade in body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
    
    // Animate hero content
    if (heroContent) {
        const heroElements = heroContent.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-buttons');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 120));
        });
    }
    
    console.log('🌍 D4SD Morocco Hub - Website loaded successfully');
});

// ========================================
// KEYBOARD NAVIGATION SUPPORT
// ========================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const bars = mobileToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
    
    // Back to top with Home key
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ========================================
// ACCESSIBILITY - FOCUS MANAGEMENT
// ========================================

const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');

focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '3px solid var(--moroccan-blue)';
        this.style.outlineOffset = '3px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ========================================
// PERFORMANCE - DEBOUNCE SCROLL EVENTS
// ========================================

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

// Debounced scroll handlers for better performance
const debouncedHighlight = debounce(highlightActiveNav, 100);
window.addEventListener('scroll', debouncedHighlight);

// ========================================
// LAZY LOADING IMAGES
// ========================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

images.forEach(img => imageObserver.observe(img));

// ========================================
// PREVENT CARD HOVER ON TOUCH DEVICES
// ========================================

if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Disable hover 3D effects on touch devices
    const interactiveCards = document.querySelectorAll('.challenge-card-compact, .pillar-card-compact, .partner-card-inline');
    interactiveCards.forEach(card => {
        card.style.transform = 'none !important';
    });
}

// ========================================
// CONSOLE BRANDING
// ========================================

console.log('%c🌍 D4SD Morocco Hub', 'font-size: 20px; font-weight: bold; color: #005A8D;');
console.log('%cDigital for Sustainable Development', 'font-size: 13px; color: #C1272D;');
console.log('%cAdvancing SDGs through Digital Transformation', 'font-size: 11px; color: #1B7A4E;');
console.log('%c\nA joint initiative of Morocco and UNDP', 'font-size: 10px; color: #6B7280;');

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// Prevent errors from breaking the page
window.addEventListener('unhandledrejection', (e) => {
    console.warn('Unhandled promise rejection:', e.reason);
});

// ========================================
// INITIALIZE ON DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ D4SD Homepage initialized successfully');
    
    // Initial highlight of active nav
    highlightActiveNav();
    
    // Set initial opacity for animated elements
    const animatedElements = document.querySelectorAll('.challenge-card-compact, .pillar-card-compact, .flagship-card, .partner-card-inline, .approach-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
    });
    
    // Ensure smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// ========================================
// RESIZE HANDLER - ADJUST FOR RESPONSIVE
// ========================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }, 250);
});