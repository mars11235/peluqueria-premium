// ===== DECLARACIONES GLOBALES =====
if (typeof window.servicios === 'undefined') {
    window.servicios = [];
}

if (typeof window.operarios === 'undefined') {
    window.operarios = [];
}

// ===== SISTEMA DE RESERVAS =====
class SistemaReservas {
    constructor() {
        this.reservas = JSON.parse(localStorage.getItem('reservas_barberia')) || [];
        this.operarios = window.operarios;
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
}

// ===== GESTOR DE SERVICIOS =====
class ServiciosManager {
    constructor() {
        this.servicios = window.servicios;
        this.currentPage = 1;
        this.itemsPerPage = 50;
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
let sistemaReservas, serviciosManager, currentStep;

function initApp() {
    console.log('🔧 Inicializando aplicación...');
    
    // Inicializar variables
    sistemaReservas = window.sistemaReservas || new SistemaReservas();
    serviciosManager = window.serviciosManager || new ServiciosManager();
    currentStep = window.currentStep || 1;
    
    // Cargar componentes
    cargarServicios();
    cargarHorarios();
    inicializarNavegacion();
    inicializarFormularioReserva();
    inicializarFiltrosServicios();
    setupScrollAnimations();
    inicializarMobileFeatures();
    inicializarSistemaReservas();
    inicializarNavegacionSticky();
    inicializarProgresoReserva();
    inicializarFavoritos();
    inicializarAutoScroll();
    
    console.log('✅ Aplicación completamente inicializada!');
}

// ===== CARGAR SERVICIOS =====
function cargarServicios() {
    const servicesContainer = document.getElementById('services-container');
    const serviceSelect = document.getElementById('service-select');
    
    if (!servicesContainer || !serviceSelect) {
        console.log('❌ No se encontraron contenedores de servicios');
        return;
    }
    
    servicesContainer.innerHTML = '';
    serviceSelect.innerHTML = '';

    // Organizar servicios por categorías
    const categorias = {
        'clasico': 'CORTES CLÁSICOS',
        'fade': 'CORTES FADE',
        'diseno': 'CORTES CON DISEÑO',
        'barba': 'BARBA Y AFEITADO',
        'estetica': 'ESTÉTICA MASCULINA',
        'complementario': 'SERVICIOS COMPLEMENTARIOS',
        'paquete': 'PAQUETES ESPECIALES'
    };

    // Para la sección de servicios (grid)
    Object.keys(categorias).forEach(categoria => {
        const serviciosCategoria = serviciosManager.servicios.filter(s => s.categoria === categoria);
        if (serviciosCategoria.length > 0) {
            const categoriaTitle = document.createElement('div');
            categoriaTitle.className = 'service-category-title';
            categoriaTitle.textContent = categorias[categoria];
            categoriaTitle.style.gridColumn = '1 / -1';
            categoriaTitle.style.color = '#D4AF37';
            categoriaTitle.style.fontSize = '1.3rem';
            categoriaTitle.style.fontWeight = 'bold';
            categoriaTitle.style.margin = '2rem 0 1rem 0';
            categoriaTitle.style.paddingBottom = '0.5rem';
            categoriaTitle.style.borderBottom = '2px solid #D4AF37';
            categoriaTitle.style.textAlign = 'center';
            categoriaTitle.style.textTransform = 'uppercase';
            servicesContainer.appendChild(categoriaTitle);
            
            serviciosCategoria.forEach(servicio => {
                const serviceCard = crearServiceCard(servicio);
                servicesContainer.appendChild(serviceCard);
            });
        }
    });

    // Para el formulario de reservas (select)
    Object.keys(categorias).forEach(categoria => {
        const serviciosCategoria = serviciosManager.servicios.filter(s => s.categoria === categoria);
        if (serviciosCategoria.length > 0) {
            const categoriaOption = document.createElement('div');
            categoriaOption.className = 'service-category-title';
            categoriaOption.textContent = categorias[categoria];
            categoriaOption.style.marginTop = '1.5rem';
            categoriaOption.style.marginBottom = '0.5rem';
            categoriaOption.style.fontSize = '1rem';
            categoriaOption.style.color = '#D4AF37';
            categoriaOption.style.borderBottom = '1px solid #D4AF37';
            categoriaOption.style.paddingBottom = '0.5rem';
            serviceSelect.appendChild(categoriaOption);
            
            serviciosCategoria.forEach(servicio => {
                const serviceOption = crearServiceOption(servicio);
                serviceSelect.appendChild(serviceOption);
            });
        }
    });

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
            <strong>${servicio.nombre}</strong> 
            <span class="price-tag">Bs ${servicio.precio}</span>
            <span class="duration">(${servicio.duracion} min)</span>
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
    
    serviciosManager.resetPaginacion();
    serviciosManager.currentCategory = categoria;
    
    servicesContainer.innerHTML = '';
    
    if (categoria === 'all') {
        cargarServicios();
    } else {
        const serviciosFiltrados = serviciosManager.getServiciosPaginados(categoria);
        
        serviciosFiltrados.forEach(servicio => {
            const serviceCard = crearServiceCard(servicio);
            servicesContainer.appendChild(serviceCard);
        });
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

// ===== SISTEMA DE PAGO QR =====

function mostrarPagoQR() {
    if (!validarPasoActual(4)) {
        return;
    }

    // Obtener el servicio seleccionado y calcular monto
    const servicioSeleccionado = document.querySelector('input[name="service"]:checked');
    if (!servicioSeleccionado) {
        mostrarAlerta('Por favor selecciona un servicio primero');
        return;
    }

    const servicioId = servicioSeleccionado.value;
    const servicio = serviciosManager.servicios.find(s => s.id == servicioId);
    
    if (servicio) {
        // Actualizar monto en el QR
        document.getElementById('monto-pago').textContent = `Bs ${servicio.precio}`;
        
        // Cambiar al paso de pago
        document.getElementById('step-4').classList.remove('active');
        document.getElementById('step-5').classList.add('active');
        currentStep = 5;
        actualizarProgresoReserva(5);
        
        // Scroll al paso de pago
        setTimeout(() => {
            document.getElementById('step-5').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 300);
    }
}

function verificarPago() {
    // Obtener datos del formulario
    const formData = new FormData(document.getElementById('booking-form'));
    const servicioId = formData.get('service');
    const servicio = serviciosManager.servicios.find(s => s.id == servicioId);
    
    if (!servicio) {
        mostrarAlerta('Error: Servicio no encontrado');
        return;
    }

    // Mostrar modal de confirmación
    const modal = document.createElement('div');
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
        <div style="background: #1A1A1A; color: white; padding: 2rem; border-radius: 0; max-width: 400px; width: 100%; text-align: center; border: 2px solid #D4AF37;">
            <div style="font-size: 3rem; color: #D4AF37; margin-bottom: 1rem;">💬</div>
            <h3 style="margin-bottom: 1rem;">CONFIRMACIÓN DE PAGO</h3>
            <p style="margin-bottom: 1.5rem; color: #B0B0B0;">
                ¿Ya realizaste el pago mediante QR? 
                <br>Te enviaremos un mensaje por WhatsApp para verificar tu reserva.
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <button onclick="enviarWhatsAppVerificacion()" style="background: #25D366; color: white; border: none; padding: 12px 20px; border-radius: 5px; font-weight: bold; cursor: pointer;">
                    ✅ SÍ, YA PAGUÉ
                </button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #666; color: white; border: none; padding: 12px 20px; border-radius: 5px; font-weight: bold; cursor: pointer;">
                    ⏳ ESPERAR
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function cancelarPago() {
    // Regresar al paso 4 (datos del cliente)
    document.getElementById('step-5').classList.remove('active');
    document.getElementById('step-4').classList.add('active');
    currentStep = 4;
    actualizarProgresoReserva(4);
    
    mostrarAlerta('Pago cancelado. Puedes modificar tus datos.');
}

async function enviarWhatsAppVerificacion() {
    const form = document.getElementById('booking-form');
    const formData = new FormData(form);
    
    try {
        const servicioId = formData.get('service');
        const servicio = serviciosManager.servicios.find(s => s.id == servicioId);
        
        const estilistaId = formData.get('stylist');
        let estilistaNombre = 'Cualquiera disponible';
        
        if (estilistaId !== 'any') {
            const estilista = window.operarios.find(o => o.id == estilistaId);
            if (estilista) {
                estilistaNombre = estilista.nombre;
            }
        }
        
        const nombre = formData.get('nombre');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        
        const reservaData = {
            servicio: servicio.nombre,
            servicioId: servicio.id,
            precio: servicio.precio,
            duracion: servicio.duracion,
            estilista: estilistaNombre,
            fecha: formData.get('booking-date'),
            hora: formData.get('booking-time'),
            cliente: {
                nombre: nombre,
                telefono: telefono,
                email: email
            }
        };
        
        // 1. CREAR LA RESERVA
        const reservaConfirmada = sistemaReservas.crearReserva(reservaData);
        
       // 2. ENVIAR WHATSAPP UNIFICADO (cliente + dueño)
            enviarWhatsAppUnificado(reservaConfirmada);
        
        // 4. MOSTRAR CONFIRMACIÓN
        setTimeout(() => {
            mostrarConfirmacionReserva(reservaConfirmada);
            resetearFormulario();
        }, 1000);
        
    } catch (error) {
        mostrarAlerta(error.message);
    }
}

// NUEVA FUNCIÓN: WhatsApp Unificado (para cliente y dueño)
function enviarWhatsAppUnificado(reserva) {
    const telefonoCliente = reserva.cliente.telefono.replace(/\D/g, '');
    
    // MENSAJE UNIFICADO - Cliente y Dueño en el mismo mensaje
    const mensajeUnificado = `✅ *RESERVA CONFIRMADA - GREGORIO STYLE* ✅

*👋 ¡Hola ${reserva.cliente.nombre}!*

*📋 DETALLES DE TU RESERVA:*
✂️ *Servicio:* ${reserva.servicio}
💰 *Precio:* Bs ${reserva.precio}
⏱ *Duración:* ${reserva.duracion} min
👨‍💼 *Barbero:* ${reserva.estilista}
📅 *Fecha:* ${reserva.fecha}
🕐 *Hora:* ${reserva.hora}

*📍 Dirección:*
Ecuador y Pasaje del Maestro
📞 *Teléfono:* 67233590

*💡 INSTRUCCIONES IMPORTANTES:*
• Llega 5 minutos antes
• Trae tu comprobante de pago QR
• Cancelación con 2 horas de anticipación

━━━━━━━━━━━━━━━━━━━━━━━━

*🪒 INFORMACIÓN PARA EL BARBERO 🪒*

*👤 DATOS DEL CLIENTE:*
• *Nombre:* ${reserva.cliente.nombre}
• *Teléfono:* ${reserva.cliente.telefono}
• *Email:* ${reserva.cliente.email}

*📅 DETALLES DE LA CITA:*
• *Servicio:* ${reserva.servicio}
• *Precio:* Bs ${reserva.precio}
• *Duración:* ${reserva.duracion} min
• *Barbero:* ${reserva.estilista}
• *Fecha:* ${reserva.fecha}
• *Hora:* ${reserva.hora}

*💰 PAGO CONFIRMADO MEDIANTE QR*
*✅ RESERVA REGISTRADA EN SISTEMA*

*⏰ Fecha de reserva:* ${new Date().toLocaleString('es-ES')}

━━━━━━━━━━━━━━━━━━━━━━━━

*¡Gracias por elegir Gregorio Style!* 🪒✨`;

    const mensajeCodificado = encodeURIComponent(mensajeUnificado);
    const urlWhatsApp = `https://wa.me/${telefonoCliente}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp - SOLO UNA VENTANA
    window.open(urlWhatsApp, '_blank');
    
    // ENVIAR NOTIFICACIÓN POR EMAIL COMO RESPALDO
    enviarNotificacionReserva(reserva);
}

// FUNCIÓN DE RESPALDO: Notificación por email
function enviarNotificacionReserva(reserva) {
    const asunto = `NUEVA RESERVA - ${reserva.cliente.nombre} - ${reserva.fecha} ${reserva.hora}`;
    const cuerpoEmail = `
NUEVA RESERVA CONFIRMADA - GREGORIO STYLE
──────────────────────────────────────

INFORMACIÓN DEL CLIENTE:
• Nombre: ${reserva.cliente.nombre}
• Teléfono: ${reserva.cliente.telefono}
• Email: ${reserva.cliente.email}

DETALLES DE LA RESERVA:
• Servicio: ${reserva.servicio}
• Precio: Bs ${reserva.precio}
• Duración: ${reserva.duracion} min
• Barbero: ${reserva.estilista}
• Fecha: ${reserva.fecha}
• Hora: ${reserva.hora}

ESTADO: PAGO CONFIRMADO MEDIANTE QR
RESERVA REGISTRADA EN EL SISTEMA

Fecha de registro: ${new Date().toLocaleString('es-ES')}
──────────────────────────────────────
Gregorio Style - Ecuador y Pasaje del Maestro
Teléfono: 67233590
    `;
    
    // Crear enlace para email
    const mailtoLink = `mailto:gregoriostyle@email.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoEmail)}`;
    
    // Intentar abrir email después de 3 segundos (opcional)
    setTimeout(() => {
        try {
            window.location.href = mailtoLink;
        } catch (e) {
            console.log('Email no disponible, pero la reserva está confirmada');
        }
    }, 3000);
}

// FUNCIÓN MEJORADA: Enviar WhatsApp al CLIENTE para verificación
async function enviarWhatsAppCliente(reserva) {
    const telefonoCliente = reserva.cliente.telefono.replace(/\D/g, '');
    
    const mensajeCliente = `✅ RESERVA CONFIRMADA - GREGORIO STYLE

¡Hola ${reserva.cliente.nombre}! 

📋 DETALLES DE TU RESERVA:
✂️ Servicio: ${reserva.servicio}
💰 Precio: Bs ${reserva.precio}
⏱ Duración: ${reserva.duracion} min
👨‍💼 Barbero: ${reserva.estilista}
📅 Fecha: ${reserva.fecha}
🕐 Hora: ${reserva.hora}

📍 Dirección: Ecuador y Pasaje del Maestro
📞 Teléfono: 67233590

💡 IMPORTANTE:
• Llega 5 minutos antes
• Trae tu comprobante de pago
• Cancelación con 2 horas de anticipación

¡Te esperamos en Gregorio Style! 🪒`;
    
    const mensajeCodificado = encodeURIComponent(mensajeCliente);
    const urlWhatsApp = `https://wa.me/${telefonoCliente}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp para el cliente
    window.open(urlWhatsApp, '_blank');
    return true;
}

// FUNCIÓN MEJORADA: Enviar WhatsApp al DUEÑO de la barbería
async function enviarWhatsAppBarbero(reserva) {
    const telefonoBarbero = "59172346861"; // ⬅️ NÚMERO DEL DUEÑO
    
    const mensajeBarbero = `🪒 NUEVA RESERVA CONFIRMADA - GREGORIO STYLE

👤 CLIENTE:
• Nombre: ${reserva.cliente.nombre}
• Teléfono: ${reserva.cliente.telefono}
• Email: ${reserva.cliente.email}

📋 DETALLES DE LA RESERVA:
• Servicio: ${reserva.servicio}
• Precio: Bs ${reserva.precio}
• Duración: ${reserva.duracion} min
• Barbero: ${reserva.estilista}
• Fecha: ${reserva.fecha}
• Hora: ${reserva.hora}

💰 PAGO CONFIRMADO MEDIANTE QR
✅ RESERVA CONFIRMADA

📅 ${new Date().toLocaleString('es-ES')}`;

    const mensajeCodificado = encodeURIComponent(mensajeBarbero);
    const urlWhatsApp = `https://wa.me/${telefonoBarbero}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp para el dueño
    window.open(urlWhatsApp, '_blank');
    return true;
}

// ===== FUNCIONES DEL FORMULARIO MULTIPASO =====
function nextStep(step) {
    if (validarPasoActual(currentStep)) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        document.getElementById(`step-${step}`).classList.add('active');
        currentStep = step;
        actualizarResumenReserva();
        actualizarProgresoReserva(step);
        
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
    actualizarProgresoReserva(step);
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
                window.operarios.find(op => op.id === operarioId)?.nombre : 'barberos';
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
        const servicio = serviciosManager.servicios.find(s => s.id == servicioId);
        if (servicio) {
            html += `<p><strong>Servicio:</strong> ${servicio.nombre}</p>`;
            html += `<p><strong>Precio:</strong> <span style="color: #D4AF37; font-weight: bold;">Bs ${servicio.precio}</span></p>`;
            html += `<p><strong>Duración:</strong> ${servicio.duracion} min</p>`;
        }
    }
    
    const estilistaId = formData.get('stylist');
    if (estilistaId) {
        if (estilistaId === 'any') {
            html += `<p><strong>Barbero:</strong> Cualquiera disponible</p>`;
        } else {
            const estilista = window.operarios.find(o => o.id == estilistaId);
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
    // Esta función ya no se usa directamente
    // El flujo ahora es: Datos → Pago QR → WhatsApp
    console.log('Flujo de reserva modificado - usar sistema de pago QR');
    mostrarAlerta('Por favor completa el proceso de pago QR para confirmar tu reserva.');
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
        Te hemos enviado un mensaje por WhatsApp con los detalles.<br>
        ¡Te esperamos en Gregorio Style!
    `;
    
    const modal = document.createElement('div');
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
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
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
window.mostrarPagoQR = mostrarPagoQR;
window.verificarPago = verificarPago;
window.cancelarPago = cancelarPago;
window.enviarWhatsAppVerificacion = enviarWhatsAppVerificacion;

// ===== PANEL ADMIN FUNCTIONS =====
window.togglePanelAdmin = function() {
    const modal = document.getElementById('modalAdmin');
    if (modal.style.display === 'none' || !modal.style.display) {
        modal.style.display = 'block';
        cargarCalendario();
    } else {
        modal.style.display = 'none';
    }
};

window.cargarCalendario = function() {
    try {
        const reservas = sistemaReservas.obtenerReservas();
        mostrarEstadisticas(reservas);
        mostrarReservas(reservas);
    } catch (error) {
        console.error('Error cargando calendario:', error);
    }
};

window.filtrarReservas = function() {
    cargarCalendario();
};

function mostrarEstadisticas(reservas) {
    const hoy = new Date().toISOString().split('T')[0];
    const reservasHoy = reservas.filter(r => r.fecha === hoy).length;
    const reservasTotal = reservas.length;
    const ingresosTotal = reservas.reduce((sum, r) => sum + (parseInt(r.precio) || 0), 0);

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
                <div style="font-size: 2rem; color: #2196F3;">Bs ${ingresosTotal}</div>
                <div style="font-size: 0.8rem;">Ingresos Totales</div>
            </div>
        `;
    }
}

function mostrarReservas(reservas) {
    const filtroFecha = document.getElementById('filtroFecha')?.value || '';
    const filtroBarbero = document.getElementById('filtroBarbero')?.value || '';

    let reservasFiltradas = reservas;
    
    if (filtroFecha) {
        reservasFiltradas = reservasFiltradas.filter(r => r.fecha === filtroFecha);
    }
    
    if (filtroBarbero) {
        reservasFiltradas = reservasFiltradas.filter(r => r.estilista === filtroBarbero);
    }

    const listaReservasEl = document.getElementById('listaReservas');
    if (!listaReservasEl) return;

    if (reservasFiltradas.length === 0) {
        listaReservasEl.innerHTML = '<div style="text-align: center; padding: 3rem; color: #888;">No hay reservas con los filtros aplicados</div>';
        return;
    }

    const html = reservasFiltradas.map(reserva => {
        const cliente = reserva.cliente || {};
        return `
        <div style="background: #2A2A2A; padding: 1.5rem; margin-bottom: 1rem; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <div style="display: grid; grid-template-columns: 2fr 1fr auto; gap: 1rem; align-items: start;">
                <div>
                    <h4 style="color: #D4AF37; margin: 0 0 0.5rem 0;">${cliente.nombre || 'Sin nombre'}</h4>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">📞 ${cliente.telefono || 'Sin teléfono'}</p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">📧 ${cliente.email || 'Sin email'}</p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">✂️ ${reserva.servicio}</p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">💈 ${reserva.estilista}</p>
                </div>
                <div>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;"><strong>📅 ${reserva.fecha}</strong></p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;"><strong>⏰ ${reserva.hora}</strong></p>
                    <p style="margin: 0.2rem 0; font-size: 0.9rem;">💰 Bs ${reserva.precio}</p>
                </div>
                <div>
                    <button onclick="eliminarReserva(${reserva.id})" style="padding: 5px 10px; background: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 0.8rem;">
                        ❌ Eliminar
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');

    listaReservasEl.innerHTML = html;
}

window.eliminarReserva = function(id) {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
        const todasReservas = sistemaReservas.obtenerReservas();
        const nuevasReservas = todasReservas.filter(r => r.id !== id);
        sistemaReservas.reservas = nuevasReservas;
        sistemaReservas.guardarEnLocalStorage();
        cargarCalendario();
        mostrarAlerta('✅ Reserva eliminada correctamente', 'success');
    }
};

// ===== NUEVO: Sistema de favoritos =====
const serviciosFavoritos = JSON.parse(localStorage.getItem('servicios_favoritos')) || [];

// ===== NUEVAS FUNCIONES PARA MEJORAR USABILIDAD =====

// 1. Navegación sticky de categorías
function inicializarNavegacionSticky() {
    const categoriesHTML = `
        <div class="services-navigation">
            <div class="category-quick-nav">
                <button class="quick-category-btn active" data-category="all">⭐ Todos</button>
                <button class="quick-category-btn" data-category="clasico">✂️ Clásicos</button>
                <button class="quick-category-btn" data-category="fade">💈 Fades</button>
                <button class="quick-category-btn" data-category="diseno">🎨 Diseño</button>
                <button class="quick-category-btn" data-category="barba">🧔 Barba</button>
                <button class="quick-category-btn" data-category="estetica">✨ Estética</button>
                <button class="quick-category-btn" data-category="paquete">📦 Paquetes</button>
            </div>
        </div>
    `;

    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        const categoriesContainer = servicesSection.querySelector('.services-categories');
        if (categoriesContainer) {
            categoriesContainer.insertAdjacentHTML('afterend', categoriesHTML);
            setupQuickNavigation();
        }
    }
}

function setupQuickNavigation() {
    const quickBtns = document.querySelectorAll('.quick-category-btn');
    
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            quickBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-category');
            filtrarServicios(categoria);
            
            // Scroll suave a la sección
            document.querySelector('.services').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// 2. Indicador de progreso de reserva
function inicializarProgresoReserva() {
    const progressHTML = `
        <div class="booking-progress">
            <div class="progress-step">
                <div class="step-indicator active">1</div>
                <div class="step-label active">Servicio</div>
            </div>
            <div class="progress-step">
                <div class="step-indicator">2</div>
                <div class="step-label">Barbero</div>
            </div>
            <div class="progress-step">
                <div class="step-indicator">3</div>
                <div class="step-label">Fecha/Hora</div>
            </div>
            <div class="progress-step">
                <div class="step-indicator">4</div>
                <div class="step-label">Datos</div>
            </div>
            <div class="progress-step">
                <div class="step-indicator">5</div>
                <div class="step-label">Pago</div>
            </div>
        </div>
    `;

    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.insertAdjacentHTML('afterbegin', progressHTML);
    }
}

function inicializarAutoScroll() {
    // Auto-scroll al seleccionar opciones
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            setTimeout(() => {
                scrollToNextStep(1);
            }, 400);
        });
    });
    
    document.querySelectorAll('.stylist-option').forEach(option => {
        option.addEventListener('click', function() {
            setTimeout(() => {
                scrollToNextStep(2);
            }, 400);
        });
    });
    
    // Auto-scroll al cambiar fecha/hora
    document.getElementById('booking-date')?.addEventListener('change', function() {
        setTimeout(() => {
            scrollToNextStep(3);
        }, 600);
    });
    
    document.getElementById('booking-time')?.addEventListener('change', function() {
        setTimeout(() => {
            scrollToNextStep(3);
        }, 600);
    });
    
    // Auto-scroll al enfocar inputs de cliente
    document.querySelectorAll('.client-info input').forEach(input => {
        input.addEventListener('focus', function() {
            setTimeout(() => {
                scrollToNextStep(4);
            }, 500);
        });
    });
}

function scrollToNextStep(stepNumber) {
    const stepElement = document.getElementById(`step-${stepNumber}`);
    if (!stepElement) return;
    
    const nextButton = stepElement.querySelector('.form-next, .form-submit');
    if (nextButton) {
        const buttonRect = nextButton.getBoundingClientRect();
        const offsetTop = buttonRect.top + window.pageYOffset;
        
        // Scroll suave al botón
        window.scrollTo({
            top: offsetTop - 120,
            behavior: 'smooth'
        });
        
        // Efecto de atención
        highlightButton(nextButton);
    }
}

function highlightButton(button) {
    button.classList.add('highlight');
    setTimeout(() => {
        button.classList.remove('highlight');
    }, 2000);
}

// Actualizar progreso
function actualizarProgresoReserva(paso) {
    const indicators = document.querySelectorAll('.step-indicator');
    const labels = document.querySelectorAll('.step-label');
    
    indicators.forEach((indicator, index) => {
        if (index < paso) {
            indicator.classList.add('active');
            labels[index].classList.add('active');
        } else {
            indicator.classList.remove('active');
            labels[index].classList.remove('active');
        }
    });
}

// 3. Sistema de favoritos
function inicializarFavoritos() {
    // Agregar botones de favorito a las tarjetas de servicio
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            const servicio = serviciosManager.servicios[index];
            if (servicio) {
                const favoriteBtn = document.createElement('button');
                favoriteBtn.className = 'favorite-btn';
                favoriteBtn.innerHTML = serviciosFavoritos.includes(servicio.id) ? '❤️' : '🤍';
                favoriteBtn.onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorito(servicio.id, favoriteBtn);
                };
                
                card.style.position = 'relative';
                card.appendChild(favoriteBtn);
            }
        });
    }, 1000);
}

function toggleFavorito(servicioId, boton) {
    const index = serviciosFavoritos.indexOf(servicioId);
    
    if (index > -1) {
        serviciosFavoritos.splice(index, 1);
        boton.innerHTML = '🤍';
    } else {
        serviciosFavoritos.push(servicioId);
        boton.innerHTML = '❤️';
    }
    
    localStorage.setItem('servicios_favoritos', JSON.stringify(serviciosFavoritos));
    mostrarAlerta('Favoritos actualizados', 'success');
}

// ===== AGREGAR ESTILOS PARA FAVORITOS =====
const favoriteStyles = `
    .favorite-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .favorite-btn:hover {
        background: rgba(212, 175, 55, 0.9);
        transform: scale(1.1);
    }
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = favoriteStyles;
document.head.appendChild(styleSheet);

console.log('🚀 Barbershop Gregorio Style - Sistema optimizado y listo!');

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}