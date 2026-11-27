# F1 · Propuesta para completar los frentes pendientes

> **Para leer y aprobar antes de empezar.** Explica qué hará Claude y qué se entregará.
>
> **Actualización 27-11-2026:** por decisión del autor/a, **se omite la Ronda 2** (fotos de revistas, portafolios propios o de colegas y prueba de 30 s). La Fase 1 se completa solo con fuentes públicas. Si más adelante aparece ese material, se puede sumar sin cambiar el plan.

## 1. Resumen

Quedan tres frentes abiertos: **B (revistas)**, **C (portafolios reales)** y un resto del **A (ofertas laborales en Chile)**. La propuesta reparte el trabajo así:

- **Claude hace todo lo que se puede hacer con fuentes públicas en línea:** fichas web, revistas digitales, ofertas laborales y portafolios publicados.
- ~~Tú aportas fotos de revistas, portafolios y la prueba de 30 s~~ → **omitido**.

Quedan **2 rondas**, y ninguna depende de material tuyo.

## 2. Qué haré y qué no haré

**Sí haré**
- Investigar fuentes públicas y registrar todo con su fuente y fecha.
- Analizar imágenes y PDFs que me compartas.
- Usar **scripts desechables** (por ejemplo, un navegador automatizado para medir el tiempo de carga de una revista digital). Son herramientas de investigación: **no** son el código del producto y **no** se suben al repositorio.
- Proponer ajustes a las reglas, siempre con la evidencia que los respalda.

**No haré**
- Escribir código del producto (sigue reservado para la Fase 3).
- Contactar a personas u oficinas: preparo los textos y tú decides si los envías.
- Guardar en el repositorio portafolios de terceros, nombres ni links personales.
- Inventar resultados. Si algo no se pudo verificar, queda marcado como pendiente.

## 3. Frente B · Revistas

| Paso | Qué | Quién | Cómo | Entregable |
|------|-----|-------|------|------------|
| B1 | **Fichas técnicas web** | Claude | Revisar ~10 proyectos chilenos en Plataforma Arquitectura / ArchDaily y anotar qué campos tienen, en qué orden y con qué frecuencia | Tabla de campos → confirma o refuta H2 y H3; orden definitivo de la ficha (SIM-R4) |
| B2 | **ARQ (PUC)** | Claude | Buscar números de acceso abierto; si hay secciones de obra disponibles, aplicar la pauta a 2 proyectos | 1–2 pautas completas; si no hay acceso, queda marcado y pasa a B3 |
| B3 | **El Croquis, AV, 2G** | Claude | ~~Fotos en biblioteca~~ (omitido). Se usan las **vistas previas públicas** de las editoriales y las librerías (páginas de muestra). Es menos fiable: puede no mostrar una apertura completa | Pautas parciales; las hipótesis que no se puedan resolver quedan marcadas como "no verificadas" |
| B4 | **Revistas digitales interactivas** | Claude | Abrir 3–4 publicaciones digitales públicas (incluido al menos un flipbook, como contraejemplo) con un navegador automatizado y medir tiempo de carga, peso, si el texto es seleccionable, si hay URL por página y qué navegación usan (teclado/swipe) | Tabla comparativa contra las reglas `REV`; capturas de referencia (fuera del repo) |

## 4. Frente C · Portafolios reales

| Paso | Qué | Quién | Cómo | Entregable |
|------|-----|-------|------|------------|
| C1 | **Portafolios públicos** | Claude | Buscar 5–8 portafolios **ya publicados** de recién titulados (Issuu, Behance, webs personales) y puntuarlos con la rúbrica. Se registran **anonimizados** (P01…): sin nombre ni link en el repo | Filas completas en `03-muestra-portafolios.md` y en `rubrica.csv` |
| ~~C2~~ | ~~Tu portafolio y el de colegas~~ | — | **Omitido.** Opcional más adelante | — |
| ~~C3~~ | ~~Prueba de 30 segundos~~ | — | **Omitido** | — |
| C4 | **Revisión de consistencia** (en lugar de la calibración) | Claude | Sin prueba con personas, los pesos **siguen siendo provisorios**. Se revisa solo si la rúbrica separa bien los portafolios evidentemente buenos de los débiles, y que ninguna regla dé siempre el mismo resultado | Nota en `04-rubrica.md`: pesos sin calibrar con lectores reales |

**Limitación conocida:** algunas comprobaciones requieren preguntarle al autor del portafolio cuál es su mejor proyecto (PF-V1, PS-V1, PS-V2). En los portafolios públicos (C1) quedan como **NA** o se infieren y se marcan como inferidas. 

## 5. Frente A · Resto

| Paso | Qué | Quién | Entregable |
|------|-----|-------|------------|
| A1 | Revisar 10 ofertas laborales chilenas más (arquitecto junior / recién titulado) | Claude | Tabla: piden adjunto o link, peso, páginas, formato |
| A2 | Correo breve de 4 preguntas para 2–3 oficinas ("¿cómo prefieren recibir portafolios?") | Claude lo redacta · **tú decides** si lo envías | Texto listo para copiar; respuestas → `01-convocatorias.md` |

## 6. Rondas y lo que necesito de ti

### Ronda 1 · Investigación (Claude)
B1, B2, B3 (con vistas previas), B4, C1 (si se aprueba Q1), A1 y A2 (redacción).

### ~~Ronda 2 · Con tu material~~ — omitida

### Ronda 2 · Cierre (Claude)
C4 (revisión de consistencia), tabla de ajustes cerrada, actualización de las leyes afectadas, cierre de la Fase 1 y propuesta para la Fase 2.

### Preguntas para aprobar

| # | Pregunta | Si respondes "no" |
|---|----------|-------------------|
| Q1 | ¿Apruebas que analice **portafolios públicos de terceros**, anonimizados y sin guardar sus archivos? | C1 se omite; la muestra depende solo de C2 |
| Q2 | ~~¿Portafolio propio o de colegas?~~ | ✅ Respondida: **no** (C2 omitido) |
| Q3 | ~~¿Biblioteca para fotos?~~ | ✅ Respondida: **no** (B3 con vistas previas) |
| Q4 | ~~¿Prueba de 30 s?~~ | ✅ Respondida: **no** (pesos provisorios) |
| Q5 | ¿Quieres el **correo para oficinas** (A2)? | Se mantiene la conclusión C8 como hipótesis |

## 7. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Issuu o Behance bloquean el acceso automatizado | Buscar webs personales y PDFs directos; si aun así no alcanza, la muestra depende más de C2 |
| Muestra pequeña (5–10) y **solo de portafolios públicos** | Se declara como exploratoria: sirve para detectar reglas irreales o faltantes, no para sacar estadísticas. Si se rechaza Q1, el frente C queda vacío y la rúbrica se valida recién en la Fase 3, con el prototipo |
| ARQ sin acceso abierto a las secciones de obra | Se cubre con B3 |
| Sesgo del evaluador (Claude puntúa y también diseñó la rúbrica) | **Sin control independiente** (se omitió C3). Los resultados se marcan como "evaluación de Claude" y conviene que una persona revise al menos un portafolio de muestra en la Fase 3 |

## 8. Resultado al terminar la Fase 1

- `02-revistas.md` con 3 o más pautas completas e hipótesis resueltas.
- `03-muestra-portafolios.md` con 5 o más portafolios evaluados.
- `04-rubrica.md` con revisión de consistencia (pesos provisorios, sin calibrar con lectores).
- `05-sintesis-ajustes.md` cerrada, con las leyes actualizadas.
- Una propuesta escrita para la Fase 2 (especificación de spreads e interacciones), con el mismo formato que este documento.
