// =============================================================================
// FLOWENTA PRICING CARDS - INTERACTIONS & ANIMATIONS SOPHISTIQUÉES
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializePricingCards();
    setupParallaxEffects();
    setupCardInteractions();
    setupButtonAnimations();
    setupScrollAnimations();
});

// Initialisation des cartes de prix
function initializePricingCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Animation d'entrée différée
        setTimeout(() => {
            card.classList.add('loaded');
        }, index * 150);
        
        // Effet de tilt 3D au survol
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
        
        // Effet de ripple au clic
        card.addEventListener('click', createRippleEffect);
    });
}

// Effet de parallaxe sur le background
function setupParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// Effet de tilt 3D sur les cartes
function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * 5;
    const rotateY = -(mouseX / (rect.width / 2)) * 5;
    
    card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(10px)
    `;
    
    // Effet de brillance qui suit la souris
    const shine = card.querySelector('.card-shine') || createShineEffect(card);
    const shineX = (mouseX / rect.width) * 100;
    const shineY = (mouseY / rect.height) * 100;
    
    shine.style.background = `
        radial-gradient(circle at ${shineX}% ${shineY}%, 
        rgba(255,255,255,0.3) 0%, 
        transparent 50%)
    `;
}

function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    
    const shine = card.querySelector('.card-shine');
    if (shine) {
        shine.style.background = 'transparent';
    }
}

// Création de l'effet de brillance
function createShineEffect(card) {
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 24px;
        pointer-events: none;
        z-index: 1;
        transition: background 0.2s ease;
    `;
    card.appendChild(shine);
    return shine;
}

// Effet de ripple au clic
function createRippleEffect(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 2;
    `;
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Configuration des interactions avancées des cartes
function setupCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Animation de focus avec tab navigation
        card.addEventListener('focus', () => {
            card.classList.add('focused');
        });
        
        card.addEventListener('blur', () => {
            card.classList.remove('focused');
        });
        
        // Effet de zoom leger sur hover des prix
        const priceElement = card.querySelector('.price-amount');
        if (priceElement) {
            card.addEventListener('mouseenter', () => {
                priceElement.style.transform = 'scale(1.1)';
                priceElement.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                priceElement.style.transform = 'scale(1)';
            });
        }
        
        // Animation des icônes au hover
        const icons = card.querySelectorAll('i');
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.2s ease';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });
}

// Animations sophistiquées pour les boutons CTA
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        // Effet de pulse au hover
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = 'none';
        });
        
        // Effet de loading au clic
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirection...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
                
                // Simulation d'action selon le plan
                const card = this.closest('.card');
                const plan = card.dataset.plan;
                
                switch(plan) {
                    case 'starter':
                        showNotification('Redirection vers le plan Starter...', 'success');
                        break;
                    case 'business':
                        showNotification('Redirection vers le plan Business...', 'success');
                        break;
                    case 'enterprise':
                        showNotification('Ouverture du formulaire de contact...', 'info');
                        break;
                }
            }, 2000);
        });
    });
}

// Système de notification élégant
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        backdrop-filter: blur(10px);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4ecdc4, #44a08d)';
    } else if (type === 'info') {
        notification.style.background = 'linear-gradient(135deg, #f093fb, #f5576c)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Animations basées sur le scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer toutes les cartes
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
    
    // Observer le header
    const header = document.querySelector('.header');
    if (header) {
        observer.observe(header);
    }
}

// Effet de particules flottantes pour le background
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Gestion du redimensionnement de fenêtre
window.addEventListener('resize', debounce(() => {
    // Recalculer les animations si nécessaire
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transform = 'none';
    });
}, 250));

// Fonction debounce pour optimiser les performances
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

// CSS dynamique pour les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(120deg); }
        66% { transform: translateY(10px) rotate(240deg); }
    }
    
    .card.focused {
        outline: 3px solid rgba(102, 126, 234, 0.5);
        outline-offset: 4px;
    }
    
    .card.animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.animate-in {
        animation: fadeInDown 1s ease forwards;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// Initialiser les particules flottantes
setTimeout(createFloatingParticles, 1000);

// Easter egg: animation spéciale au double-clic sur le logo
document.querySelector('.logo')?.addEventListener('dblclick', () => {
    const logo = document.querySelector('.logo');
    logo.style.animation = 'spin 2s ease-in-out';
    
    setTimeout(() => {
        logo.style.animation = 'none';
    }, 2000);
});

const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(spinStyle);
