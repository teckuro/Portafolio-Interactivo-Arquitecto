import { esc } from '../drawings/svg';
import { area, ficha, figura, folio, leyendaRecintos, pieSobreImagen, sangre } from './partes';
import type { Layout } from './tipos';

/** Proyecto secundario en un solo spread (PK-R3 / AJ-04). Misma apertura que los demás (SIM-R3). */
export const proyectoBreve: Layout = ({ spread, paginaIzq, paginaDer }) => {
  const p = spread.proyecto!;
  const hero = p.piezas.find((x) => x.nivel === 1)!;
  const planta = p.piezas.find((x) => x.tipo === 'planta');
  return {
    claseIzq: 'pagina--sangre',
    izq: `${sangre(hero, 'pagina')}${pieSobreImagen(hero)}${folio(paginaIzq, p.nombre, 'izq', true)}`,
    der: `<div class="reticula">
        <div ${area(1, 1, 2, 6)}><h2 class="titulo-proyecto">${esc(p.nombre)}</h2></div>
        <div ${area(3, 1, 2, 6)}><p class="entradilla">${esc(p.sintesis)}</p></div>
        <div class="texto" ${area(5, 1, 2, 6)}><p>${esc(p.concepto)}</p></div>
        ${planta ? figura(planta, { pos: area(7, 1, 4, 4) }) : ''}
        ${leyendaRecintos(p.recintos, area(7, 5, 4, 2))}
        ${ficha(p.ficha, `${area(11, 1, 2, 6)} data-columnas="2"`)}
      </div>${folio(paginaDer, p.nombre, 'der')}`,
  };
};
