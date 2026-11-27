# 09 · Prototipo: arquitectura y trazabilidad

Primer prototipo de la revista interactiva, construido sobre el caso E1. Sin frameworks: **Vite + TypeScript + CSS**, para que la estructura sea fácil de leer y se pueda migrar más adelante a otro stack.

## Flujo

```
contenido (datos)  →  compositor  →  spreads  →  plantillas  →  revista (UI)
src/content           src/core       Spread[]    src/layouts     src/ui
                         ↓
                      verificaciones (src/core/checks.ts)
```

## Módulos y patrones

| Carpeta | Responsabilidad | Patrón |
|---------|-----------------|--------|
| `src/model/types.ts` | Modelo de datos: autor, proyecto, ficha, pieza, spread | Modelo de dominio |
| `src/content/` | Contenido de un portafolio (solo datos, sin decisiones de diseño) | Separación contenido / presentación |
| `src/core/composer.ts` | Orden, presupuesto por proyecto, secuencia de secciones, sumario | Servicio de dominio puro (sin DOM) |
| `src/core/checks.ts` | Verificaciones `XX-V#` sobre el resultado | Especificación / reglas |
| `src/layouts/` | Una plantilla por tipo de spread, registradas en `LAYOUTS` | Strategy + registro |
| `src/layouts/partes.ts` | Ficha, figura, folio, estado, leyenda: un solo tratamiento por tipo | Componentes compartidos |
| `src/drawings/` | Plantas desde datos, cortes, detalle, diagrama e ilustraciones SVG | Fábrica (`renderArte`) |
| `src/ui/revista.ts` | Estado único (página + modo) del que se deriva todo lo demás | Controlador |
| `src/ui/gestos.ts` | Teclado y deslizamiento → `siguiente()` / `anterior()` | Adaptadores |
| `src/ui/modelo3d.ts` | Maqueta 3D de la portada (three.js, cargado aparte solo si hace falta) | Componente aislado con interfaz mínima (`separar`, `resaltar`) |
| `src/ui/dialogos.ts` | Ampliar, proceso, contenido y verificación con `<dialog>` nativo | Vistas modales |
| `src/styles/` | Tokens, chrome, página (unidades de contenedor), componentes, impresión | Tokens de diseño |

Para un portafolio nuevo solo hay que escribir un archivo en `src/content/`: el compositor y las plantillas hacen el resto (Tesler).

## Leyes → código

| Ley | Dónde se aplica |
|-----|-----------------|
| Tesler | El contenido no trae posiciones; `composer.ts` y `layouts/` deciden. Las plantas se dibujan desde datos (`drawings/planta.ts`) |
| Carga cognitiva | Una imagen protagonista por página; paleta de plantilla neutra; límites de palabras verificados (`CC-V2`) |
| Proximidad | Retícula de 6 × 12 por página; pie pegado a su figura; título, escala y norte dentro del mismo dibujo |
| Pico y final | El proyecto pico abre a sangre en todo el spread; el cierre lleva contacto y acciones (`PF-V2`) |
| Pareto | 2 spreads para los principales y 1 para los secundarios (`PAR-V1`) |
| Similitud | `partes.ts`: un solo tratamiento por tipo de pieza; estado con un marcador fijo; render ≠ fotografía (`SIM-V4`) |
| Divulgación progresiva | Nivel 3 (croquis, diagrama, maqueta) en el diálogo "Ver el proceso"; planos ampliables |
| Estética y usabilidad | Grilla, 2 familias tipográficas, planos siempre sobre papel claro también en modo oscuro |
| Posición serial | `ordenarProyectos`: pico primero, principal último, tipologías alternadas en el medio (`PS-V1`, `PS-V2`) |
| Reconocer vs. recordar | Folio con sección en cada página; índice con miniaturas; leyenda de recintos en la misma página |
| Parkinson | 20 páginas (`PK-V1`); minutos de lectura por proyecto en el índice |
| Región común | Ficha delimitada por filetes; el spread como región del proyecto |
| Efecto por defecto | Abre en la portada; spread en escritorio y página en móvil; transición sutil activada |
| Usuario activo | Navegación sin instrucciones; el primer clic ya muestra contenido |
| Conexión uniforme | Llamadas planta ↔ figura que se destacan juntas; proceso conectado; trayectoria como línea continua |
| Formato revista (`REV`) | Spread √2:1, lomo virtual, URL por página, texto real (no imagen), exportación A3, sin movimiento si el sistema lo pide |

## Portada con modelo 3D

Si el proyecto pico trae un `modelo` (pisos, volúmenes, núcleo y terreno en metros), la portada muestra una maqueta interactiva en vez de una imagen:

- **Página 1:** maqueta blanca con aristas en tinta, en axonometría (cámara ortográfica), con sombras de estudio. Se gira arrastrando; el botón "Separar pisos" la convierte en axonometría explotada.
- **Página 2:** nombre del proyecto, síntesis y la lista de pisos de arriba hacia abajo, como en un corte. Cada fila está enlazada con su piso en el modelo (CU-R2).
- **Movimiento:** un único momento coreografiado (los pisos se apilan al abrir); sin él si el sistema pide reducir el movimiento.
- **Respaldo:** sin WebGL se muestra la imagen del proyecto; en el PDF el modelo se imprime como imagen fija.
- **Peso:** three.js va en un archivo aparte (~126 KB comprimido) que se descarga solo si la portada lo usa.

El modelo se describe con datos, no se modela a mano: cambiar alturas o desplazamientos en `src/content/` cambia la maqueta.

## Decisiones técnicas

- **Unidades de contenedor (`cqw`)**: toda la página se compone en proporción a su ancho, por eso se ve igual en un monitor, en una tablet y en el PDF.
- **Imagen de spread completo**: cada página muestra su mitad de la misma imagen (`.sangre--izq/der`). En el teléfono, cada mitad es una página.
- **Teléfono**: si la página quedara a menos de 480 px de ancho, pasa a lectura vertical con tipografía en px, para que el texto siga siendo legible.
- **Accesibilidad**: las páginas que no se ven son `inert`; hay un aviso `aria-live` con la posición, foco visible con el destacador, y se respeta `prefers-reduced-motion`.

## Pendiente

- Imágenes reales (el modelo ya acepta `src` en cada pieza).
- Hoy el PDF depende del diálogo de impresión del navegador; falta un exportador propio con versiones "muestra" y "páginas A4".
- Más verificaciones automáticas (hoy hay 9 de las 45 aplicables).
