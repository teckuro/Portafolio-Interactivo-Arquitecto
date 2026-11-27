import type { Escena } from '../model/types';
import { aleatorio, alturaEn, filtroMano, pts, svg, uid } from './svg';

/**
 * Ilustraciones que reemplazan a renders y fotografías mientras no haya
 * imágenes reales. Los colores son del lugar (zinc pintado de Valparaíso),
 * no de la plantilla: la plantilla se mantiene neutra (CC-R3).
 */

const ZINC = ['#c9503c', '#e2ad35', '#3f6f9b', '#5f8b62', '#9cc3d5', '#d78b86', '#e9e2cf', '#7a5a8c'];

interface Paleta {
  cielo: [string, string];
  mar: [string, string];
  cerroLejano: string;
  cerro: string;
  bruma: string;
  ventana: string;
  muro: string;
  sombra: string;
}

const DIA: Paleta = {
  cielo: ['#b9cfdb', '#eef1ee'],
  mar: ['#7f9fb2', '#4f7690'],
  cerroLejano: '#a8b6b5',
  cerro: '#c9bea6',
  bruma: '#ffffff',
  ventana: '#2d3a41',
  muro: '#f6f6f2',
  sombra: '#d3d4cd',
};

const TARDE: Paleta = {
  cielo: ['#e9a77f', '#f5dcc2'],
  mar: ['#9d8fa0', '#556b85'],
  cerroLejano: '#b79a92',
  cerro: '#b99b80',
  bruma: '#ffe9d2',
  ventana: '#ffd36b',
  muro: '#f4e7da',
  sombra: '#c9a99a',
};

function casita(x: number, y: number, w: number, h: number, color: string, r: () => number, ventana: string) {
  const techo = r() > 0.5
    ? `<polygon points="${pts([[x - 2, y], [x + w / 2, y - h * 0.35], [x + w + 2, y]])}" fill="#6b6f72"/>`
    : `<rect x="${x - 2}" y="${y - 4}" width="${w + 4}" height="4" fill="#5d6164"/>`;
  const ventanas = Array.from({ length: Math.max(1, Math.floor(w / 14)) }, (_, i) =>
    `<rect x="${x + 5 + i * 14}" y="${y + h * 0.3}" width="6" height="${h * 0.3}" fill="${ventana}" opacity=".85"/>`).join('');
  return `${techo}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>${ventanas}`;
}

function cerro(p: Paleta): string {
  const id = uid('il');
  const r = aleatorio(7);
  const perfil: [number, number][] = [[160, 1000], [420, 820], [700, 700], [980, 560], [1260, 430], [1600, 300]];
  const partes: string[] = [`<defs>
    <linearGradient id="${id}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.cielo[0]}"/><stop offset="1" stop-color="${p.cielo[1]}"/></linearGradient>
    <linearGradient id="${id}-mar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.mar[0]}"/><stop offset="1" stop-color="${p.mar[1]}"/></linearGradient>
    <linearGradient id="${id}-bruma" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.bruma}" stop-opacity="0"/><stop offset=".5" stop-color="${p.bruma}" stop-opacity=".55"/><stop offset="1" stop-color="${p.bruma}" stop-opacity="0"/></linearGradient>
  </defs>`];
  partes.push(`<rect width="1600" height="1000" fill="url(#${id}-cielo)"/>`);
  partes.push(`<rect y="600" width="1600" height="400" fill="url(#${id}-mar)"/>`);
  partes.push(`<polygon points="${pts([[0, 610], [500, 470], [1000, 360], [1600, 250], [1600, 620], [0, 620]])}" fill="${p.cerroLejano}"/>`);
  partes.push(`<polygon points="${pts([...perfil, [1600, 1000]])}" fill="${p.cerro}"/>`);

  // Casas de zinc existentes, sembradas en la ladera (fuera del terreno del proyecto)
  const casas: { y: number; s: string }[] = [];
  for (let i = 0; i < 95; i++) {
    const x = 220 + r() * 1360;
    if (x > 850 && x < 1450) continue;
    const base = alturaEn(perfil, x);
    const y = base + 18 + r() * 260;
    if (y > 990) continue;
    const w = 26 + r() * 26;
    casas.push({ y, s: casita(x, y, w, 22 + r() * 20, ZINC[Math.floor(r() * ZINC.length)], r, p.ventana) });
  }
  partes.push(casas.sort((a, b) => a.y - b.y).map((c) => c.s).join(''));

  // El proyecto: volúmenes blancos escalonados con patios
  for (let k = 0; k < 6; k++) {
    const x = 880 + k * 88;
    const y = alturaEn(perfil, x + 60) - 12;
    partes.push(`<rect x="${x}" y="${y}" width="104" height="70" fill="${p.muro}"/>`);
    partes.push(`<rect x="${x + 104}" y="${y + 6}" width="14" height="64" fill="${p.sombra}"/>`);
    partes.push(`<rect x="${x + 8}" y="${y + 18}" width="88" height="22" fill="${p.ventana}"/>`);
    partes.push(`<line x1="${x}" y1="${y - 10}" x2="${x + 60}" y2="${y - 10}" stroke="#4a4f52" stroke-width="2"/>`);
  }
  // Escalera pública
  const esc: [number, number][] = [];
  for (let k = 0; k < 12; k++) {
    const x = 870 + k * 46;
    esc.push([x, alturaEn(perfil, x) + 30], [x + 23, alturaEn(perfil, x) + 30]);
  }
  partes.push(`<polyline points="${pts(esc)}" fill="none" stroke="#fff" stroke-width="4"/>`);

  // Ascensor (funicular)
  partes.push(`<line x1="330" y1="1000" x2="560" y2="770" stroke="#3b3f42" stroke-width="5"/><line x1="352" y1="1004" x2="582" y2="774" stroke="#3b3f42" stroke-width="5"/>`);
  partes.push(`<rect x="432" y="868" width="44" height="34" fill="#e8b532" transform="rotate(-45 454 885)"/>`);

  partes.push(`<rect y="430" width="1600" height="240" fill="url(#${id}-bruma)"/>`);
  return partes.join('');
}

function escalera(): string {
  const id = uid('es');
  const partes: string[] = [`<defs><linearGradient id="${id}-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c6d6"/><stop offset="1" stop-color="#eef2f0"/></linearGradient></defs>`];
  partes.push(`<rect width="1000" height="800" fill="url(#${id}-c)"/>`);
  partes.push(`<polygon points="0,0 400,150 400,560 0,800" fill="#eeeee8"/><polygon points="1000,0 600,150 600,560 1000,800" fill="#d8d9d2"/>`);
  // Peldaños en perspectiva
  for (let k = 0; k < 16; k++) {
    const t0 = k / 16;
    const t1 = (k + 1) / 16;
    const y0 = 800 - t0 * 240;
    const y1 = 800 - t1 * 240;
    const xl0 = t0 * 400;
    const xl1 = t1 * 400;
    partes.push(`<polygon points="${pts([[xl0, y0], [1000 - xl0, y0], [1000 - xl1, y1], [xl1, y1]])}" fill="${k % 2 ? '#c7c6bd' : '#dedcd3'}"/>`);
  }
  // Ventanas y puertas de las viviendas
  partes.push(`<polygon points="120,260 260,300 260,470 120,470" fill="#2d3a41"/><polygon points="880,240 740,290 740,460 880,470" fill="#2d3a41"/>`);
  partes.push(`<polygon points="300,330 360,350 360,520 300,535" fill="#3f6f9b"/>`);
  partes.push(`<circle cx="150" cy="560" r="46" fill="#5f8b62"/><circle cx="190" cy="590" r="34" fill="#6f9b70"/><rect x="138" y="580" width="60" height="60" fill="#b0866a"/>`);
  partes.push(`<g fill="#2b2e30"><circle cx="520" cy="452" r="9"/><rect x="511" y="462" width="18" height="40" rx="6"/></g>`);
  return partes.join('');
}

function terraza(): string {
  const partes: string[] = [];
  partes.push(`<rect width="1000" height="800" fill="#cfdde3"/><rect y="330" width="1000" height="140" fill="#6f93a8"/>`);
  partes.push(`<polygon points="0,330 260,250 520,300 1000,240 1000,330" fill="#a9b6b4"/>`);
  for (let i = 0; i < 26; i++) partes.push(`<rect x="${(i * 97) % 1000}" y="${300 + ((i * 37) % 30)}" width="18" height="12" fill="${ZINC[i % ZINC.length]}"/>`);
  // Cubierta como patio: entablado en perspectiva
  partes.push(`<polygon points="0,560 1000,520 1000,800 0,800" fill="#c8a57d"/>`);
  for (let i = 1; i < 12; i++) partes.push(`<line x1="${i * 90 - 300}" y1="800" x2="${i * 85 + 40}" y2="540" stroke="#a9845c" stroke-width="3"/>`);
  partes.push(`<line x1="0" y1="480" x2="1000" y2="446" stroke="#3d4144" stroke-width="5"/>`);
  for (let i = 0; i < 20; i++) partes.push(`<line x1="${i * 52}" y1="${480 - i * 1.7}" x2="${i * 52}" y2="${560 - i * 2}" stroke="#3d4144" stroke-width="2"/>`);
  partes.push(`<rect x="680" y="200" width="320" height="330" fill="#f4f4f0"/><rect x="720" y="250" width="240" height="200" fill="#2d3a41"/>`);
  partes.push(`<rect x="220" y="590" width="90" height="70" fill="#e2ad35"/><circle cx="470" cy="610" r="40" fill="#5f8b62"/><rect x="440" y="630" width="60" height="50" fill="#b26c4e"/>`);
  return partes.join('');
}

/** Interior de la nave en perspectiva central: dientes de sierra, puestos y gente. */
function mercado(): string {
  type P = [number, number];
  const lerp = (a: P, b: P, u: number): P => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
  // Profundidad con escorzo: los tramos lejanos se acortan
  const u = (w: number) => (1 - 1 / (1 + 3 * w)) / 0.75;
  const marco = (w: number) => {
    const t = u(w);
    return {
      si: lerp([0, 0], [470, 300], t),
      sd: lerp([1400, 0], [930, 300], t),
      ii: lerp([0, 1000], [470, 600], t),
      id: lerp([1400, 1000], [930, 600], t),
      escala: 1 - t * (1 - 460 / 1400),
    };
  };
  const cerca = marco(0);
  const lejos = marco(1);
  const partes: string[] = [];
  partes.push(`<rect width="1400" height="1000" fill="#f4f1ea"/>`);
  partes.push(`<polygon points="${pts([cerca.si, lejos.si, lejos.ii, cerca.ii])}" fill="#e7e3da"/>`);
  partes.push(`<polygon points="${pts([cerca.sd, lejos.sd, lejos.id, cerca.id])}" fill="#dcd7cc"/>`);
  partes.push(`<polygon points="${pts([cerca.ii, cerca.id, lejos.id, lejos.ii])}" fill="#bdb7ab"/>`);
  partes.push(`<polygon points="${pts([lejos.si, lejos.sd, lejos.id, lejos.ii])}" fill="#f6f3ec"/>`);
  partes.push(`<rect x="610" y="420" width="180" height="180" fill="#cfe0e8"/>`);

  // Cubierta en dientes de sierra: franja de vidrio + faldón opaco
  const tramos = 9;
  for (let i = 0; i < tramos; i++) {
    const a = marco(i / tramos);
    const b = marco((i + 0.42) / tramos);
    const c = marco((i + 1) / tramos);
    partes.push(`<polygon points="${pts([a.si, a.sd, b.sd, b.si])}" fill="#fff4cf"/>`);
    partes.push(`<polygon points="${pts([b.si, b.sd, c.sd, c.si])}" fill="#cbc7be"/>`);
    partes.push(`<line x1="${b.si[0]}" y1="${b.si[1]}" x2="${b.sd[0]}" y2="${b.sd[1]}" stroke="#41464a" stroke-width="${7 * b.escala}"/>`);
  }
  // Luz que baja de los lucernarios
  partes.push(`<polygon points="${pts([[300, 120], [1100, 120], [930, 600], [470, 600]])}" fill="#fff8de" opacity=".28"/>`);

  // Puestos a ambos lados, de atrás hacia adelante
  const puestos: { w: number; s: string }[] = [];
  [0.12, 0.3, 0.48, 0.66, 0.84].forEach((w, i) => {
    for (const lado of [0, 1]) {
      const m = marco(w);
      const e = m.escala;
      const base = lerp(m.ii, m.id, lado ? 0.84 : 0.03);
      const ancho = 200 * e;
      const alto = 150 * e;
      const [x, y] = base;
      const color = ZINC[(i * 2 + lado) % ZINC.length];
      puestos.push({
        w,
        s: `<rect x="${x}" y="${y - alto}" width="${ancho}" height="${alto}" fill="#ece8df"/>
          <rect x="${x - 6 * e}" y="${y - alto - 22 * e}" width="${ancho + 12 * e}" height="${28 * e}" fill="${color}"/>
          <circle cx="${x + ancho * 0.25}" cy="${y - alto * 0.62}" r="${18 * e}" fill="#e2ad35"/>
          <circle cx="${x + ancho * 0.5}" cy="${y - alto * 0.58}" r="${18 * e}" fill="#c9503c"/>
          <circle cx="${x + ancho * 0.75}" cy="${y - alto * 0.62}" r="${18 * e}" fill="#5f8b62"/>`,
      });
    }
  });
  const r = aleatorio(3);
  for (let i = 0; i < 16; i++) {
    const w = 0.08 + r() * 0.8;
    const m = marco(w);
    const e = m.escala;
    const [x, y] = lerp(m.ii, m.id, 0.28 + r() * 0.44);
    puestos.push({ w, s: `<g fill="#2e3134"><circle cx="${x}" cy="${y - 150 * e}" r="${15 * e}"/><rect x="${x - 15 * e}" y="${y - 134 * e}" width="${30 * e}" height="${134 * e}" rx="${12 * e}"/></g>` });
  }
  partes.push(puestos.sort((a, b) => b.w - a.w).map((p) => p.s).join(''));
  return partes.join('');
}

function pabellon(): string {
  const partes: string[] = [];
  partes.push(`<rect width="1400" height="1000" fill="#dfe8e4"/><rect y="640" width="1400" height="360" fill="#9aa36d"/>`);
  partes.push(`<polygon points="0,640 300,520 620,600 1000,500 1400,610 1400,640" fill="#6f845a"/>`);
  for (const [x, rr] of [[160, 90], [1240, 110], [1080, 70]] as const) partes.push(`<circle cx="${x}" cy="${560 - rr / 2}" r="${rr}" fill="#55704b"/>`);
  // Retícula de varas de eucalipto
  const curva = (t: number) => 300 + Math.sin(t * Math.PI) * -220;
  for (let i = 0; i <= 18; i++) {
    const x = 320 + i * 42;
    partes.push(`<line x1="${x}" y1="680" x2="${x + 30}" y2="${curva(i / 18)}" stroke="#8a5a36" stroke-width="5"/>`);
    partes.push(`<line x1="${x + 260}" y1="680" x2="${x - 30}" y2="${curva(i / 18) + 30}" stroke="#a06b42" stroke-width="4"/>`);
  }
  partes.push(`<path d="M 330 300 Q 700 40 1090 300" fill="none" stroke="#6e4527" stroke-width="7"/>`);
  for (const x of [560, 620, 830]) partes.push(`<g fill="#2b2e30"><circle cx="${x}" cy="610" r="14"/><rect x="${x - 15}" y="625" width="30" height="70" rx="10"/></g>`);
  return partes.join('');
}

function conjunto(): string {
  const partes: string[] = [];
  partes.push(`<rect width="1400" height="1000" fill="#c9dbe4"/><rect y="860" width="1400" height="140" fill="#b9b6ad"/>`);
  partes.push(`<rect x="260" y="150" width="880" height="710" fill="#ecebe5"/><rect x="1140" y="180" width="70" height="680" fill="#cfcfc7"/>`);
  for (let piso = 0; piso < 6; piso++) {
    const y = 180 + piso * 112;
    for (let m = 0; m < 8; m++) {
      const x = 290 + m * 106;
      partes.push(`<rect x="${x}" y="${y}" width="76" height="70" fill="#2d3a41"/>`);
      partes.push(`<rect x="${x - 6}" y="${y + 70}" width="88" height="8" fill="#9a9a93"/>`);
      if ((m + piso) % 3 === 0) partes.push(`<rect x="${x}" y="${y}" width="76" height="70" fill="#d9c9a6" opacity=".9"/>`);
    }
  }
  for (const [x, rr] of [[200, 110], [420, 90], [1010, 100], [1260, 120]] as const) {
    partes.push(`<rect x="${x - 8}" y="${860 - rr}" width="16" height="${rr}" fill="#6b5a4a"/><circle cx="${x}" cy="${860 - rr * 1.3}" r="${rr * 0.75}" fill="#6f8f5c" opacity=".92"/>`);
  }
  return partes.join('');
}

function concurso(): string {
  const partes: string[] = [];
  partes.push(`<rect width="1300" height="1000" fill="#ecece6"/><rect y="760" width="1300" height="240" fill="#cdc9bd"/>`);
  partes.push(`<polygon points="330,420 650,220 970,420" fill="#3f6f9b"/><rect x="380" y="420" width="540" height="300" fill="#f6f6f2"/>`);
  partes.push(`<rect x="430" y="480" width="150" height="150" fill="#2d3a41"/><rect x="700" y="500" width="120" height="220" fill="#e2ad35"/>`);
  for (let i = 0; i < 6; i++) partes.push(`<rect x="${400 + i * 95}" y="720" width="16" height="50" fill="#6b5a4a"/>`);
  partes.push(`<line x1="380" y1="560" x2="920" y2="560" stroke="#d6d6cf" stroke-width="3"/><line x1="650" y1="420" x2="650" y2="720" stroke="#d6d6cf" stroke-width="3"/>`);
  return partes.join('');
}

export function ilustracion(escena: Escena): { svg: string; vb: string } {
  switch (escena) {
    case 'cerro': return { svg: cerro(DIA), vb: '0 0 1600 1000' };
    case 'cerro-tarde': return { svg: cerro(TARDE), vb: '0 0 1600 1000' };
    case 'escalera': return { svg: escalera(), vb: '0 0 1000 800' };
    case 'terraza': return { svg: terraza(), vb: '0 0 1000 800' };
    case 'mercado': return { svg: mercado(), vb: '0 0 1400 1000' };
    case 'pabellon': return { svg: pabellon(), vb: '0 0 1400 1000' };
    case 'conjunto': return { svg: conjunto(), vb: '0 0 1400 1000' };
    case 'concurso': return { svg: concurso(), vb: '0 0 1300 1000' };
  }
}

export function dibujarIlustracion(escena: Escena, etiqueta: string): string {
  const { svg: cuerpo, vb } = ilustracion(escena);
  return svg(vb, cuerpo, { etiqueta, ajuste: 'slice', clase: 'dibujo dibujo--imagen' });
}

/** Croquis a mano alzada: trazo negro sobre papel, con leve temblor. */
export function dibujarCroquis(escena: 'cerro' | 'chiloe', etiqueta: string): string {
  const id = uid('cq');
  const partes: string[] = [`<defs>${filtroMano(id)}</defs><rect width="1300" height="1000" fill="#fbfaf6"/>`, `<g filter="url(#${id}-mano)" stroke="#1a1a1a" fill="none" stroke-linecap="round">`];
  const r = aleatorio(escena === 'cerro' ? 11 : 5);
  if (escena === 'cerro') {
    partes.push(`<path d="M 40 900 C 300 760 600 600 1260 260" stroke-width="3"/>`);
    for (let i = 0; i < 30; i++) {
      const x = 120 + r() * 1050;
      const y = 900 - (x - 40) * 0.52 + 30 + r() * 140;
      const w = 50 + r() * 40;
      const h = 40 + r() * 30;
      partes.push(`<path d="M ${x} ${y} h ${w} v ${-h} h ${-w} Z M ${x - 4} ${y - h} l ${w / 2 + 4} ${-h * 0.4} l ${w / 2 + 4} ${h * 0.4}" stroke-width="2"/>`);
      partes.push(`<path d="M ${x + 10} ${y - h * 0.6} h 12 M ${x + 30} ${y - h * 0.6} h 12" stroke-width="1.5"/>`);
    }
    partes.push(`<path d="M 900 960 L 1080 520 M 925 965 L 1105 525" stroke-width="2"/>`);
  } else {
    partes.push(`<path d="M 0 700 Q 650 680 1300 710" stroke-width="2"/>`);
    for (let i = 0; i < 5; i++) {
      const x = 90 + i * 240;
      const h = 220 + r() * 80;
      partes.push(`<path d="M ${x} 600 v ${-h} l 90 -90 l 90 90 v ${h} Z" stroke-width="3"/>`);
      for (let k = 0; k < 8; k++) partes.push(`<path d="M ${x + 6} ${590 - k * 28} h 168" stroke-width="1"/>`);
      partes.push(`<path d="M ${x + 20} 600 v 120 M ${x + 90} 600 v 130 M ${x + 160} 600 v 120" stroke-width="2.5"/>`);
    }
    partes.push(`<path d="M 0 780 q 60 -12 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0 t 120 0" stroke-width="1.2"/>`);
  }
  partes.push('</g>');
  return svg('0 0 1300 1000', partes.join(''), { etiqueta, ajuste: 'slice', clase: 'dibujo dibujo--imagen' });
}

/** Maqueta de estudio: volúmenes blancos sobre base gris, con sombra suave. */
export function dibujarMaqueta(etiqueta: string): string {
  const id = uid('mq');
  const partes: string[] = [`<defs><radialGradient id="${id}-f" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#d9d9d4"/><stop offset="1" stop-color="#8f908b"/></radialGradient></defs>`];
  partes.push(`<rect width="1300" height="1000" fill="url(#${id}-f)"/>`);
  partes.push(`<polygon points="150,760 650,560 1180,760 680,960" fill="#6d6e6a"/>`);
  partes.push(`<polygon points="150,740 650,540 1180,740 680,940" fill="#a9a59b"/>`);
  for (let k = 0; k < 6; k++) {
    const x = 300 + k * 110;
    const y = 760 - k * 62;
    partes.push(`<polygon points="${pts([[x, y], [x + 120, y - 48], [x + 120, y - 128], [x, y - 80]])}" fill="#fafaf7"/>`);
    partes.push(`<polygon points="${pts([[x + 120, y - 48], [x + 190, y - 20], [x + 190, y - 100], [x + 120, y - 128]])}" fill="#d9d9d2"/>`);
    partes.push(`<polygon points="${pts([[x, y - 80], [x + 120, y - 128], [x + 190, y - 100], [x + 70, y - 52]])}" fill="#ffffff"/>`);
    partes.push(`<polygon points="${pts([[x + 190, y - 20], [x + 260, y + 10], [x + 190, y - 100]])}" fill="#000" opacity=".12"/>`);
  }
  return svg('0 0 1300 1000', partes.join(''), { etiqueta, ajuste: 'slice', clase: 'dibujo dibujo--imagen' });
}
