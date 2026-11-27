import type { EntradaSumario, IdLayout, Portafolio, Proyecto, Spread } from '../model/types';

/**
 * Compositor: convierte el contenido en una secuencia de spreads.
 * Aquí viven las decisiones que el autor no debería tomar a mano (Tesler):
 * orden por relevancia (PS-R1), presupuesto por proyecto (PK-R3 / AJ-04)
 * y estructura fija de secciones (SIM-R3, PF-R3).
 */

/** Spreads por proyecto según su prioridad (AJ-04: principal = 2 spreads). */
const SPREADS_POR_PRIORIDAD: Record<Proyecto['prioridad'], IdLayout[]> = {
  pico: ['apertura', 'planimetria'],
  principal: ['apertura', 'planimetria'],
  secundario: ['proyecto-breve'],
};

/**
 * PS-R1: el pico va primero y el segundo más fuerte va último.
 * PS-R3: en el medio se alternan tipologías cuando es posible.
 */
export function ordenarProyectos(proyectos: Proyecto[]): Proyecto[] {
  const pico = proyectos.find((p) => p.prioridad === 'pico');
  const principales = proyectos.filter((p) => p.prioridad === 'principal');
  const secundarios = proyectos.filter((p) => p.prioridad === 'secundario');

  const ultimo = principales.at(-1);
  const medio = [...principales.slice(0, -1), ...secundarios];

  const ordenMedio: Proyecto[] = [];
  const pendientes = [...medio];
  while (pendientes.length) {
    const anterior = ordenMedio.at(-1) ?? pico;
    const idx = pendientes.findIndex((p) => p.tipologia !== anterior?.tipologia);
    ordenMedio.push(...pendientes.splice(idx === -1 ? 0 : idx, 1));
  }

  return [pico, ...ordenMedio, ultimo].filter((p): p is Proyecto => Boolean(p));
}

export function componer(portafolio: Portafolio): Spread[] {
  const spreads: Omit<Spread, 'indice'>[] = [
    { layout: 'portada', seccion: 'Portada' },
    { layout: 'perfil-sumario', seccion: 'Perfil y contenido' },
  ];

  for (const proyecto of ordenarProyectos(portafolio.proyectos)) {
    for (const layout of SPREADS_POR_PRIORIDAD[proyecto.prioridad]) {
      spreads.push({ layout, seccion: proyecto.nombre, proyecto });
    }
  }

  // PF-R3: el CV va antes de un cierre diseñado; nunca se termina en un anexo.
  spreads.push({ layout: 'otros-cv', seccion: 'Otros trabajos y CV' });
  spreads.push({ layout: 'cierre', seccion: 'Contacto' });

  return spreads.map((s, indice) => ({ ...s, indice }));
}

/** Palabras en un texto (CC-R2). */
export function contarPalabras(texto: string): number {
  return texto.trim().split(/\s+/).filter(Boolean).length;
}

/** PK: tiempo de lectura estimado, ~200 palabras por minuto + 10 s por figura. */
function minutosDeLectura(proyecto: Proyecto): number {
  const palabras = contarPalabras(`${proyecto.sintesis} ${proyecto.concepto}`);
  const segundos = (palabras / 200) * 60 + proyecto.piezas.filter((p) => p.nivel < 3).length * 10;
  return Math.max(1, Math.round(segundos / 60));
}

/** Sumario visual (RR-R1): cada proyecto con sus páginas y tiempo de lectura. */
export function construirSumario(spreads: Spread[]): EntradaSumario[] {
  const entradas = new Map<string, EntradaSumario>();
  for (const s of spreads) {
    if (!s.proyecto) continue;
    const inicio = s.indice * 2 + 1;
    const fin = inicio + 1;
    const actual = entradas.get(s.proyecto.id);
    if (actual) actual.paginaFin = fin;
    else entradas.set(s.proyecto.id, { proyecto: s.proyecto, paginaInicio: inicio, paginaFin: fin, minutos: minutosDeLectura(s.proyecto) });
  }
  return [...entradas.values()];
}
