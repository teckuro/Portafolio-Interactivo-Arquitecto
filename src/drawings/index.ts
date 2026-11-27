import type { Pieza } from '../model/types';
import { dibujarCroquis, dibujarIlustracion, dibujarMaqueta } from './ilustraciones';
import { dibujarPlanta } from './planta';
import { corteCultural, cortePendiente, corteMercado, detalleFachada, diagramaApilado, diagramaPendiente } from './tecnicos';
import { esc } from './svg';

/** Punto único de entrada: una pieza → su representación visual. */
export function renderArte(pieza: Pieza): string {
  if (pieza.src) {
    return `<img src="${esc(pieza.src)}" alt="${esc(pieza.pie)}" loading="lazy" decoding="async">`;
  }
  const a = pieza.arte;
  if (!a) return '';
  switch (a.k) {
    case 'planta': return dibujarPlanta(a, pieza.pie);
    case 'corte': return a.variante === 'pendiente' ? cortePendiente() : a.variante === 'cultural' ? corteCultural() : corteMercado();
    case 'detalle': return detalleFachada();
    case 'diagrama': return a.variante === 'apilado' ? diagramaApilado() : diagramaPendiente();
    case 'ilustracion': return dibujarIlustracion(a.escena, pieza.pie);
    case 'croquis': return dibujarCroquis(a.escena, pieza.pie);
    case 'maqueta': return dibujarMaqueta(pieza.pie, a.escena);
  }
}

/** Dibujos técnicos: siempre sobre fondo claro (EU-R6) y ampliables (DP). */
export const esTecnico = (p: Pieza) => ['planta', 'corte', 'detalle', 'diagrama'].includes(p.tipo);
