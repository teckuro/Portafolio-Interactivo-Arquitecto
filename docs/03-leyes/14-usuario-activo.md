# 14 · Paradoja del usuario activo — `UA`

**Principio:** las personas no leen instrucciones; empiezan a usar el producto de inmediato, aunque aprender antes les ahorraría tiempo.

**Traducción a arquitectura:** pasa en los dos lados.
- **El lector** no lee la carta de presentación ni la memoria: va directo a las imágenes.
- **El autor** no leerá un manual del generador: va a subir imágenes y esperará ver algo.

**Aplica a:** ambos.

## Reglas — lector

| ID | Regla |
|----|-------|
| UA-R1 | Sin carta de presentación al inicio. El perfil tiene ≤ 50 palabras y va después de la portada o junto al índice. |
| UA-R2 | **Cada proyecto se entiende sin leer su texto:** imagen protagonista + nombre + frase síntesis + ficha bastan para captar qué es. |
| UA-R3 | **Web:** sin pantalla de introducción, animación de carga decorativa ni música. El primer contenido son los proyectos. |

## Reglas — autor

| ID | Regla |
|----|-------|
| UA-R4 | **Primer resultado rápido:** con perfil, lector y **un** proyecto (nombre + 1 imagen + rol) ya se genera una vista previa. El resto se completa iterando. |
| UA-R5 | **Ayuda contextual** en cada campo, con un ejemplo concreto. Por ejemplo: "Rol — Ej.: *Desarrollo de anteproyecto y planimetría de detalle*". |
| UA-R6 | Los **estados vacíos enseñan**: un proyecto sin planimetría muestra "Agrega una planta o un corte: es lo primero que mira una oficina". |
| UA-R7 | Las **advertencias del verificador** se muestran en el contexto de la página afectada, no en un informe que haya que leer completo. |

## Verificación

| ID | Comprobación |
|----|--------------|
| UA-V1 | La primera página después de la portada no es solo texto. |
| UA-V2 | Con datos mínimos (UA-R4) se obtiene una vista previa. |
| UA-V3 | Todo campo del formulario del autor tiene un ejemplo. |

## Antipatrones

- Una "Carta al lector" de una página antes del primer proyecto.
- Un tutorial de 6 pantallas antes de poder subir la primera imagen.
- Un reporte de 40 advertencias al final, sin indicar dónde están.

## Relaciones y conflictos

- **Carga cognitiva:** UA-R2 depende de los límites de texto de CC-R2.
- **Lector académico (L3):** sí lee texto, pero igual empieza por las imágenes. El texto gana espacio en N2, no al inicio.

## Preguntas abiertas

- ¿El autor describe en texto libre o en un formulario guiado? (Decisión D8; afecta a UA-R4 y UA-R5).
