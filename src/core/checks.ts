import type { Portafolio, Spread } from '../model/types';
import { contarPalabras } from './composer';

/**
 * Verificaciones automáticas (adelanto de la Fase 5).
 * Cada una referencia su ID de docs/03-leyes. Se muestran al abrir la revista
 * con `?verificar` en la URL.
 */
export interface ResultadoCheck {
  id: string;
  descripcion: string;
  ok: boolean;
  detalle: string;
}

export function verificar(portafolio: Portafolio, spreads: Spread[]): ResultadoCheck[] {
  const paginas = spreads.length * 2;
  const proyectos = portafolio.proyectos;
  const spreadsProyecto = spreads.filter((s) => s.proyecto);
  const spreadsPrincipales = spreadsProyecto.filter((s) => s.proyecto?.prioridad !== 'secundario');
  const primero = spreadsProyecto[0]?.proyecto;
  const ultimo = spreadsProyecto.at(-1)?.proyecto;
  const ultimaSeccion = spreads.at(-1);

  const largos = [
    ...proyectos.map((p) => ({ id: p.nombre, campo: 'síntesis', n: contarPalabras(p.sintesis), max: 20 })),
    ...proyectos.map((p) => ({ id: p.nombre, campo: 'concepto', n: contarPalabras(p.concepto), max: 150 })),
    { id: 'Perfil', campo: 'perfil', n: contarPalabras(portafolio.autor.perfil), max: 50 },
  ];
  const excedidos = largos.filter((l) => l.n > l.max);

  const fotosFalsas = proyectos.filter(
    (p) => p.ficha.estado !== 'construido' && p.piezas.some((pz) => pz.tipo === 'fotografia'),
  );

  return [
    {
      id: 'PK-V1',
      descripcion: 'Páginas dentro del presupuesto estándar (16–24, par)',
      ok: paginas >= 16 && paginas <= 24 && paginas % 2 === 0,
      detalle: `${paginas} páginas = ${spreads.length} spreads`,
    },
    {
      id: 'CC-V3',
      descripcion: 'Entre 4 y 6 proyectos completos',
      ok: proyectos.length >= 4 && proyectos.length <= 6,
      detalle: `${proyectos.length} proyectos`,
    },
    {
      id: 'PAR-V1',
      descripcion: 'Proyectos principales ≥ 60 % de las páginas de proyectos',
      ok: spreadsPrincipales.length / spreadsProyecto.length >= 0.6,
      detalle: `${Math.round((spreadsPrincipales.length / spreadsProyecto.length) * 100)} %`,
    },
    {
      id: 'PS-V1',
      descripcion: 'El primer proyecto es el pico',
      ok: primero?.prioridad === 'pico',
      detalle: primero?.nombre ?? '—',
    },
    {
      id: 'PS-V2',
      descripcion: 'El último proyecto es principal',
      ok: ultimo?.prioridad !== 'secundario',
      detalle: ultimo?.nombre ?? '—',
    },
    {
      id: 'PF-V2',
      descripcion: 'La última página es un cierre con contacto',
      ok: ultimaSeccion?.layout === 'cierre' && Boolean(portafolio.autor.email),
      detalle: ultimaSeccion?.seccion ?? '—',
    },
    {
      id: 'TES-V4',
      descripcion: 'Todos los proyectos tienen rol y estado',
      ok: proyectos.every((p) => p.ficha.rol && p.ficha.estado),
      detalle: `${proyectos.filter((p) => p.ficha.rol).length}/${proyectos.length}`,
    },
    {
      id: 'CC-V2',
      descripcion: 'Textos dentro del límite de palabras',
      ok: excedidos.length === 0,
      detalle: excedidos.length ? excedidos.map((e) => `${e.id} (${e.campo}): ${e.n}/${e.max}`).join('; ') : 'todos dentro del límite',
    },
    {
      id: 'SIM-V4',
      descripcion: 'Ningún render se presenta como fotografía de obra',
      ok: fotosFalsas.length === 0,
      detalle: fotosFalsas.length ? fotosFalsas.map((p) => p.nombre).join(', ') : 'correcto',
    },
  ];
}
