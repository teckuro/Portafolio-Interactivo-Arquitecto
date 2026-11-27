import { esTecnico, renderArte } from '../drawings';
import { esc } from '../drawings/svg';
import type { Estado, Ficha, Pieza, TipoPieza } from '../model/types';

/**
 * Piezas compartidas por todas las plantillas. Al centralizarlas, cada tipo de
 * contenido tiene siempre el mismo tratamiento (Ley de similitud, SIM-R2/R4/R5).
 */

export const area = (fila: number, col: number, filas: number, cols: number) =>
  `style="grid-area:${fila}/${col}/span ${filas}/span ${cols}"`;

const NOMBRE_TIPO: Record<TipoPieza, string> = {
  render: 'Render',
  fotografia: 'Fotografía',
  planta: 'Planta',
  corte: 'Corte',
  detalle: 'Detalle',
  diagrama: 'Diagrama',
  croquis: 'Croquis',
  maqueta: 'Maqueta',
};

const NOMBRE_ESTADO: Record<Estado, string> = {
  academico: 'Proyecto académico',
  concurso: 'Concurso',
  'en-desarrollo': 'En desarrollo',
  construido: 'Construido',
};

/** SIM-R5: el estado siempre con el mismo indicador. */
export function estado(e: Estado): string {
  return `<span class="estado estado--${e}"><span class="estado__marca" aria-hidden="true"></span>${NOMBRE_ESTADO[e]}</span>`;
}

/** Ficha técnica: orden fijo, campos vacíos ocultos, rol destacado (SIM-R4, TES-V3, PAR-R3). */
export function ficha(f: Ficha, extra = ''): string {
  const filas: [string, string | undefined, string?][] = [
    ['Año', f.anio],
    ['Ubicación', f.ubicacion],
    ['Programa', f.programa],
    ['Superficie', f.superficie],
    ['Estado', estado(f.estado), 'html'],
    ['Mi rol', f.rol, 'rol'],
    ['Equipo', f.equipo],
    ['Herramientas', f.herramientas.join(', ')],
  ];
  const html = filas
    .filter(([, v]) => v)
    .map(([k, v, modo]) => `<div class="ficha__fila${modo === 'rol' ? ' ficha__fila--rol' : ''}"><dt>${k}</dt><dd>${modo === 'html' ? v : esc(v!)}</dd></div>`)
    .join('');
  return `<dl class="ficha" ${extra}>${html}</dl>`;
}

export function burbuja(n: number | string, extra = ''): string {
  return `<span class="burbuja" ${extra}>${n}</span>`;
}

const ICONO_AMPLIAR = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12.5 12.5 L17 17 M8.5 6 v5 M6 8.5 h5" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>`;

interface OpcionesFigura {
  pos?: string;
  clase?: string;
  /** Prefijo de la llamada (p. ej. "D" para detalles). */
  prefijo?: string;
  sinPie?: boolean;
}

/** Figura con pie: tipo de imagen + descripción + crédito (SIM-R2, SIM-R6). */
export function figura(p: Pieza, { pos = '', clase = '', prefijo = '', sinPie = false }: OpcionesFigura = {}): string {
  const tecnico = esTecnico(p);
  const llamada = p.llamada !== undefined ? ` data-llamada="${p.llamada}" tabindex="0"` : '';
  const ampliar = tecnico
    ? `<button class="figura__ampliar" type="button" data-accion="ampliar" data-pieza="${p.id}" aria-label="Ampliar: ${esc(p.pie)}">${ICONO_AMPLIAR}</button>`
    : '';
  const pie = sinPie
    ? ''
    : `<figcaption class="pie">${p.llamada !== undefined ? burbuja(prefijo + p.llamada, 'aria-hidden="true"') : ''}<span><span class="pie__tipo">${NOMBRE_TIPO[p.tipo]}.</span> ${esc(p.pie)}${p.credito ? ` <span class="pie__credito">${esc(p.credito)}</span>` : ''}</span></figcaption>`;
  return `<figure class="figura figura--${p.tipo} ${tecnico ? 'figura--tecnica' : ''} ${clase}" ${pos}${llamada} style="--proporcion:${p.proporcion ?? 1.4}">
    <div class="figura__arte">${renderArte(p)}${ampliar}</div>${pie}</figure>`;
}

/** Imagen a sangre. `lado` indica qué mitad de una imagen de spread completo muestra la página. */
export function sangre(p: Pieza, lado: 'pagina' | 'izq' | 'der', alto = 100): string {
  return `<div class="sangre sangre--${lado}" style="--alto:${alto}%" role="img" aria-label="${NOMBRE_TIPO[p.tipo]}: ${esc(p.pie)}"><div class="sangre__lienzo" aria-hidden="true">${renderArte(p)}</div></div>`;
}

/** Pie de una imagen a sangre, en una banda legible (EU-R4). */
export function pieSobreImagen(p: Pieza, posicion: 'abajo-izq' | 'abajo-der' = 'abajo-izq'): string {
  return `<p class="pie pie--sobre pie--${posicion}"><span><span class="pie__tipo">${NOMBRE_TIPO[p.tipo]}.</span> ${esc(p.pie)}${p.credito ? ` <span class="pie__credito">${esc(p.credito)}</span>` : ''}</span></p>`;
}

/** Leyenda de recintos en la misma página que la planta (RR-R3). */
export function leyendaRecintos(recintos: Record<number, string> | undefined, pos = ''): string {
  if (!recintos) return '';
  const items = Object.entries(recintos)
    .map(([n, nombre]) => `<li>${burbuja(n)}<span>${esc(nombre)}</span></li>`)
    .join('');
  return `<ol class="leyenda" ${pos} aria-label="Recintos">${items}</ol>`;
}

/** Folio y cintillo: número de página y sección (RR-R2). */
export function folio(n: number, seccion: string, lado: 'izq' | 'der', sobreImagen = false): string {
  return `<footer class="folio folio--${lado}${sobreImagen ? ' folio--sobre' : ''}"><span class="folio__numero">${n}</span><span class="folio__seccion">${esc(seccion)}</span></footer>`;
}

export const piezasDeNivel = (piezas: Pieza[], nivel: number) => piezas.filter((p) => p.nivel === nivel);
