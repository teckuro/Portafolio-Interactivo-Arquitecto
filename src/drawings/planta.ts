import type { EspecPlanta } from '../model/types';
import { patrones, svg, uid } from './svg';

/**
 * Planta arquitectónica generada a partir de datos (TES-R1: el autor describe,
 * el sistema dibuja). Incluye los elementos que la plantilla agrega con un
 * estilo único (SIM-R1): ejes, escala gráfica, norte, línea de corte,
 * números de recinto (RR-R3) y marcadores de vista enlazados (CU-R2).
 */

const S = 40; // unidades de viewBox por metro
const MURO = 0.22 * S;

export function dibujarPlanta(e: EspecPlanta, etiqueta: string): string {
  const id = uid('pl');
  const pad = { izq: 2.2, sup: 2.2, der: 2.6, inf: 2.8 };
  const X = (m: number) => (pad.izq + m) * S;
  const Y = (m: number) => (pad.sup + m) * S;
  const W = (pad.izq + e.ancho + pad.der) * S;
  const H = (pad.sup + e.alto + pad.inf) * S;
  const fs = 0.42 * S;
  const partes: string[] = [`<defs>${patrones(id)}</defs>`];

  // Ejes estructurales con burbujas (A, B, C… / 1, 2, 3…)
  const ejes: string[] = [];
  (e.ejesX ?? []).forEach((m, i) => {
    ejes.push(`<line x1="${X(m)}" y1="${Y(-1.3)}" x2="${X(m)}" y2="${Y(e.alto + 0.6)}" class="eje"/>`);
    ejes.push(`<circle cx="${X(m)}" cy="${Y(-1.65)}" r="${0.4 * S}" class="eje__burbuja"/><text x="${X(m)}" y="${Y(-1.65)}" class="eje__texto" font-size="${fs * 0.85}">${String.fromCharCode(65 + i)}</text>`);
  });
  (e.ejesY ?? []).forEach((m, i) => {
    ejes.push(`<line x1="${X(-1.3)}" y1="${Y(m)}" x2="${X(e.ancho + 0.6)}" y2="${Y(m)}" class="eje"/>`);
    ejes.push(`<circle cx="${X(-1.65)}" cy="${Y(m)}" r="${0.4 * S}" class="eje__burbuja"/><text x="${X(-1.65)}" y="${Y(m)}" class="eje__texto" font-size="${fs * 0.85}">${i + 1}</text>`);
  });
  partes.push(`<g>${ejes.join('')}</g>`);

  // Recintos exteriores (achurado suave, sin muro grueso)
  for (const r of e.recintos.filter((r) => r.exterior)) {
    partes.push(`<rect x="${X(r.x)}" y="${Y(r.y)}" width="${r.w * S}" height="${r.h * S}" fill="url(#${id}-exterior)" stroke="#000" stroke-width="1.2"/>`);
  }
  // Recintos interiores: fondo blanco y muros en poché
  for (const r of e.recintos.filter((r) => !r.exterior)) {
    partes.push(`<rect x="${X(r.x)}" y="${Y(r.y)}" width="${r.w * S}" height="${r.h * S}" fill="#fff"/>`);
  }
  for (const r of e.recintos.filter((r) => !r.exterior)) {
    partes.push(`<rect x="${X(r.x)}" y="${Y(r.y)}" width="${r.w * S}" height="${r.h * S}" fill="none" stroke="#000" stroke-width="${MURO}" stroke-linejoin="miter"/>`);
  }

  // Ventanas: vano en el muro + dos líneas de vidrio
  for (const v of e.ventanas ?? []) {
    const g = MURO + 2;
    if (v.o === 'h') {
      partes.push(`<rect x="${X(v.x)}" y="${Y(v.y) - g / 2}" width="${v.l * S}" height="${g}" fill="#fff"/>`);
      partes.push(`<line x1="${X(v.x)}" y1="${Y(v.y) - 2.5}" x2="${X(v.x + v.l)}" y2="${Y(v.y) - 2.5}" stroke="#000" stroke-width="1"/><line x1="${X(v.x)}" y1="${Y(v.y) + 2.5}" x2="${X(v.x + v.l)}" y2="${Y(v.y) + 2.5}" stroke="#000" stroke-width="1"/>`);
      partes.push(`<line x1="${X(v.x)}" y1="${Y(v.y) - g / 2}" x2="${X(v.x)}" y2="${Y(v.y) + g / 2}" stroke="#000" stroke-width="1.4"/><line x1="${X(v.x + v.l)}" y1="${Y(v.y) - g / 2}" x2="${X(v.x + v.l)}" y2="${Y(v.y) + g / 2}" stroke="#000" stroke-width="1.4"/>`);
    } else {
      partes.push(`<rect x="${X(v.x) - g / 2}" y="${Y(v.y)}" width="${g}" height="${v.l * S}" fill="#fff"/>`);
      partes.push(`<line x1="${X(v.x) - 2.5}" y1="${Y(v.y)}" x2="${X(v.x) - 2.5}" y2="${Y(v.y + v.l)}" stroke="#000" stroke-width="1"/><line x1="${X(v.x) + 2.5}" y1="${Y(v.y)}" x2="${X(v.x) + 2.5}" y2="${Y(v.y + v.l)}" stroke="#000" stroke-width="1"/>`);
      partes.push(`<line x1="${X(v.x) - g / 2}" y1="${Y(v.y)}" x2="${X(v.x) + g / 2}" y2="${Y(v.y)}" stroke="#000" stroke-width="1.4"/><line x1="${X(v.x) - g / 2}" y1="${Y(v.y + v.l)}" x2="${X(v.x) + g / 2}" y2="${Y(v.y + v.l)}" stroke="#000" stroke-width="1.4"/>`);
    }
  }

  // Puertas: vano, hoja y arco de giro
  for (const p of e.puertas ?? []) {
    const g = MURO + 2;
    const l = p.l * S;
    if (p.o === 'v') {
      const x = X(p.x);
      const y = Y(p.y);
      partes.push(`<rect x="${x - g / 2}" y="${y}" width="${g}" height="${l}" fill="#fff"/>`);
      partes.push(`<line x1="${x}" y1="${y}" x2="${x + p.giro * l}" y2="${y}" stroke="#000" stroke-width="1.6"/>`);
      partes.push(`<path d="M ${x + p.giro * l} ${y} A ${l} ${l} 0 0 ${p.giro === 1 ? 1 : 0} ${x} ${y + l}" fill="none" stroke="#000" stroke-width=".8" stroke-dasharray="3 3"/>`);
    } else {
      const x = X(p.x);
      const y = Y(p.y);
      partes.push(`<rect x="${x}" y="${y - g / 2}" width="${l}" height="${g}" fill="#fff"/>`);
      partes.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y + p.giro * l}" stroke="#000" stroke-width="1.6"/>`);
      partes.push(`<path d="M ${x} ${y + p.giro * l} A ${l} ${l} 0 0 ${p.giro === 1 ? 0 : 1} ${x + l} ${y}" fill="none" stroke="#000" stroke-width=".8" stroke-dasharray="3 3"/>`);
    }
  }

  // Números de recinto (la leyenda va en la misma página, RR-R3)
  for (const r of e.recintos.filter((r) => r.n !== undefined)) {
    const cx = X(r.x + r.w / 2);
    const cy = Y(r.y + r.h / 2);
    partes.push(`<g class="recinto"><circle cx="${cx}" cy="${cy}" r="${0.36 * S}" fill="#fff" stroke="#000" stroke-width="1"/><text x="${cx}" y="${cy}" font-size="${fs * 0.8}" class="eje__texto">${r.n}</text></g>`);
  }

  // Línea de corte A-A
  if (e.corte) {
    const y = Y(e.corte.y);
    partes.push(`<line x1="${X(-0.9)}" y1="${y}" x2="${X(e.ancho + 0.9)}" y2="${y}" stroke="#000" stroke-width="2.4" stroke-dasharray="${0.9 * S} ${0.2 * S} ${0.15 * S} ${0.2 * S}"/>`);
    for (const x of [X(-0.9), X(e.ancho + 0.9)]) {
      partes.push(`<path d="M ${x - 0.35 * S} ${y} L ${x + 0.35 * S} ${y} L ${x} ${y - 0.6 * S} Z" fill="#000"/><text x="${x}" y="${y + 0.55 * S}" font-size="${fs}" class="eje__texto">A</text>`);
    }
  }

  // Marcadores de vista y de detalle, enlazados con figuras (CU-R2)
  for (const v of e.vistas ?? []) {
    const cx = X(v.x);
    const cy = Y(v.y);
    const r = 0.48 * S;
    partes.push(`<g class="llamada" data-llamada="${v.n}" tabindex="0" role="button" aria-label="Vista ${v.n}">
      <path d="M ${cx} ${cy} L ${cx + 1.6 * S} ${cy - 0.7 * S} A ${1.75 * S} ${1.75 * S} 0 0 1 ${cx + 1.6 * S} ${cy + 0.7 * S} Z" transform="rotate(${v.ang} ${cx} ${cy})" class="llamada__cono"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" class="llamada__fondo"/>
      <text x="${cx}" y="${cy}" font-size="${fs * 0.95}" class="eje__texto llamada__texto">${v.n}</text></g>`);
  }
  if (e.detalle) {
    const cx = X(e.detalle.x);
    const cy = Y(e.detalle.y);
    const r = 0.75 * S;
    partes.push(`<g class="llamada" data-llamada="${e.detalle.n}" tabindex="0" role="button" aria-label="Detalle D${e.detalle.n}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#000" stroke-width="1.2" stroke-dasharray="4 3"/>
      <line x1="${cx - r * 0.7}" y1="${cy - r * 0.7}" x2="${cx - 1.6 * S}" y2="${cy - 1.4 * S}" stroke="#000" stroke-width="1"/>
      <circle cx="${cx - 1.6 * S}" cy="${cy - 1.4 * S}" r="${0.5 * S}" class="llamada__fondo"/>
      <text x="${cx - 1.6 * S}" y="${cy - 1.4 * S}" font-size="${fs * 0.8}" class="eje__texto llamada__texto">D${e.detalle.n}</text></g>`);
  }

  // Norte
  const nx = X(e.ancho + 1.4);
  const ny = Y(-1.2);
  partes.push(`<g transform="rotate(${e.norte ?? 0} ${nx} ${ny})"><circle cx="${nx}" cy="${ny}" r="${0.7 * S}" fill="none" stroke="#000" stroke-width="1.2"/><path d="M ${nx} ${ny - 0.7 * S} L ${nx + 0.32 * S} ${ny + 0.45 * S} L ${nx} ${ny + 0.2 * S} L ${nx - 0.32 * S} ${ny + 0.45 * S} Z" fill="#000"/></g><text x="${nx}" y="${ny - 1.05 * S}" font-size="${fs * 0.85}" class="eje__texto">N</text>`);

  // Escala gráfica
  const paso = e.ancho > 20 ? 2 : e.ancho > 8 ? 1 : 0.5;
  const ex = X(0);
  const ey = Y(e.alto + 1.6);
  const tramo = paso * S;
  const barras = Array.from({ length: 5 }, (_, i) => `<rect x="${ex + i * tramo}" y="${ey}" width="${tramo}" height="${0.18 * S}" fill="${i % 2 ? '#fff' : '#000'}" stroke="#000" stroke-width="1"/>`).join('');
  const marcas = [0, 1, 2, 5]
    .map((k) => `<text x="${ex + k * tramo}" y="${ey + 0.62 * S}" font-size="${fs * 0.75}" class="eje__texto">${k * paso}</text>`)
    .join('');
  partes.push(`<g>${barras}${marcas}<text x="${ex + 5 * tramo + 0.3 * S}" y="${ey + 0.12 * S}" font-size="${fs * 0.75}" class="eje__texto" text-anchor="start">m</text></g>`);

  return svg(`0 0 ${W} ${H}`, partes.join(''), { etiqueta, clase: 'dibujo dibujo--tecnico' });
}
