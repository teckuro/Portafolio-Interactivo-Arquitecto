import { esc } from '../drawings/svg';
import type { EntradaCV } from '../model/types';
import { area, figura, folio } from './partes';
import type { Layout } from './tipos';

const grupo = (titulo: string, entradas: EntradaCV[] = []) =>
  entradas.length
    ? `<li class="trayectoria__grupo"><h3 class="titulo-bloque">${titulo}</h3><ol>${entradas
        .map((e) => `<li class="trayectoria__hito"><span class="trayectoria__periodo">${esc(e.periodo)}</span><span><strong>${esc(e.texto)}</strong>${e.detalle ? `<br>${esc(e.detalle)}` : ''}</span></li>`)
        .join('')}</ol></li>`
    : '';

/** S5 + S6 · Otros trabajos compactos (PAR) y trayectoria como línea continua (CU-R3). */
export const otrosCv: Layout = ({ portafolio, paginaIzq, paginaDer }) => {
  const [o1, o2, o3] = portafolio.otros;
  const { autor } = portafolio;
  return {
    izq: `<div class="reticula">
        <h2 class="titulo-seccion" ${area(1, 1, 1, 6)}>Otros trabajos</h2>
        ${o1 ? figura(o1, { pos: area(2, 1, 6, 6) }) : ''}
        ${o2 ? figura(o2, { pos: area(8, 1, 5, 3) }) : ''}
        ${o3 ? figura(o3, { pos: area(8, 4, 5, 3) }) : ''}
      </div>${folio(paginaIzq, 'Otros trabajos', 'izq')}`,
    der: `<div class="reticula">
        <h2 class="titulo-seccion" ${area(1, 1, 1, 6)}>Trayectoria</h2>
        <ol class="trayectoria" ${area(2, 1, 7, 6)}>
          ${grupo('Formación', autor.formacion)}${grupo('Experiencia', autor.experiencia)}${grupo('Reconocimientos', autor.reconocimientos)}
        </ol>
        <dl class="datos" ${area(10, 1, 3, 6)}>
          <div><dt>Software</dt><dd>${esc(autor.software.join(', '))}</dd></div>
          <div><dt>Idiomas</dt><dd>${autor.idiomas.map(esc).join('<br>')}</dd></div>
        </dl>
      </div>${folio(paginaDer, 'Trayectoria', 'der')}`,
  };
};
