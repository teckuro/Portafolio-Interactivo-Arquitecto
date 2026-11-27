# 03 · Las 15 leyes aplicadas al portafolio de arquitectura

## Formato de cada documento

1. **Principio:** la ley en general.
2. **Traducción a arquitectura:** qué significa en un portafolio.
3. **Aplica a:** lector, autor o ambos.
4. **Reglas** (`XX-R#`): lo que el generador hace.
5. **Verificación** (`XX-V#`): cómo se comprueba.
6. **Antipatrones:** errores típicos de la disciplina.
7. **Relaciones y conflictos** con otras leyes.
8. **Preguntas abiertas.**

## Índice

| # | Prefijo | Ley | Aplica a |
|---|---------|-----|----------|
| 01 | `TES` | [Ley de Tesler](01-tesler.md) | Autor |
| 02 | `CC` | [Carga cognitiva](02-carga-cognitiva.md) | Lector |
| 03 | `PRX` | [Ley de proximidad](03-proximidad.md) | Lector |
| 04 | `PF` | [Regla del pico y el final](04-pico-final.md) | Lector |
| 05 | `PAR` | [Principio de Pareto](05-pareto.md) | Ambos |
| 06 | `SIM` | [Ley de similitud](06-similitud.md) | Lector |
| 07 | `DP` | [Divulgación progresiva](07-divulgacion-progresiva.md) | Lector |
| 08 | `EU` | [Efecto de estética y usabilidad](08-estetica-usabilidad.md) | Lector |
| 09 | `PS` | [Efecto de posición serial](09-posicion-serial.md) | Lector |
| 10 | `RR` | [Reconocer en vez de recordar](10-reconocer-recordar.md) | Ambos |
| 11 | `PK` | [Ley de Parkinson](11-parkinson.md) | Ambos |
| 12 | `RC` | [Ley de región común](12-region-comun.md) | Lector |
| 13 | `DEF` | [Efecto por defecto](13-efecto-defecto.md) | Autor |
| 14 | `UA` | [Paradoja del usuario activo](14-usuario-activo.md) | Ambos |
| 15 | `CU` | [Conexión uniforme](15-conexion-uniforme.md) | Lector |

## Jerarquía cuando las leyes chocan

1. **Honestidad:** autoría, rol, render vs. foto (`SIM-R6`, `DEF-R5`).
2. **Legibilidad:** planos y textos legibles al tamaño final (`CC-R6`, `EU-R3`, `EU-R6`).
3. **Curaduría:** lo mejor visible y con espacio (`PAR`, `PS`, `PF`).
4. **Claridad:** menos ruido (`CC`, `DP`, `PK`).
5. **Organización visual:** `PRX`, `RC`, `SIM`, `CU`.
6. **Estética** (`EU`), siempre dentro de los límites anteriores.

## Conflictos propios de la disciplina

| Conflicto | Resolución propuesta |
|-----------|----------------------|
| Carga cognitiva quiere poco, pero el reclutador quiere **ver planimetría técnica** | La planimetría principal es N2 (visible) y el detalle constructivo es N3. Si un plano no es legible a tamaño de página, se muestra una ampliación parcial (`CC-R6`). |
| Pico y final pide terminar fuerte, pero el **CV va al final** por convención | El CV va antes de una **página de cierre** diseñada, con imagen fuerte y contacto (`PF-R3`). |
| Posición serial pide ordenar por fuerza, pero el lector académico espera **cronología** | Por defecto se ordena por relevancia; la cronología queda como opción explícita (decisión D4). |
| Estética pide fondo oscuro y elegante, pero los **planos de línea fina** se pierden | Gana la legibilidad: los planos van siempre sobre fondo claro (`EU-R6`). |
| Divulgación progresiva pide ocultar, pero en un **PDF no hay "clic"** | En PDF, N3 se convierte en anexo o en versión extendida; en web, en contenido expandible (`DP-R2`). |
