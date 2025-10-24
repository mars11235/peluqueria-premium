// Animaciones y efectos visuales premium - GREGORIO STYLE
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistema Gregorio Style - Animaciones inicializadas');
    
    // Inicializar animaciones de scroll
    const elementosAnimables = document.querySelectorAll('.service-card, .team-card, .feature-card, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementosAnimables.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Optimizar video
    const video = document.querySelector('.video-background video');
    if (video) {
        video.play().catch(e => {
            console.log('Auto-play prevenido, se reproducirá con interacción');
        });
    }

    // Efectos hover para tarjetas
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efectos para botones
    const buttons = document.querySelectorAll('button, .cta-button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    console.log('✅ Animaciones listas');
});

// Función global para confeti
window.lanzarConfeti = function() {
    const confettiCount = 150;
    const colors = ['#D4AF37', '#E6C55A', '#B8941F', '#2A2A2A', '#404040', '#756F70'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 12px;
            height: 12px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 9999;
            pointer-events: none;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
    
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
};