# 11 · Ley de Parkinson — `PK`

**Principio:** una tarea se expande hasta ocupar todo el tiempo (o espacio) disponible.

**Traducción a arquitectura:** sin límites, el portafolio crece. El autor agrega "un proyecto más" y "una lámina más", y el lector, que tiene poco tiempo, deja de mirar. Los **presupuestos fijos** de páginas y peso obligan a curar y ayudan al autor a **terminar**.

**Aplica a:** ambos.

## Reglas

| ID | Regla |
|----|-------|
| PK-R1 | **Presupuesto de páginas por versión:** muestra 3–5 · estándar 15–25 · extendida ≤ 40. Si una convocatoria fija un límite, ese límite reemplaza al presupuesto. |
| PK-R2 | **Presupuesto de peso:** muestra ≤ 5 MB · estándar ≤ 10 MB · extendida ≤ 20 MB (configurable según la convocatoria). |
| PK-R3 | **Presupuesto por proyecto:** principales 4–6 páginas; secundarios 2 páginas; "Otros trabajos" ≤ 1 página por pieza. |
| PK-R4 | **El autor ve el presupuesto** en todo momento ("te quedan 3 páginas", "8,2 / 10 MB"). Un límite visible facilita decidir y terminar. |
| PK-R5 | Si se excede el presupuesto, el sistema **propone qué bajar de nivel** (DP) o pasar a "Otros trabajos" (PAR), en vez de comprimir todo un poco más. |
| PK-R6 | **Web:** la primera imagen se ve en < 2,5 s; el resto se carga progresivamente. |

## Verificación

| ID | Comprobación |
|----|--------------|
| PK-V1 | Páginas ≤ presupuesto de la versión. |
| PK-V2 | Peso ≤ presupuesto de la versión. |
| PK-V3 | Cada proyecto respeta su presupuesto de páginas. |

## Antipatrones

- Un PDF de 60 páginas y 120 MB "para que vean todo".
- Bajar la calidad de todas las imágenes para cumplir el peso en lugar de sacar contenido.
- Pedir al autor que adivine cuántas páginas le quedan.

## Relaciones y conflictos

- **Pareto y divulgación progresiva:** son las herramientas para cumplir los presupuestos.
- **Pico y final:** el presupuesto nunca se cumple eliminando el cierre ni reduciendo el pico.

## Preguntas abiertas

- ¿Qué límites reales piden las convocatorias y las oficinas en Chile? Hay que validarlo en la Fase 1 con 5–10 convocatorias reales.
