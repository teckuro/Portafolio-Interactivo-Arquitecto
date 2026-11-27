# 07 · Hoja de ruta

Avanzamos de lo conceptual a lo concreto. **No se escribe código hasta la Fase 3.**

## Fase 0 · Definición ← *estamos aquí*

- [x] Visión y alcance
- [x] Audiencias (autor y lector)
- [x] Anatomía del portafolio
- [x] Las 15 leyes traducidas, con reglas y verificaciones
- [x] Matriz leyes × secciones
- [x] Descripción de entrada y casos de prueba iniciales
- [x] Decisiones base cerradas: D1 (revista interactiva + PDF), D2 (spread √2:1), D3 (A2 → L1), D5, D8
- [x] Formato revista interactiva desglosado (`08-revista-interactiva.md`)
- [ ] Cerrar **D13** (modelo de interacción) y **D14** (transición)

**Criterio de salida:** D13 y D14 cerradas.

## Fase 1 · Validación con portafolios reales

- [ ] Reunir 5–10 portafolios reales (propios, de colegas o públicos) de distintos perfiles.
- [ ] Analizar 3–5 **revistas de arquitectura** (aperturas de reportaje, fichas, sumarios, pies) y 2–3 **revistas digitales interactivas**: qué convenciones adoptar y qué evitar.
- [ ] Puntuar cada uno con las verificaciones (`XX-V#`) en una planilla manual.
- [ ] Ajustar los números (palabras, páginas, MB, ppi, proyectos) según lo observado.
- [ ] Reunir 5–10 bases de convocatorias u ofertas reales para validar los presupuestos de `PK`.
- [ ] Identificar reglas que nadie cumple (¿son irreales?) y reglas que todos cumplen (¿sobran?).

**Criterio de salida:** reglas con números validados; lista de reglas descartadas o fusionadas.

## Fase 2 · Especificación (todavía sin código)

- [ ] **Modelo de datos** en prosa/tablas: autor, proyecto, ficha, pieza (imagen/plano/texto), nivel y versión.
- [ ] **Catálogo de spreads:** bocetos (a mano o en Figma) de portada, sumario, apertura de proyecto, planimetría, serie de imágenes, proceso, breves (otros trabajos), CV y contraportada. Cada uno **en spread y dividido en dos páginas para móvil** (REV-R1, REV-R2).
- [ ] **Mapa de interacciones:** qué se puede tocar en cada spread (ampliar plano, abrir proceso, llamadas planta ↔ foto) y qué gesto lo activa.
- [ ] **Grilla y unidad u** definitivas.
- [ ] **Algoritmo de composición** descrito paso a paso: cómo elige el layout según las piezas y cómo reparte el presupuesto.
- [ ] **Formato del reporte de verificación.**
- [ ] Flujo del autor (pantallas del generador) en bocetos.

**Criterio de salida:** con la especificación, se puede componer **a mano** el caso E1 y obtener el resultado que el programa debería producir.

## Fase 3 · Prototipo de plantilla (primer código)

- Plantilla estática del caso E1 en el formato de salida elegido.
- Verificaciones manuales sobre el prototipo.

## Fase 4 · Generador

- Entrada → defaults → curaduría → composición → salida.

## Fase 5 · Verificador automático

- Implementar las verificaciones `XX-V#` como tests que referencian su ID.

---

## Próximo paso sugerido

Cerrar **D13** (modelo de interacción) y **D14** (transición) en `06-decisiones-abiertas.md`, y después empezar la Fase 1 con el análisis de revistas.
