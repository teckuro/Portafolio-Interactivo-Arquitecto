# F1-D · Rúbrica de evaluación

Sirve para puntuar **portafolios existentes** (Fase 1) y, más adelante, la **salida del generador** (Fase 5). Fuente única: [rubrica.csv](rubrica.csv), que se puede abrir en Excel o Google Sheets y tiene una columna por portafolio (P01…P05).

## Escala

| Valor | Significado |
|---|---|
| **2** | Cumple |
| **1** | Cumple parcialmente |
| **0** | No cumple |
| **NA** | No aplica (por ejemplo, el portafolio no tiene cortes) |

## Peso por prioridad

Sigue la jerarquía de conflictos de [03-leyes/README.md](../03-leyes/README.md):

| Prioridad | Nivel | Peso |
|---|---|---|
| 1 | Honestidad | 6 |
| 2 | Legibilidad | 5 |
| 3 | Curaduría | 4 |
| 4 | Claridad | 3 |
| 5 | Organización visual | 2 |
| 6 | Estética | 1 |

## Puntaje

- **Puntaje** = Σ (valor × peso) / Σ (2 × peso), considerando solo las comprobaciones que no son NA. Resultado de 0 a 100 %.
- **Bloqueantes:** cualquier **0 en prioridad 1 (honestidad)** se informa aparte, sin importar el puntaje total. Un portafolio que presenta renders como fotos de obra o que oculta su rol no "aprueba" aunque saque 90 %.
- De las 50 verificaciones, **45 se aplican a portafolios existentes**; las otras 5 evalúan el proceso del generador.

## Comprobaciones aplicables a portafolios existentes

| ID | Ley | Comprobación | Cómo medir a mano | Prioridad |
|---|---|---|---|---|
| DEF-V2 | Efecto por defecto | El rol y los créditos son visibles | Revisar las fichas y los pies | 1 · Honestidad |
| PAR-V3 | Pareto | Las fichas muestran rol, estado y software | Revisar las fichas | 1 · Honestidad |
| SIM-V4 | Similitud | Ningún render se presenta como foto de obra | Revisar los proyectos no construidos | 1 · Honestidad |
| TES-V4 | Tesler | Todos los proyectos tienen rol y estado | Revisar la apertura de cada proyecto | 1 · Honestidad |
| CC-V4 | Carga cognitiva | Planos legibles al tamaño de página | ¿Se leen los rótulos al 100 % de zoom en una laptop? | 2 · Legibilidad |
| EU-V2 | Estética y usabilidad | ≤ 2 familias tipográficas y tamaños legibles | Contar familias; leer los pies al 100 % | 2 · Legibilidad |
| EU-V3 | Estética y usabilidad | Contraste suficiente del texto sobre imagen | Revisar los textos superpuestos | 2 · Legibilidad |
| EU-V4 | Estética y usabilidad | Ningún plano sobre fondo oscuro | Revisar los planos | 2 · Legibilidad |
| PF-V3 | Pico y final | Sin imágenes pixeladas | Zoom al 200 % en las imágenes grandes | 2 · Legibilidad |
| PRX-V3 | Proximidad | Plano + título + escala + norte no separados | Revisar todos los planos | 2 · Legibilidad |
| RR-V3 | Reconocer vs recordar | La leyenda de recintos está en la misma página | Revisar las plantas | 2 · Legibilidad |
| CC-V3 | Carga cognitiva | Entre 4 y 6 proyectos completos | Contar | 3 · Curaduría |
| DP-V3 | Divulgación progresiva | El contenido central para el lector es visible | L1: ¿hay planimetría técnica visible? L3: ¿hay proceso? | 3 · Curaduría |
| PAR-V1 | Pareto | Proyectos principales ≥ 60 % de las páginas de proyectos | Contar páginas | 3 · Curaduría |
| PAR-V2 | Pareto | Las piezas clave de cada proyecto tienen mayor tamaño | Revisar cada proyecto | 3 · Curaduría |
| PF-V1 | Pico y final | El mejor proyecto tiene la imagen más grande | Preguntar al autor cuál es su mejor proyecto | 3 · Curaduría |
| PF-V2 | Pico y final | La última página es un cierre con contacto | Ver la última página | 3 · Curaduría |
| PS-V1 | Posición serial | El primer proyecto es el más fuerte | Preguntar al autor | 3 · Curaduría |
| PS-V2 | Posición serial | El último proyecto es uno de los principales | Preguntar al autor | 3 · Curaduría |
| CC-V1 | Carga cognitiva | Una imagen protagonista por página | Contar las páginas sin protagonista clara | 4 · Claridad |
| CC-V2 | Carga cognitiva | Textos dentro del límite de palabras | Contar palabras en 2 textos de concepto y en el perfil | 4 · Claridad |
| DP-V2 | Divulgación progresiva | El cuerpo principal no tiene detalle excesivo (N3) | ¿Hay láminas completas o detalles secundarios en el cuerpo? | 4 · Claridad |
| PK-V1 | Parkinson | Páginas ≤ presupuesto | Contar páginas simples | 4 · Claridad |
| PK-V2 | Parkinson | Peso ≤ presupuesto | Ver el tamaño del archivo | 4 · Claridad |
| PK-V3 | Parkinson | Páginas por proyecto ≤ presupuesto | Contar por proyecto | 4 · Claridad |
| UA-V1 | Usuario activo | La primera página tras la portada no es solo texto | Ver la página 2 | 4 · Claridad |
| CU-V1 | Conexión uniforme | Las secuencias de proceso están conectadas | Revisar las páginas de proceso | 5 · Organización visual |
| CU-V2 | Conexión uniforme | Los marcadores en la planta tienen contraparte | Revisar | 5 · Organización visual |
| CU-V3 | Conexión uniforme | No hay líneas que unan cosas no relacionadas | Revisar | 5 · Organización visual |
| PRX-V1 | Proximidad | Espaciado intra/inter grupo ≤ 0,5 | Estimar a ojo en 2 páginas | 5 · Organización visual |
| PRX-V2 | Proximidad | Cada pie está más cerca de su imagen que de otra | Revisar todas las páginas con varios pies | 5 · Organización visual |
| PS-V3 | Posición serial | No hay tipologías repetidas seguidas en el medio | Revisar el orden | 5 · Organización visual |
| RC-V1 | Región común | Las fichas tienen el mismo tratamiento de región | Comparar | 5 · Organización visual |
| RC-V2 | Región común | Planos e imágenes sin marcos innecesarios | Revisar | 5 · Organización visual |
| RC-V3 | Región común | Como máximo 2 niveles de cajas anidadas | Revisar | 5 · Organización visual |
| RR-V1 | Reconocer vs recordar | El índice tiene miniaturas | Ver el índice | 5 · Organización visual |
| RR-V2 | Reconocer vs recordar | Cada página de proyecto muestra su nombre | Abrir 3 páginas al azar | 5 · Organización visual |
| RR-V4 | Reconocer vs recordar | Los cortes y vistas indican su ubicación | Revisar los cortes | 5 · Organización visual |
| SIM-V1 | Similitud | Las aperturas de los proyectos usan el mismo layout | Comparar las aperturas | 5 · Organización visual |
| SIM-V2 | Similitud | Las fichas tienen el mismo orden de campos | Comparar las fichas | 5 · Organización visual |
| SIM-V3 | Similitud | Cada tipo de contenido tiene un tratamiento único | Comparar planos, renders y fotos entre proyectos | 5 · Organización visual |
| TES-V2 | Tesler | El índice coincide con las páginas reales | Revisar 3 entradas del índice al azar | 5 · Organización visual |
| TES-V3 | Tesler | Ninguna ficha tiene campos vacíos ni 'N/A' | Revisar todas las fichas | 5 · Organización visual |
| EU-V1 | Estética y usabilidad | Elementos alineados a una grilla | A ojo: ¿los bordes se alinean entre páginas? | 6 · Estética |
| PRX-V4 | Proximidad | Espaciados múltiplos de una unidad base | Aproximado: ¿se percibe un sistema de espaciado? | 6 · Estética |

## Interpretación (provisoria, a calibrar con la muestra)

| Puntaje | Lectura |
|---|---|
| ≥ 85 % | Sólido: solo ajustes menores |
| 65–84 % | Aceptable: hay problemas de comunicación concretos |
| < 65 % | La presentación está perjudicando al contenido |

> Si los puntajes no coinciden con la **prueba de 30 s** ([03-muestra-portafolios.md](03-muestra-portafolios.md)), hay que recalibrar los pesos.
