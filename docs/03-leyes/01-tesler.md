# 01 · Ley de Tesler — `TES`

**Principio:** todo sistema tiene una complejidad irreducible; la pregunta es quién la carga.

**Traducción a arquitectura:** un portafolio exige componer páginas, alinear a una grilla, armar fichas, numerar, crear el índice, uniformar formatos y comprimir imágenes. Hoy todo eso lo hace el arquitecto a mano en InDesign. El generador debe **absorber todo lo mecánico** y dejarle al autor **solo lo que únicamente él puede decidir**.

**Aplica a:** autor.

## Reglas

| ID | Regla |
|----|-------|
| TES-R1 | La ficha técnica se **compone automáticamente** a partir de datos estructurados. El autor llena campos; no diseña la ficha. |
| TES-R2 | El sistema elige el **layout de cada página** según la cantidad, proporción (horizontal/vertical/cuadrada) y tipo de las imágenes. El autor no elige grillas. |
| TES-R3 | **Normaliza** los datos: superficies en m², años en 4 dígitos, nombres de software canónicos ("Revit", "Rhino", no "revit 2024 student"). |
| TES-R4 | **Optimiza el peso** de las imágenes para el formato de salida sin que el autor lo pida. |
| TES-R5 | El índice, la numeración de páginas y los encabezados con el nombre del proyecto se generan solos. |
| TES-R6 | Lo que no se puede deducir **se pregunta** y nunca se infiere: el **rol** en cada proyecto, cuál es el **proyecto más fuerte**, el **lector objetivo**. El sistema no juzga la calidad arquitectónica. |
| TES-R7 | Si el autor sube una **lámina de entrega completa**, el sistema la reconoce (formato y densidad) y propone usarla como anexo, no como página principal. |

## Verificación

| ID | Comprobación |
|----|--------------|
| TES-V1 | El autor no ingresó ningún dato de layout (posiciones, tamaños, grillas) para obtener la primera versión. |
| TES-V2 | El índice coincide con las páginas reales. |
| TES-V3 | Ninguna ficha muestra campos vacíos ni "N/A". |
| TES-V4 | Todos los proyectos tienen rol y estado definidos (si falta alguno, la generación se detiene y pregunta). |

## Antipatrones

- Entregar una plantilla en blanco con 20 layouts para que el autor elija página por página.
- Pedir al autor que comprima sus imágenes o que calcule cuántas páginas le caben.
- Inferir el rol del autor a partir del texto ("diseñamos…") y presentarlo como si fuera un hecho.

## Relaciones y conflictos

- **Efecto por defecto:** absorber complejidad significa elegir bien por el autor; los defaults tienen que ser buenos.
- **Límite de Tesler:** la complejidad de un **proyecto** (un plano denso) es contenido, no ruido. Tesler no autoriza simplificar la arquitectura, solo el proceso.

## Preguntas abiertas

- ¿El sistema debe recortar imágenes automáticamente (encuadre) o solo escalarlas? Recortar puede romper la intención del autor.
- ¿Detectar láminas completas por proporción y densidad es suficiente, o se le pregunta al autor?
