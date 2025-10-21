// Animaciones y efectos visuales premium - GREGORIO STYLE
class AnimacionesPremium {
    constructor() {
        this.observers = [];
        this.inicializarAnimaciones();
        this.inicializarEfectosHover();
        this.inicializarScrollAnimations();
    }

    inicializarAnimaciones() {
        this.animarTextoHero();
        this.inicializarParallax();
    }

    animarTextoHero() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        heroTitle.style.visibility = 'visible';
        heroTitle.style.opacity = '1';
    }

    inicializarEfectosHover() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        const buttons = document.querySelectorAll('button, .btn, .cta-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });
        });

        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    inicializarScrollAnimations() {
        const elementosAnimados = document.querySelectorAll('.service-card, .team-card, .gallery-item, .section-title, .feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elementosAnimados.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        this.agregarEstilosAnimaciones();
    }

    agregarEstilosAnimaciones() {
        if (!document.querySelector('#animaciones-styles')) {
            const style = document.createElement('style');
            style.id = 'animaciones-styles';
            style.textContent = `
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .service-card, .team-card, .gallery-item, .feature-card {
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .cta-button, .btn, .form-next, .form-prev, .form-submit {
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
    }

    inicializarParallax() {
        const parallaxHandler = () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && window.innerWidth > 768) {
                hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        };

        const throttledParallax = this.throttle(parallaxHandler, 16);
        window.addEventListener('scroll', throttledParallax);
    }

    throttle(func, limit) {
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
}

// ===== SISTEMA DE PANEL ADMIN UNIFICADO =====
class PanelAdminManager {
    constructor() {
        this.sistemaReservas = null;
        this.inicializarSistema();
    }

    inicializarSistema() {
        // Intentar obtener el sistema de main.js
        if (typeof window.obtenerSistemaReservas === 'function') {
            this.sistemaReservas = window.obtenerSistemaReservas();
            console.log('✅ Sistema de reservas principal conectado');
        } else {
            console.warn('⚠️ Sistema principal no disponible, usando respaldo');
            this.crearSistemaRespaldo();
        }
    }

    crearSistemaRespaldo() {
        // Sistema de respaldo en caso de que main.js no esté cargado
        this.sistemaReservas = {
            obtenerReservas: () => {
                try {
                    return JSON.parse(localStorage.getItem('reservas_barberia') || '[]');
                } catch (error) {
                    return [];
                }
            },
            eliminarReserva: (id) => {
                const reservas = this.obtenerReservas();
                const nuevasReservas = reservas.filter(r => r.id != id);
                localStorage.setItem('reservas_barberia', JSON.stringify(nuevasReservas));
                return nuevasReservas;
            }
        };
    }

    obtenerReservas() {
        if (this.sistemaReservas && this.sistemaReservas.obtenerReservas) {
            return this.sistemaReservas.obtenerReservas();
        }
        return [];
    }

    eliminarReserva(id) {
        if (this.sistemaReservas && this.sistemaReservas.eliminarReserva) {
            return this.sistemaReservas.eliminarReserva(id);
        }
        return [];
    }
}

// ===== FUNCIONES GLOBALES DEL PANEL ADMIN =====
const panelAdminManager = new PanelAdminManager();

// Funciones del Panel Admin
window.togglePanelAdmin = function() {
    const modal = document.getElementById('modalAdmin');
    if (!modal) {
        console.error('❌ No se encontró modalAdmin');
        return;
    }
    
    if (modal.style.display === 'none' || !modal.style.display) {
        modal.style.display = 'block';
        cargarCalendario();
    } else {
        modal.style.display = 'none';
    }
};

window.cargarCalendario = function() {
    const reservas = panelAdminManager.obtenerReservas();
    console.log('📊 Reservas cargadas:', reservas); // Para debug
    mostrarEstadisticas(reservas);
    mostrarReservas(reservas);
};

function mostrarEstadisticas(reservas) {
    const hoy = new Date().toISOString().split('T')[0];
    const reservasHoy = reservas.filter(r => r.fecha === hoy).length;
    const reservasTotal = reservas.length;
    const clientesUnicos = new Set(reservas.map(r => r.cliente?.telefono || r.telefono)).size;

    const estadisticasEl = document.getElementById('estadisticas');
    if (estadisticasEl) {
        estadisticasEl.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2rem; color: #D4AF37;">${reservasTotal}</div>
                <div style="font-size: 0.8rem;">Total Reservas</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 2rem; color: #4CAF50;">${reservasHoy}</div>
                <div style="font-size: 0.8rem;">Reservas Hoy</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 2rem; color: #2196F3;">${clientesUnicos}</div>
                <div style="font-size: 0.8rem;">Clientes Únicos</div>
            </div>
        `;
    }
}

function mostrarReservas(reservas) {
    const filtroFecha = document.getElementById('filtroFecha')?.value || '';
    const filtroBarbero = document.getElementById('filtroBarbero')?.value || '';

    let reservasFiltradas = reservas;
    
    // Aplicar filtros
    if (filtroFecha) {
        reservasFiltradas = reservasFiltradas.filter(r => r.fecha === filtroFecha);
    }
    
    if (filtroBarbero) {
        reservasFiltradas = reservasFiltradas.filter(r => {
            const nombreBarbero = r.estilista || r.barbero || '';
            return nombreBarbero.includes(filtroBarbero);
        });
    }

    const listaReservasEl = document.getElementById('listaReservas');
    if (!listaReservasEl) {
        console.error('❌ No se encontró listaReservas');
        return;
    }

    if (reservasFiltradas.length === 0) {
        listaReservasEl.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #888;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
                <h3>No hay reservas</h3>
                <p>No se encontraron reservas con los filtros aplicados</p>
                <p style="font-size: 0.8rem; margin-top: 1rem;">Total en sistema: ${reservas.length}</p>
            </div>
        `;
        return;
    }

    // Ordenar reservas por fecha y hora (más recientes primero)
    reservasFiltradas.sort((a, b) => {
        const fechaA = new Date(a.fecha + 'T' + a.hora);
        const fechaB = new Date(b.fecha + 'T' + b.hora);
        return fechaB - fechaA;
    });

    const html = reservasFiltradas.map(reserva => {
        // Compatibilidad con ambos formatos (main.js y sistema antiguo)
        const cliente = reserva.cliente || {};
        const nombre = cliente.nombre || reserva.nombre || 'Sin nombre';
        const telefono = cliente.telefono || reserva.telefono || 'Sin teléfono';
        const email = cliente.email || reserva.email || 'Sin email';
        const servicio = reserva.servicio || 'Sin servicio';
        const barbero = reserva.estilista || reserva.barbero || 'Sin barbero';
        const precio = reserva.precio || 'Consultar';
        const fecha = reserva.fecha || 'Sin fecha';
        const hora = reserva.hora || 'Sin hora';
        const id = reserva.id || 'Sin ID';

        return `
        <div style="background: #2A2A2A; padding: 1.5rem; margin-bottom: 1rem; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <div style="display: grid; grid-template-columns: 2fr 1fr auto; gap: 1rem; align-items: start;">
                <div>
                    <h4 style="color: #D4AF37; margin: 0 0 0.5rem 0;">${nombre}</h4>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">📞 ${telefono}</p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">📧 ${email}</p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">✂️ ${servicio}</p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">💈 ${barbero}</p>
                </div>
                <div>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;"><strong>📅 ${fecha}</strong></p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;"><strong>⏰ ${hora}</strong></p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">💰 Bs ${precio}</p>
                    <p style="margin: 0.2rem 0; font-size: 0.8rem; color: #888;">Estado: ${reserva.estado || 'confirmada'}</p>
                </div>
                <div>
                    <button onclick="eliminarReserva(${id})" style="padding: 5px 10px; background: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 0.8rem; margin-bottom: 0.5rem;">
                        ❌ Eliminar
                    </button>
                    <p style="font-size: 0.7rem; color: #888; margin: 0;">ID: ${id}</p>
                </div>
            </div>
        </div>
        `;
    }).join('');

    listaReservasEl.innerHTML = html;
}

window.filtrarReservas = function() {
    cargarCalendario();
};

window.eliminarReserva = function(id) {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
        const nuevasReservas = panelAdminManager.eliminarReserva(id);
        console.log('🗑️ Reserva eliminada:', id);
        console.log('📊 Nuevo total de reservas:', nuevasReservas.length);
        cargarCalendario();
        
        // Mostrar confirmación
        if (window.mostrarAlerta) {
            window.mostrarAlerta('✅ Reserva eliminada correctamente', 'success');
        } else {
            alert('✅ Reserva eliminada correctamente');
        }
    }
};

// ===== EFECTO CONFETI =====
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

// ===== OPTIMIZACIÓN PARA VIDEO =====
function optimizarVideoFondo() {
    const video = document.querySelector('.video-background video');
    if (!video) return;

    video.addEventListener('loadedmetadata', function() {
        console.log('🎥 Video cargado: ', this.videoWidth + 'x' + this.videoHeight);
    });

    const playVideo = () => {
        video.play().catch(e => {
            console.log('Auto-play prevenido, se reproducirá con interacción del usuario');
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                playVideo();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(video);
    
    video.volume = 0;
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistema Gregorio Style - Animaciones inicializadas');
    
    // Inicializar animaciones
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        new AnimacionesPremium();
    }
    
    // Optimizar video de fondo
    setTimeout(optimizarVideoFondo, 500);
    
    console.log('✅ Panel admin listo. Usa el botón "📋 Ver Reservas"');
});

// ===== COMPATIBILIDAD =====
window.mostrarAlerta = window.mostrarAlerta || function(mensaje, tipo = 'error') {
    const alerta = document.createElement('div');
    alerta.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-width: 400px;
    `;
    alerta.textContent = mensaje;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => alerta.remove(), 5000);
};