const CACHE_NAME = 'mi-pwa-v1';
const urlsToCache = [
    '/shell/',
    '/shell/index.html',
    '/shell/css/estilos.css',
    '/shell/js/app.js',
    '/shell/manifest.json',
    '/shell/iconos/icono-192x192.png',
    '/shell/iconos/icono-512x512.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Archivos en caché');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Error al cachear archivos:', error);
            })
    );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar peticiones de red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si el archivo está en caché, devolverlo
                if (response) {
                    return response;
                }
                
                // Si no está en caché, intentar obtenerlo de la red
                return fetch(event.request)
                    .then(response => {
                        // Verificar si la respuesta es válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clonar la respuesta
                        const responseToCache = response.clone();
                        
                        // Agregar al caché
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Si falla la red, mostrar página offline para navegación
                        if (event.request.destination === 'document') {
                            return caches.match('/shell/index.html');
                        }
                    });
            })
    );
});

// Manejar mensajes del cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Sincronización en segundo plano
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Service Worker: Sincronización en segundo plano');
        event.waitUntil(sincronizarDatos());
    }
});

// Función para sincronizar datos
async function sincronizarDatos() {
    try {
        // Aquí puedes implementar lógica para sincronizar datos
        // cuando se recupere la conexión
        console.log('Sincronizando datos...');
        
        // Ejemplo: enviar tareas pendientes al servidor
        const tareas = await obtenerTareasPendientes();
        if (tareas.length > 0) {
            await enviarTareasAlServidor(tareas);
        }
    } catch (error) {
        console.error('Error en sincronización:', error);
    }
}

// Funciones auxiliares para sincronización
async function obtenerTareasPendientes() {
    // Implementar lógica para obtener tareas pendientes de sincronizar
    return [];
}

async function enviarTareasAlServidor(tareas) {
    // Implementar lógica para enviar tareas al servidor
    console.log('Enviando tareas al servidor:', tareas);
}