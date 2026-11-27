/** Utilidades compartidas por los generadores de dibujos SVG. */

let contador = 0;
/** Ids únicos: el mismo dibujo puede aparecer varias veces en el documento. */
export const uid = (prefijo: string) => `${prefijo}-${++contador}`;

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function svg(
  viewBox: string,
  cuerpo: string,
  { etiqueta = '', ajuste = 'meet', clase = '' }: { etiqueta?: string; ajuste?: 'meet' | 'slice'; clase?: string } = {},
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid ${ajuste}" class="${clase}" role="img" aria-label="${esc(etiqueta)}">${cuerpo}</svg>`;
}

/** Generador pseudoaleatorio con semilla: los dibujos salen siempre iguales. */
export function aleatorio(semilla: number) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Interpolación lineal sobre una polilínea [x, y][] ordenada por x. */
export function alturaEn(perfil: [number, number][], x: number): number {
  for (let i = 1; i < perfil.length; i++) {
    const [x0, y0] = perfil[i - 1];
    const [x1, y1] = perfil[i];
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return perfil[perfil.length - 1][1];
}

export const pts = (p: [number, number][]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/** Patrones de achurado técnico reutilizables. */
export function patrones(id: string): string {
  return `
  <pattern id="${id}-tierra" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <line x1="0" y1="0" x2="0" y2="14" stroke="#000" stroke-width="1"/>
  </pattern>
  <pattern id="${id}-hormigon" width="22" height="22" patternUnits="userSpaceOnUse">
    <circle cx="4" cy="5" r="1.3" fill="#000"/><circle cx="15" cy="9" r="1" fill="#000"/>
    <circle cx="9" cy="17" r="1.6" fill="none" stroke="#000" stroke-width=".8"/><circle cx="19" cy="19" r=".9" fill="#000"/>
  </pattern>
  <pattern id="${id}-aislacion" width="20" height="16" patternUnits="userSpaceOnUse">
    <path d="M0 8 Q5 0 10 8 T20 8" fill="none" stroke="#000" stroke-width=".9"/>
  </pattern>
  <pattern id="${id}-madera" width="10" height="10" patternUnits="userSpaceOnUse">
    <line x1="0" y1="3" x2="10" y2="3" stroke="#000" stroke-width=".6"/><line x1="0" y1="8" x2="10" y2="7" stroke="#000" stroke-width=".6"/>
  </pattern>
  <pattern id="${id}-exterior" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
    <line x1="0" y1="0" x2="0" y2="10" stroke="#000" stroke-opacity=".28" stroke-width=".8"/>
  </pattern>`;
}

/** Filtro de trazo a mano alzada para croquis. */
export function filtroMano(id: string): string {
  return `<filter id="${id}-mano"><feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>`;
}
