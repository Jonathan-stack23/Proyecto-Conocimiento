// =============================================================================
//  ⬡  ANDURIL INDUSTRIES — MACHINE SHOP INVENTORY SYSTEM
//  División : Autonomous Weapon Systems / Ground Operations
//  Bodega   : Sector Alpha, Nivel B2
//
//  Este módulo controla el inventario de partes de la machine shop.
//  La interfaz de navegación, renderizado y DOM ya está implementada.
//
//  ╔══════════════════════════════════════════════════════════════╗
//  ║  TAREA DEL APRENDIZ                                          ║
//  ║  Implementar el cuerpo de las 6 funciones marcadas con       ║
//  ║  el bloque TODO. Sin esas funciones la aplicación           ║
//  ║  muestra únicamente guiones y no registra movimientos.      ║
//  ╚══════════════════════════════════════════════════════════════╝
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  🗄️  CATÁLOGO DE PARTES — Estructura de datos principal
//  Cada objeto en este arreglo representa una parte física en bodega.
// ─────────────────────────────────────────────────────────────────────────────

const partes = [
    {
        id:               "AND-MECH-001",
        nombre:           "Actuador Lineal 24V DC",
        categoria:        "mecanica",
        ubicacion:        "ESTANTE-A3",
        cantidad:         45,
        cantidad_minima:  10,
        capacidad_maxima: 100,
        precio_unitario:  320.50,
        unidad:           "pza",
        proveedor:        "Parker Hannifin"
    },
    {
        id:               "AND-ELEC-002",
        nombre:           "Sensor LIDAR Compacto 360°",
        categoria:        "electronica",
        ubicacion:        "ESTANTE-B1",
        cantidad:         8,
        cantidad_minima:  5,
        capacidad_maxima: 30,
        precio_unitario:  1850.00,
        unidad:           "pza",
        proveedor:        "Ouster Technologies"
    },
    {
        id:               "AND-HIDR-003",
        nombre:           "Válvula Hidráulica Proporcional 3/2",
        categoria:        "hidraulica",
        ubicacion:        "ESTANTE-A1",
        cantidad:         3,
        cantidad_minima:  8,
        capacidad_maxima: 50,
        precio_unitario:  540.75,
        unidad:           "pza",
        proveedor:        "Bosch Rexroth"
    },
    {
        id:               "AND-ESTR-004",
        nombre:           "Perfil Estructural Titanio Ti-6Al-4V",
        categoria:        "estructural",
        ubicacion:        "ESTANTE-B2",
        cantidad:         120,
        cantidad_minima:  20,
        capacidad_maxima: 300,
        precio_unitario:  88.25,
        unidad:           "m",
        proveedor:        "TIMET Corporation"
    },
    {
        id:               "AND-MECH-005",
        nombre:           "Servo Motor BLDC 48V 2.5kW",
        categoria:        "mecanica",
        ubicacion:        "ESTANTE-A2",
        cantidad:         22,
        cantidad_minima:  6,
        capacidad_maxima: 60,
        precio_unitario:  975.00,
        unidad:           "pza",
        proveedor:        "Maxon Motor"
    },
    {
        id:               "AND-ELEC-006",
        nombre:           "Módulo IMU 9-DOF Industrial",
        categoria:        "electronica",
        ubicacion:        "ESTANTE-B1",
        cantidad:         4,
        cantidad_minima:  10,
        capacidad_maxima: 80,
        precio_unitario:  425.00,
        unidad:           "pza",
        proveedor:        "VectorNav Technologies"
    },
    {
        id:               "AND-HIDR-007",
        nombre:           "Cilindro Hidráulico Doble Efecto Ø50mm",
        categoria:        "hidraulica",
        ubicacion:        "ESTANTE-A1",
        cantidad:         18,
        cantidad_minima:  4,
        capacidad_maxima: 40,
        precio_unitario:  310.00,
        unidad:           "pza",
        proveedor:        "SMC Corporation"
    },
    {
        id:               "AND-ESTR-008",
        nombre:           "Placa Base Fibra de Carbono 3K 4mm",
        categoria:        "estructural",
        ubicacion:        "ESTANTE-B2",
        cantidad:         60,
        cantidad_minima:  15,
        capacidad_maxima: 150,
        precio_unitario:  145.90,
        unidad:           "pza",
        proveedor:        "Hexcel Composites"
    },
    {
        id:               "AND-MECH-009",
        nombre:           "Engranaje Helicoidal Módulo 3 Z=24",
        categoria:        "mecanica",
        ubicacion:        "ESTANTE-A3",
        cantidad:         75,
        cantidad_minima:  20,
        capacidad_maxima: 200,
        precio_unitario:  42.80,
        unidad:           "pza",
        proveedor:        "KHK Gears"
    },
    {
        id:               "AND-ELEC-010",
        nombre:           "Controlador ESC 80A LiPo",
        categoria:        "electronica",
        ubicacion:        "ESTANTE-B1",
        cantidad:         31,
        cantidad_minima:  8,
        capacidad_maxima: 100,
        precio_unitario:  189.50,
        unidad:           "pza",
        proveedor:        "Currawong Engineering"
    }
];


// ─────────────────────────────────────────────────────────────────────────────
//  🗃️  ESTADO GLOBAL DE LA APLICACIÓN
//  Variables que reflejan el estado actual de la interfaz en tiempo de ejecución.
// ─────────────────────────────────────────────────────────────────────────────

let parteSeleccionada   = null;
let filtroActual        = "todas";
let historialMovimientos = [];


// =============================================================================
//
//  ████████  ██████  ██████  ███████  █████  ███████
//     ██    ██    ██ ██   ██ ██      ██   ██ ██
//     ██    ██    ██ ██   ██ █████   ███████ ███████
//     ██    ██    ██ ██   ██ ██      ██   ██      ██
//     ██     ██████  ██████  ███████ ██   ██ ███████
//
//  SECCIÓN DE FUNCIONES A IMPLEMENTAR POR EL APRENDIZ
//  ▸ Las 6 funciones siguientes NO tienen cuerpo implementado.
//  ▸ Cada función tiene un bloque de comentarios que describe
//    qué debe recibir, qué debe retornar y qué concepto aplica.
//  ▸ La interfaz llama estas funciones: sin ellas nada calcula.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  FUNCIÓN 1 — calcularValorParte(parte)
//
//  Recibe  : un objeto parte del arreglo global
//  Retorna : un número que representa el valor monetario total de esa parte
//
//  Concepto: Variables numéricas y operadores aritméticos (Unidad 1 y 2)
//  La función trabaja con dos propiedades numéricas del objeto parte.
// ─────────────────────────────────────────────────────────────────────────────

function calcularValorParte(parte) {

    // TODO: Declarar una variable que almacene el resultado de la operación
    //       entre la cantidad en existencia y el costo por unidad individual.

    // TODO: Retornar esa variable.

}


// ─────────────────────────────────────────────────────────────────────────────
//  FUNCIÓN 2 — calcularTotalInventario(listado)
//
//  Recibe  : el arreglo completo de partes (o un subconjunto filtrado)
//  Retorna : un número que representa la suma del valor de todas las partes
//
//  Concepto: Estructuras de datos — recorrido de arreglos (Unidad 3)
//  Se debe recorrer cada elemento del arreglo y acumular un total.
// ─────────────────────────────────────────────────────────────────────────────

function calcularTotalInventario(listado) {

    // TODO: Declarar una variable acumuladora con valor inicial.

    // TODO: Recorrer cada elemento del arreglo.
    //       Por cada elemento, sumar su valor individual al acumulador.
    //       Apóyate en la función calcularValorParte que ya existe.

    // TODO: Retornar el acumulador con el total calculado.

}


// ─────────────────────────────────────────────────────────────────────────────
//  FUNCIÓN 3 — registrarEntrada(idParte, cantidad)
//
//  Recibe  : el id de la parte (String) y la cantidad a ingresar (Number)
//  Retorna : true si la operación se realizó, false si hubo algún problema
//
//  Concepto: Asignación de variables, operadores de suma (Unidad 1)
//  La función debe modificar la propiedad cantidad del objeto encontrado.
// ─────────────────────────────────────────────────────────────────────────────

function registrarEntrada(idParte, cantidad) {

    // La búsqueda de la parte en el arreglo ya está resuelta.
    var parte = partes.find(function(p) { return p.id === idParte; });

    if (!parte) {
        return false;
    }

    // TODO: Asignar a la propiedad cantidad de la parte encontrada
    //       el resultado de combinar el stock actual con la cantidad recibida.
    //       La nueva cantidad no debe superar capacidad_maxima.

    // TODO: Retornar true para indicar éxito.

}


// ─────────────────────────────────────────────────────────────────────────────
//  FUNCIÓN 4 — registrarSalida(idParte, cantidad)
//
//  Recibe  : el id de la parte (String) y la cantidad a retirar (Number)
//  Retorna : true si el retiro fue posible, false si el stock es insuficiente
//
//  Concepto: Asignación de variables, operadores de resta, condicionales (U1-U2)
//  Antes de modificar el stock se debe verificar que haya unidades suficientes.
// ─────────────────────────────────────────────────────────────────────────────

function registrarSalida(idParte, cantidad) {

    // La búsqueda de la parte en el arreglo ya está resuelta.
    var parte = partes.find(function(p) { return p.id === idParte; });

    if (!parte) {
        return false;
    }

    // TODO: Evaluar si la cantidad disponible permite realizar el retiro.
    //       Si no hay suficiente stock, retornar false sin modificar nada.

    // TODO: Asignar a la propiedad cantidad de la parte encontrada
    //       el valor que resulta de descontar las unidades retiradas.

    // TODO: Retornar true para confirmar que la operación se realizó.

}


// ─────────────────────────────────────────────────────────────────────────────
//  FUNCIÓN 5 — calcularPorcentajeOcupacion(parte)
//
//  Recibe  : un objeto parte
//  Retorna : un número entre 0 y 100 que indica qué porcentaje del espacio
//            máximo está siendo utilizado por las unidades en existencia
//
//  Concepto: Operadores aritméticos — división y multiplicación (Unidad 2)
// ─────────────────────────────────────────────────────────────────────────────

function calcularPorcentajeOcupacion(parte) {

    // TODO: Calcular qué proporción de la capacidad total representa
    //       la cantidad actual, expresada en porcentaje (0 a 100).

    // TODO: Retornar ese porcentaje como número.

}


// ─────────────────────────────────────────────────────────────────────────────
//  FUNCIÓN 6 — verificarStockMinimo(parte)
//
//  Recibe  : un objeto parte
//  Retorna : true si el stock actual ha alcanzado o caído por debajo del mínimo
//            false si el stock está por encima del mínimo operativo
//
//  Concepto: Operadores de comparación — tipos de datos Boolean (Unidad 2)
// ─────────────────────────────────────────────────────────────────────────────

function verificarStockMinimo(parte) {

    // TODO: Comparar la cantidad actual con el umbral de alerta.
    //       Retornar el resultado de esa comparación directamente.

}


// =============================================================================
//
//  ███████ ██ ███████ ████████ ███████ ███╗   ███╗ █████╗
//  ██      ██ ██         ██    ██      ████╗ ████║██   ██
//  ███████ ██ ███████    ██    █████   ██╔████╔██║███████
//       ██ ██      ██    ██    ██      ██║╚██╔╝██║██   ██
//  ███████ ██ ███████    ██    ███████ ██║ ╚═╝ ██║██   ██
//
//  SISTEMA YA IMPLEMENTADO — No modificar las funciones de esta sección.
//  Contienen la lógica de navegación, renderizado y acceso al DOM.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  ⏱️  RELOJ UTC — Actualización cada segundo
// ─────────────────────────────────────────────────────────────────────────────

function actualizarReloj() {
    var now = new Date();
    var hh  = String(now.getUTCHours()).padStart(2, "0");
    var mm  = String(now.getUTCMinutes()).padStart(2, "0");
    var ss  = String(now.getUTCSeconds()).padStart(2, "0");
    document.getElementById("reloj").textContent = hh + ":" + mm + ":" + ss + "Z";
}


// ─────────────────────────────────────────────────────────────────────────────
//  📋  renderizarListaPartes(lista)
//  Construye las tarjetas del panel izquierdo a partir de un arreglo de partes.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarListaPartes(lista) {
    var contenedor = document.getElementById("listaParts");
    contenedor.innerHTML = "";

    var alertaCount = 0;

    lista.forEach(function(parte) {
        var enAlerta   = verificarStockMinimo(parte);
        var porcentaje = calcularPorcentajeOcupacion(parte);

        if (enAlerta) alertaCount++;

        var nivelClase = enAlerta
            ? (parte.cantidad === 0 ? "molecule-part-card--critico" : "molecule-part-card--alerta")
            : "molecule-part-card--normal";

        var badgeClase = enAlerta
            ? (parte.cantidad === 0 ? "atom-badge--red" : "atom-badge--orange")
            : "atom-badge--green";

        var badgeTexto = enAlerta
            ? (parte.cantidad === 0 ? "SIN STOCK" : "BAJO STOCK")
            : "OK";

        var card = document.createElement("div");
        card.className = "molecule-part-card " + nivelClase
                       + (parteSeleccionada && parteSeleccionada.id === parte.id ? " is-selected" : "");
        card.onclick = function() { seleccionarParte(parte); };

        card.innerHTML =
            '<div class="molecule-part-card__header">' +
                '<span class="molecule-part-card__id atom-mono">' + parte.id + '</span>' +
                '<span class="atom-badge ' + badgeClase + '">' + badgeTexto + '</span>' +
            '</div>' +
            '<div class="molecule-part-card__name">' + parte.nombre + '</div>' +
            '<div class="molecule-part-card__meta">' +
                '<span>' + parte.categoria.toUpperCase() + '</span>' +
                '<span class="molecule-part-card__stock atom-mono">' +
                    parte.cantidad + ' ' + parte.unidad +
                '</span>' +
            '</div>' +
            '<div class="molecule-stock-bar">' +
                '<div class="molecule-stock-bar__fill' +
                    (enAlerta ? (parte.cantidad === 0 ? ' molecule-stock-bar__fill--danger' : ' molecule-stock-bar__fill--warn') : '') +
                    '" style="width:' + Math.min(100, (porcentaje || 0)) + '%"></div>' +
            '</div>';

        contenedor.appendChild(card);
    });

    document.getElementById("contAlertas").textContent = alertaCount;
    actualizarValorTotal();
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔍  filtrarPartes(categoria)
//  Filtra el catálogo según categoría o condición de stock.
// ─────────────────────────────────────────────────────────────────────────────

function filtrarPartes(categoria) {
    filtroActual = categoria;

    document.querySelectorAll(".atom-btn[data-f]").forEach(function(btn) {
        btn.classList.toggle("is-active", btn.dataset.f === categoria);
    });

    var lista;
    if (categoria === "todas") {
        lista = partes;
    } else if (categoria === "bajo-stock") {
        lista = partes.filter(function(p) { return verificarStockMinimo(p); });
    } else {
        lista = partes.filter(function(p) { return p.categoria === categoria; });
    }

    renderizarListaPartes(lista);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🎯  seleccionarParte(parte)
//  Actualiza el panel derecho con los detalles de la parte elegida.
// ─────────────────────────────────────────────────────────────────────────────

function seleccionarParte(parte) {
    parteSeleccionada = parte;

    document.getElementById("detallePlaceholder").style.display  = "none";
    document.getElementById("detalleContenido").style.display    = "block";

    var porcentaje = calcularPorcentajeOcupacion(parte);
    var valor      = calcularValorParte(parte);
    var enAlerta   = verificarStockMinimo(parte);

    document.getElementById("det-nombre").textContent   = parte.nombre;
    document.getElementById("det-id").textContent       = parte.id;
    document.getElementById("det-cantidad").textContent = parte.cantidad;
    document.getElementById("det-unidad").textContent   = parte.unidad;
    document.getElementById("det-categoria").textContent= parte.categoria.toUpperCase();
    document.getElementById("det-minimo").textContent   = parte.cantidad_minima + " " + parte.unidad;
    document.getElementById("det-maximo").textContent   = parte.capacidad_maxima + " " + parte.unidad;
    document.getElementById("det-ubicacion").textContent= parte.ubicacion;
    document.getElementById("det-proveedor").textContent= parte.proveedor;

    document.getElementById("det-precio").textContent =
        (typeof parte.precio_unitario === "number")
            ? "$ " + parte.precio_unitario.toFixed(2)
            : "---";

    document.getElementById("det-valor").textContent =
        (typeof valor === "number" && !isNaN(valor))
            ? "$ " + valor.toFixed(2)
            : "⚠ implementar";

    var pctTexto = (typeof porcentaje === "number" && !isNaN(porcentaje))
        ? "ocupación: " + porcentaje.toFixed(1) + "%"
        : "ocupación: ⚠ implementar";
    document.getElementById("det-pct").textContent = pctTexto;

    var barra = document.getElementById("det-barra");
    barra.style.width = Math.min(100, (porcentaje || 0)) + "%";
    barra.className   = "molecule-stock-bar__fill"
        + (enAlerta
            ? (parte.cantidad === 0 ? " molecule-stock-bar__fill--danger" : " molecule-stock-bar__fill--warn")
            : "");

    var estadoEl = document.getElementById("det-estado-stock");
    if (enAlerta === true) {
        estadoEl.textContent  = parte.cantidad === 0 ? "CRÍTICO" : "BAJO STOCK";
        estadoEl.className    = "molecule-stat-cell__value " + (parte.cantidad === 0 ? "atom-val-red" : "atom-val-orange");
    } else if (enAlerta === false) {
        estadoEl.textContent  = "NORMAL";
        estadoEl.className    = "molecule-stat-cell__value atom-val-green";
    } else {
        estadoEl.textContent  = "⚠ implementar";
        estadoEl.className    = "molecule-stat-cell__value";
    }

    filtrarPartes(filtroActual);
}


// ─────────────────────────────────────────────────────────────────────────────
//  💰  actualizarValorTotal()
//  Muestra el valor total del inventario en la barra inferior del panel central.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarValorTotal() {
    var total = calcularTotalInventario(partes);
    var el    = document.getElementById("valorTotalInventario");

    if (typeof total === "number" && !isNaN(total)) {
        el.textContent = "$ " + total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else {
        el.textContent = "$ ⚠ implementar función";
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  📝  renderizarLog()
//  Dibuja las entradas del historial de movimientos en el panel central.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarLog() {
    var contenedor = document.getElementById("listaLog");
    contenedor.innerHTML = "";

    if (historialMovimientos.length === 0) {
        contenedor.innerHTML =
            '<div style="padding:16px; font-size:10px; letter-spacing:1.5px; color:var(--border);">' +
            'SIN MOVIMIENTOS REGISTRADOS' +
            '</div>';
        return;
    }

    var recientes = historialMovimientos.slice().reverse();
    recientes.forEach(function(mov) {
        var entry = document.createElement("div");
        entry.className = "molecule-log-entry";
        entry.innerHTML =
            '<span class="molecule-log-entry__icon molecule-log-entry__icon--' + mov.tipo + '">' +
                (mov.tipo === "entrada" ? "▲" : "▼") +
            '</span>' +
            '<span class="molecule-log-entry__desc">' +
                '<strong>' + mov.tipo.toUpperCase() + '</strong> · ' +
                mov.cantidad + ' ' + mov.unidad + ' · ' + mov.nombreParte +
                (mov.nota ? ' <span style="color:var(--text)">— ' + mov.nota + '</span>' : '') +
            '</span>' +
            '<span class="molecule-log-entry__ts atom-mono">' + mov.timestamp + '</span>';
        contenedor.appendChild(entry);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  ⚙️  procesarMovimiento(tipo)
//  Lee el formulario y delega en registrarEntrada o registrarSalida.
//  Actualiza el log y la interfaz tras cada operación.
// ─────────────────────────────────────────────────────────────────────────────

function procesarMovimiento(tipo) {
    var idParte   = document.getElementById("selectParte").value;
    var cantidad  = parseInt(document.getElementById("inputCantidad").value, 10);
    var nota      = document.getElementById("inputNota").value.trim();
    var msgEl     = document.getElementById("mensajeOperacion");

    msgEl.textContent = "";
    msgEl.style.color = "";

    if (!idParte) {
        msgEl.textContent = "⚠ Selecciona una parte antes de registrar el movimiento.";
        msgEl.style.color = "var(--warn)";
        return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        msgEl.textContent = "⚠ Ingresa una cantidad válida mayor a cero.";
        msgEl.style.color = "var(--warn)";
        return;
    }

    var parte     = partes.find(function(p) { return p.id === idParte; });
    var resultado = tipo === "entrada"
        ? registrarEntrada(idParte, cantidad)
        : registrarSalida(idParte, cantidad);

    if (resultado === true) {
        var now = new Date();
        var ts  = String(now.getUTCHours()).padStart(2,"0")   + ":" +
                  String(now.getUTCMinutes()).padStart(2,"0") + ":" +
                  String(now.getUTCSeconds()).padStart(2,"0") + "Z";

        historialMovimientos.push({
            tipo:       tipo,
            idParte:    idParte,
            nombreParte: parte ? parte.nombre : idParte,
            unidad:     parte ? parte.unidad : "pza",
            cantidad:   cantidad,
            nota:       nota,
            timestamp:  ts
        });

        msgEl.textContent = "✔ " + tipo.toUpperCase() + " registrada — " + cantidad + " unidades de " + (parte ? parte.nombre : idParte);
        msgEl.style.color = "var(--accent)";

        document.getElementById("inputCantidad").value = "";
        document.getElementById("inputNota").value     = "";

        renderizarLog();
        if (parteSeleccionada && parteSeleccionada.id === idParte) {
            seleccionarParte(parte);
        } else {
            filtrarPartes(filtroActual);
        }
        actualizarValorTotal();

    } else if (resultado === false) {
        msgEl.textContent = tipo === "salida"
            ? "✖ STOCK INSUFICIENTE — la cantidad solicitada supera el stock disponible."
            : "✖ No se pudo registrar la entrada. Verifica el ID de la parte.";
        msgEl.style.color = "var(--danger)";

    } else {
        msgEl.textContent = "⚠ La función registrar" + (tipo === "entrada" ? "Entrada" : "Salida") + "() aún no está implementada.";
        msgEl.style.color = "var(--warn)";
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔧  poblarSelectParte()
//  Carga las opciones del desplegable de partes en el formulario central.
// ─────────────────────────────────────────────────────────────────────────────

function poblarSelectParte() {
    var select = document.getElementById("selectParte");
    partes.forEach(function(p) {
        var opt   = document.createElement("option");
        opt.value = p.id;
        opt.textContent = "[" + p.id + "] " + p.nombre;
        select.appendChild(opt);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

setInterval(actualizarReloj, 1000);
actualizarReloj();
poblarSelectParte();
renderizarListaPartes(partes);
renderizarLog();
