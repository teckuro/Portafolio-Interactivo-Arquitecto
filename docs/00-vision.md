# 00 · Visión

## El problema

En arquitectura, un buen proyecto puede verse mal en el portafolio. Los fallos más comunes no tienen que ver con la calidad del diseño, sino con **cómo se comunica**:

- **Láminas de entrega reutilizadas tal cual:** formato A0/A1 reducido, texto ilegible, diez imágenes compitiendo.
- **Sin jerarquía:** todos los proyectos ocupan lo mismo, aunque solo dos o tres sean realmente fuertes.
- **Orden cronológico por inercia:** el primer proyecto que ve el lector es el más antiguo y, muchas veces, el más débil.
- **Información clave ausente:** no queda claro el **rol** del autor, el **estado** del proyecto (académico, concurso, construido) ni el **software** usado.
- **Archivos inmanejables:** PDF de 80 MB que no se puede adjuntar o tarda en abrir.
- **Final débil:** terminan en un anexo técnico o en una página sin datos de contacto.

Componer un portafolio en InDesign toma días, y casi todo ese tiempo se va en tareas mecánicas: alinear, numerar, armar fichas y comprimir.

## Objetivo

Construir un programa que:

1. Reciba una **descripción** (perfil del autor, lector objetivo, proyectos, tono).
2. Genere una **plantilla de portafolio** donde la composición la resuelve el sistema.
3. **Verifique** la plantilla contra las 15 leyes de UX adaptadas y entregue un reporte.

## Dos usuarios, dos experiencias

| Rol | Quién es | Qué experiencia diseñamos |
|-----|----------|---------------------------|
| **Autor** | Arquitecto/a o estudiante que usa el generador | El proceso de describir y obtener la plantilla |
| **Lector** | Reclutador, cliente, comité académico | El portafolio resultante |

Las leyes se aplican sobre todo al **resultado** (lector). Algunas (Tesler, efecto por defecto, usuario activo) también guían el **proceso** (autor). Cada documento de ley lo indica.

## Alcance v1

**Formato:** portafolio **interactivo tipo revista**, navegable por spreads (dobles páginas), adaptado a móvil y exportable a PDF con la misma composición. Ver [08-revista-interactiva.md](08-revista-interactiva.md).

**Perfil prioritario:** recién titulado/a (A2) que postula a oficinas (L1).

**Dentro**
- Plantillas de portafolio **individual**.
- Estructura, orden, jerarquía, grilla, tipografía, fichas técnicas, índice, numeración y cierre.
- Reporte de verificación según las leyes.
- Advertencias sobre el contenido (imagen de baja resolución, plano ilegible a la escala de la página, texto demasiado largo).

**Fuera**
- Editar, renderizar o redibujar imágenes y planos (solo se ubican y se escalan).
- Inventar o redactar contenido arquitectónico: el programa **no** describe proyectos que no conoce.
- Portafolios de oficina/estudio (colectivos).
- Hosting, CMS y dominio.

## Principios

1. **El proyecto manda.** La plantilla es un soporte neutro; nunca compite con las imágenes.
2. **Curar antes que acumular.** Menos proyectos mejor presentados superan a muchos mal presentados.
3. **Reglas verificables.** Toda ley se traduce en algo que se pueda comprobar.
4. **Honestidad.** El rol y la coautoría siempre son visibles, y un render nunca se presenta como si fuera una foto de obra.
5. **El sistema carga la complejidad.** Lo mecánico lo hace el programa; el autor decide lo que solo él puede decidir.

## Criterios de éxito (borrador)

- En **≤ 30 segundos**, el lector sabe quién es el autor, qué tipo de arquitectura hace y cuál es su mejor proyecto.
- En **≤ 3 minutos**, puede recorrer el portafolio completo sin perderse.
- El PDF estándar pesa **≤ 10 MB** y tiene **≤ 25 páginas**.
- Para generar una primera versión aceptable, el autor solo necesita **datos y archivos**, sin decisiones de layout.
