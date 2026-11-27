# 05 · La descripción de entrada

Qué necesita saber el programa para generar una buena plantilla y qué hace cuando falta información.

## Datos que se extraen de la descripción

### Obligatorios (sin ellos, el sistema pregunta)

| Dato | Por qué | Ley |
|------|---------|-----|
| Perfil del autor (A1/A2/A3) | Define los defaults | DEF-R1 |
| Lector objetivo (L1/L2/L3) | Define la relevancia, los niveles y el formato | PAR-R5, DP-R5 |
| Lista de proyectos con **nombre**, **estado** y **rol** | No se pueden inferir | TES-R6 |
| Proyecto(s) principal(es) y proyecto pico | Curaduría | PAR-R1, PF-R1 |
| Datos de contacto | Cierre | PF-R3 |

### Recomendados (si faltan, se usa un default y se avisa)

| Dato | Default si falta |
|------|------------------|
| Formato de salida | Según la tabla de `DEF` |
| Estilo visual ("minimalista", "editorial"…) | Minimalista |
| Oficina o área de destino (vivienda, patrimonio, paisaje…) | Sin ajuste de relevancia |
| Límite de páginas o peso (convocatoria) | Presupuestos de `PK` |
| Idioma | Idioma de la descripción |

### Por proyecto

Ficha técnica completa (`02-anatomia-portafolio.md`), una frase síntesis, el texto de concepto y los archivos con su **tipo** (render, foto, plano…).

## Ejemplos de descripción → interpretación

### E1 · Recién titulada que postula a oficinas
> "Soy arquitecta recién titulada de la U. de Chile. Quiero postular a oficinas que hagan vivienda colectiva. Tengo mi proyecto de título (vivienda social en Valparaíso), 3 talleres y una práctica en una oficina donde hice planimetría de detalle. Me gusta algo sobrio."

| Dato | Valor interpretado | Estado |
|------|--------------------|--------|
| Perfil | A2 | ✔ |
| Lector | L1 · área vivienda | ✔ |
| Proyectos | Título, 3 talleres, práctica | ✔ (faltan nombres de los talleres) |
| Rol en la práctica | "Planimetría de detalle" | ✔ |
| Rol en talleres/título | — | ✖ preguntar (¿individual o grupal?) |
| Pico | Probablemente el título | ✖ **preguntar**, no asumir |
| Estilo | Minimalista | ✔ |
| Contacto | — | ✖ preguntar |

**Efectos esperados:** el título abre (PS-R1, si se confirma como pico). La práctica muestra planimetría de detalle en N2 (DP-R5). Los talleres de vivienda suben de prioridad (PAR-R5).

### E2 · Profesional que busca clientes
> "Arquitecto con 10 años de experiencia, oficina propia, 8 casas construidas en el sur de Chile. Quiero una web para conseguir clientes particulares."

| Dato | Valor interpretado | Estado |
|------|--------------------|--------|
| Perfil | A3 | ✔ |
| Lector | L2 | ✔ |
| Formato | Web | ✔ |
| Proyectos | 8 casas, construidas | ✔ (faltan fichas y fotógrafo) |
| Pico | — | ✖ preguntar |

**Efectos esperados:** fotos de obra con crédito (SIM-R2), contacto visible en todas las páginas (DEF-R6), sin intro (UA-R3), 6–8 proyectos.

### E3 · Estudiante que postula a magíster
> "Estudiante de 5° año, postulo a un magíster en Barcelona. Piden PDF A4 de máximo 20 páginas y 10 MB. Me interesa la investigación sobre materiales."

| Dato | Valor interpretado | Estado |
|------|--------------------|--------|
| Perfil | A1 | ✔ |
| Lector | L3 · tema materiales | ✔ |
| Formato | PDF A4, ≤ 20 págs., ≤ 10 MB | ✔ (reemplaza a los presupuestos de PK) |
| Proyectos | — | ✖ preguntar |
| Orden | Relevancia; ofrecer cronología | ⚠ decisión del autor (PS-R6) |

**Efectos esperados:** el proceso sube a N2 (DP-R5), la secuencia de proceso va conectada (CU-R1) y se respeta el límite estricto (PK-R1).

## Comportamiento ante información faltante

1. **Obligatorio:** se pregunta, una pregunta concreta a la vez, con un ejemplo (UA-R5).
2. **Recomendado:** se usa el default y se informa en el reporte.
3. **Nunca** se inventa contenido: ni rol, ni descripción del proyecto, ni datos de ficha.

> Estos tres ejemplos son los **casos de prueba iniciales** del proyecto.
