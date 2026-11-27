import { esc } from '../drawings/svg';
import { LEYENDA_DETALLE } from '../drawings/tecnicos';
import { area, figura, folio, leyendaRecintos } from './partes';
import type { Layout } from './tipos';

/**
 * P3 · Planimetría. Para una oficina (L1), la planimetría técnica es nivel 2:
 * visible, no escondida (DP-R5). Las llamadas conectan planta y figuras (CU-R2),
 * y la leyenda de recintos está en la misma página (RR-R3).
 */
export const planimetria: Layout = ({ spread, paginaIzq, paginaDer }) => {
  const p = spread.proyecto!;
  const planta = p.piezas.find((x) => x.tipo === 'planta')!;
  const detalle = p.piezas.find((x) => x.tipo === 'detalle');
  const oculto = `<h2 class="oculto">Planimetría de ${esc(p.nombre)}</h2>`;

  if (detalle) {
    const leyenda = LEYENDA_DETALLE.map((t, i) => `<li><span class="burbuja">${i + 1}</span><span>${esc(t)}</span></li>`).join('');
    const aportes = (p.aportes ?? []).map((a) => `<li>${esc(a)}</li>`).join('');
    return {
      izq: `<div class="reticula">${oculto}
          ${figura(detalle, { pos: area(1, 1, 11, 4), prefijo: 'D' })}
          <ol class="leyenda leyenda--detalle" ${area(1, 5, 11, 2)} aria-label="Capas del detalle">${leyenda}</ol>
        </div>${folio(paginaIzq, p.nombre, 'izq')}`,
      der: `<div class="reticula">
          ${figura(planta, { pos: area(1, 1, 6, 6) })}
          ${leyendaRecintos(p.recintos, `${area(7, 1, 2, 6)} data-columnas="3"`)}
          <section class="aportes" ${area(9, 1, 4, 6)}><h3 class="titulo-bloque">Lo que hice</h3><ul>${aportes}</ul></section>
        </div>${folio(paginaDer, p.nombre, 'der')}`,
    };
  }

  const corte = p.piezas.find((x) => x.tipo === 'corte');
  const vistas = p.piezas.filter((x) => x.llamada !== undefined && x.nivel === 2);
  const hayProceso = p.piezas.some((x) => x.nivel === 3);
  return {
    izq: `<div class="reticula">${oculto}
        ${figura(planta, { pos: area(1, 1, 8, 6) })}
        ${leyendaRecintos(p.recintos, `${area(9, 1, 3, 6)} data-columnas="2"`)}
      </div>${folio(paginaIzq, p.nombre, 'izq')}`,
    der: `<div class="reticula">
        ${corte ? figura(corte, { pos: area(1, 1, 4, 6) }) : ''}
        ${vistas.map((v, i) => figura(v, { pos: area(5, 1 + i * 3, 6, 3) })).join('')}
        ${hayProceso ? `<div class="acciones" ${area(11, 1, 2, 6)}><button class="boton" type="button" data-accion="proceso" data-proyecto="${p.id}">Ver el proceso del proyecto</button></div>` : ''}
      </div>${folio(paginaDer, p.nombre, 'der')}`,
  };
};
