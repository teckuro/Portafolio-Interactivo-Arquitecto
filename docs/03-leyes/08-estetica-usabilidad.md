# 08 · Efecto de estética y usabilidad — `EU`

**Principio:** las interfaces agradables se perciben como más fáciles de usar y generan más tolerancia a los errores menores.

**Traducción a arquitectura:** en esta disciplina el portafolio **es en sí mismo una muestra de criterio de diseño**. El lector evalúa la composición del documento tanto como los proyectos. Una plantilla mediocre resta puntos incluso con buenos proyectos. Aun así, la estética **nunca** puede costar legibilidad.

**Aplica a:** lector.

## Reglas

| ID | Regla |
|----|-------|
| EU-R1 | **Grilla modular declarada** (columnas + módulos verticales + márgenes) y todo elemento alineado a ella. |
| EU-R2 | **Márgenes generosos** y espacio en blanco usado como material: ninguna página llena al 100 %, salvo las imágenes a sangre que son intencionales. |
| EU-R3 | **Tipografía:** máximo 2 familias. Tamaños mínimos propuestos: cuerpo ≥ 9 pt en A3 / ≥ 16 px en web; pies ≥ 7 pt / ≥ 13 px. |
| EU-R4 | Texto sobre imagen solo si el contraste es ≥ 4,5:1, verificado en la zona donde cae el texto (con una veladura o eligiendo un área tranquila de la imagen). |
| EU-R5 | **Estilos de plantilla** seleccionables por la descripción ("minimalista", "técnico", "cálido/material", "editorial"). Todos comparten las mismas reglas y solo cambian la tipografía, el acento y la densidad. |
| EU-R6 | **Los planos de línea siempre van sobre fondo claro**, aunque el estilo de la plantilla sea oscuro. |
| EU-R7 | En web, las áreas táctiles miden ≥ 44 × 44 px y el contraste de la interfaz cumple AA. |

## Verificación

| ID | Comprobación |
|----|--------------|
| EU-V1 | Todos los elementos caen en la grilla (con una tolerancia de ±0,5 mm / ±1 px). |
| EU-V2 | ≤ 2 familias tipográficas; ningún texto bajo el tamaño mínimo. |
| EU-V3 | El contraste de todo el texto sobre imagen es ≥ 4,5:1. |
| EU-V4 | Ningún plano técnico queda sobre un fondo oscuro. |

## Antipatrones

- Tipografías decorativas o "de arquitecto" imitando la letra técnica a mano.
- Fondo negro con planos de línea gris fina.
- Texto blanco sobre un cielo de render.
- Cada página con una composición distinta "para que sea dinámico".

## Relaciones y conflictos

- **Similitud:** la coherencia **es** estética en un documento editorial.
- **Carga cognitiva:** paleta neutra (`CC-R3`).
- **Conflicto con el gusto del autor:** se permite personalizar (EU-R5) dentro de las reglas, no fuera de ellas.

## Preguntas abiertas

- ¿Qué familias tipográficas (libres de licencia) se incluyen por defecto?
- ¿Cuántos estilos de plantilla tiene v1? Propuesta: 2 (minimalista y editorial).
