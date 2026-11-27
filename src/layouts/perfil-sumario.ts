import { renderArte } from '../drawings';
import { esc } from '../drawings/svg';
import { area, estado, folio } from './partes';
import type { EntradaSumario } from '../model/types';
import type { Layout } from './tipos';

/** Entradas del índice visual; se reutilizan en el diálogo "Contenido". */
export function itemsIndice(sumario: EntradaSumario[]): string {
  return sumario
    .map((e) => {
      const hero = e.proyecto.piezas.find((p) => p.nivel === 1) ?? e.proyecto.piezas[0];
      return `<li><a class="indice__item" href="#/${e.paginaInicio}" data-ir="${e.paginaInicio}">
        <span class="indice__mini" aria-hidden="true">${renderArte(hero)}</span>
        <span class="indice__texto">
          <span class="indice__nombre">${esc(e.proyecto.nombre)}</span>
          <span class="indice__sintesis">${esc(e.proyecto.sintesis)}</span>
          <span class="indice__meta">${estado(e.proyecto.ficha.estado)}<span>Páginas ${e.paginaInicio}–${e.paginaFin}</span><span>${e.minutos} min</span></span>
        </span></a></li>`;
    })
    .join('');
}

/** S2 + S3 · Perfil breve (UA-R1) e índice visual con miniaturas (RR-R1, PK). */
export const perfilSumario: Layout = ({ portafolio, sumario, paginaIzq, paginaDer, totalPaginas, spread }) => {
  const { autor } = portafolio;
  const datos: [string, string][] = [
    ['Contacto', `<a href="mailto:${esc(autor.email)}">${esc(autor.email)}</a>${autor.telefono ? `<br>${esc(autor.telefono)}` : ''}`],
    ['Ciudad', esc(autor.ciudad)],
    ['Disponibilidad', esc(autor.disponibilidad ?? '')],
    ['Idiomas', autor.idiomas.map(esc).join('<br>')],
    ['Software', esc(autor.software.join(', '))],
  ];

  const entradas = itemsIndice(sumario);

  const paginaOtros = totalPaginas - 3;
  return {
    izq: `<div class="reticula">
        <h2 class="oculto">Perfil</h2>
        <p class="perfil" ${area(1, 1, 6, 6)}>${esc(autor.perfil)}</p>
        <dl class="datos" ${area(8, 1, 5, 6)}>${datos.filter(([, v]) => v).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      </div>${folio(paginaIzq, spread.seccion, 'izq')}`,
    der: `<div class="reticula">
        <h2 class="titulo-seccion" ${area(1, 1, 1, 6)}>Contenido</h2>
        <ol class="indice" ${area(2, 1, 11, 6)}>${entradas}
          <li><a class="indice__item indice__item--simple" href="#/${paginaOtros}" data-ir="${paginaOtros}"><span class="indice__nombre">Otros trabajos y trayectoria</span><span class="indice__meta"><span>Páginas ${paginaOtros}–${paginaOtros + 1}</span></span></a></li>
          <li><a class="indice__item indice__item--simple" href="#/${totalPaginas}" data-ir="${totalPaginas}"><span class="indice__nombre">Contacto</span><span class="indice__meta"><span>Página ${totalPaginas}</span></span></a></li>
        </ol>
      </div>${folio(paginaDer, spread.seccion, 'der')}`,
  };
};
