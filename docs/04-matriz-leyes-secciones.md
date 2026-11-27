# 04 · Matriz leyes × secciones

**●** determinante (la sección se diseña en torno a esta ley) · **○** aplica · vacío: no relevante

| Sección | TES | CC | PRX | PF | PAR | SIM | DP | EU | PS | RR | PK | RC | DEF | UA | CU |
|---------|:---:|:--:|:---:|:--:|:---:|:---:|:--:|:--:|:--:|:--:|:--:|:--:|:---:|:--:|:--:|
| S1 Portada | | ● | ○ | ○ | | | ○ | ● | ○ | | | | ○ | ○ | |
| S2 Perfil | | ● | ○ | | ○ | | ○ | ○ | | | ○ | | | ● | |
| S3 Índice | ○ | ○ | ○ | | | ○ | ○ | ○ | ● | ● | | | | | |
| P1 Apertura de proyecto | ○ | ● | ● | ● | ● | ● | ● | ● | | ○ | | ● | ○ | ● | |
| P2 Concepto | | ● | ○ | | | ○ | ○ | | | | | | | ○ | ● |
| P3 Planimetría | ○ | ● | ● | | ○ | ● | ● | ● | | ● | | | | | ● |
| P4 Imágenes | | ● | | ● | ● | ● | | ● | | ○ | ○ | | | | ○ |
| P5 Proceso / detalle | | | ○ | | | | ● | | | | ○ | ● | | | ● |
| S5 Otros trabajos | | ○ | | | ● | ○ | | | | | ● | ○ | | | |
| S6 CV | | ○ | ○ | | | ○ | | | ● | ○ | | | | | ● |
| S7 Cierre / contacto | | | | ● | | | | ● | ○ | | | | ● | ○ | |
| **Generador (autor)** | ● | | | | ● | | | | | ● | ● | | ● | ● | |

## Lectura rápida por sección

- **Apertura de proyecto (P1)** es la pieza más cargada de reglas: ahí se juega la primera impresión de cada proyecto. Es la primera que conviene prototipar.
- **Planimetría (P3)** es donde más chocan la carga cognitiva y la necesidad técnica del lector, y donde se aplican las reglas más específicas de la disciplina (legibilidad, escala, norte, recintos, cortes).
- **Cierre (S7)** es corta, pero determinante: sin ella fallan pico y final y efecto por defecto.
- **El generador** tiene su propio conjunto de leyes (Tesler, Pareto como curaduría, Parkinson como presupuesto, defaults, usuario activo).

## Orden de aplicación propuesto en el generador

```
1. DEF        → cargar defaults según perfil × lector
2. PAR, PS    → curar y ordenar proyectos
3. DP, PK     → asignar niveles y repartir el presupuesto de páginas
4. TES        → componer páginas automáticamente (layouts, fichas, índice)
5. CC, PRX, RC, SIM, CU, RR, EU → reglas de composición de cada página
6. PF         → asegurar el pico y el cierre
7. Verificación de todas las leyes → reporte (UA: advertencias en contexto)
```
