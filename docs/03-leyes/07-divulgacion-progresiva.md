# 07 · Divulgación progresiva — `DP`

**Principio:** mostrar primero lo esencial y revelar el detalle solo cuando se necesita.

**Traducción a arquitectura:** un proyecto se lee por capas, como se presenta en una crítica: primero la imagen y la idea, después la planimetría y al final el detalle constructivo y el proceso. El lector decide cuánto profundiza.

**Aplica a:** lector.

## Niveles

| Nivel | Contenido | ¿Dónde vive? |
|-------|-----------|--------------|
| **N0** | Portada, perfil e índice visual | Siempre visible |
| **N1** | Apertura de proyecto: imagen protagonista, nombre, frase síntesis y ficha | Siempre visible |
| **N2** | Concepto, diagramas, planimetría principal e imágenes clave | Visible en la versión estándar |
| **N3** | Detalles constructivos, proceso completo, maquetas, láminas completas y planimetría secundaria | Versión extendida / anexo (PDF) · expandible (web) |

## Reglas

| ID | Regla |
|----|-------|
| DP-R1 | Todo contenido se clasifica en N0–N3 (el sistema propone el nivel según el tipo de pieza; el autor puede cambiarlo). |
| DP-R2 | **PDF:** N3 se convierte en **anexo** al final (antes del CV) o en un **PDF extendido** aparte. **Web:** N3 se muestra al expandir ("Ver proceso", "Ver planimetría completa"). |
| DP-R3 | El sistema genera **tres profundidades** a partir del mismo contenido: muestra (N0–N1 + piezas clave), estándar (N0–N2) y extendida (N0–N3). |
| DP-R4 | **Profundidad máxima de 2 interacciones** en web para llegar a cualquier pieza. |
| DP-R5 | Lo que es **central para el lector objetivo** no baja a N3. Para L1 (reclutador), la planimetría técnica principal es N2. Para L3 (académico), el proceso es N2. |
| DP-R6 | El contenido de N3 se anuncia con una etiqueta de texto explícita; nunca solo con un ícono. |

## Verificación

| ID | Comprobación |
|----|--------------|
| DP-V1 | Toda pieza tiene un nivel asignado. |
| DP-V2 | La versión estándar no contiene piezas N3. |
| DP-V3 | El contenido central del lector objetivo está en N2 o superior. |

## Antipatrones

- Esconder la planimetría de un portafolio dirigido a una oficina.
- Un anexo de 30 páginas más largo que el cuerpo principal.
- En web, carruseles dentro de modales dentro de pestañas.

## Relaciones y conflictos

- **Pareto:** define qué es N1–N2.
- **Parkinson:** cada versión tiene su presupuesto de páginas.
- **Carga cognitiva:** DP permite cumplir CC sin eliminar contenido.

## Preguntas abiertas

- ¿El anexo va dentro del mismo PDF o siempre en un archivo aparte? (Afecta al peso, `PK-R2`).
