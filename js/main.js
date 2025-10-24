// ===== DATOS ACTUALIZADOS DE LA BARBERÍA =====
const servicios = [
    // ===== CORTES CLÁSICOS =====
    {
        id: 1,
        nombre: "Corte Escolar",
        precio: 12,
        duracion: 30,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Corte tradicional", "Perfecto para niños", "Líneas definidas"]
    },
    {
        id: 2,
        nombre: "Corte Hongo",
        precio: 12,
        duracion: 30,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Estilo juvenil", "Forma redondeada", "Acabado suave"]
    },
    {
        id: 3,
        nombre: "Corte Militar",
        precio: 8,
        duracion: 25,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Corte corto", "Estilo disciplinado", "Mantenimiento fácil"]
    },
    {
        id: 4,
        nombre: "Corte Romano",
        precio: 12,
        duracion: 35,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Estilo clásico", "Volumen superior", "Lados ajustados"]
    },
    {
        id: 5,
        nombre: "Corte Media Melena",
        precio: 12,
        duracion: 40,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Para cabello largo", "Capas definidas", "Estilo versátil"]
    },
    {
        id: 6,
        nombre: "Corte Cristiano Ronaldo",
        precio: 12,
        duracion: 35,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Estilo moderno", "Texturizado", "Tendencia actual"]
    },
    {
        id: 7,
        nombre: "Corte Mesa",
        precio: 15,
        duracion: 45,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Corte técnico", "Líneas perfectas", "Acabado impecable"]
    },
    {
        id: 8,
        nombre: "Corte Casquete Corto",
        precio: 12,
        duracion: 30,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Estilo redondeado", "Practico", "Fácil mantenimiento"]
    },

    // ===== CORTES FADE =====
    {
        id: 9,
        nombre: "Low Fade",
        precio: 40,
        duracion: 45,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Degradado bajo", "Transición suave", "Estilo versátil"]
    },
    {
        id: 10,
        nombre: "Mid Fade",
        precio: 40,
        duracion: 50,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Degradado medio", "Equilibrio perfecto", "Estilo moderno"]
    },
    {
        id: 11,
        nombre: "High Fade",
        precio: 50,
        duracion: 55,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Degradado alto", "Contraste marcado", "Impacto visual"]
    },
    {
        id: 12,
        nombre: "Skin Fade",
        precio: 50,
        duracion: 60,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Degradado a piel", "Máximo contraste", "Estilo audaz"]
    },
    {
        id: 13,
        nombre: "Bald Fade",
        precio: 40,
        duracion: 50,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Transición completa", "Estilo limpio", "Acabado perfecto"]
    },
    {
        id: 14,
        nombre: "Taper Fade",
        precio: 40,
        duracion: 45,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Degradado gradual", "Estilo clásico", "Natural"]
    },
    {
        id: 15,
        nombre: "Drop Fade",
        precio: 50,
        duracion: 55,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Degradado descendente", "Estilo único", "Diseño especial"]
    },
    {
        id: 16,
        nombre: "Burst Fade",
        precio: 50,
        duracion: 60,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Degradado circular", "Efecto explosivo", "Estilo vanguardista"]
    },
    {
        id: 17,
        nombre: "Curly Fade",
        precio: 40,
        duracion: 50,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Para cabello rizado", "Realza textura", "Estilo natural"]
    },
    {
        id: 18,
        nombre: "Mullet Fade",
        precio: 40,
        duracion: 55,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Fade + Mullet", "Estilo retro", "Tendencia actual"]
    },
    {
        id: 19,
        nombre: "Mohawk Fade",
        precio: 50,
        duracion: 60,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Fade + Mohawk", "Estilo rebelde", "Máximo impacto"]
    },
    {
        id: 20,
        nombre: "Mohicano Fade",
        precio: 40,
        duracion: 55,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Estilo tribal", "Diseño audaz", "Personalidad única"]
    },
    {
        id: 21,
        nombre: "Faux Hawk Fade",
        precio: 50,
        duracion: 60,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Mohawk suave", "Versión moderna", "Estilo versátil"]
    },
    {
        id: 22,
        nombre: "Mid Fade Textura Alto",
        precio: 50,
        duracion: 65,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Textura + Fade", "Volumen superior", "Estilo premium"]
    },
    {
        id: 23,
        nombre: "Taper Burst Fade",
        precio: 50,
        duracion: 60,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Combinación técnica", "Diseño exclusivo", "Máxima precisión"]
    },
    {
        id: 24,
        nombre: "French Crop Fade",
        precio: 50,
        duracion: 55,
        categoria: "fade",
        icono: "fas fa-cut",
        caracteristicas: ["Estilo europeo", "Frente definido", "Elegancia moderna"]
    },

    // ===== CORTES CON DISEÑO =====
    {
        id: 25,
        nombre: "Fade con Diseño Fácil",
        precio: 60,
        duracion: 70,
        categoria: "diseno",
        icono: "fas fa-pen-nib",
        caracteristicas: ["Diseño simple", "Líneas básicas", "Toque personal"]
    },
    {
        id: 26,
        nombre: "Fade con Diseño Medio",
        precio: 70,
        duracion: 80,
        categoria: "diseno",
        icono: "fas fa-pen-nib",
        caracteristicas: ["Diseño detallado", "Patrones complejos", "Arte en cabello"]
    },
    {
        id: 27,
        nombre: "Fade con Diseño Difícil",
        precio: 80,
        duracion: 90,
        categoria: "diseno",
        icono: "fas fa-pen-nib",
        caracteristicas: ["Diseño avanzado", "Arte detallado", "Trabajo de precisión"]
    },

    // ===== BARBA Y AFEITADO =====
    {
        id: 28,
        nombre: "Recorte de Barba",
        precio: 15,
        duracion: 20,
        categoria: "barba",
        icono: "fas fa-leaf",
        caracteristicas: ["Forma y longitud", "Perfilado básico", "Mantenimiento"]
    },
    {
        id: 29,
        nombre: "Perfilado de Barba",
        precio: 20,
        duracion: 25,
        categoria: "barba",
        icono: "fas fa-drafting-compass",
        caracteristicas: ["Líneas definidas", "Diseño facial", "Precisión máxima"]
    },
    {
        id: 30,
        nombre: "Afeitado con Toalla Caliente",
        precio: 40,
        duracion: 30,
        categoria: "barba",
        icono: "fas fa-fire",
        caracteristicas: ["Técnica clásica", "Toallas calientes", "Acabado suave"]
    },
    {
        id: 31,
        nombre: "Diseño de Barba + Cejas",
        precio: 60,
        duracion: 35,
        categoria: "barba",
        icono: "fas fa-palette",
        caracteristicas: ["Diseño completo", "Armonía facial", "Estilo integrado"]
    },
    {
        id: 32,
        nombre: "Barba + Pigmentación",
        precio: 70,
        duracion: 45,
        categoria: "barba",
        icono: "fas fa-fill-drip",
        caracteristicas: ["Color y diseño", "Mejora visual", "Resultado natural"]
    },

    // ===== ESTÉTICA MASCULINA =====
    {
        id: 33,
        nombre: "Limpieza Facial con Exfoliante",
        precio: 60,
        duracion: 40,
        categoria: "estetica",
        icono: "fas fa-spa",
        caracteristicas: ["Limpieza profunda", "Exfoliación", "Piel renovada"]
    },
    {
        id: 34,
        nombre: "Mascarilla Refrescante",
        precio: 50,
        duracion: 30,
        categoria: "estetica",
        icono: "fas fa-mask",
        caracteristicas: ["Hidratación", "Nutrición facial", "Piel saludable"]
    },
    {
        id: 35,
        nombre: "Depilación con Cera",
        precio: 25,
        duracion: 20,
        categoria: "estetica",
        icono: "fas fa-eye",
        caracteristicas: ["Cejas, nariz, orejas", "Técnica precisa", "Resultado limpio"]
    },
    {
        id: 36,
        nombre: "Diseño de Cejas",
        precio: 10,
        duracion: 15,
        categoria: "estetica",
        icono: "fas fa-eye-brow",
        caracteristicas: ["Forma perfecta", "Simetría", "Estilo facial"]
    },

    // ===== SERVICIOS COMPLEMENTARIOS =====
    {
        id: 37,
        nombre: "Lavado de Cabello",
        precio: 20,
        duracion: 15,
        categoria: "complementario",
        icono: "fas fa-shower",
        caracteristicas: ["Limpieza profunda", "Masaje capilar", "Relajación"]
    },
    {
        id: 38,
        nombre: "Secado con Secador",
        precio: 20,
        duracion: 15,
        categoria: "complementario",
        icono: "fas fa-wind",
        caracteristicas: ["Estilizado", "Volumen", "Acabado profesional"]
    },
    {
        id: 39,
        nombre: "Peinado con Plancha",
        precio: 30,
        duracion: 25,
        categoria: "complementario",
        icono: "fas fa-thermometer-full",
        caracteristicas: ["Alisado", "Estilo definido", "Protección térmica"]
    },
    {
        id: 40,
        nombre: "Hidratación Capilar",
        precio: 40,
        duracion: 30,
        categoria: "complementario",
        icono: "fas fa-tint",
        caracteristicas: ["Nutrición", "Reparación", "Cabello saludable"]
    },

    // ===== PAQUETES ESPECIALES =====
    {
        id: 41,
        nombre: "Paquete Básico",
        precio: 80,
        duracion: 75,
        categoria: "paquete",
        icono: "fas fa-gem",
        caracteristicas: ["Corte + Barba + Cejas", "Servicio completo", "Precio especial"]
    },
    {
        id: 42,
        nombre: "Paquete Completo",
        precio: 90,
        duracion: 90,
        categoria: "paquete",
        icono: "fas fa-crown",
        caracteristicas: ["Corte + Barba + Lavado + Facial", "Experiencia premium", "Relajación total"]
    },
    {
        id: 43,
        nombre: "Paquete VIP",
        precio: 100,
        duracion: 120,
        categoria: "paquete",
        icono: "fas fa-star",
        caracteristicas: ["Corte + Barba + Cejas + Mascarilla + Lavado", "Lujo máximo", "Tratamiento completo"]
    }
];

const operarios = [
    { id: 1, nombre: "Roberto Carlos", especialidad: "ESPECIALISTA EN FADES MODERNOS" },
    { id: 2, nombre: "Kevin Canaviri", especialidad: "ESPECIALISTA EN BARBAS Y CLÁSICOS" }
];

// ===== SISTEMA DE RESERVAS =====
class SistemaReservas {
    constructor() {
        this.reservas = JSON.parse(localStorage.getItem('reservas_barberia')) || [];
        this.operarios = operarios;
    }

    verificarDisponibilidad(fecha, hora, operarioId = null) {
        const reservasDiaHora = this.reservas.filter(r => 
            r.fecha === fecha && 
            r.hora === hora
        );

        if (operarioId) {
            const operarioOcupado = reservasDiaHora.some(r => 
                r.operarioId === operarioId
            );
            return !operarioOcupado;
        } else {
            const operariosOcupados = this.obtenerOperariosOcupados(reservasDiaHora);
            const operariosDisponibles = this.operarios.filter(op => 
                !operariosOcupados.includes(op.id)
            );

            return {
                disponible: operariosDisponibles.length > 0,
                operariosDisponibles: operariosDisponibles,
                mensaje: operariosDisponibles.length > 0 ? 
                    `Disponible con: ${operariosDisponibles.map(op => op.nombre.split(' ')[0]).join(' o ')}` :
                    'No hay barberos disponibles'
            };
        }
    }

    obtenerOperariosOcupados(reservas) {
        const operariosOcupados = new Set();
        reservas.forEach(reserva => {
            if (reserva.operarioId) {
                operariosOcupados.add(reserva.operarioId);
            } else {
                this.operarios.forEach(op => operariosOcupados.add(op.id));
            }
        });
        return Array.from(operariosOcupados);
    }

    crearReserva(reservaData) {
        const conflicto = this.reservas.find(r => 
            r.fecha === reservaData.fecha && 
            r.hora === reservaData.hora && 
            this.hayConflicto(r, reservaData)
        );

        if (conflicto) {
            const mensajeError = this.generarMensajeConflicto(conflicto, reservaData);
            throw new Error(mensajeError);
        }

        const nuevaReserva = {
            id: Date.now(),
            ...reservaData,
            estado: 'confirmada',
            fechaCreacion: new Date().toISOString()
        };
        
        this.reservas.push(nuevaReserva);
        this.guardarEnLocalStorage();
        return nuevaReserva;
    }

    hayConflicto(reservaExistente, nuevaReserva) {
        if (nuevaReserva.operarioId && reservaExistente.operarioId) {
            return reservaExistente.operarioId === nuevaReserva.operarioId;
        } else if (nuevaReserva.operarioId && !reservaExistente.operarioId) {
            const operarioOcupado = this.operarios.some(op => 
                op.id === nuevaReserva.operarioId && 
                this.obtenerOperariosOcupados([reservaExistente]).includes(op.id)
            );
            return operarioOcupado;
        } else if (!nuevaReserva.operarioId && reservaExistente.operarioId) {
            const operariosOcupados = this.obtenerOperariosOcupados([reservaExistente]);
            return operariosOcupados.length >= this.operarios.length;
        } else {
            const operariosOcupados = this.obtenerOperariosOcupados([reservaExistente]);
            return operariosOcupados.length >= this.operarios.length;
        }
    }

    generarMensajeConflicto(conflicto, nuevaReserva) {
        const operarioConflicto = this.operarios.find(op => op.id === conflicto.operarioId);
        const nombreOperario = operarioConflicto ? operarioConflicto.nombre : 'un barbero';
        
        if (nuevaReserva.operarioId) {
            return `❌ ${nombreOperario} ya está reservado para esta hora. Elige otro horario.`;
        } else {
            return '❌ No hay barberos disponibles en este horario. Selecciona otra hora.';
        }
    }

    obtenerHorariosDisponibles(fecha, operarioId = null) {
        const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        
        return horarios.map(hora => {
            const disponibilidad = this.verificarDisponibilidad(fecha, hora, operarioId);
            
            return {
                hora: hora,
                disponible: typeof disponibilidad === 'boolean' ? disponibilidad : disponibilidad.disponible,
                detalle: typeof disponibilidad === 'object' ? disponibilidad.mensaje : null,
                operariosDisponibles: typeof disponibilidad === 'object' ? disponibilidad.operariosDisponibles : []
            };
        });
    }

    guardarEnLocalStorage() {
        localStorage.setItem('reservas_barberia', JSON.stringify(this.reservas));
    }

    obtenerReservas() {
        return this.reservas;
    }

    limpiarReservas() {
        this.reservas = [];
        this.guardarEnLocalStorage();
    }

    // NUEVA FUNCIÓN: Enviar WhatsApp al barbero
    async enviarWhatsAppBarbero(reservaData) {
        const tuNumero = "59172346861"; // ⬅️ TU NÚMERO REAL
        
        const mensaje = `🪒 NUEVA RESERVA - GREGORIO STYLE

👤 Cliente: ${reservaData.cliente.nombre}
📞 Teléfono: ${reservaData.cliente.telefono}
📧 Email: ${reservaData.cliente.email}

✂️ Servicio: ${reservaData.servicio}
💰 Precio: Bs ${reservaData.precio}
⏱ Duración: ${reservaData.duracion} min

👨‍💼 Barbero: ${reservaData.estilista}
📅 Fecha: ${reservaData.fecha}
🕐 Hora: ${reservaData.hora}

Estado: ✅ CONFIRMADA`;

        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWhatsApp = `https://wa.me/${tuNumero}?text=${mensajeCodificado}`;
        
        // Abrir en nueva pestaña
        window.open(urlWhatsApp, '_blank');
        return true;
    }
}

// ===== GESTOR DE SERVICIOS CON PAGINACIÓN =====
class ServiciosManager {
    constructor() {
        this.servicios = servicios;
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.currentCategory = 'all';
    }

    getServiciosPaginados(categoria = 'all') {
        const filtrados = categoria === 'all' 
            ? this.servicios 
            : this.servicios.filter(s => s.categoria === categoria);
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return filtrados.slice(startIndex, startIndex + this.itemsPerPage);
    }

    hayMasServicios(categoria = 'all') {
        const filtrados = categoria === 'all' 
            ? this.servicios 
            : this.servicios.filter(s => s.categoria === categoria);
        
        return this.currentPage * this.itemsPerPage < filtrados.length;
    }

    cargarMasServicios() {
        this.currentPage++;
        return this.getServiciosPaginados(this.currentCategory);
    }

    resetPaginacion() {
        this.currentPage = 1;
    }
}

// ===== INICIALIZACIÓN =====
const sistemaReservas = new SistemaReservas();
const serviciosManager = new ServiciosManager();
let currentStep = 1;

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    cargarServicios();
    cargarHorarios();
    inicializarNavegacion();
    inicializarFormularioReserva();
    inicializarFiltrosServicios();
    setupScrollAnimations();
    inicializarMobileFeatures();
    inicializarSistemaReservas();
    setupServicePagination();
}

// ===== PAGINACIÓN DE SERVICIOS =====
function setupServicePagination() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', cargarMasServicios);
}

function cargarMasServicios() {
    const nuevosServicios = serviciosManager.cargarMasServicios();
    const servicesContainer = document.getElementById('services-container');
    
    nuevosServicios.forEach(servicio => {
        const serviceCard = crearServiceCard(servicio);
        servicesContainer.appendChild(serviceCard);
    });

    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!serviciosManager.hayMasServicios(serviciosManager.currentCategory)) {
        loadMoreBtn.style.display = 'none';
    }
    
    setupScrollAnimations();
}

// ===== CARGAR SERVICIOS =====
function cargarServicios() {
    const servicesContainer = document.getElementById('services-container');
    const serviceSelect = document.getElementById('service-select');
    
    if (!servicesContainer || !serviceSelect) return;
    
    servicesContainer.innerHTML = '';
    serviceSelect.innerHTML = '';

    const serviciosIniciales = serviciosManager.getServiciosPaginados('all');
    
    serviciosIniciales.forEach(servicio => {
        const serviceCard = crearServiceCard(servicio);
        servicesContainer.appendChild(serviceCard);
        
        const serviceOption = crearServiceOption(servicio);
        serviceSelect.appendChild(serviceOption);
    });

    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (serviciosManager.hayMasServicios('all')) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }

    setupServiceEvents();
}

function crearServiceCard(servicio) {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `
        <div class="service-header">
            <div class="service-icon">
                <i class="${servicio.icono}"></i>
            </div>
            <h3>${servicio.nombre}</h3>
            <div class="service-price">Bs ${servicio.precio}</div>
            <div class="service-duration">${servicio.duracion} min</div>
        </div>
        <ul class="service-features">
            ${servicio.caracteristicas.slice(0, 3).map(caract => 
                `<li>${caract}</li>`
            ).join('')}
        </ul>
    `;
    return serviceCard;
}

function crearServiceOption(servicio) {
    const serviceOption = document.createElement('div');
    serviceOption.className = 'service-option';
    serviceOption.innerHTML = `
        <input type="radio" name="service" value="${servicio.id}" id="service-${servicio.id}">
        <label for="service-${servicio.id}">
            <strong>${servicio.nombre}</strong> - Bs ${servicio.precio} (${servicio.duracion} min)
        </label>
    `;
    return serviceOption;
}

function setupServiceEvents() {
    const serviceOptions = document.querySelectorAll('.service-option');
    
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            const radio = this.querySelector('input');
            if (radio) {
                radio.checked = true;
                actualizarResumenReserva();
            }
        });
    });
}

// ===== FILTROS DE SERVICIOS =====
function inicializarFiltrosServicios() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-category');
            filtrarServicios(categoria);
        });
    });
}

function filtrarServicios(categoria) {
    const servicesContainer = document.getElementById('services-container');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    serviciosManager.resetPaginacion();
    serviciosManager.currentCategory = categoria;
    
    servicesContainer.innerHTML = '';
    
    const serviciosFiltrados = serviciosManager.getServiciosPaginados(categoria);
    
    serviciosFiltrados.forEach(servicio => {
        const serviceCard = crearServiceCard(servicio);
        servicesContainer.appendChild(serviceCard);
    });

    if (serviciosManager.hayMasServicios(categoria)) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }

    setupServiceEvents();
    setupScrollAnimations();
}

// ===== SISTEMA DE RESERVAS =====

function cargarHorarios() {
    const timeSelect = document.getElementById('booking-time');
    if (!timeSelect) return;
    
    const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    
    timeSelect.innerHTML = '<option value="">Selecciona hora</option>';
    horarios.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        timeSelect.appendChild(option);
    });
    
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
}

function inicializarNavegacion() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && 
            !e.target.closest('.nav-container') && 
            navMenu.classList.contains('active')) {
            
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function inicializarFormularioReserva() {
    const form = document.getElementById('booking-form');
    if (!form) return;
    
    form.addEventListener('submit', procesarReserva);
    form.addEventListener('change', actualizarResumenReserva);
    form.addEventListener('input', actualizarResumenReserva);
}

function inicializarSistemaReservas() {
    const fechaInput = document.getElementById('booking-date');
    const operarioRadios = document.querySelectorAll('input[name="stylist"]');
    
    if (fechaInput) {
        fechaInput.addEventListener('change', actualizarHorariosDisponibles);
    }
    
    operarioRadios.forEach(radio => {
        radio.addEventListener('change', actualizarHorariosDisponibles);
    });
}

// ===== FUNCIONES DEL FORMULARIO MULTIPASO =====
function nextStep(step) {
    if (validarPasoActual(currentStep)) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        document.getElementById(`step-${step}`).classList.add('active');
        currentStep = step;
        actualizarResumenReserva();
        
        if (step === 3) {
            setTimeout(actualizarHorariosDisponibles, 100);
        }
    }
}

function prevStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
    actualizarResumenReserva();
}

function validarPasoActual(paso) {
    const forms = {
        1: () => !!document.querySelector('input[name="service"]:checked'),
        2: () => !!document.querySelector('input[name="stylist"]:checked'),
        3: () => {
            const fecha = document.getElementById('booking-date').value;
            const hora = document.getElementById('booking-time').value;
            return fecha && hora && verificarDisponibilidadFormulario(fecha, hora);
        },
        4: () => {
            const nombre = document.querySelector('input[name="nombre"]')?.value;
            const telefono = document.querySelector('input[name="telefono"]')?.value;
            const email = document.querySelector('input[name="email"]')?.value;
            
            if (!nombre || !telefono || !email) return false;
            if (!validarEmail(email)) return false;
            if (telefono.replace(/\D/g, '').length < 8) return false;
            
            return true;
        }
    };

    if (!forms[paso]()) {
        mostrarAlerta(`Por favor completa todos los campos requeridos en este paso`);
        return false;
    }
    
    return true;
}

function verificarDisponibilidadFormulario(fecha, hora) {
    const operarioSeleccionado = document.querySelector('input[name="stylist"]:checked');
    if (!operarioSeleccionado) {
        mostrarAlerta('Por favor selecciona un barbero');
        return false;
    }
    
    const operarioId = operarioSeleccionado.value === 'any' ? null : parseInt(operarioSeleccionado.value);
    const disponibilidad = sistemaReservas.verificarDisponibilidad(fecha, hora, operarioId);
    
    if (typeof disponibilidad === 'boolean') {
        if (!disponibilidad) {
            const operarioNombre = operarioId ? 
                operarios.find(op => op.id === operarioId)?.nombre : 'barberos';
            mostrarAlerta(`❌ ${operarioNombre} no está disponible a las ${hora}. Por favor elige otro horario.`);
            return false;
        }
    } else {
        if (!disponibilidad.disponible) {
            mostrarAlerta(disponibilidad.mensaje);
            return false;
        }
    }
    
    return true;
}

function actualizarResumenReserva() {
    const summary = document.getElementById('booking-details');
    if (!summary) return;
    
    const form = document.getElementById('booking-form');
    if (!form) return;
    
    const formData = new FormData(form);
    let html = '';
    
    const servicioId = formData.get('service');
    if (servicioId) {
        const servicio = servicios.find(s => s.id == servicioId);
        if (servicio) {
            html += `<p><strong>Servicio:</strong> ${servicio.nombre}</p>`;
            html += `<p><strong>Precio:</strong> Bs ${servicio.precio}</p>`;
            html += `<p><strong>Duración:</strong> ${servicio.duracion} min</p>`;
        }
    }
    
    const estilistaId = formData.get('stylist');
    if (estilistaId) {
        if (estilistaId === 'any') {
            html += `<p><strong>Barbero:</strong> Cualquiera disponible</p>`;
        } else {
            const estilista = operarios.find(o => o.id == estilistaId);
            if (estilista) {
                html += `<p><strong>Barbero:</strong> ${estilista.nombre}</p>`;
            }
        }
    }
    
    const fecha = formData.get('booking-date');
    const hora = formData.get('booking-time');
    if (fecha && hora) {
        html += `<p><strong>Fecha:</strong> ${formatearFecha(fecha)}</p>`;
        html += `<p><strong>Hora:</strong> ${hora}</p>`;
    }
    
    const nombre = formData.get('nombre');
    const telefono = formData.get('telefono');
    const email = formData.get('email');
    
    if (nombre) html += `<p><strong>Nombre:</strong> ${nombre}</p>`;
    if (telefono) html += `<p><strong>Teléfono:</strong> ${telefono}</p>`;
    if (email) html += `<p><strong>Email:</strong> ${email}</p>`;
    
    summary.innerHTML = html || '<p>Selecciona los detalles de tu cita</p>';
}

function actualizarHorariosDisponibles() {
    const fechaInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');
    const operarioSeleccionado = document.querySelector('input[name="stylist"]:checked');
    
    if (!fechaInput || !timeSelect || !operarioSeleccionado) return;
    
    if (!fechaInput.value) {
        timeSelect.innerHTML = '<option value="">Selecciona hora</option>';
        return;
    }
    
    const operarioId = operarioSeleccionado.value === 'any' ? null : parseInt(operarioSeleccionado.value);
    const horariosDisponibles = sistemaReservas.obtenerHorariosDisponibles(fechaInput.value, operarioId);
    
    timeSelect.innerHTML = '<option value="">Selecciona hora</option>';
    
    horariosDisponibles.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario.hora;
        
        if (horario.disponible) {
            option.textContent = `${horario.hora} - ✅ Disponible`;
            if (horario.operariosDisponibles && horario.operariosDisponibles.length > 0) {
                option.textContent += ` (${horario.operariosDisponibles.map(op => op.nombre.split(' ')[0]).join(', ')})`;
            }
        } else {
            option.textContent = `${horario.hora} - ❌ No disponible`;
            option.disabled = true;
        }
        
        timeSelect.appendChild(option);
    });
}

async function procesarReserva(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    const servicioId = formData.get('service');
    const servicio = servicios.find(s => s.id == servicioId);
    if (!servicio) {
        mostrarAlerta('Por favor selecciona un servicio');
        return;
    }
    
    const estilistaId = formData.get('stylist');
    let estilistaNombre = 'Cualquiera disponible';
    let operarioIdValue = null;
    
    if (estilistaId !== 'any') {
        const estilista = operarios.find(o => o.id == estilistaId);
        if (estilista) {
            estilistaNombre = estilista.nombre;
            operarioIdValue = parseInt(estilistaId);
        }
    }
    
    const nombre = formData.get('nombre');
    const telefono = formData.get('telefono');
    const email = formData.get('email');
    
    if (!nombre || !telefono || !email) {
        mostrarAlerta('Por favor completa todos tus datos');
        return;
    }
    
    if (!validarEmail(email)) {
        mostrarAlerta('Por favor ingresa un email válido');
        return;
    }
    
    const reservaData = {
        servicio: servicio.nombre,
        servicioId: servicio.id,
        precio: servicio.precio,
        duracion: servicio.duracion,
        estilista: estilistaNombre,
        operarioId: operarioIdValue,
        fecha: formData.get('booking-date'),
        hora: formData.get('booking-time'),
        cliente: {
            nombre: nombre,
            telefono: telefono,
            email: email
        }
    };
    
    try {
        const reservaConfirmada = sistemaReservas.crearReserva(reservaData);
        
        // ENVIAR WHATSAPP AL BARBERO
        await sistemaReservas.enviarWhatsAppBarbero(reservaConfirmada);
        
        setTimeout(() => {
            mostrarConfirmacionReserva(reservaConfirmada);
            resetearFormulario();
        }, 1000);
        
    } catch (error) {
        mostrarAlerta(error.message);
    }
}

function resetearFormulario() {
    const form = document.getElementById('booking-form');
    if (form) {
        form.reset();
    }
    
    currentStep = 1;
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step-1').classList.add('active');
    
    document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
    
    actualizarResumenReserva();
    cargarHorarios();
}

// ===== UTILIDADES =====
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function formatearFecha(fechaString) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaString + 'T00:00:00').toLocaleDateString('es-ES', opciones);
}

function mostrarAlerta(mensaje, tipo = 'error') {
    const alertasExistentes = document.querySelectorAll('.custom-alert');
    alertasExistentes.forEach(alert => alert.remove());
    
    const alerta = document.createElement('div');
    alerta.className = `custom-alert ${tipo}`;
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        if (alerta.parentElement) {
            alerta.remove();
        }
    }, 5000);
}

function mostrarConfirmacionReserva(reserva) {
    const mensaje = `
        ✅ <strong>¡Reserva Confirmada!</strong><br><br>
        <strong>Servicio:</strong> ${reserva.servicio}<br>
        <strong>Barbero:</strong> ${reserva.estilista}<br>
        <strong>Fecha:</strong> ${formatearFecha(reserva.fecha)}<br>
        <strong>Hora:</strong> ${reserva.hora}<br>
        <strong>Precio:</strong> Bs ${reserva.precio}<br><br>
        <strong>Nombre:</strong> ${reserva.cliente.nombre}<br>
        <strong>Teléfono:</strong> ${reserva.cliente.telefono}<br>
        <strong>Email:</strong> ${reserva.cliente.email}<br><br>
        Te esperamos en Gregorio Style!
    `;
    
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: #1A1A1A; color: white; padding: 3rem; border-radius: 0; max-width: 500px; width: 100%; text-align: center; border: 2px solid #D4AF37;">
            <div style="font-size: 4rem; color: #D4AF37; margin-bottom: 1rem;">✓</div>
            <div style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; text-align: left;">${mensaje}</div>
            <button onclick="this.parentElement.parentElement.remove(); lanzarConfeti();" 
                    style="background: #D4AF37; color: #1A1A1A; border: none; padding: 12px 30px; border-radius: 0; font-weight: bold; cursor: pointer; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px;">
                Cerrar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(lanzarConfeti, 500);
}

function lanzarConfeti() {
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
}

// ===== ANIMACIONES =====
function setupScrollAnimations() {
    const elementosAnimables = document.querySelectorAll('.service-card, .team-card, .feature-card, .gallery-item');
    
    elementosAnimables.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(el);
    });
}

function inicializarMobileFeatures() {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    function ajustarAlturaHero() {
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth <= 768) {
            hero.style.height = `${window.innerHeight}px`;
        }
    }

    window.addEventListener('resize', ajustarAlturaHero);
    ajustarAlturaHero();
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// ===== FUNCIONES GLOBALES =====
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.nextStep = nextStep;
window.prevStep = prevStep;
window.lanzarConfeti = lanzarConfeti;
window.mostrarAlerta = mostrarAlerta;

console.log('🚀 Barbershop Gregorio Style - Sistema optimizado y listo!');

// ===== EXPORTAR SISTEMA DE RESERVAS PARA EL PANEL ADMIN =====
window.obtenerSistemaReservas = function() {
    return sistemaReservas;
};