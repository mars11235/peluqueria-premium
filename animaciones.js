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
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

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

    // Efectos hover para tarjetas (solo en desktop)
    if (window.innerWidth > 768) {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Efectos para botones
    const buttons = document.querySelectorAll('button, .cta-button, .btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        if (window.innerWidth > 768) {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        }
    });

    // Inicializar navegación móvil
    inicializarNavegacionMobile();
    
    // Inicializar búsqueda de servicios
    inicializarBusquedaServicios();
    
    // Inicializar mejoras táctiles
    inicializarMejorasTactiles();
    
    // Inicializar scroll automático
    inicializarScrollAutomatico();

    console.log('✅ Animaciones listas');
});

// ===== NUEVO: SCROLL AUTOMÁTICO AL SELECCIONAR =====
function inicializarScrollAutomatico() {
    // Scroll automático al seleccionar servicio
    document.addEventListener('click', function(e) {
        // Si se hace clic en una opción de servicio
        if (e.target.closest('.service-option')) {
            setTimeout(() => {
                scrollToNextButton('step-1');
            }, 300);
        }
        
        // Si se hace clic en una opción de barbero
        if (e.target.closest('.stylist-option')) {
            setTimeout(() => {
                scrollToNextButton('step-2');
            }, 300);
        }
        
        // Si se selecciona fecha u hora
        if (e.target.closest('#booking-date') || e.target.closest('#booking-time')) {
            setTimeout(() => {
                scrollToNextButton('step-3');
            }, 500);
        }
    });
    
    // Para inputs de datos del cliente
    const clientInputs = document.querySelectorAll('.client-info input');
    clientInputs.forEach(input => {
        input.addEventListener('focus', function() {
            setTimeout(() => {
                scrollToNextButton('step-4');
            }, 300);
        });
    });
}

function scrollToNextButton(stepId) {
    const stepElement = document.getElementById(stepId);
    if (!stepElement) return;
    
    const nextButton = stepElement.querySelector('.form-next, .form-submit');
    if (nextButton) {
        const rect = nextButton.getBoundingClientRect();
        const offsetTop = rect.top + window.pageYOffset;
        
        // Scroll suave al botón
        window.scrollTo({
            top: offsetTop - 100, // Un poco arriba para mejor visibilidad
            behavior: 'smooth'
        });
        
        // Efecto visual de atención
        nextButton.style.transform = 'scale(1.05)';
        nextButton.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
        
        setTimeout(() => {
            nextButton.style.transform = 'scale(1)';
            nextButton.style.boxShadow = 'none';
        }, 1000);
    }
}

// Navegación móvil mejorada
function inicializarNavegacionMobile() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && 
                navMenu.classList.contains('active')) {
                
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}

// Sistema de búsqueda de servicios
function inicializarBusquedaServicios() {
    const searchHTML = `
        <div class="service-search-container">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="serviceSearch" placeholder="🔍 Buscar servicio... (ej: fade, barba, diseño)" class="search-input">
                <button class="search-clear" id="clearSearch">✕</button>
            </div>
            <div class="search-results" id="searchResults"></div>
        </div>
    `;

    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        const title = servicesSection.querySelector('.section-title');
        if (title) {
            title.insertAdjacentHTML('afterend', searchHTML);
            setupSearchEvents();
        }
    }
}

function setupSearchEvents() {
    const searchInput = document.getElementById('serviceSearch');
    const clearBtn = document.getElementById('clearSearch');
    const resultsContainer = document.getElementById('searchResults');

    if (!searchInput) return;

    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                resultsContainer.style.display = 'none';
                clearBtn.style.display = 'none';
                mostrarTodosLosServicios();
                return;
            }

            clearBtn.style.display = 'block';
            buscarServicios(query);
        }, 300);
    });

    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        resultsContainer.style.display = 'none';
        clearBtn.style.display = 'none';
        mostrarTodosLosServicios();
        searchInput.focus();
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-search-container')) {
            resultsContainer.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            resultsContainer.style.display = 'none';
            searchInput.blur();
        }
    });
}

function buscarServicios(query) {
    const servicios = window.servicios || [];
    const results = servicios.filter(servicio => 
        servicio.nombre.toLowerCase().includes(query) ||
        servicio.categoria.toLowerCase().includes(query) ||
        servicio.caracteristicas.some(c => c.toLowerCase().includes(query))
    );

    mostrarResultadosBusqueda(results, query);
}

function mostrarResultadosBusqueda(resultados, query) {
    const resultsContainer = document.getElementById('searchResults');
    const servicesContainer = document.getElementById('services-container');
    
    if (resultados.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No se encontraron servicios para "<strong>${query}</strong>"</p>
                <small>Intenta con otras palabras como: fade, barba, diseño, clásico</small>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <div class="results-header">
                <span>${resultados.length} servicios encontrados</span>
                <button onclick="mostrarTodosLosServicios()">Ver todos</button>
            </div>
            <div class="results-grid">
                ${resultados.map(servicio => `
                    <div class="search-result-item" onclick="seleccionarServicioBusqueda(${servicio.id})">
                        <div class="result-icon">
                            <i class="${servicio.icono}"></i>
                        </div>
                        <div class="result-info">
                            <h4>${servicio.nombre}</h4>
                            <p>Bs ${servicio.precio} • ${servicio.duracion} min</p>
                            <span class="result-category">${servicio.categoria}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    resultsContainer.style.display = 'block';
    
    if (servicesContainer && window.filtrarServiciosPorBusqueda) {
        window.filtrarServiciosPorBusqueda(resultados);
    }
}

function mostrarTodosLosServicios() {
    const servicesContainer = document.getElementById('services-container');
    const resultsContainer = document.getElementById('searchResults');
    
    if (servicesContainer && window.cargarServicios) {
        window.cargarServicios();
    }
    
    resultsContainer.style.display = 'none';
}

// Mejoras táctiles para móviles
function inicializarMejorasTactiles() {
    const touchElements = document.querySelectorAll('.service-card, .feature-card, .team-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('touchstart', function(e) {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funciones globales
window.seleccionarServicioBusqueda = function(servicioId) {
    const serviceOption = document.querySelector(`input[value="${servicioId}"]`);
    if (serviceOption) {
        serviceOption.checked = true;
        serviceOption.closest('.service-option').classList.add('selected');
        
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('serviceSearch').value = '';
        document.getElementById('clearSearch').style.display = 'none';
        
        // Scroll automático al botón siguiente
        setTimeout(() => {
            scrollToNextButton('step-1');
        }, 500);
        
        if (window.nextStep) {
            setTimeout(() => {
                window.nextStep(2);
            }, 800);
        }
    }
};

window.filtrarServiciosPorBusqueda = function(serviciosFiltrados) {
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
        serviciosFiltrados.forEach(servicio => {
            if (window.crearServiceCard) {
                const serviceCard = window.crearServiceCard(servicio);
                servicesContainer.appendChild(serviceCard);
            }
        });
    }
};

// Optimización para móviles
if (window.innerWidth <= 768) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
        document.documentElement.style.setProperty('--transicion', 'all 0.1s ease');
    }
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    }, { 
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
}