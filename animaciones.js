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

    // Inicializar búsqueda de servicios
    inicializarBusquedaServicios();

    console.log('✅ Animaciones listas');
});

// Función global para confeti (ELIMINADA - ahora está en main.js)
window.lanzarConfeti = function() {
    console.log('Función movida a main.js');
};

// NUEVO: Sistema de búsqueda de servicios
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

    const servicesSection = document.querySelector('.services-categories');
    if (servicesSection) {
        servicesSection.insertAdjacentHTML('afterend', searchHTML);
        setupSearchEvents();
    }
}

function setupSearchEvents() {
    const searchInput = document.getElementById('serviceSearch');
    const clearBtn = document.getElementById('clearSearch');
    const resultsContainer = document.getElementById('searchResults');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            resultsContainer.style.display = 'none';
            clearBtn.style.display = 'none';
            mostrarTodosLosServicios();
            return;
        }

        clearBtn.style.display = 'block';
        buscarServicios(query);
    });

    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        resultsContainer.style.display = 'none';
        clearBtn.style.display = 'none';
        mostrarTodosLosServicios();
    });

    // Ocultar resultados al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-search-container')) {
            resultsContainer.style.display = 'none';
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
    
    // Actualizar grid principal
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
        resultados.forEach(servicio => {
            const serviceCard = crearServiceCard(servicio);
            servicesContainer.appendChild(serviceCard);
        });
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

window.seleccionarServicioBusqueda = function(servicioId) {
    // Buscar y seleccionar el servicio en el formulario de reservas
    const serviceOption = document.querySelector(`input[value="${servicioId}"]`);
    if (serviceOption) {
        serviceOption.checked = true;
        serviceOption.closest('.service-option').classList.add('selected');
        
        // Cerrar resultados de búsqueda
        document.getElementById('searchResults').style.display = 'none';
        document.getElementById('serviceSearch').value = '';
        document.getElementById('clearSearch').style.display = 'none';
        
        // Ir al siguiente paso
        if (window.nextStep) {
            window.nextStep(2);
        }
        
        // Scroll al formulario
        document.getElementById('reservas').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};