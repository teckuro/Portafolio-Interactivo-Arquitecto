# 12 · Ley de región común — `RC`

**Principio:** los elementos dentro de un mismo límite (borde, fondo, franja) se perciben como un grupo.

**Traducción a arquitectura:** una región delimitada es como un recinto: lo que está adentro pertenece. Sirve para agrupar la ficha técnica, una serie de proceso o todo un proyecto. Pero en un documento lleno de planos (que ya son líneas), los **bordes extra se confunden con dibujo**.

**Aplica a:** lector.

## Reglas

| ID | Regla |
|----|-------|
| RC-R1 | La **ficha técnica** es una región delimitada por **fondo tenue o filete**, con el mismo tratamiento en todos los proyectos. |
| RC-R2 | **Cada proyecto es una región:** se identifica con una franja, una banda lateral o un encabezado persistente que va de la apertura a la última página del proyecto. |
| RC-R3 | Las **series de proceso** (croquis, maquetas) se agrupan en un bloque con un fondo común. |
| RC-R4 | **Ni planos ni imágenes llevan marco.** La región se define con fondo o con espacio, no con cajas, para que no se confunda con líneas del dibujo. |
| RC-R5 | Como máximo **2 niveles** de regiones anidadas (proyecto → ficha/serie). |
| RC-R6 | **Una región = un concepto:** nunca se mezclan dos proyectos ni dos tipos de contenido no relacionados en la misma región. |

## Verificación

| ID | Comprobación |
|----|--------------|
| RC-V1 | Todas las fichas tienen el mismo tratamiento de región. |
| RC-V2 | Ningún plano ni imagen tiene marco añadido por la plantilla. |
| RC-V3 | La profundidad de anidación es ≤ 2. |

## Antipatrones

- Cajas con borde negro alrededor de cada plano.
- La ficha técnica flotando sin delimitar, mezclada con el texto de concepto.
- Cajas dentro de cajas dentro de cajas.

## Relaciones y conflictos

- **Proximidad:** se aplica primero; la región solo se agrega cuando el espacio no basta.
- **Carga cognitiva:** cada región añade un elemento visual, así que se usa con moderación.

## Preguntas abiertas

- ¿La identificación del proyecto (RC-R2) va como banda lateral o en el encabezado? Depende del formato (A3 horizontal vs. web).
