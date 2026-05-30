# ENUNCIADO DE TRABAJO
## Sistema de Inventario — Machine Shop | Anduril Industries
### Programa: Tecnólogo en Análisis y Desarrollo de Software — SENA 3406211
### Actividad de Aprendizaje: Unidades 1, 2 y 3 — Variables, Tipos de Datos y Estructuras de Datos

---

## Contexto del proyecto

**Anduril Industries** es una empresa de tecnología de defensa que diseña y fabrica sistemas de armas autónomas. Su planta de manufactura (machine shop) cuenta con una bodega en el Sector Alpha, Nivel B2, donde se almacenan partes críticas para el ensamblaje de plataformas como el ALTIUS-600M y el Ghost-X.

El equipo de operaciones ha desarrollado una interfaz web para gestionar el movimiento de partes en bodega. La aplicación ya tiene implementado todo el sistema de navegación, presentación visual y acceso al DOM. Sin embargo, **el núcleo de cálculo no existe**: las funciones que realizan las operaciones aritméticas y de asignación de variables están vacías.

Tu misión es implementar esas funciones para que el sistema de inventario opere correctamente.

---

## Archivos entregados

```
Proyecto_conocimiento/
├── inventario_machineshop.html   ← Interfaz completa (no modificar)
├── css/
│   └── styles-inventario.css    ← Estilos completos (no modificar)
├── js/
│   └── control-inventario.js    ← AQUÍ DEBES ESCRIBIR TU CÓDIGO
├── ENUNCIADO_RUBRICA.md
└── README.md
```

---

## Tu tarea

Abre el archivo `js/control-inventario.js`. Localiza los **6 bloques marcados con `// TODO`** y escribe el código que hace funcionar cada función. No debes modificar ningún otro archivo.

### Funciones a implementar

#### FUNCIÓN 1 — `calcularValorParte(parte)`
Recibe un objeto parte del catálogo. Debe retornar el valor monetario total de esa parte en bodega, es decir, el resultado de combinar la cantidad disponible con su precio por unidad. El resultado es un número de tipo `Number`.

#### FUNCIÓN 2 — `calcularTotalInventario(listado)`
Recibe el arreglo completo de partes. Debe recorrer cada elemento del arreglo y acumular la suma de los valores individuales de cada parte. El resultado es un único número que representa el valor total en dólares de todo el inventario. Apóyate en la Función 1.

#### FUNCIÓN 3 — `registrarEntrada(idParte, cantidad)`
Recibe el identificador de una parte y un número entero positivo. Debe modificar directamente la propiedad `cantidad` del objeto correspondiente dentro del arreglo `partes`, incrementándola en el valor recibido. No debe superar `capacidad_maxima`. Retorna `true` si la operación fue exitosa.

#### FUNCIÓN 4 — `registrarSalida(idParte, cantidad)`
Recibe el identificador de una parte y la cantidad a retirar. Antes de modificar el stock, debe verificar que la cantidad disponible sea suficiente para atender el retiro. Si no alcanza, retorna `false` sin tocar el objeto. Si alcanza, descuenta las unidades y retorna `true`.

#### FUNCIÓN 5 — `calcularPorcentajeOcupacion(parte)`
Recibe un objeto parte. Debe retornar un número entre 0 y 100 que exprese qué proporción de la capacidad máxima está ocupada actualmente. Este porcentaje controla la barra visual del panel derecho.

#### FUNCIÓN 6 — `verificarStockMinimo(parte)`
Recibe un objeto parte. Debe retornar un valor de tipo `Boolean`: `true` si la cantidad actual ha alcanzado o caído por debajo del umbral de alerta, `false` en caso contrario. Esta función activa las tarjetas de alerta del panel izquierdo.

---

## Criterios de aceptación funcional

La aplicación se considera correctamente implementada cuando:

- [ ] El panel inferior muestra el valor total del inventario en dólares (no `⚠ implementar función`).
- [ ] Al hacer clic en cualquier parte, el panel derecho muestra el valor en stock y el porcentaje de ocupación (no `⚠ implementar`).
- [ ] La barra de ocupación se llena proporcionalmente a la cantidad actual vs. la capacidad máxima.
- [ ] Las tarjetas del panel izquierdo muestran correctamente "OK", "BAJO STOCK" o "SIN STOCK" y cambian de color.
- [ ] Al registrar una **entrada**, el stock de la parte aumenta y el log muestra la operación.
- [ ] Al registrar una **salida** con stock suficiente, el stock disminuye y el log muestra la operación.
- [ ] Al registrar una **salida** sin stock suficiente, aparece el mensaje de error en rojo y el stock no cambia.
- [ ] El filtro "⚠ ALERTA" muestra únicamente las partes con stock bajo o crítico.

---

## Restricciones

1. Solo puedes escribir código dentro de los bloques `// TODO` en `control-inventario.js`.
2. No puedes importar librerías externas.
3. No puedes modificar el HTML ni el CSS.
4. Debes usar `var` o `let` para declarar variables locales dentro de las funciones.
5. No puedes usar métodos de arreglo que no se hayan visto en clase (solo `find`, `filter`, `forEach` y bucles `for`).

---
---

# RÚBRICA DE CALIFICACIÓN
## Puntaje total: 100 puntos

---

### CRITERIO 1 — `calcularValorParte(parte)` | 15 puntos

| Indicador | Pts |
|---|---|
| Declara una variable para almacenar el resultado antes de retornar | 5 |
| Usa las dos propiedades correctas del objeto parte | 5 |
| Retorna un valor numérico correcto para cualquier parte del catálogo | 5 |

**Escala de desempeño:**
- **15 pts** — La función retorna el producto exacto para todas las partes.
- **10 pts** — La función calcula pero usa una propiedad incorrecta o retorna un tipo equivocado.
- **5 pts** — Hay intención de multiplicar pero la sintaxis es incorrecta y la función no ejecuta.
- **0 pts** — No hay implementación o el cuerpo está vacío.

---

### CRITERIO 2 — `calcularTotalInventario(listado)` | 20 puntos

| Indicador | Pts |
|---|---|
| Declara una variable acumuladora con valor numérico inicial | 5 |
| Recorre todos los elementos del arreglo usando un mecanismo de iteración | 8 |
| Acumula correctamente el valor de cada parte usando `calcularValorParte` | 7 |

**Escala de desempeño:**
- **20 pts** — El total del panel inferior coincide con la suma manual de todos los valores.
- **14 pts** — Itera correctamente pero no llama a `calcularValorParte` o acumula con un error menor.
- **8 pts** — Intenta iterar pero el acumulador no se inicializa correctamente o se sobreescribe.
- **0 pts** — No hay implementación funcional.

---

### CRITERIO 3 — `registrarEntrada(idParte, cantidad)` | 15 puntos

| Indicador | Pts |
|---|---|
| Modifica correctamente la propiedad `cantidad` del objeto usando asignación | 8 |
| El nuevo valor no supera `capacidad_maxima` | 4 |
| Retorna `true` al finalizar exitosamente | 3 |

**Escala de desempeño:**
- **15 pts** — La entrada se registra, el stock sube en el valor exacto, no excede el máximo, y el log aparece.
- **10 pts** — El stock se incrementa pero no valida el máximo o no retorna `true`.
- **5 pts** — El objeto es encontrado pero la asignación es incorrecta (usa `==` en lugar de `=` u otro error).
- **0 pts** — No hay implementación funcional.

---

### CRITERIO 4 — `registrarSalida(idParte, cantidad)` | 25 puntos

| Indicador | Pts |
|---|---|
| Verifica que el stock disponible sea suficiente antes de modificar | 10 |
| Retorna `false` sin modificar el stock cuando no hay suficiente cantidad | 7 |
| Modifica correctamente la propiedad `cantidad` cuando sí hay stock suficiente | 5 |
| Retorna `true` al finalizar exitosamente | 3 |

**Escala de desempeño:**
- **25 pts** — La salida modifica el stock solo cuando hay suficiente, el mensaje de error aparece cuando no hay, y el log registra las operaciones exitosas.
- **17 pts** — La resta se ejecuta pero la validación previa está ausente o es incorrecta.
- **10 pts** — Intenta restar pero el condicional de validación tiene un error de comparación.
- **5 pts** — El objeto es encontrado pero no hay intento de validar ni de restar.
- **0 pts** — No hay implementación funcional.

---

### CRITERIO 5 — `calcularPorcentajeOcupacion(parte)` | 15 puntos

| Indicador | Pts |
|---|---|
| Aplica la operación aritmética correcta para obtener un porcentaje | 8 |
| El resultado es un número dentro del rango 0–100 | 4 |
| La barra visual del panel derecho refleja visualmente el porcentaje | 3 |

**Escala de desempeño:**
- **15 pts** — La barra se llena proporcionalmente para todas las partes y el valor mostrado es correcto.
- **10 pts** — La fórmula es correcta pero el resultado está en escala 0-1 en lugar de 0-100, o viceversa.
- **5 pts** — Hay división pero se usan las propiedades equivocadas del objeto.
- **0 pts** — No hay implementación funcional.

---

### CRITERIO 6 — `verificarStockMinimo(parte)` | 10 puntos

| Indicador | Pts |
|---|---|
| Compara las propiedades correctas del objeto parte | 5 |
| Retorna un valor de tipo `Boolean` (no un string ni un número) | 3 |
| Las tarjetas del panel izquierdo cambian de color correctamente | 2 |

**Escala de desempeño:**
- **10 pts** — Las tarjetas muestran el estado correcto para todas las partes y el filtro de alertas funciona.
- **6 pts** — Retorna `true`/`false` pero usa la propiedad incorrecta para comparar.
- **3 pts** — La comparación existe pero retorna un número o string en lugar de booleano.
- **0 pts** — No hay implementación funcional.

---

## Tabla resumen

| # | Función | Conceptos evaluados | Pts |
|---|---|---|---|
| 1 | `calcularValorParte` | Variables, operadores de multiplicación | 15 |
| 2 | `calcularTotalInventario` | Recorrido de arreglos, acumulación | 20 |
| 3 | `registrarEntrada` | Asignación, operador de suma | 15 |
| 4 | `registrarSalida` | Condicionales, operador de resta, booleanos | 25 |
| 5 | `calcularPorcentajeOcupacion` | Operadores de división y multiplicación | 15 |
| 6 | `verificarStockMinimo` | Operadores de comparación, tipo Boolean | 10 |
| | **TOTAL** | | **100** |

---

## Escala de valoración SENA

| Rango | Nivel de desempeño |
|---|---|
| 90 – 100 pts | Excelente |
| 80 – 89 pts  | Sobresaliente |
| 70 – 79 pts  | Aceptable |
| 60 – 69 pts  | Insuficiente |
| 0 – 59 pts   | Deficiente |
