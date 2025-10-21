
# 🪒 Barbershop Gregorio Style

Sistema web profesional de reservas para barbería con panel de administración integrado.

## 🚀 Características

### ✨ Para Clientes
- **Catálogo de servicios** con precios y duraciones
- **Sistema de reservas online** en 4 pasos simples
- **Selección de barbero** preferido
- **Confirmación inmediata** con ID único
- **Diseño responsive** para todos los dispositivos

### 🛠️ Para el Barbero
- **Panel de administración** privado
- **Notificaciones en tiempo real** de nuevas reservas
- **Integración con Google Calendar**
- **Gestión completa** de reservas
- **Estadísticas automáticas**
- **Acciones rápidas** (WhatsApp, Llamar)

## 📁 Estructura del Proyecto
barbershop-gregorio-style/
├── index.html # Página principal para clientes
├── panel-barbero.html # Panel de administración (PRIVADO)
├── css/
│ ├── style.css # Estilos principales
│ └── responsive.css # Estilos responsive
├── js/
│ ├── main.js # Sistema de reservas principal
│ └── animaciones.js # Animaciones y efectos
├── images/ # Imágenes del sitio
│ ├── roberto.jpg # Foto barbero 1
│ ├── kevin.jpg # Foto barbero 2
│ ├── cr1.jpg # Trabajo de muestra 1
│ ├── cr2.jpg # Trabajo de muestra 2
│ ├── cr3.jpg # Trabajo de muestra 3
│ └── cr4.jpg # Trabajo de muestra 4
└── videos/
└── barber.mp4 # Video de fondo hero

text

## 🛠️ Instalación y Configuración

### Requisitos
- Navegador web moderno
- Servidor local (opcional, funciona con file://)

### Instalación Rápida
1. **Descarga** todos los archivos
2. **Abre** `index.html` en tu navegador
3. **Listo** - El sistema funciona inmediatamente

### Para Desarrollo
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/barbershop-gregorio-style.git

# Abrir en servidor local (opcional)
cd barbershop-gregorio-style
python -m http.server 8000
# Ahora ve a http://localhost:8000
📱 Uso del Sistema
Para Clientes
Visita index.html

Navega por los servicios

Haz clic en "RESERVAR CITA"

Completa el formulario de 4 pasos

Recibe confirmación inmediata

Para el Barbero (Administrador)
Abre panel-barbero.html

Ve todas las reservas en tiempo real

Usa los filtros por fecha y barbero

Agrega al calendario con un clic

Contacta clientes directamente

⚙️ Configuración
Personalización Básica
Información de contacto: Edita el footer en index.html

Servicios y precios: Modifica el array servicios en main.js

Barberos: Actualiza el array operarios en main.js

Horarios disponibles: Modifica en cargarHorarios() en main.js

Configuración Avanzada
javascript
// En main.js - Personalizar horarios
const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

// En main.js - Personalizar servicios
const servicios = [
    {
        id: 1,
        nombre: "Corte Escolar",
        precio: 12,
        duracion: 30,
        categoria: "clasico",
        icono: "fas fa-scissors",
        caracteristicas: ["Corte tradicional", "Perfecto para niños", "Líneas definidas"]
    },
    // ... más servicios
];
🎨 Personalización
Colores (CSS Variables)
css
:root {
    --dorado-premium: #D4AF37;    /* Color principal dorado */
    --negro-profundo: #0A0A0A;    /* Fondo principal */
    --negro-secundario: #1A1A1A;  /* Fondos secundarios */
    --blanco-hueso: #F5F5F5;      /* Texto principal */
}
Tipografía
Principal: Montserrat (Google Fonts)

Pesos: 300, 400, 600, 700

📊 Características Técnicas
Frontend
HTML5 semántico

CSS3 con Grid y Flexbox

JavaScript ES6+ vanilla

Responsive Design mobile-first

Accesibilidad WCAG

Almacenamiento
LocalStorage para persistencia de datos

Sin base de datos externa requerida

Backup automático en navegador

Performance
Imágenes optimizadas (lazy loading)

CSS/JS minificado

Carga rápida (< 3s)

🔒 Seguridad y Privacidad
Panel admin separado (panel-barbero.html)

Datos locales en el navegador del barbero

Sin tracking de usuarios

GDPR compliant

🌐 Navegadores Compatibles
✅ Chrome 90+

✅ Firefox 88+

✅ Safari 14+

✅ Edge 90+

✅ Mobile browsers

📈 Estadísticas Incluidas
Reservas totales

Reservas del día

Clientes únicos

Ingresos estimados

Horas ocupadas

🚀 Características Futuras
Notificaciones push

Integración con WhatsApp Business API

Sistema de recordatorios automáticos

Reportes avanzados

Multi-idioma

Tema oscuro/claro

🐛 Solución de Problemas
Problemas Comunes
Las reservas no se guardan

Verifica que JavaScript esté habilitado

Revisa la consola del navegador (F12)

El panel admin no carga reservas

Asegúrate de usar panel-barbero.html

Verifica que hayan reservas en index.html

Diseño no se ve bien en móvil

Verifica la etiqueta viewport

Limpia cache del navegador

Debugging
javascript
// En consola del navegador
console.log('Reservas:', JSON.parse(localStorage.getItem('reservas_barberia')));
console.log('Servicios:', servicios);
🤝 Contribución
Fork el proyecto

Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abre un Pull Request

📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

📞 Soporte
Si encuentras algún problema o tienes preguntas:

Revisa la sección de solución de problemas

Abre un issue en GitHub

>>>>>>> 1010cd0eae66acc69437fa9ecea4c858c2b8fe00
Contacta al desarrollador