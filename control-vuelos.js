// =============================================================================
//  🚀  SPACEX FLIGHT CONTROL CENTER
//  Centro de Control de Lanzamientos Espaciales
//
//  Proyecto de Desempeño · SENA Formación Complementaria 3406211
//  Módulo: JavaScript · Unidades 1 a 7
//
//  INSTRUCCIONES PARA EL APRENDIZ:
//  ─────────────────────────────────────────────────────────────────────────────
//  Este archivo está vacío. Tu tarea es implementar todas las funciones
//  necesarias para que la aplicación funcione de acuerdo al enunciado.
//
//  Pasos recomendados:
//    1. Lee el enunciado completo en ENUNCIADO.md
//    2. Abre spacex_control_vuelos.html en el navegador con F12 activo
//    3. Revisa el HTML para conocer los IDs disponibles
//    4. Revisa el CSS para conocer las clases que debes aplicar
//    5. Implementa las secciones de este archivo en orden
//
//  IMPORTANTE: No modifiques spacex_control_vuelos.html ni styles-vuelos.css
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 1 — ALMACÉN DE DATOS
// ─────────────────────────────────────────────────────────────────────────────

// Array global que contendrá los objetos de lanzamiento.
// Cada elemento tendrá la forma: { id, nombre, tipo, fecha, objetivo, estado }
let lanzamientos = [];

// Variable que almacena el filtro activo para la vista ('todos'|'pendiente'|'lanzado'|'cancelado').
let filtroActual = 'todos';


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 2 — FUNCIONES UTILITARIAS
// ─────────────────────────────────────────────────────────────────────────────

// Genera un ID aleatorio con el formato `SX-XXXX` donde XXXX es un número de 4 dígitos.
const generarID = () => {
    // Calcular un número aleatorio entre 1000 y 9999.
    const numero = Math.floor(1000 + Math.random() * 9000);
    // Devolver el ID con prefijo.
    return `SX-${numero}`;
};

// Convierte una fecha ISO en una cadena legible 'DD/MM/YYYY HH:mm'.
const formatearFecha = (fechaISO) => {
    // Crear objeto Date a partir de la cadena ISO.
    const fecha = new Date(fechaISO);
    // Obtener día con padding.
    const dia = String(fecha.getDate()).padStart(2, '0');
    // Obtener mes (0-based +1) con padding.
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    // Obtener año.
    const anio = fecha.getFullYear();
    // Obtener horas con padding.
    const horas = String(fecha.getHours()).padStart(2, '0');
    // Obtener minutos con padding.
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    
    // Formatear y devolver la cadena final.
    return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 3 — RENDERIZADO DE TARJETAS
// ─────────────────────────────────────────────────────────────────────────────

// Renderiza las tarjetas de lanzamiento aplicando el filtro global `filtroActual`.
const renderizarTarjetas = () => {
    // Obtener el contenedor grid del DOM.
    const grid = document.getElementById('grid-lanzamientos');
    // Obtener el elemento que muestra el estado vacío.
    const estadoVacio = document.getElementById('estado-vacio');
    
    // Filtrar el array global según el filtro activo.
    const lanzamientosFiltrados = lanzamientos.filter(l => 
        // Si el filtro es 'todos' devolvemos todo, sino coincidir por estado.
        filtroActual === 'todos' || l.estado === filtroActual
    );

    // Vaciar el contenido actual del grid para re-renderizado.
    grid.innerHTML = '';

    // Si no hay resultados, mostrar el mensaje/estado vacío.
    if (lanzamientosFiltrados.length === 0) {
        estadoVacio.classList.remove('atom-hidden');
    } else {
        // Ocultar el indicador de vacío cuando hay elementos.
        estadoVacio.classList.add('atom-hidden');
    }

    // Crear una tarjeta por cada lanzamiento filtrado y añadirla al grid.
    lanzamientosFiltrados.forEach(l => {
        const tarjeta = crearTarjeta(l);
        grid.appendChild(tarjeta);
    });

    // Actualizar los contadores que muestran cuántos registros se están viendo.
    actualizarContadoresVisibles(lanzamientosFiltrados.length);
};

// Crea y devuelve un elemento `<article>` que representa la tarjeta de un lanzamiento.
const crearTarjeta = (lanzamiento) => {
    // Extraer propiedades del objeto lanzamiento.
    const { id, nombre, tipo, fecha, objetivo, estado } = lanzamiento;
    
    // Crear el elemento contenedor principal.
    const article = document.createElement('article');
    // Asignar clases para estilos y estado.
    article.className = `organism-launch-card organism-launch-card--${estado}`;
    // Añadir atributos de datos para facilitar búsqueda/filtrado desde DOM.
    article.setAttribute('data-id', id);
    article.setAttribute('data-tipo', tipo);
    article.setAttribute('data-estado', estado);

    // Rellenar el HTML interno de la tarjeta (no añadir comentarios dentro del template).
    article.innerHTML = `
        <div class="molecule-card-header">
            <span class="molecule-card-header__id atom-mono">${id}</span>
            <span class="atom-badge atom-badge--${estado}">${estado.toUpperCase()}</span>
        </div>

        <div class="molecule-card-body">
            <div class="molecule-card-body__name">${nombre}</div>
            <div class="molecule-card-body__type">${tipo.toUpperCase().replace('-', ' ')}</div>
            <div class="molecule-card-body__objective">${objetivo}</div>
            <div class="molecule-card-body__date atom-mono">${formatearFecha(fecha)}</div>
        </div>

        <div class="molecule-card-footer">
            <button class="atom-btn atom-btn--secondary atom-btn--sm" data-id="${id}" data-action="editar" ${estado !== 'pendiente' ? 'disabled' : ''}>
                EDITAR
            </button>
            <button class="atom-btn atom-btn--danger atom-btn--sm" data-id="${id}" data-action="cancelar" ${estado !== 'pendiente' ? 'disabled' : ''}>
                CANCELAR
            </button>
        </div>
    `;

    // Añadir la animación hover mediante listeners.
    agregarEventosHover(article);
    
    // Seleccionar botones dentro de la tarjeta para enlazar acciones.
    const btnEditar = article.querySelector('[data-action="editar"]');
    const btnCancelar = article.querySelector('[data-action="cancelar"]');
    
    // Enlazar evento click para cargar el formulario en modo edición.
    btnEditar.addEventListener('click', () => cargarEdicion(id));
    // Enlazar evento click para cancelar el lanzamiento.
    btnCancelar.addEventListener('click', () => cancelarLanzamiento(id));

    // Devolver la tarjeta ya configurada.
    return article;
};

// Actualiza la información de contadores visible en la UI.
const actualizarContadoresVisibles = (cantidad) => {
    // Obtener el elemento que muestra la cantidad visible.
    const contadorVisibles = document.getElementById('contador-visibles');
    // Obtener el contador total en la barra superior.
    const contadorTotalTopbar = document.getElementById('contador-lanzamientos');
    
    // Actualizar texto con pluralización simple.
    contadorVisibles.textContent = `${cantidad} REGISTRO${cantidad !== 1 ? 'S' : ''}`;
    // Mostrar el total de lanzamientos registrados.
    contadorTotalTopbar.textContent = lanzamientos.length;
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 4 — ANIMACIONES DE TARJETAS (HOVER)
// ─────────────────────────────────────────────────────────────────────────────

// Añade listeners para manejar el efecto hover con clases CSS.
const agregarEventosHover = (tarjeta) => {
    // Al pasar el ratón, añadir la clase de hover.
    tarjeta.addEventListener('mouseover', () => {
        tarjeta.classList.add('organism-launch-card--hover');
    });

    // Al sacar el ratón, quitar la clase de hover.
    tarjeta.addEventListener('mouseout', () => {
        tarjeta.classList.remove('organism-launch-card--hover');
    });
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 5 — FORMULARIO: REGISTRO Y EDICIÓN
// ─────────────────────────────────────────────────────────────────────────────

// Maneja el submit del formulario: crea o actualiza un lanzamiento.
const procesarFormulario = (event) => {
    // Evitar comportamiento por defecto (recarga de página).
    event.preventDefault();

    try {
        // Leer valores del formulario.
        const idEdicion = document.getElementById('input-id-edicion').value;
        const nombre = document.getElementById('input-nombre-serie').value.trim();
        const tipo = document.getElementById('select-tipo-cohete').value;
        const fecha = document.getElementById('input-fecha-lanzamiento').value;
        const objetivo = document.getElementById('input-objetivo-mision').value.trim();

        // Validar que todos los campos estén completos.
        if (!nombre || !tipo || !fecha || !objetivo) {
            alert('⚠️ Todos los campos son obligatorios para el control de misión.');
            return;
        }

        if (idEdicion) {
            // Si hay idEdicion, estamos editando un registro existente.
            const indice = lanzamientos.findIndex(l => l.id === idEdicion);
            if (indice !== -1) {
                // Reemplazar solo los campos editables manteniendo el resto.
                lanzamientos[indice] = {
                    ...lanzamientos[indice],
                    nombre,
                    tipo,
                    fecha,
                    objetivo
                };
            }
            // Limpiar el formulario y salir del modo edición.
            limpiarFormulario();
        } else {
            // Crear un nuevo objeto lanzamiento en modo registro.
            const nuevoLanzamiento = {
                id: generarID(),
                nombre,
                tipo,
                fecha,
                objetivo,
                estado: 'pendiente'
            };
            // Añadir al array global.
            lanzamientos.push(nuevoLanzamiento);
            // Limpiar campos del formulario.
            limpiarFormulario();
        }

        // Re-renderizar la lista y actualizar estadísticas.
        renderizarTarjetas();
        actualizarEstadisticas();

    } catch (error) {
        // Si ocurre un error inesperado, loguearlo en consola.
        console.error('Error en el control de misión:', error);
    }
};

// Limpia y restablece el formulario al estado inicial (modo registro).
const limpiarFormulario = () => {
    // Obtener referencias a elementos relevantes del formulario.
    const form = document.getElementById('form-lanzamiento');
    const inputId = document.getElementById('input-id-edicion');
    const btnRegistrar = document.getElementById('btn-registrar');
    const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');

    // Resetear todos los campos del formulario.
    form.reset();
    // Vaciar el campo oculto de edición.
    inputId.value = '';
    // Restaurar el texto del botón a su estado de registro.
    btnRegistrar.innerHTML = '&#9654;&nbsp;REGISTRAR LANZAMIENTO';
    // Ocultar el botón de cancelar edición.
    btnCancelarEdicion.classList.add('atom-hidden');
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 6 — CAMBIOS DE ESTADO
// ─────────────────────────────────────────────────────────────────────────────

// Carga los datos de un lanzamiento en el formulario para editarlo.
const cargarEdicion = (id) => {
    // Buscar el objeto por su id en el array global.
    const lanzamiento = lanzamientos.find(l => l.id === id);
    
    // Solo permitir edición si existe y está en estado 'pendiente'.
    if (!lanzamiento || lanzamiento.estado !== 'pendiente') return;

    // Rellenar los campos del formulario con los datos del lanzamiento.
    document.getElementById('input-id-edicion').value = lanzamiento.id;
    document.getElementById('input-nombre-serie').value = lanzamiento.nombre;
    document.getElementById('select-tipo-cohete').value = lanzamiento.tipo;
    document.getElementById('input-fecha-lanzamiento').value = lanzamiento.fecha;
    document.getElementById('input-objetivo-mision').value = lanzamiento.objetivo;

    // Cambiar la apariencia/texto del botón registrar a modo guardar cambios.
    const btnRegistrar = document.getElementById('btn-registrar');
    const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
    
    btnRegistrar.innerHTML = '&#10003;&nbsp;GUARDAR CAMBIOS';
    // Mostrar el botón para cancelar la edición.
    btnCancelarEdicion.classList.remove('atom-hidden');

    // Hacer scroll suave hacia el formulario para mejorar la experiencia de usuario.
    document.getElementById('form-lanzamiento').scrollIntoView({ behavior: 'smooth' });
};

// Marca un lanzamiento como 'cancelado' tras confirmar la acción.
const cancelarLanzamiento = (id) => {
    // Buscar el lanzamiento por id.
    const lanzamiento = lanzamientos.find(l => l.id === id);
    
    // Solo cancelar si existe y está pendiente.
    if (lanzamiento && lanzamiento.estado === 'pendiente') {
        // Confirmar con el usuario antes de cambiar el estado.
        if (confirm(`¿Estás seguro de cancelar el lanzamiento ${id}?`)) {
            lanzamiento.estado = 'cancelado';
            // Refrescar la vista y las estadísticas tras el cambio.
            renderizarTarjetas();
            actualizarEstadisticas();
        }
    }
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 7 — FILTRADO POR ESTADO
// ─────────────────────────────────────────────────────────────────────────────

// Maneja el clic sobre los botones de filtro y actualiza la lista mostrada.
const filtrarPorEstado = (event) => {
    // Buscar el botón más cercano con el atributo data-filter (delegación).
    const boton = event.target.closest('[data-filter]');
    if (!boton) return;

    // Actualizar la variable global con el filtro seleccionado.
    filtroActual = boton.getAttribute('data-filter');

    // Quitar la clase de activo a todos y aplicarla al botón seleccionado.
    const botones = document.querySelectorAll('#grupo-filtros [data-filter]');
    botones.forEach(b => b.classList.remove('atom-btn--filter-active'));
    boton.classList.add('atom-btn--filter-active');

    // Volver a renderizar con el nuevo filtro.
    renderizarTarjetas();
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 8 — RELOJ Y MONITOREO AUTOMÁTICO
// ─────────────────────────────────────────────────────────────────────────────

// Inicia un intervalo que actualiza el reloj y detecta lanzamientos programados.
const iniciarMonitoreo = () => {
    setInterval(() => {
        // Obtener instante actual.
        const ahora = new Date();
        // Formatear horas UTC con padding.
        const horas = String(ahora.getUTCHours()).padStart(2, '0');
        const minutos = String(ahora.getUTCMinutes()).padStart(2, '0');
        const segundos = String(ahora.getUTCSeconds()).padStart(2, '0');
        
        // Actualizar elemento del reloj en la UI.
        const reloj = document.getElementById('reloj-principal');
        reloj.textContent = `${horas}:${minutos}:${segundos}Z`;

        // Variable para saber si hubo cambios de estado en este tick.
        let huboCambios = false;
        
        // Recorrer lanzamientos pendientes y marcar como lanzado si la fecha llegó.
        lanzamientos.forEach(l => {
            if (l.estado === 'pendiente') {
                const fechaProgramada = new Date(l.fecha);
                if (ahora >= fechaProgramada) {
                    l.estado = 'lanzado';
                    huboCambios = true;
                }
            }
        });

        // Si hubo cambios, refrescar la UI y estadísticas.
        if (huboCambios) {
            renderizarTarjetas();
            actualizarEstadisticas();
        }

    }, 1000);
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 9 — ESTADÍSTICAS
// ─────────────────────────────────────────────────────────────────────────────

// Calcula y muestra las estadísticas de lanzamientos por estado.
const actualizarEstadisticas = () => {
    // Contar por cada estado usando filter y length.
    const stats = {
        pendientes: lanzamientos.filter(l => l.estado === 'pendiente').length,
        lanzados: lanzamientos.filter(l => l.estado === 'lanzado').length,
        cancelados: lanzamientos.filter(l => l.estado === 'cancelado').length,
        total: lanzamientos.length
    };

    // Actualizar los elementos del DOM con los valores calculados.
    document.getElementById('stat-pendientes').textContent = stats.pendientes;
    document.getElementById('stat-lanzados').textContent = stats.lanzados;
    document.getElementById('stat-cancelados').textContent = stats.cancelados;
    document.getElementById('stat-total').textContent = stats.total;
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 10 — INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

// Arranca la aplicación cuando el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Conectar eventos del formulario.
    const form = document.getElementById('form-lanzamiento');
    const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
    
    // Evento para procesar el submit del formulario.
    form.addEventListener('submit', procesarFormulario);
    // Evento para cancelar la edición y limpiar el formulario.
    btnCancelarEdicion.addEventListener('click', limpiarFormulario);

    // 2. Conectar eventos de filtros (delegación de eventos en el contenedor).
    const grupoFiltros = document.getElementById('grupo-filtros');
    grupoFiltros.addEventListener('click', filtrarPorEstado);

    // 3. Iniciar el reloj y el sistema de monitoreo automático.
    iniciarMonitoreo();

    // 4. Realizar el primer renderizado de tarjetas y actualizar estadísticas.
    renderizarTarjetas();
    actualizarEstadisticas();

    // Indicar en consola que la app está lista.
    console.log('🚀 SpaceX Flight Control Center: ONLINE');
});
