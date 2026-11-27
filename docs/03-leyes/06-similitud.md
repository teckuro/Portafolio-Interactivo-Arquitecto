# 06 · Ley de similitud — `SIM`

**Principio:** los elementos que se ven parecidos se perciben como del mismo tipo o función.

**Traducción a arquitectura:** si todos los proyectos abren igual, el lector **aprende el patrón** en el primero y en los siguientes solo mira el contenido. Si un diagrama se parece a un plano técnico, o un render se ve como una foto de obra, el lector saca conclusiones equivocadas. Lo segundo, además, es un problema **ético**.

**Aplica a:** lector.

## Reglas

| ID | Regla |
|----|-------|
| SIM-R1 | Los **elementos que agrega la plantilla** a los planos (título, escala gráfica, norte, numeración) tienen un estilo único en todo el portafolio. (v1 no redibuja los planos del autor; ver decisión D5). |
| SIM-R2 | Cada **tipo de contenido** (render, foto, plano, diagrama, croquis, maqueta) tiene un tratamiento propio y **consistente**: pie, crédito, fondo y marco. |
| SIM-R3 | **Misma estructura de apertura** en todos los proyectos: misma posición del nombre, de la ficha y de la imagen protagonista. |
| SIM-R4 | Las fichas técnicas tienen siempre **el mismo orden de campos** (ver `02-anatomia-portafolio.md`). |
| SIM-R5 | El **estado** del proyecto (académico, concurso, en desarrollo, construido) se marca con un indicador visual idéntico en todo el documento. |
| SIM-R6 | **Render ≠ foto:** en un proyecto no construido, ninguna imagen generada recibe el tratamiento de "fotografía de obra". El estado `construido` es el único que habilita ese tratamiento. |
| SIM-R7 | Los diagramas tienen un lenguaje gráfico (color de acento, grosor, tipografía) que los distingue de la planimetría técnica. |

## Verificación

| ID | Comprobación |
|----|--------------|
| SIM-V1 | Las aperturas de todos los proyectos usan el mismo layout. |
| SIM-V2 | Las fichas tienen el mismo orden de campos. |
| SIM-V3 | Cada tipo de contenido tiene un único tratamiento. |
| SIM-V4 | No hay imágenes con tratamiento de "foto de obra" en proyectos cuyo estado no es `construido`. |

## Antipatrones

- Cada proyecto con su propia tipografía "porque es su identidad".
- Escalas gráficas de tres estilos distintos.
- Un render fotorrealista sin etiqueta en un proyecto académico, presentado junto a obras construidas.

## Relaciones y conflictos

- **Estética y usabilidad:** la coherencia es parte de la estética del documento.
- **Tensión con identidad de proyecto:** algunos autores quieren un color por proyecto. Se permite **un acento por proyecto** aplicado en los mismos lugares (ver `CU-R5`), sin cambiar la estructura.

## Preguntas abiertas

- ¿La etiqueta "render" debe ser explícita en el pie, o basta con el indicador de estado del proyecto?
