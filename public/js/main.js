// ===== MAIN.JS - Skeleton API Space Theme =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initCopyButtons();
    initNavigation();
    initSpaceAnimations();
    initApiStatusCheck();
});

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== COPY TO CLIPBOARD =====
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-copy');
            
            if (!textToCopy) return;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                showCopyFeedback(this);
            } catch (err) {
                // Fallback for older browsers
                fallbackCopyToClipboard(textToCopy, this);
            }
        });
    });
}

function showCopyFeedback(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Copiado!';
    button.style.background = 'var(--success-green)';
    button.style.color = 'var(--white)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 2000);
}

function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// ===== NAVIGATION EFFECTS =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove background based on scroll position
        if (currentScrollY > 50) {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.9)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Highlight active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SPACE ANIMATIONS =====
function initSpaceAnimations() {
    // Add random floating animation to planets
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach((planet, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        planet.style.animationDelay = `${randomDelay}s`;
        planet.style.animationDuration = `${randomDuration}s`;
    });
    
    // Create shooting stars effect
    createShootingStars();
    
    // Add parallax effect to space elements
    initParallax();
}

function createShootingStars() {
    const spaceBackground = document.querySelector('.space-background');
    
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createShootingStar(spaceBackground);
        }
    }, 3000);
}

function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight / 2);
    
    shootingStar.style.cssText = `
        position: absolute;
        left: ${startX}px;
        top: ${startY}px;
        width: 2px;
        height: 2px;
        background: var(--star-yellow);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--star-yellow);
        z-index: 1;
        animation: shootingStar 1.5s linear forwards;
    `;
    
    container.appendChild(shootingStar);
    
    // Remove after animation
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 1500);
}

// Add shooting star animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shootingStar {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        10% {
            transform: translate(10px, 10px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(200px, 200px) scale(0);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--cosmic-purple) !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--cosmic-purple);
        border-radius: 1px;
    }
`;
document.head.appendChild(style);

function initParallax() {
    const planets = document.querySelectorAll('.planet');
    const galaxies = document.querySelectorAll('.galaxy');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rate2 = scrolled * -0.3;
        
        planets.forEach((planet, index) => {
            const speed = 0.2 + (index * 0.1);
            planet.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        galaxies.forEach((galaxy, index) => {
            const speed = 0.1 + (index * 0.05);
            galaxy.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ===== API STATUS CHECK =====
function initApiStatusCheck() {
    const statusIndicator = document.querySelector('.api-status.active');
    const healthButton = document.querySelector('a[href="/api/health"]');
    
    if (!statusIndicator || !healthButton) return;
    
    // Check API health status
    checkApiHealth();
    
    // Check every 30 seconds
    setInterval(checkApiHealth, 30000);
}

async function checkApiHealth() {
    const statusIndicator = document.querySelector('.api-status.active');
    
    try {
        const response = await fetch('/api/health');
        
        if (response.ok) {
            updateApiStatus(statusIndicator, 'ATIVO', 'active');
        } else {
            updateApiStatus(statusIndicator, 'ERRO', 'error');
        }
    } catch (error) {
        updateApiStatus(statusIndicator, 'OFFLINE', 'offline');
    }
}

function updateApiStatus(element, text, className) {
    if (!element) return;
    
    element.textContent = text;
    element.className = `api-status ${className}`;
}

// Add status styles
const statusStyles = document.createElement('style');
statusStyles.textContent = `
    .api-status.error {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        border: 1px solid #ef4444;
    }
    
    .api-status.offline {
        background: rgba(156, 163, 175, 0.2);
        color: #9ca3af;
        border: 1px solid #9ca3af;
    }
    
    .api-card:hover .api-status {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
    
    .card-hover-effect:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(99, 102, 241, 0.2);
    }
`;
document.head.appendChild(statusStyles);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const elementsToAnimate = document.querySelectorAll('.api-card, .doc-card, .arch-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Add fade in animation
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyles);

// Initialize scroll animations
initScrollAnimations();

// ===== EASTER EGG - KONAMI CODE =====
(function() {
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.keyCode);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.join(',') === konamiCode.join(',')) {
            activateSpaceMode();
        }
    });
    
    function activateSpaceMode() {
        document.body.style.animation = 'rainbow 2s infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        console.log('🚀 Space Mode Activated! Welcome to the cosmic universe!');
    }
})();

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events for better performance
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations would go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

console.log('🚀 Skeleton API Space Theme Loaded Successfully!');
