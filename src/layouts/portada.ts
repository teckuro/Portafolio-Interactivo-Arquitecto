import { esc } from '../drawings/svg';
import { pieSobreImagen, sangre } from './partes';
import type { Layout } from './tipos';

/** S1 · Portada: la imagen del proyecto pico a sangre en todo el spread (PF-R1). */
export const portada: Layout = ({ portafolio }) => {
  const { autor, portada: imagen, anio } = portafolio;
  return {
    claseIzq: 'pagina--sangre',
    claseDer: 'pagina--sangre',
    izq: `${sangre(imagen, 'izq')}
      <header class="portada">
        <h1 class="portada__nombre">${esc(autor.nombre)}</h1>
        <p class="portada__disciplina">${esc(autor.disciplina)}<br>${esc(autor.ciudad)}</p>
      </header>`,
    der: `${sangre(imagen, 'der')}
      <p class="portada__cabecera">Portafolio ${esc(anio)}</p>
      ${pieSobreImagen(imagen, 'abajo-der')}`,
  };
};
