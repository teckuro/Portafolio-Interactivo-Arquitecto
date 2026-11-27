import { esc } from '../drawings/svg';
import { area, ficha, folio, pieSobreImagen, sangre } from './partes';
import type { Layout } from './tipos';

/**
 * P1 · Apertura de proyecto. Nombre, síntesis y ficha siempre en la página
 * derecha (SIM-R3). El proyecto pico recibe la imagen más grande del
 * documento: a sangre sobre todo el ancho del spread (PF-R1).
 */
export const apertura: Layout = ({ spread, paginaIzq, paginaDer }) => {
  const p = spread.proyecto!;
  const hero = p.piezas.find((x) => x.nivel === 1)!;
  const titulo = `<h2 class="titulo-proyecto">${esc(p.nombre)}</h2>`;
  const sintesis = `<p class="entradilla">${esc(p.sintesis)}</p>`;

  if (p.prioridad === 'pico') {
    return {
      claseIzq: 'pagina--sangre-parcial',
      claseDer: 'pagina--sangre-parcial',
      izq: `${sangre(hero, 'izq', 52)}
        <div class="reticula">
          <p class="pie" ${area(8, 1, 1, 6)}><span><span class="pie__tipo">Render.</span> ${esc(hero.pie)}</span></p>
          <div class="texto" ${area(9, 1, 4, 6)}><p>${esc(p.concepto)}</p></div>
        </div>${folio(paginaIzq, p.nombre, 'izq')}`,
      der: `${sangre(hero, 'der', 52)}
        <div class="reticula">
          <div ${area(8, 1, 2, 6)}>${titulo}</div>
          <div ${area(10, 1, 3, 3)}>${sintesis}</div>
          ${ficha(p.ficha, area(10, 4, 3, 3))}
        </div>${folio(paginaDer, p.nombre, 'der')}`,
    };
  }

  return {
    claseIzq: 'pagina--sangre',
    izq: `${sangre(hero, 'pagina')}${pieSobreImagen(hero)}${folio(paginaIzq, p.nombre, 'izq', true)}`,
    der: `<div class="reticula">
        <div ${area(1, 1, 3, 6)}>${titulo}</div>
        <div ${area(4, 1, 2, 6)}>${sintesis}</div>
        <div class="texto" ${area(6, 1, 4, 6)}><p>${esc(p.concepto)}</p></div>
        ${ficha(p.ficha, `${area(10, 1, 3, 6)} data-columnas="2"`)}
      </div>${folio(paginaDer, p.nombre, 'der')}`,
  };
};
