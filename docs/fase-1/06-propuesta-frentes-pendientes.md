# F1 · Propuesta para completar los frentes pendientes

> **Para leer y aprobar antes de empezar.** Explica qué hará Claude, qué necesita del autor/a del proyecto y qué se entregará. Nada de esto se ejecuta hasta que respondas las preguntas de la sección 6.

## 1. Resumen

Quedan tres frentes abiertos: **B (revistas)**, **C (portafolios reales)** y un resto del **A (ofertas laborales en Chile)**. La propuesta reparte el trabajo así:

- **Claude hace todo lo que se puede hacer con fuentes públicas en línea:** fichas web, revistas digitales, ofertas laborales y portafolios publicados.
- **Tú aportas solo lo que requiere presencia física o personas:** fotos de revistas impresas, tu portafolio y el de colegas, y la prueba de 30 segundos con lectores reales.

Se trabaja en **3 rondas**. La primera no depende de ti.

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
| B3 | **El Croquis, AV, 2G** (impresas) | **Tú** sacas las fotos · Claude analiza | Biblioteca de la facultad: fotografiar **la apertura completa de 1 proyecto** por revista (todas sus páginas, de frente, con buena luz) + sumario + contraportada. ≈ 45 min | 3 pautas completas; H1, H4, H5, H6 y H7 resueltas |
| B4 | **Revistas digitales interactivas** | Claude | Abrir 3–4 publicaciones digitales públicas (incluido al menos un flipbook, como contraejemplo) con un navegador automatizado y medir tiempo de carga, peso, si el texto es seleccionable, si hay URL por página y qué navegación usan (teclado/swipe) | Tabla comparativa contra las reglas `REV`; capturas de referencia (fuera del repo) |

## 4. Frente C · Portafolios reales

| Paso | Qué | Quién | Cómo | Entregable |
|------|-----|-------|------|------------|
| C1 | **Portafolios públicos** | Claude | Buscar 5–8 portafolios **ya publicados** de recién titulados (Issuu, Behance, webs personales) y puntuarlos con la rúbrica. Se registran **anonimizados** (P01…): sin nombre ni link en el repo | Filas completas en `03-muestra-portafolios.md` y en `rubrica.csv` |
| C2 | **Tu portafolio y el de colegas** | **Tú** compartes los PDFs (por la conversación, no en el repo) · Claude evalúa | Rúbrica completa + reporte individual con los 5 cambios de mayor impacto | Para ti, un reporte útil de inmediato; para el proyecto, filas en la muestra |
| C3 | **Prueba de 30 segundos** | **Tú**, con 2–3 personas · Claude prepara el guion | Mostrar cada portafolio 30 s y hacer 3 preguntas. ≈ 10 min por persona | Puntaje 0–3 por portafolio |
| C4 | **Calibración** | Claude | Comparar el puntaje de la rúbrica con la prueba de 30 s. Si no coinciden, ajustar los pesos | Pesos calibrados en `04-rubrica.md` |

**Limitación conocida:** algunas comprobaciones requieren preguntarle al autor del portafolio cuál es su mejor proyecto (PF-V1, PS-V1, PS-V2). En los portafolios públicos (C1) quedan como **NA** o se infieren y se marcan como inferidas. En C2 te lo pregunto directamente.

## 5. Frente A · Resto

| Paso | Qué | Quién | Entregable |
|------|-----|-------|------------|
| A1 | Revisar 10 ofertas laborales chilenas más (arquitecto junior / recién titulado) | Claude | Tabla: piden adjunto o link, peso, páginas, formato |
| A2 | Correo breve de 4 preguntas para 2–3 oficinas ("¿cómo prefieren recibir portafolios?") | Claude lo redacta · **tú decides** si lo envías | Texto listo para copiar; respuestas → `01-convocatorias.md` |

## 6. Rondas y lo que necesito de ti

### Ronda 1 · Solo Claude (empieza cuando apruebes)
B1, B2, B4, C1 (si lo apruebas), A1 y A2 (redacción). Además, prepararé los materiales de tu ronda: **guía de fotos de revistas** (B3) y **guion de la prueba de 30 s** (C3).

### Ronda 2 · Con tu material
B3 (fotos), C2 (PDFs), C3 (prueba de 30 s). Tu tiempo estimado: **≈ 1,5–2 h** en total.

### Ronda 3 · Cierre
C4 (calibración), tabla de ajustes cerrada, actualización de las leyes afectadas, cierre de la Fase 1 y propuesta para la Fase 2.

### Preguntas para aprobar

| # | Pregunta | Si respondes "no" |
|---|----------|-------------------|
| Q1 | ¿Apruebas que analice **portafolios públicos de terceros**, anonimizados y sin guardar sus archivos? | C1 se omite; la muestra depende solo de C2 |
| Q2 | ¿Tienes un **portafolio propio** (aunque esté desactualizado) para incluir? ¿Y de colegas? | C2 se reduce o se omite |
| Q3 | ¿Puedes ir a una **biblioteca** con El Croquis, AV o 2G (o tienes ejemplares)? | B3 se reemplaza por las vistas previas de las editoriales (menos fiable) |
| Q4 | ¿Harás la **prueba de 30 s** con 2–3 personas? | C4 queda sin calibrar; los pesos siguen siendo provisorios |
| Q5 | ¿Quieres el **correo para oficinas** (A2)? | Se mantiene la conclusión C8 como hipótesis |

## 7. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Issuu o Behance bloquean el acceso automatizado | Buscar webs personales y PDFs directos; si aun así no alcanza, la muestra depende más de C2 |
| Muestra pequeña (5–10) | Se declara como exploratoria: sirve para detectar reglas irreales o faltantes, no para sacar estadísticas |
| ARQ sin acceso abierto a las secciones de obra | Se cubre con B3 |
| Sesgo del evaluador (Claude puntúa y también diseñó la rúbrica) | La prueba de 30 s con personas reales (C3) es el control independiente |

## 8. Resultado al terminar la Fase 1

- `02-revistas.md` con 3 o más pautas completas e hipótesis resueltas.
- `03-muestra-portafolios.md` con 5 o más portafolios evaluados.
- `04-rubrica.md` con los pesos calibrados.
- `05-sintesis-ajustes.md` cerrada, con las leyes actualizadas.
- Una propuesta escrita para la Fase 2 (especificación de spreads e interacciones), con el mismo formato que este documento.
