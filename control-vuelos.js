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

/**
 * Almacén global de lanzamientos.
 * Cada objeto tendrá: { id, nombre, tipo, fecha, objetivo, estado }
 */
let lanzamientos = [];

/**
 * Filtro de visualización activo por defecto.
 */
let filtroActual = 'todos';


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 2 — FUNCIONES UTILITARIAS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Genera un identificador único con formato SpaceX (Ej: SX-1234)
 */
const generarID = () => {
    const numero = Math.floor(1000 + Math.random() * 9000);
    return `SX-${numero}`;
};

/**
 * Formatea una cadena de fecha ISO a un formato legible: DD/MM/YYYY HH:mm
 */
const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 3 — RENDERIZADO DE TARJETAS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renderiza todas las tarjetas en el grid aplicando el filtro actual.
 */
const renderizarTarjetas = () => {
    const grid = document.getElementById('grid-lanzamientos');
    const estadoVacio = document.getElementById('estado-vacio');
    
    // Filtrar lanzamientos
    const lanzamientosFiltrados = lanzamientos.filter(l => 
        filtroActual === 'todos' || l.estado === filtroActual
    );

    // Limpiar grid
    grid.innerHTML = '';

    // Mostrar/Ocultar estado vacío
    if (lanzamientosFiltrados.length === 0) {
        estadoVacio.classList.remove('atom-hidden');
    } else {
        estadoVacio.classList.add('atom-hidden');
    }

    // Crear e insertar tarjetas
    lanzamientosFiltrados.forEach(l => {
        const tarjeta = crearTarjeta(l);
        grid.appendChild(tarjeta);
    });

    // Actualizar contadores de visibilidad
    actualizarContadoresVisibles(lanzamientosFiltrados.length);
};

/**
 * Crea un elemento DOM de tarjeta para un lanzamiento específico.
 */
const crearTarjeta = (lanzamiento) => {
    const { id, nombre, tipo, fecha, objetivo, estado } = lanzamiento;
    
    const article = document.createElement('article');
    article.className = `organism-launch-card organism-launch-card--${estado}`;
    article.setAttribute('data-id', id);
    article.setAttribute('data-tipo', tipo);
    article.setAttribute('data-estado', estado);

    // Estructura interna de la tarjeta
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

    // Sección 4: Agregar eventos de hover
    agregarEventosHover(article);
    
    // Agregar eventos a los botones
    const btnEditar = article.querySelector('[data-action="editar"]');
    const btnCancelar = article.querySelector('[data-action="cancelar"]');
    
    btnEditar.addEventListener('click', () => cargarEdicion(id));
    btnCancelar.addEventListener('click', () => cancelarLanzamiento(id));

    return article;
};

/**
 * Actualiza el contador de registros visibles.
 */
const actualizarContadoresVisibles = (cantidad) => {
    const contadorVisibles = document.getElementById('contador-visibles');
    const contadorTotalTopbar = document.getElementById('contador-lanzamientos');
    
    contadorVisibles.textContent = `${cantidad} REGISTRO${cantidad !== 1 ? 'S' : ''}`;
    contadorTotalTopbar.textContent = lanzamientos.length;
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 4 — ANIMACIONES DE TARJETAS (HOVER)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Agrega los escuchadores de eventos para la animación hover.
 * Según el enunciado, se debe usar JavaScript (mouseover/mouseout) 
 * para agregar/quitar la clase 'organism-launch-card--hover'.
 */
const agregarEventosHover = (tarjeta) => {
    tarjeta.addEventListener('mouseover', () => {
        tarjeta.classList.add('organism-launch-card--hover');
    });

    tarjeta.addEventListener('mouseout', () => {
        tarjeta.classList.remove('organism-launch-card--hover');
    });
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 5 — FORMULARIO: REGISTRO Y EDICIÓN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Procesa el envío del formulario para registrar o editar un lanzamiento.
 */
const procesarFormulario = (event) => {
    event.preventDefault();

    try {
        const idEdicion = document.getElementById('input-id-edicion').value;
        const nombre = document.getElementById('input-nombre-serie').value.trim();
        const tipo = document.getElementById('select-tipo-cohete').value;
        const fecha = document.getElementById('input-fecha-lanzamiento').value;
        const objetivo = document.getElementById('input-objetivo-mision').value.trim();

        // Validación de campos
        if (!nombre || !tipo || !fecha || !objetivo) {
            alert('⚠️ Todos los campos son obligatorios para el control de misión.');
            return;
        }

        if (idEdicion) {
            // MODO EDICIÓN: Actualizar registro existente
            const indice = lanzamientos.findIndex(l => l.id === idEdicion);
            if (indice !== -1) {
                lanzamientos[indice] = {
                    ...lanzamientos[indice],
                    nombre,
                    tipo,
                    fecha,
                    objetivo
                };
            }
            limpiarFormulario();
        } else {
            // MODO REGISTRO: Crear nuevo objeto
            const nuevoLanzamiento = {
                id: generarID(),
                nombre,
                tipo,
                fecha,
                objetivo,
                estado: 'pendiente'
            };
            lanzamientos.push(nuevoLanzamiento);
            limpiarFormulario();
        }

        // Refrescar vista
        renderizarTarjetas();
        actualizarEstadisticas();

    } catch (error) {
        console.error('Error en el control de misión:', error);
    }
};

/**
 * Limpia los campos del formulario y restaura el estado inicial.
 */
const limpiarFormulario = () => {
    const form = document.getElementById('form-lanzamiento');
    const inputId = document.getElementById('input-id-edicion');
    const btnRegistrar = document.getElementById('btn-registrar');
    const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');

    form.reset();
    inputId.value = '';
    btnRegistrar.innerHTML = '&#9654;&nbsp;REGISTRAR LANZAMIENTO';
    btnCancelarEdicion.classList.add('atom-hidden');
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 6 — CAMBIOS DE ESTADO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Carga los datos de un lanzamiento en el formulario para su edición.
 */
const cargarEdicion = (id) => {
    const lanzamiento = lanzamientos.find(l => l.id === id);
    
    if (!lanzamiento || lanzamiento.estado !== 'pendiente') return;

    // Poblar formulario
    document.getElementById('input-id-edicion').value = lanzamiento.id;
    document.getElementById('input-nombre-serie').value = lanzamiento.nombre;
    document.getElementById('select-tipo-cohete').value = lanzamiento.tipo;
    document.getElementById('input-fecha-lanzamiento').value = lanzamiento.fecha;
    document.getElementById('input-objetivo-mision').value = lanzamiento.objetivo;

    // Cambiar apariencia del botón
    const btnRegistrar = document.getElementById('btn-registrar');
    const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
    
    btnRegistrar.innerHTML = '&#10003;&nbsp;GUARDAR CAMBIOS';
    btnCancelarEdicion.classList.remove('atom-hidden');

    // Scroll al formulario para mejor UX
    document.getElementById('form-lanzamiento').scrollIntoView({ behavior: 'smooth' });
};

/**
 * Cambia el estado de un lanzamiento a "cancelado".
 */
const cancelarLanzamiento = (id) => {
    const lanzamiento = lanzamientos.find(l => l.id === id);
    
    if (lanzamiento && lanzamiento.estado === 'pendiente') {
        if (confirm(`¿Estás seguro de cancelar el lanzamiento ${id}?`)) {
            lanzamiento.estado = 'cancelado';
            renderizarTarjetas();
            actualizarEstadisticas();
        }
    }
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 7 — FILTRADO POR ESTADO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cambia el filtro activo y refresca la visualización.
 */
const filtrarPorEstado = (event) => {
    const boton = event.target.closest('[data-filter]');
    if (!boton) return;

    // Actualizar variable global
    filtroActual = boton.getAttribute('data-filter');

    // Actualizar clases visuales de los botones
    const botones = document.querySelectorAll('#grupo-filtros [data-filter]');
    botones.forEach(b => b.classList.remove('atom-btn--filter-active'));
    boton.classList.add('atom-btn--filter-active');

    // Renderizar con el nuevo filtro
    renderizarTarjetas();
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 8 — RELOJ Y MONITOREO AUTOMÁTICO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Inicia el sistema de monitoreo en tiempo real.
 */
const iniciarMonitoreo = () => {
    setInterval(() => {
        // Tarea A: Actualizar Reloj UTC
        const ahora = new Date();
        const horas = String(ahora.getUTCHours()).padStart(2, '0');
        const minutos = String(ahora.getUTCMinutes()).padStart(2, '0');
        const segundos = String(ahora.getUTCSeconds()).padStart(2, '0');
        
        const reloj = document.getElementById('reloj-principal');
        reloj.textContent = `${horas}:${minutos}:${segundos}Z`;

        // Tarea B: Detección automática de lanzamientos
        let huboCambios = false;
        
        lanzamientos.forEach(l => {
            if (l.estado === 'pendiente') {
                const fechaProgramada = new Date(l.fecha);
                if (ahora >= fechaProgramada) {
                    l.estado = 'lanzado';
                    huboCambios = true;
                }
            }
        });

        if (huboCambios) {
            renderizarTarjetas();
            actualizarEstadisticas();
        }

    }, 1000);
};


// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 9 — ESTADÍSTICAS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula y actualiza los contadores del panel de estadísticas.
 */
const actualizarEstadisticas = () => {
    const stats = {
        pendientes: lanzamientos.filter(l => l.estado === 'pendiente').length,
        lanzados: lanzamientos.filter(l => l.estado === 'lanzado').length,
        cancelados: lanzamientos.filter(l => l.estado === 'cancelado').length,
        total: lanzamientos.length
    };

    document.getElementById('stat-pendientes').textContent = stats.pendientes;
    document.getElementById('stat-lanzados').textContent = stats.lanzados;
    document.getElementById('stat-cancelados').textContent = stats.cancelados;
    document.getElementById('stat-total').textContent = stats.total;
};



// ─────────────────────────────────────────────────────────────────────────────
//  SECCIÓN 10 — INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Función que arranca la aplicación cuando el DOM está listo.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Conectar Eventos del Formulario
    const form = document.getElementById('form-lanzamiento');
    const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
    
    form.addEventListener('submit', procesarFormulario);
    btnCancelarEdicion.addEventListener('click', limpiarFormulario);

    // 2. Conectar Eventos de Filtros (Delegación de eventos)
    const grupoFiltros = document.getElementById('grupo-filtros');
    grupoFiltros.addEventListener('click', filtrarPorEstado);

    // 3. Iniciar Reloj y Monitoreo Automático
    iniciarMonitoreo();

    // 4. Primer renderizado y estadísticas (estado inicial vacío)
    renderizarTarjetas();
    actualizarEstadisticas();

    console.log('🚀 SpaceX Flight Control Center: ONLINE');
});
