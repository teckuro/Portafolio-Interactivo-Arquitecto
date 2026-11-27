import type { EntradaSumario, Portafolio, Spread } from '../model/types';

/** Contrato de una plantilla de spread (patrón Strategy: una función por tipo). */
export interface CtxLayout {
  spread: Spread;
  portafolio: Portafolio;
  sumario: EntradaSumario[];
  paginaIzq: number;
  paginaDer: number;
  totalPaginas: number;
}

export interface Paginas {
  izq: string;
  der: string;
  /** Clases extra por página (p. ej. páginas a sangre). */
  claseIzq?: string;
  claseDer?: string;
}

export type Layout = (ctx: CtxLayout) => Paginas;
