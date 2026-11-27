# 10 · Reconocer en vez de recordar — `RR`

**Principio:** reconocer algo visible cuesta menos esfuerzo que recordarlo de memoria.

**Traducción a arquitectura:** el lector no debe recordar en qué proyecto está, qué recinto es el "4" ni desde dónde se tomó una foto. Esa información tiene que estar **a la vista, en la misma página**.

**Aplica a:** ambos.

## Reglas — lector

| ID | Regla |
|----|-------|
| RR-R1 | **Índice visual** con una miniatura por proyecto, además del nombre y la página. |
| RR-R2 | **Encabezado o pie persistente** en cada página del proyecto: nombre del proyecto + número de página. |
| RR-R3 | **Recintos:** rotulados en el plano o con una **tabla de recintos en la misma página**. Nunca una leyenda numerada en otra página. |
| RR-R4 | **Cortes y vistas:** si una página muestra un corte o una foto de un punto específico, la planta de referencia (aunque sea en miniatura) indica su ubicación en esa página. |
| RR-R5 | **Web:** navegación entre proyectos con miniaturas de anterior/siguiente; el índice siempre a un clic. |
| RR-R6 | El indicador de **estado** del proyecto (`SIM-R5`) se repite en cada página del proyecto, no solo en la apertura. |

## Reglas — autor

| ID | Regla |
|----|-------|
| RR-R7 | El estilo de plantilla se elige **viendo ejemplos**, no describiéndolo de memoria. |
| RR-R8 | El software, el rol y el programa se eligen desde **listas con sugerencias** (con opción de texto libre). |

## Verificación

| ID | Comprobación |
|----|--------------|
| RR-V1 | Cada entrada del índice tiene miniatura. |
| RR-V2 | Toda página de proyecto tiene encabezado/pie con su nombre. |
| RR-V3 | Toda planta con recintos numerados tiene su leyenda en la misma página. |
| RR-V4 | Toda página con corte/vista tiene una referencia de ubicación. |

## Antipatrones

- "Ver leyenda en página 3".
- Páginas de proyecto sin el nombre del proyecto: a mitad del documento, el lector no sabe dónde está.
- Cortes sin indicar por dónde pasan.

## Relaciones y conflictos

- **Conexión uniforme:** RR-R4 se resuelve con conectores o numeración visual (`CU-R2`).
- **Carga cognitiva:** las referencias deben ser pequeñas y discretas para no competir con la imagen protagonista.

## Preguntas abiertas

- RR-R3 y RR-R4 dependen de información que el sistema no tiene (dónde pasa cada corte). ¿Se le pide al autor marcarlo sobre la planta, o queda como recomendación en v1?
