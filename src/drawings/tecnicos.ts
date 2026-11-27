import { patrones, pts, svg, uid } from './svg';

/** Cortes, detalle constructivo y diagrama: lenguaje técnico en tinta negra. */

const nivel = (x: number, y: number, texto: string) =>
  `<g><path d="M ${x} ${y} l -9 -14 h 18 Z" fill="#000"/><line x1="${x - 40}" y1="${y}" x2="${x + 14}" y2="${y}" stroke="#000" stroke-width="1"/><text x="${x - 44}" y="${y - 5}" font-size="17" text-anchor="end" class="rotulo">${texto}</text></g>`;

const persona = (x: number, y: number) =>
  `<g stroke="#000" stroke-width="2" fill="none"><circle cx="${x}" cy="${y - 33}" r="5"/><path d="M ${x} ${y - 27} v 15 M ${x - 7} ${y} l 7 -12 l 7 12 M ${x - 8} ${y - 22} h 16"/></g>`;

export function cortePendiente(): string {
  const id = uid('ct');
  const ancho = 300;
  const avance = 180;
  const alto = 95;
  const terreno: [number, number][] = [[0, 668], [1600, 120]];
  const partes: string[] = [`<defs>${patrones(id)}</defs>`];

  // Terreno natural achurado
  partes.push(`<polygon points="${pts([...terreno, [1600, 720], [0, 720]])}" fill="url(#${id}-tierra)"/>`);
  partes.push(`<polyline points="${pts(terreno)}" fill="none" stroke="#000" stroke-width="2.4"/>`);

  for (let i = 0; i < 6; i++) {
    const x = 120 + i * avance;
    const piso = 618 - i * alto;
    const techo = piso - alto;
    // Excavación: el volumen corta el terreno
    partes.push(`<rect x="${x}" y="${techo}" width="${ancho}" height="${alto + 40}" fill="#fff"/>`);
    // Losas, muro de contención y fachada vidriada
    partes.push(`<rect x="${x}" y="${piso}" width="${ancho}" height="11" fill="#000"/>`);
    partes.push(`<rect x="${x}" y="${techo}" width="${ancho}" height="10" fill="#000"/>`);
    partes.push(`<rect x="${x + ancho - 14}" y="${techo}" width="14" height="${alto + 40}" fill="#000"/>`);
    partes.push(`<rect x="${x}" y="${piso + 11}" width="${ancho}" height="29" fill="url(#${id}-hormigon)" stroke="#000" stroke-width="1.4"/>`);
    partes.push(`<line x1="${x + 3}" y1="${techo + 10}" x2="${x + 3}" y2="${piso}" stroke="#000" stroke-width="1"/><line x1="${x + 8}" y1="${techo + 10}" x2="${x + 8}" y2="${piso}" stroke="#000" stroke-width="1"/>`);
    // Baranda del patio sobre la cubierta inferior
    partes.push(`<line x1="${x}" y1="${techo}" x2="${x}" y2="${techo - 30}" stroke="#000" stroke-width="1.4"/><line x1="${x}" y1="${techo - 30}" x2="${x + avance - 60}" y2="${techo - 30}" stroke="#000" stroke-width="1.4"/>`);
    partes.push(nivel(x - 14, piso, `+${(i * 4.4).toFixed(2).replace('.', ',')}`));
    partes.push(persona(x + 70, piso));
    if (i > 0) partes.push(persona(x - 70, techo + alto));
  }

  // Escalera pública en elevación (más allá del plano de corte)
  const escalera: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const x = 60 + i * avance;
    const y = 640 - i * alto;
    escalera.push([x, y], [x + avance * 0.5, y - alto * 0.5], [x + avance, y - alto]);
  }
  partes.push(`<polyline points="${pts(escalera)}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="5 5"/>`);

  return svg('0 0 1600 720', partes.join(''), { etiqueta: 'Corte A-A del conjunto escalonado', clase: 'dibujo dibujo--tecnico' });
}

export function corteMercado(): string {
  const id = uid('cm');
  const partes: string[] = [`<defs>${patrones(id)}</defs>`];
  partes.push(`<rect x="0" y="520" width="1600" height="80" fill="url(#${id}-tierra)"/><line x1="0" y1="520" x2="1600" y2="520" stroke="#000" stroke-width="2.4"/>`);
  partes.push(`<rect x="100" y="210" width="16" height="310" fill="#000"/><rect x="1484" y="210" width="16" height="310" fill="#000"/>`);
  for (let i = 0; i < 7; i++) {
    const x = 100 + i * 200;
    partes.push(`<polyline points="${x},210 ${x},110 ${x + 200},210" fill="none" stroke="#000" stroke-width="8" stroke-linejoin="miter"/>`);
    partes.push(`<line x1="${x + 6}" y1="120" x2="${x + 6}" y2="205" stroke="#000" stroke-width="1"/>`);
    partes.push(`<polyline points="${x},210 ${x + 100},160 ${x + 200},210" fill="none" stroke="#000" stroke-width="1.2"/>`);
    partes.push(`<rect x="${x + 50}" y="440" width="100" height="80" fill="none" stroke="#000" stroke-width="1.4"/>`);
    partes.push(persona(x + 175, 520));
  }
  partes.push(nivel(90, 520, '+0,00'), nivel(90, 210, '+6,20'));
  return svg('0 0 1600 600', partes.join(''), { etiqueta: 'Corte de la nave del mercado', clase: 'dibujo dibujo--tecnico' });
}

export const LEYENDA_DETALLE: string[] = [
  'Panel de fibrocemento 8 mm',
  'Cámara de aire ventilada 40 mm',
  'Lana mineral 80 mm',
  'Muro de hormigón armado 200 mm',
  'Losa de hormigón armado 150 mm',
  'Sobrelosa y piso de madera',
  'Perfil de anclaje de aluminio',
];

export function detalleFachada(): string {
  const id = uid('dt');
  const partes: string[] = [`<defs>${patrones(id)}</defs>`];
  // Capas de la fachada (exterior a la izquierda)
  partes.push(`<rect x="180" y="0" width="12" height="1000" fill="#000"/>`);
  partes.push(`<rect x="240" y="0" width="80" height="1000" fill="url(#${id}-aislacion)" stroke="#000" stroke-width="1.4"/>`);
  partes.push(`<rect x="320" y="0" width="160" height="1000" fill="url(#${id}-hormigon)" stroke="#000" stroke-width="2.4"/>`);
  // Losa y piso
  partes.push(`<rect x="320" y="420" width="480" height="140" fill="url(#${id}-hormigon)" stroke="#000" stroke-width="2.4"/>`);
  partes.push(`<rect x="480" y="392" width="320" height="28" fill="url(#${id}-madera)" stroke="#000" stroke-width="1.4"/>`);
  partes.push(`<line x1="480" y1="0" x2="480" y2="392" stroke="#000" stroke-width="3"/><line x1="480" y1="560" x2="480" y2="1000" stroke="#000" stroke-width="3"/>`);
  // Anclajes y cortagotera
  for (const y of [180, 640, 880]) {
    partes.push(`<path d="M 192 ${y} h 48 v -30 M 240 ${y} h 80" fill="none" stroke="#000" stroke-width="4"/>`);
  }
  partes.push(`<path d="M 140 572 L 192 560 L 320 560" fill="none" stroke="#000" stroke-width="3"/>`);

  // Llamadas numeradas (leyenda en HTML, legible a cualquier tamaño)
  const llamadas: [number, number, number][] = [
    [186, 90, 1], [216, 300, 2], [280, 760, 3], [400, 240, 4], [600, 490, 5], [640, 406, 6], [230, 640, 7],
  ];
  const x0 = 60;
  llamadas.forEach(([x, y, n], i) => {
    const cx = n === 5 || n === 6 ? 740 : x0;
    const cy = n === 5 || n === 6 ? (n === 5 ? 660 : 300) : 60 + i * 140;
    partes.push(`<line x1="${x}" y1="${y}" x2="${cx}" y2="${cy}" stroke="#000" stroke-width="1"/><circle cx="${x}" cy="${y}" r="4" fill="#000"/>`);
    partes.push(`<circle cx="${cx}" cy="${cy}" r="22" fill="#fff" stroke="#000" stroke-width="1.6"/><text x="${cx}" y="${cy}" font-size="22" class="eje__texto">${n}</text>`);
  });
  return svg('0 0 800 1000', partes.join(''), { etiqueta: 'Detalle constructivo del encuentro de losa y fachada ventilada', clase: 'dibujo dibujo--tecnico' });
}

/** Diagrama de estrategia: una secuencia de tres pasos conectados (CU-R1). */
export function diagramaPendiente(): string {
  const partes: string[] = [];
  const paneles = [0, 540, 1080];
  paneles.forEach((ox, i) => {
    const suelo: [number, number][] = [[ox + 20, 400], [ox + 400, 130]];
    partes.push(`<polyline points="${pts(suelo)}" fill="none" stroke="#000" stroke-width="${i === 0 ? 5 : 2}"/>`);
    if (i > 0) {
      for (let k = 0; k < 4; k++) {
        const x = ox + 50 + k * 85;
        const y = 380 - k * 62;
        partes.push(`<rect x="${x}" y="${y - 62}" width="110" height="62" fill="#fff" stroke="#000" stroke-width="3"/>`);
      }
    }
    if (i === 2) {
      partes.push(`<polyline points="${pts([[ox + 30, 420], [ox + 120, 360], [ox + 140, 330], [ox + 220, 280], [ox + 240, 250], [ox + 320, 200], [ox + 340, 170], [ox + 410, 120]])}" fill="none" stroke="var(--resaltador, #ffe14d)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" style="mix-blend-mode:multiply"/>`);
    }
    partes.push(`<circle cx="${ox + 36}" cy="60" r="26" fill="#fff" stroke="#000" stroke-width="2"/><text x="${ox + 36}" y="60" font-size="26" class="eje__texto">${i + 1}</text>`);
    if (i < 2) {
      partes.push(`<line x1="${ox + 430}" y1="250" x2="${ox + 520}" y2="250" stroke="#000" stroke-width="2"/><path d="M ${ox + 520} 250 l -14 -8 v 16 Z" fill="#000"/>`);
    }
  });
  return svg('0 0 1500 460', partes.join(''), { etiqueta: 'Diagrama de estrategia en tres pasos', clase: 'dibujo dibujo--diagrama' });
}

/** Corte del centro cultural: cinco pisos desplazados, auditorio y terraza. */
export function corteCultural(): string {
  const id = uid('cc');
  const partes: string[] = [`<defs>${patrones(id)}</defs>`];
  const suelo = 650;
  partes.push(`<rect x="0" y="${suelo}" width="1600" height="110" fill="url(#${id}-tierra)"/><line x1="0" y1="${suelo}" x2="1600" y2="${suelo}" stroke="#000" stroke-width="2.4"/>`);
  // [x0, x1, alto] de abajo hacia arriba (1 m = 20 unidades)
  const pisos: [number, number, number, string][] = [
    [380, 1000, 100, 'Hall'],
    [260, 940, 140, 'Auditorio'],
    [460, 1280, 90, 'Exposiciones'],
    [320, 1020, 90, 'Talleres'],
    [420, 860, 90, 'Biblioteca'],
  ];
  let y = suelo;
  pisos.forEach(([x0, x1, h], i) => {
    const techo = y - h;
    partes.push(`<rect x="${x0}" y="${techo}" width="${x1 - x0}" height="12" fill="#000"/>`);
    if (i === 0) {
      // Planta libre vidriada
      partes.push(`<line x1="${x0 + 4}" y1="${techo + 12}" x2="${x0 + 4}" y2="${y}" stroke="#000" stroke-width="1"/><line x1="${x0 + 10}" y1="${techo + 12}" x2="${x0 + 10}" y2="${y}" stroke="#000" stroke-width="1"/>`);
      partes.push(`<line x1="${x1 - 4}" y1="${techo + 12}" x2="${x1 - 4}" y2="${y}" stroke="#000" stroke-width="1"/><line x1="${x1 - 10}" y1="${techo + 12}" x2="${x1 - 10}" y2="${y}" stroke="#000" stroke-width="1"/>`);
    } else {
      partes.push(`<rect x="${x0}" y="${techo}" width="12" height="${h}" fill="#000"/><rect x="${x1 - 12}" y="${techo}" width="12" height="${h}" fill="#000"/>`);
    }
    if (i === 1) {
      // Graderías del auditorio
      const g: [number, number][] = [];
      for (let k = 0; k < 10; k++) g.push([x0 + 60 + k * 50, y - 12 - k * 9], [x0 + 110 + k * 50, y - 12 - k * 9]);
      partes.push(`<polyline points="${pts(g)}" fill="none" stroke="#000" stroke-width="2"/>`);
      partes.push(`<rect x="${x0 + 40}" y="${techo + 40}" width="16" height="${h - 52}" fill="none" stroke="#000" stroke-width="1.4"/>`);
    }
    partes.push(nivel(x0 - 14, y, `+${((suelo - y) / 20).toFixed(2).replace('.', ',')}`));
    partes.push(persona(x0 + 90 + i * 40, y));
    y = techo;
  });
  partes.push(nivel(406, y, `+${((suelo - y) / 20).toFixed(2).replace('.', ',')}`));
  // Losa de cubierta, terraza mirador y núcleo
  partes.push(`<rect x="420" y="${y - 12}" width="440" height="12" fill="#000"/>`);
  partes.push(`<rect x="860" y="${y + 78}" width="240" height="12" fill="#000"/><line x1="1100" y1="${y + 78}" x2="1100" y2="${y + 50}" stroke="#000" stroke-width="2"/><line x1="860" y1="${y + 50}" x2="1100" y2="${y + 50}" stroke="#000" stroke-width="1.4"/>`);
  partes.push(persona(1000, y + 78));
  partes.push(`<rect x="680" y="${y - 40}" width="80" height="${suelo - y + 40}" fill="url(#${id}-hormigon)" stroke="#000" stroke-width="2"/>`);
  // Escalera pública exterior en elevación
  const esc: [number, number][] = [];
  for (let k = 0; k < 6; k++) esc.push([k % 2 ? 1300 : 1460, suelo - k * 82], [k % 2 ? 1460 : 1300, suelo - (k + 1) * 82]);
  partes.push(`<polyline points="${pts(esc)}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="6 5"/>`);
  return svg('0 0 1600 760', partes.join(''), { etiqueta: 'Corte A-A del centro cultural de cinco pisos', clase: 'dibujo dibujo--tecnico' });
}

/** Diagrama de estrategia: reunir, apilar y desplazar (CU-R1). */
export function diagramaApilado(): string {
  const partes: string[] = [];
  const caja = (x: number, y: number, w: number, h: number) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="#000" stroke-width="3"/>`;
  [0, 540, 1080].forEach((ox, i) => {
    partes.push(`<line x1="${ox + 10}" y1="410" x2="${ox + 420}" y2="410" stroke="#000" stroke-width="2"/>`);
    if (i === 0) {
      for (let k = 0; k < 5; k++) partes.push(caja(ox + 20 + k * 78, 350, 70, 60));
    } else {
      const desplazamientos = i === 1 ? [0, 0, 0, 0, 0] : [0, -40, 50, -20, 20];
      for (let k = 0; k < 5; k++) partes.push(caja(ox + 130 + desplazamientos[k], 350 - k * 62, 170, 60));
      if (i === 2) {
        partes.push(`<polyline points="${pts([[ox + 30, 410], [ox + 30, 380], [ox + 120, 380], [ox + 120, 300], [ox + 360, 300], [ox + 360, 170], [ox + 410, 170], [ox + 410, 104]])}" fill="none" stroke="var(--resaltador, #ffe14d)" stroke-width="20" stroke-linejoin="round" style="mix-blend-mode:multiply"/>`);
      }
    }
    partes.push(`<circle cx="${ox + 36}" cy="60" r="26" fill="#fff" stroke="#000" stroke-width="2"/><text x="${ox + 36}" y="60" font-size="26" class="eje__texto">${i + 1}</text>`);
    if (i < 2) partes.push(`<line x1="${ox + 440}" y1="250" x2="${ox + 520}" y2="250" stroke="#000" stroke-width="2"/><path d="M ${ox + 520} 250 l -14 -8 v 16 Z" fill="#000"/>`);
  });
  return svg('0 0 1500 460', partes.join(''), { etiqueta: 'Diagrama: reunir, apilar y desplazar', clase: 'dibujo dibujo--diagrama' });
}
