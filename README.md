# Mi Aplicación PWA

Una aplicación web progresiva (PWA) completa con funcionalidad offline, desarrollada con HTML5, CSS3 y JavaScript vanilla.

## 🚀 Características

- **App Shell**: Estructura de aplicación con carga rápida
- **Funcionalidad Offline**: Funciona sin conexión a internet
- **Instalable**: Se puede instalar como aplicación nativa
- **Responsive**: Adaptable a todos los dispositivos
- **Service Worker**: Gestión inteligente de caché
- **Contenido Dinámico**: Simulación de datos en tiempo real

## 📁 Estructura del Proyecto
Mi-PWA/
├── index.html              # Página principal con App Shell
├── manifest.json           # Manifiesto de la PWA
├── sw.js                  # Service Worker
├── css/
│   └── estilos.css        # Estilos de la aplicación
├── js/
│   └── app.js             # Lógica principal de la aplicación
├── iconos/
│   ├── generar-iconos.html # Generador de iconos
│   ├── icono-72x72.png    # Iconos para diferentes tamaños
│   ├── icono-96x96.png
│   ├── icono-128x128.png
│   ├── icono-144x144.png
│   ├── icono-152x152.png
│   ├── icono-192x192.png
│   ├── icono-384x384.png
│   └── icono-512x512.png
└── README.md              # Este archivo


## 🏗️ Arquitectura

### App Shell
La aplicación utiliza el patrón App Shell que incluye:

- **Encabezado**: Título de la aplicación y botón de menú
- **Menú Principal**: Navegación entre secciones
- **Contenido Principal**: Área dinámica para diferentes vistas
- **Pie de Página**: Información de copyright

### Service Worker
El Service Worker (`sw.js`) implementa:

- **Estrategia Cache First**: Los recursos se sirven desde caché cuando están disponibles
- **Fallback Offline**: Página principal cuando no hay conexión
- **Actualización Automática**: Gestión de versiones de caché
- **Sincronización**: Preparado para sincronización en segundo plano

### Vistas Disponibles

1. **Inicio**: Página de bienvenida con información de la PWA
2. **Productos**: Lista de productos con datos simulados
3. **Noticias**: Feed de noticias con fechas
4. **Tareas**: Gestor de tareas con almacenamiento local
5. **Configuración**: Estado de la aplicación y controles

## 🛠️ Instalación y Configuración

### Requisitos Previos
- Servidor web local (puede ser Python, Node.js, o cualquier servidor HTTP)
- Navegador moderno con soporte para PWA

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes git
   git clone [url-del-repositorio]
   
   # O descargar y extraer el ZIP
   ```

2. **Generar los iconos**
   - Abrir `iconos/generar-iconos.html` en el navegador
   - Guardar cada icono generado con el nombre correspondiente
   - Colocar todos los iconos en la carpeta `iconos/`

3. **Iniciar servidor local**
   
   **Opción 1: Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Opción 2: Node.js (con http-server)**
   ```bash
   npx http-server -p 8000
   ```
   
   **Opción 3: PHP**
   ```bash
   php -S localhost:8000
   ```

4. **Acceder a la aplicación**
   - Abrir navegador en `http://localhost:8000`
   - La PWA debería cargar correctamente

## 🧪 Cómo Probar la Funcionalidad Offline

### Método 1: DevTools del Navegador
1. Abrir DevTools (F12)
2. Ir a la pestaña "Network" o "Red"
3. Marcar la casilla "Offline"
4. Recargar la página
5. La aplicación debería funcionar sin conexión

### Método 2: Desconectar Internet
1. Desconectar la conexión a internet
2. Recargar la página
3. Navegar por las diferentes secciones
4. Las funcionalidades básicas deberían seguir funcionando

### Método 3: Application Tab
1. Abrir DevTools (F12)
2. Ir a "Application" > "Service Workers"
3. Verificar que el SW esté activo
4. Usar "Offline" checkbox
5. Probar la funcionalidad

## 📱 Instalación como App

### En Escritorio (Chrome/Edge)
1. Visitar la aplicación en el navegador
2. Buscar el ícono de instalación en la barra de direcciones
3. Hacer clic en "Instalar" cuando aparezca la notificación
4. La app se instalará como aplicación de escritorio

### En Móvil (Android)
1. Abrir la aplicación en Chrome
2. Tocar el menú (⋮) > "Agregar a pantalla de inicio"
3. Confirmar la instalación
4. La app aparecerá en el launcher

### En iOS (Safari)
1. Abrir la aplicación en Safari
2. Tocar el botón de compartir
3. Seleccionar "Agregar a pantalla de inicio"
4. Confirmar la instalación

## 🔧 Personalización

### Cambiar Colores
Editar las variables CSS en `css/estilos.css`:
```css
/* Colores principales */
--color-primario: #2196F3;
--color-secundario: #1976D2;
--color-acento: #FFC107;
```

### Modificar Contenido
- **Productos**: Editar array `datosProductos` en `js/app.js`
- **Noticias**: Editar array `datosNoticias` en `js/app.js`
- **Información**: Modificar contenido en `index.html`

### Actualizar Iconos
1. Crear nuevos iconos en los tamaños requeridos
2. Reemplazar archivos en carpeta `iconos/`
3. Actualizar referencias en `manifest.json` si es necesario

## 🐛 Solución de Problemas

### La PWA no se instala
- Verificar que se esté sirviendo por HTTPS (o localhost)
- Comprobar que `manifest.json` sea válido
- Asegurar que todos los iconos existan

### Service Worker no funciona
- Verificar en DevTools > Application > Service Workers
- Comprobar errores en la consola
- Intentar "Unregister" y recargar

### Contenido no se actualiza
- Limpiar caché del navegador
- Usar "Hard Refresh" (Ctrl+Shift+R)
- Verificar versión del caché en `sw.js`

## 📊 Métricas y Rendimiento

### Lighthouse Audit
Ejecutar auditoría de Lighthouse para verificar:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- PWA: 100

### Herramientas Recomendadas
- Chrome DevTools
- Lighthouse
- PWA Builder (Microsoft)
- Workbox (Google)

## 🚀 Próximas Mejoras

- [ ] Sincronización en segundo plano
- [ ] Notificaciones push
- [ ] Integración con APIs reales
- [ ] Modo oscuro
- [ ] Más tipos de contenido
- [ ] Análiticas de uso

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo LICENSE para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:
- Revisar la sección de solución de problemas
- Abrir un issue en el repositorio
- Consultar la documentación de PWA de MDN

---

**¡Disfruta tu nueva PWA! 🎉**