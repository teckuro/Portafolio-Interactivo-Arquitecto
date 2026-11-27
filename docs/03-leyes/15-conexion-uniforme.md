# 15 · Conexión uniforme — `CU`

**Principio:** los elementos conectados visualmente (líneas, flechas, color continuo) se perciben más relacionados que los que no lo están, incluso más que por proximidad o similitud.

**Traducción a arquitectura:** la disciplina ya usa esta ley: líneas de corte, llamadas de detalle, flechas de recorrido. En el portafolio sirve para mostrar **relaciones que el espacio no alcanza a expresar**, como un proceso de diseño, la relación planta–foto o la trayectoria del autor.

**Aplica a:** lector.

## Reglas

| ID | Regla |
|----|-------|
| CU-R1 | **Proceso como secuencia conectada:** croquis → diagrama → maqueta → resultado, unidos por una línea o un eje continuo que se lee como un relato. |
| CU-R2 | **Llamadas planta ↔ imagen/corte:** numeración o marcadores en la planta de referencia que coinciden con los de las imágenes y los cortes (complementa `RR-R4`). |
| CU-R3 | **Línea de tiempo del CV:** formación y experiencia sobre un eje continuo. |
| CU-R4 | **Diagramas** de programa, flujos o relaciones con conectores explícitos y un único estilo (`SIM-R7`). |
| CU-R5 | **Hilo de proyecto (opcional):** un acento de color por proyecto, repetido siempre en los mismos lugares (banda, número, marcadores), para conectar todas sus páginas. |
| CU-R6 | **Sin conexiones falsas:** ninguna línea decorativa une elementos que no están relacionados. |

## Verificación

| ID | Comprobación |
|----|--------------|
| CU-V1 | Toda secuencia de proceso tiene un conector visual. |
| CU-V2 | Los marcadores de la planta tienen su contraparte en la página. |
| CU-V3 | Ninguna línea de la plantilla une bloques de proyectos o secciones distintas. |

## Antipatrones

- Croquis y maquetas desperdigados, sin orden de lectura.
- Fotos numeradas "1, 2, 3" sin marcar su ubicación en la planta.
- Líneas decorativas que cruzan la página entre bloques no relacionados.

## Relaciones y conflictos

- **Proximidad:** cuando lo relacionado puede estar cerca, alcanza con la cercanía. CU se usa cuando no puede.
- **Similitud:** el color de acento por proyecto (CU-R5) no debe confundirse con el indicador de estado (`SIM-R5`).
- **Carga cognitiva:** los conectores son finos y discretos; no se convierten en el protagonista.

## Preguntas abiertas

- CU-R2 requiere que el autor marque puntos en la planta. ¿Es viable en v1 o queda como función posterior?
