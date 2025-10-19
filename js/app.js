// Variables globales
let deferredPrompt;
let swRegistration = null;

// Datos simulados
const datosProductos = [
    { id: 1, nombre: 'Laptop Gaming', precio: '$1,299', descripcion: 'Potente laptop para gaming y trabajo' },
    { id: 2, nombre: 'Smartphone Pro', precio: '$899', descripcion: 'Último modelo con cámara avanzada' },
    { id: 3, nombre: 'Auriculares Bluetooth', precio: '$199', descripcion: 'Audio de alta calidad sin cables' },
    { id: 4, nombre: 'Tablet 10"', precio: '$449', descripcion: 'Perfecta para productividad y entretenimiento' },
    { id: 5, nombre: 'Smartwatch', precio: '$299', descripcion: 'Monitorea tu salud y mantente conectado' },
    { id: 6, nombre: 'Cámara Digital', precio: '$699', descripcion: 'Captura momentos con calidad profesional' }
];

const datosNoticias = [
    {
        id: 1,
        titulo: 'Nueva actualización de la aplicación',
        contenido: 'Hemos añadido nuevas funcionalidades y mejorado el rendimiento.',
        fecha: '2024-01-15'
    },
    {
        id: 2,
        titulo: 'Funcionalidad offline mejorada',
        contenido: 'Ahora puedes usar más funciones sin conexión a internet.',
        fecha: '2024-01-10'
    },
    {
        id: 3,
        titulo: 'Nuevo diseño responsive',
        contenido: 'La aplicación se ve mejor en todos los dispositivos.',
        fecha: '2024-01-05'
    }
];

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
    registrarServiceWorker();
    configurarEventos();
    cargarTareas();
    verificarEstadoConexion();
});

// Inicializar la aplicación
function inicializarApp() {
    console.log('Inicializando aplicación PWA...');
    
    // Configurar evento de instalación
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        mostrarNotificacionInstalacion();
    });

    // Detectar cuando la app es instalada
    window.addEventListener('appinstalled', () => {
        console.log('PWA instalada exitosamente');
        ocultarNotificacionInstalacion();
    });
}

// Registrar Service Worker
async function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            swRegistration = await navigator.serviceWorker.register('sw.js');
            console.log('Service Worker registrado:', swRegistration);
            actualizarEstadoSW('Activo');
            
            // Escuchar actualizaciones del SW
            swRegistration.addEventListener('updatefound', () => {
                console.log('Nueva versión del Service Worker disponible');
            });
        } catch (error) {
            console.error('Error al registrar Service Worker:', error);
            actualizarEstadoSW('Error');
        }
    } else {
        console.log('Service Worker no soportado');
        actualizarEstadoSW('No soportado');
    }
}

// Configurar eventos
function configurarEventos() {
    // Menú móvil
    const botonMenu = document.getElementById('botonMenu');
    const menuPrincipal = document.getElementById('menuPrincipal');
    
    botonMenu.addEventListener('click', () => {
        menuPrincipal.classList.toggle('activo');
    });

    // Navegación
    const enlacesMenu = document.querySelectorAll('.enlace-menu');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            const vista = e.target.dataset.vista;
            cambiarVista(vista);
            
            // Cerrar menú móvil
            menuPrincipal.classList.remove('activo');
            
            // Actualizar enlace activo
            enlacesMenu.forEach(e => e.classList.remove('activo'));
            e.target.classList.add('activo');
        });
    });

    // Tareas
    const botonAgregar = document.getElementById('agregarTarea');
    const inputTarea = document.getElementById('nuevaTarea');
    
    botonAgregar.addEventListener('click', agregarTarea);
    inputTarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });

    // Instalación
    const botonInstalar = document.getElementById('instalarApp');
    const botonCerrar = document.getElementById('cerrarNotificacion');
    
    botonInstalar.addEventListener('click', instalarApp);
    botonCerrar.addEventListener('click', ocultarNotificacionInstalacion);

    // Actualizar caché
    const botonActualizar = document.getElementById('actualizarCache');
    botonActualizar.addEventListener('click', actualizarCache);

    // Estado de conexión
    window.addEventListener('online', () => {
        actualizarEstadoConexion(true);
        ocultarNotificacionSinConexion();
    });
    
    window.addEventListener('offline', () => {
        actualizarEstadoConexion(false);
        mostrarNotificacionSinConexion();
    });
}

// Cambiar vista
function cambiarVista(nombreVista) {
    // Ocultar todas las vistas
    const vistas = document.querySelectorAll('.vista');
    vistas.forEach(vista => vista.classList.add('oculto'));
    
    // Mostrar vista seleccionada
    const vistaActiva = document.getElementById(`vista-${nombreVista}`);
    if (vistaActiva) {
        vistaActiva.classList.remove('oculto');
        
        // Cargar contenido dinámico según la vista
        switch (nombreVista) {
            case 'productos':
                cargarProductos();
                break;
            case 'noticias':
                cargarNoticias();
                break;
        }
    }
}

// Cargar productos
function cargarProductos() {
    const contenedor = document.getElementById('listaProductos');
    const cargando = document.getElementById('cargandoProductos');
    
    // Simular carga
    setTimeout(() => {
        cargando.style.display = 'none';
        contenedor.innerHTML = '';
        
        datosProductos.forEach(producto => {
            const elementoProducto = document.createElement('div');
            elementoProducto.className = 'producto';
            elementoProducto.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="precio">${producto.precio}</div>
            `;
            contenedor.appendChild(elementoProducto);
        });
    }, 1000);
}

// Cargar noticias
function cargarNoticias() {
    const contenedor = document.getElementById('listaNoticias');
    const cargando = document.getElementById('cargandoNoticias');
    
    // Simular carga
    setTimeout(() => {
        cargando.style.display = 'none';
        contenedor.innerHTML = '';
        
        datosNoticias.forEach(noticia => {
            const elementoNoticia = document.createElement('div');
            elementoNoticia.className = 'noticia';
            elementoNoticia.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <div class="fecha">${formatearFecha(noticia.fecha)}</div>
                <p>${noticia.contenido}</p>
            `;
            contenedor.appendChild(elementoNoticia);
        });
    }, 800);
}

// Gestión de tareas
function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    mostrarTareas(tareas);
}

function agregarTarea() {
    const input = document.getElementById('nuevaTarea');
    const texto = input.value.trim();
    
    if (texto) {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        const nuevaTarea = {
            id: Date.now(),
            texto: texto,
            completada: false,
            fecha: new Date().toISOString()
        };
        
        tareas.push(nuevaTarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        
        input.value = '';
        mostrarTareas(tareas);
    }
}

function mostrarTareas(tareas) {
    const contenedor = document.getElementById('listaTareas');
    contenedor.innerHTML = '';
    
    if (tareas.length === 0) {
        contenedor.innerHTML = '<div class="tarea">No hay tareas pendientes</div>';
        return;
    }
    
    tareas.forEach(tarea => {
        const elementoTarea = document.createElement('div');
        elementoTarea.className = `tarea ${tarea.completada ? 'completada' : ''}`;
        elementoTarea.innerHTML = `
            <span onclick="toggleTarea(${tarea.id})">${tarea.texto}</span>
            <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        `;
        contenedor.appendChild(elementoTarea);
    });
}

function toggleTarea(id) {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        localStorage.setItem('tareas', JSON.stringify(tareas));
        mostrarTareas(tareas);
    }
}

function eliminarTarea(id) {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const tareasActualizadas = tareas.filter(t => t.id !== id);
    localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
    mostrarTareas(tareasActualizadas);
}

// Instalación de PWA
function mostrarNotificacionInstalacion() {
    const notificacion = document.getElementById('notificacionInstalacion');
    notificacion.classList.remove('oculto');
}

function ocultarNotificacionInstalacion() {
    const notificacion = document.getElementById('notificacionInstalacion');
    notificacion.classList.add('oculto');
}

async function instalarApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('Usuario aceptó la instalación');
        } else {
            console.log('Usuario rechazó la instalación');
        }
        
        deferredPrompt = null;
        ocultarNotificacionInstalacion();
    }
}

// Estado de conexión
function verificarEstadoConexion() {
    actualizarEstadoConexion(navigator.onLine);
}

function actualizarEstadoConexion(enLinea) {
    const estadoConexion = document.getElementById('estadoConexion');
    estadoConexion.textContent = enLinea ? 'En línea' : 'Sin conexión';
    estadoConexion.style.color = enLinea ? '#4CAF50' : '#f44336';
}

function mostrarNotificacionSinConexion() {
    let notificacion = document.querySelector('.sin-conexion');
    if (!notificacion) {
        notificacion = document.createElement('div');
        notificacion.className = 'sin-conexion';
        notificacion.textContent = 'Sin conexión a internet. Funcionando en modo offline.';
        document.body.appendChild(notificacion);
    }
}

function ocultarNotificacionSinConexion() {
    const notificacion = document.querySelector('.sin-conexion');
    if (notificacion) {
        notificacion.remove();
    }
}

function actualizarEstadoSW(estado) {
    const estadoSW = document.getElementById('estadoSW');
    if (estadoSW) {
        estadoSW.textContent = estado;
    }
}

async function actualizarCache() {
    if (swRegistration) {
        try {
            await swRegistration.update();
            console.log('Caché actualizado');
            alert('Caché actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar caché:', error);
            alert('Error al actualizar caché');
        }
    }
}

// Utilidades
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Hacer funciones globales para los eventos onclick
window.toggleTarea = toggleTarea;
window.eliminarTarea = eliminarTarea;