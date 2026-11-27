# 08 · Formato: revista interactiva

> El formato de salida de v1 es un **portafolio interactivo tipo revista**: se navega en pantalla como una publicación editorial y se puede exportar a PDF con la misma composición.

## Por qué funciona para arquitectura

- La revista es el formato natural de **publicación de obra**: El Croquis, AV, ARQ y Domus muestran proyectos con un lenguaje que el lector de arquitectura ya conoce.
- La **doble página (spread)** es la unidad de composición de la revista. Un spread de dos páginas A4 verticales equivale a **un A3 horizontal**, el formato estándar del portafolio. Una sola grilla sirve para pantalla, PDF e impresión.
- La interactividad resuelve lo que el PDF no puede: **divulgación progresiva** real, planos ampliables y conexiones planta ↔ foto activas.

## Vocabulario editorial → portafolio

| Término de revista | En el portafolio | Sección (`02-anatomia`) |
|--------------------|------------------|-------------------------|
| Portada | Portada con imagen pico y nombre | S1 |
| Sumario | Índice visual con miniaturas | S3 |
| Editorial / carta | Perfil (≤ 50 palabras) | S2 |
| Apertura de reportaje | Apertura de proyecto (spread completo) | P1 |
| Entradilla | Frase síntesis del proyecto | P1 |
| Cuerpo + destacado (*pull quote*) | Concepto + una frase destacada | P2 |
| Pie de foto | Pie con tipo de imagen y crédito | P2–P5 |
| Ficha técnica | Ficha (igual que en las revistas de arquitectura) | P1 |
| Breves / miscelánea | Otros trabajos | S5 |
| Colaboradores / staff | CV | S6 |
| Contraportada | Cierre con contacto | S7 |
| Folio y cintillo | Número de página + nombre de proyecto/sección | RR-R2 |

## Modelos de interacción posibles

| Modelo | Cómo se navega | A favor | En contra |
|--------|----------------|---------|-----------|
| **M1 · Flipbook** | Efecto 3D de pasar página | Evoca la revista física | Lento; la animación se repite cientos de veces (CC, PK); mal en móvil; muchas veces convierte el texto en imagen (no seleccionable ni accesible) |
| **M2 · Spreads paginados** | Un spread por pantalla; flechas, teclado, swipe; transición breve | Conserva la composición editorial; corresponde 1:1 con el PDF; el pico y el final se controlan con precisión | En móvil hay que reorganizar el contenido |
| **M3 · Scroll editorial** | Scroll vertical continuo, estilo revista digital | Natural en móvil; rápido | Se pierde el spread y la noción de página; composición menos controlada; el PDF sale distinto |

**Recomendación: M2 híbrido.**
- **Escritorio / tablet horizontal:** spreads paginados.
- **Móvil:** cada spread se divide en páginas simples (A4 vertical) y se navega con swipe horizontal; dentro de un proyecto también se puede hacer scroll vertical.
- **PDF:** los mismos spreads, sin interacción (el nivel N3 pasa a anexo).
- **Flipbook:** no se usa. Como mucho, una transición de deslizamiento sutil (≤ 300 ms) que se puede desactivar y respeta `prefers-reduced-motion`.

## Reglas nuevas propias del formato (`REV`)

| ID | Regla |
|----|-------|
| REV-R1 | **Unidad de composición = spread** (proporción √2:1, igual a A3 horizontal). Toda plantilla de página se diseña como spread y como su división en dos páginas simples. |
| REV-R2 | **Lomo virtual:** ningún plano, texto ni elemento clave de una imagen cruza el centro del spread, porque en móvil y en impresión ahí se parte. Las imágenes a sangre de spread completo declaran su **recorte seguro** para cada mitad. |
| REV-R3 | **Navegación evidente:** flechas visibles, teclado (← →), swipe e indicador "spread 6 / 22". Nunca hace falta un tutorial (UA). |
| REV-R4 | **Sumario siempre a un clic** desde cualquier spread (RR-R5). |
| REV-R5 | **URL por spread** (por ejemplo `/#proyecto-3/2`), para que un reclutador pueda compartir o volver a una página concreta. |
| REV-R6 | **El texto es texto:** seleccionable, buscable y legible por lectores de pantalla. Nunca se rasteriza. |
| REV-R7 | **Carga progresiva:** la portada y el spread siguiente se cargan primero; el resto se carga en segundo plano (PK-R6). |
| REV-R8 | **Exportar PDF** desde la contraportada y desde el menú: versión estándar y muestra (DP-R3). |
| REV-R9 | **Sin efectos que retrasen la lectura:** ni sonido, ni animaciones de entrada por elemento, ni autoplay de carrusel. |

## Cómo cambia cada ley con la interactividad

| Ley | Qué aporta o cambia el formato revista interactiva |
|-----|-----------------------------------------------------|
| TES | El sistema **pagina** el contenido en spreads y genera la versión móvil y el PDF sin trabajo extra del autor. |
| CC | Un spread = una idea. Las interacciones son pocas y siempre iguales (avanzar, ampliar, volver al sumario). |
| PRX | El **lomo** es una frontera fuerte: lo que va junto no puede quedar a ambos lados (REV-R2). |
| PF | La apertura del proyecto pico es un **spread a sangre**. La contraportada tiene acciones: escribir un email, descargar el PDF, ver LinkedIn. |
| PAR | Los proyectos principales tienen más spreads; los secundarios caben en 1 spread. |
| SIM | **Lo interactivo se ve interactivo** (por ejemplo, un ícono de lupa en planos ampliables) y lo estático no. El mismo gesto hace siempre lo mismo. |
| DP | N3 deja de ser un anexo: se abre **en contexto** (ampliar plano, ver proceso, ver planimetría completa) y se cierra volviendo al mismo spread. |
| EU | Se habilita el lenguaje editorial: titulares de mayor tamaño, entradillas y destacados, siempre con un máximo de 2 familias tipográficas. |
| PS | El sumario y la secuencia de spreads aplican el orden por relevancia. |
| RR | Folio y cintillo persistentes, sumario con miniaturas e indicador de posición. |
| PK | Se muestra el **tiempo de lectura estimado** por proyecto en el sumario. Hay un presupuesto de spreads y de peso de carga inicial. |
| RC | El spread es la región natural; la ficha técnica es una región dentro de él. |
| DEF | Abre en la portada; spread en escritorio y página simple en móvil; transición activada pero sutil. |
| UA | Se puede navegar sin instrucciones; el primer clic ya lleva a contenido. |
| CU | **Llamadas activas:** al pasar el cursor sobre (o tocar) un marcador en la planta, se resalta la foto o el corte correspondiente, y viceversa. |

## Antipatrones del formato

- Flipbooks de servicios externos con marca de agua y carga de 15 segundos.
- Páginas exportadas como imagen JPG (texto ilegible al hacer zoom y no indexable).
- Un plano cortado por la mitad en móvil porque cruzaba el lomo.
- Instrucciones superpuestas del tipo "Desliza para pasar la página".
- Animación de pasar página con sonido de papel.

## Preguntas abiertas

- ¿Hay que poder publicar la revista como **web pública** (con dominio), o basta con un archivo/link para compartir? (Afecta al alcance: el hosting estaba fuera de v1).
- ¿Interesa medir qué spreads mira el lector (analítica)? Es útil para el autor, pero suma complejidad y temas de privacidad.
