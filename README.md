# Portafolio Interactivo Arquitecto

**Generador de portafolios de arquitectura tipo revista interactiva, guiado por leyes de UX.**

> **Estado:** Fase 1 · Validación. **Todavía no hay código.**
> Este repositorio desglosa, paso a paso, cómo un programa debería convertir la **descripción** de un arquitecto/a (o estudiante) en una **plantilla de portafolio**, aplicando 15 leyes de UX adaptadas a la disciplina.

## Idea en una frase

El arquitecto describe quién es, a quién le presenta el portafolio y qué proyectos tiene; el programa compone una **revista interactiva** (spreads navegables, exportable a PDF), se encarga del orden, la jerarquía, la grilla, las fichas y el peso, y verifica el resultado con reglas medibles.

## Cómo leer este repositorio

| # | Documento | Qué responde | Estado |
|---|-----------|--------------|--------|
| 0 | [docs/00-vision.md](docs/00-vision.md) | ¿Qué problema resolvemos y qué queda fuera? | Borrador |
| 1 | [docs/01-audiencias.md](docs/01-audiencias.md) | ¿Quién crea el portafolio y quién lo lee? | Borrador |
| 2 | [docs/02-anatomia-portafolio.md](docs/02-anatomia-portafolio.md) | ¿De qué partes se compone un portafolio de arquitectura? | Borrador |
| 3 | [docs/03-leyes/](docs/03-leyes/README.md) | Las 15 leyes traducidas a arquitectura, con reglas y verificaciones | Borrador |
| 4 | [docs/04-matriz-leyes-secciones.md](docs/04-matriz-leyes-secciones.md) | ¿Qué ley pesa más en cada sección? | Borrador |
| 5 | [docs/05-descripcion-de-entrada.md](docs/05-descripcion-de-entrada.md) | ¿Qué tiene que decir la descripción para generar una buena plantilla? | Borrador |
| 6 | [docs/06-decisiones-abiertas.md](docs/06-decisiones-abiertas.md) | Qué está decidido y qué falta decidir | 8 cerradas · 8 pendientes |
| 7 | [docs/07-hoja-de-ruta.md](docs/07-hoja-de-ruta.md) | Fases hasta tener un programa funcionando | Borrador |
| 8 | [docs/08-revista-interactiva.md](docs/08-revista-interactiva.md) | Formato revista: modelo de interacción, reglas `REV` e impacto en cada ley | Borrador |
| F1 | [docs/fase-1/](docs/fase-1/README.md) | Validación: convocatorias reales, revistas, portafolios reales y ajustes | **En curso** |

## Convenciones

- Cada regla tiene un **ID trazable** (`TES-R1`, `CC-V2`…): `R` = regla, `V` = verificación. Cuando exista código, cada test referenciará su ID.
- Los números (páginas, palabras, MB, ppi) son **valores por defecto propuestos**, pensados para ajustarse con portafolios reales en la Fase 1.
- "Página" significa página de PDF o pantalla/sección en web, salvo que se indique lo contrario.

## Origen

Versión especializada de la guía genérica de leyes de UX para generación de plantillas (`docs/skills/leyes-ux.md` en `teckuro/Jobs`).
