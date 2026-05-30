# Proyecto de Conocimiento — Inventario Machine Shop
## Anduril Industries · SENA Formación 3406211

---

## ¿Qué es este proyecto?

Es una actividad de evaluación del módulo de JavaScript donde debes completar un sistema de inventario web ya parcialmente construido. La interfaz, los estilos y la lógica de navegación están listos. Tu trabajo es implementar las **6 funciones JavaScript** que realizan los cálculos de inventario.

---

## Cómo ejecutar la aplicación

No necesitas servidor ni instalación.

1. Clona o descarga este repositorio en tu equipo.
2. Abre el archivo `inventario_machineshop.html` directamente en tu navegador (doble clic o arrastrar a Chrome/Firefox/Edge).
3. La aplicación cargará de inmediato.

> Usa **F12 → Console** para ver errores en tiempo real mientras desarrollas.

---

## Estructura de archivos

```
Proyecto_conocimiento/
│
├── inventario_machineshop.html   ← Interfaz. No modificar.
│
├── css/
│   └── styles-inventario.css    ← Estilos. No modificar.
│
├── js/
│   └── control-inventario.js    ← ✏ AQUÍ VA TU CÓDIGO
│
├── ENUNCIADO_RUBRICA.md         ← Instrucciones detalladas y rubrica
└── README.md                    ← Este archivo
```

---

## Instrucciones paso a paso

### Paso 1 — Estudia la aplicación antes de tocar código

Abre `inventario_machineshop.html` en el navegador. Observa:
- El panel izquierdo muestra las partes pero algunas barras no cargan.
- El panel inferior dice `$ ⚠ implementar función`.
- El panel derecho muestra `⚠ implementar` en los campos de valor y porcentaje.
- Al intentar registrar una entrada o salida, aparece un aviso de función no implementada.

Eso es normal. Así debe verse **antes** de tu trabajo.

### Paso 2 — Abre el archivo JS en tu editor

```
js/control-inventario.js
```

Localiza la sección marcada con el encabezado `TAREAS DEL APRENDIZ`. Encontrarás **6 funciones** con cuerpos vacíos y bloques de comentarios `// TODO`.

### Paso 3 — Implementa cada función en orden

Comienza por la Función 1 (`calcularValorParte`) ya que las demás dependen de ella. El comentario de cada función describe:
- Qué recibe como parámetro
- Qué debe retornar
- Qué concepto de JavaScript aplica

### Paso 4 — Verifica cada función en el navegador

Después de implementar cada función, recarga la página (F5) y comprueba:

| Función implementada | Qué cambia en la interfaz |
|---|---|
| `calcularValorParte` | Panel derecho muestra "VALOR EN STOCK" en dólares |
| `calcularTotalInventario` | Barra inferior muestra el total del inventario |
| `calcularPorcentajeOcupacion` | Barras de las tarjetas y del panel derecho se llenan |
| `verificarStockMinimo` | Tarjetas cambian a naranja/rojo según el stock |
| `registrarEntrada` | El botón "▲ REGISTRAR ENTRADA" funciona y el log aparece |
| `registrarSalida` | El botón "▼ REGISTRAR SALIDA" funciona con validación |

### Paso 5 — Prueba los casos límite

Antes de entregar, verifica estos escenarios:
- Registra una salida con una cantidad **mayor** al stock disponible → debe aparecer el mensaje de error en rojo.
- Registra una entrada que lleve el stock **justo al máximo** → no debe superar `capacidad_maxima`.
- Usa el filtro **"⚠ ALERTA"** del panel izquierdo → solo deben aparecer las partes en estado bajo stock o crítico.

---

## Conceptos JavaScript que aplica cada función

| Función | Unidad de referencia | Concepto |
|---|---|---|
| `calcularValorParte` | Unidad 1 + Unidad 2 | `var`/`let`, operador `*` |
| `calcularTotalInventario` | Unidad 3 | Arreglos, bucles, acumulación |
| `registrarEntrada` | Unidad 1 | Asignación `=`, operador `+` |
| `registrarSalida` | Unidad 1 + Unidad 2 | Asignación `=`, operador `-`, condicional `if` |
| `calcularPorcentajeOcupacion` | Unidad 2 | Operadores `/` y `*` |
| `verificarStockMinimo` | Unidad 2 | Operadores de comparación `<=`, tipo `Boolean` |

---

## Reglas de entrega

1. Solo se califica el archivo `js/control-inventario.js`.
2. No se aceptan modificaciones al HTML ni al CSS.
3. No se permite el uso de librerías externas (jQuery, lodash, etc.).
4. El código debe ejecutarse sin errores en la consola del navegador.
5. Se entrega el archivo JS en la plataforma de aprendizaje o al instructor antes de la fecha indicada.

---

## Errores frecuentes

| Error | Causa probable |
|---|---|
| `TypeError: calcularValorParte is not a function` | La función tiene un error de sintaxis y no se declaró |
| `NaN` en el panel inferior | El acumulador no se inicializó con un valor numérico |
| Barra de stock siempre al 100% | El porcentaje se calculó en escala 0-1, no 0-100 |
| El stock baja aunque no hay suficiente | Falta el condicional de validación en `registrarSalida` |
| Las alertas no aparecen | `verificarStockMinimo` retorna un string en lugar de `Boolean` |

---

## Recursos de consulta

- Archivos de clase en `1_Clase_Variables/`, `2_Clases_Tipos_Datos/`, `3_Clases_Estructuras_Datos/`
- Consola del navegador: **F12 → Console**
- Depuración paso a paso: **F12 → Sources → establecer breakpoints**
- Enunciado completo y rúbrica: `ENUNCIADO_RUBRICA.md`
