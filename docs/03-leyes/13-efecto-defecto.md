# 13 · Efecto por defecto — `DEF`

**Principio:** la mayoría de las personas acepta la opción preseleccionada. Los valores por defecto son decisiones de diseño.

**Traducción a arquitectura:** el autor va a aceptar casi todo lo que el generador proponga: formato, orden, tipografía, grilla. Por eso **los defaults son la plantilla**. Si son mediocres, la mayoría de los portafolios generados serán mediocres.

**Aplica a:** autor (y, por consecuencia, al lector).

## Reglas

| ID | Regla |
|----|-------|
| DEF-R1 | **Defaults por perfil:** la combinación autor × lector (ver `01-audiencias.md`) define el formato, el número de proyectos, el orden y los presupuestos iniciales. |
| DEF-R2 | **Orden por relevancia** (`PS-R1`) y no por cronología. |
| DEF-R3 | **Estilo minimalista** con tipografía neutra y grilla probada como opción inicial. |
| DEF-R4 | Se genera la **versión estándar** por defecto; la muestra y la versión extendida se ofrecen como derivadas. |
| DEF-R5 | **Créditos y rol visibles por defecto.** Ocultarlos requiere una acción explícita y genera una advertencia en el reporte. |
| DEF-R6 | **Web:** la primera vista muestra proyectos (imagen + nombre), no una introducción. El contacto está accesible desde todas las páginas. |
| DEF-R7 | Datos inferidos del contexto como default editable: idioma de la descripción y formato de papel habitual del país (A3/A4). |

## Tabla inicial de defaults (propuesta)

| Perfil | Lector | Formato | Proyectos | Versión | Orden |
|--------|--------|---------|-----------|---------|-------|
| A1 Estudiante | L1 | PDF A3 horizontal | 3–4 | Estándar | Relevancia |
| A2 Recién titulado | L1 | PDF A3 horizontal | 4–5 | Estándar | Relevancia |
| A3 Profesional | L1 | PDF A3 horizontal | 5–6 | Estándar | Relevancia |
| A3 Profesional | L2 | Web | 6–8 | — | Relevancia |
| A1/A2 | L3 | PDF A4 (o según convocatoria) | 3–4 | Según límite | Relevancia (cronología opcional) |

## Verificación

| ID | Comprobación |
|----|--------------|
| DEF-V1 | Una descripción mínima (perfil + lector + proyectos) produce una plantilla completa sin preguntas de layout. |
| DEF-V2 | Rol y créditos son visibles salvo que exista una acción explícita para ocultarlos. |

## Antipatrones

- Orden cronológico por defecto.
- Defaults "llamativos" (tipografía de moda, fondo negro) que la mayoría no cambiará.
- Rol oculto por defecto "para que se vea más limpio".

## Relaciones y conflictos

- **Tesler:** los defaults son la forma en que el sistema absorbe la complejidad.
- **Ética:** DEF-R5 está por encima de la estética.

## Preguntas abiertas

- ¿A3 horizontal o 16:9 como default para L1? El PDF se lee mayormente en pantalla (ver decisión D2).
