# 06 · Decisiones abiertas

Decisiones que hay que tomar **antes de codificar**. Cada una tiene una recomendación; queda pendiente hasta que se confirme.

| ID | Decisión | Opciones | Recomendación | Impacto | Estado |
|----|----------|----------|---------------|---------|--------|
| D1 | Formato de salida de v1 | PDF · Web · Ambos | **PDF primero**: es lo que piden las oficinas y las convocatorias; la web llega en v2 | Todo el pipeline | ⏳ |
| D2 | Proporción del PDF por defecto | A3 horizontal · A4 horizontal · 16:9 | **A3 horizontal**: estándar de la disciplina, imprimible y razonable en pantalla. Ofrecer 16:9 como alternativa | Grilla, u, tamaños mínimos | ⏳ |
| D3 | Perfil prioritario para v1 | A1 · A2 · A3 | **A2 (recién titulado) → L1**: el caso más frecuente y el que más sufre la reutilización de láminas | Defaults, casos de prueba | ⏳ |
| D4 | Orden por defecto | Relevancia · Cronológico | **Relevancia**, con cronología como opción | PS, PF | ⏳ |
| D5 | ¿El sistema procesa planos? | Solo ubicar y escalar · Agregar escala/norte · Redibujar | **Solo ubicar y escalar** en v1, con advertencia de legibilidad | Complejidad técnica, SIM-R1 | ⏳ |
| D6 | Idiomas | ES · ES + EN | **ES + EN**: muchas postulaciones son al extranjero | Textos de la plantilla | ⏳ |
| D7 | Nombre y visibilidad del repositorio | — | `portafolio-arquitectura-ux`, privado mientras esté en definición | — | ⏳ |
| D8 | Forma de entrada | Texto libre · Formulario guiado · Mixto | **Mixto**: texto libre inicial + preguntas guiadas para lo que falta | UA, TES | ⏳ |
| D9 | Créditos y rol | Obligatorios · Ocultables con advertencia | **Ocultables con advertencia** (DEF-R5) | Ética, SIM, PAR | ⏳ |
| D10 | Legibilidad de planos raster | Escala declarada por el autor · OCR · Solo advertencia manual | **Escala declarada** en v1 (simple y confiable) | CC-R6 | ⏳ |
| D11 | Marcar cortes y vistas en planta | En v1 · Más adelante | **Más adelante**; en v1 queda como recomendación | RR-R4, CU-R2 | ⏳ |
| D12 | Estilos de plantilla en v1 | 1 · 2 · 3+ | **2** (minimalista y editorial) | EU-R5 | ⏳ |

## Cómo cerrar una decisión

1. Cambiar el estado a ✅ y anotar la opción elegida.
2. Actualizar los documentos de las leyes afectadas (quitar la pregunta abierta correspondiente).
3. Si la decisión cambia un número (por ejemplo D2 → la unidad u), actualizar las reglas que lo usan.
