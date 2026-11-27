import { esc } from '../drawings/svg';
import { area, folio, pieSobreImagen, sangre } from './partes';
import type { Layout } from './tipos';

/** S7 · Cierre diseñado (PF-R3): imagen fuerte, contacto y acciones claras. */
export const cierre: Layout = ({ portafolio, paginaIzq, paginaDer }) => {
  const { autor, cierre: imagen, nota } = portafolio;
  return {
    claseIzq: 'pagina--sangre',
    izq: `${sangre(imagen, 'pagina')}${pieSobreImagen(imagen)}${folio(paginaIzq, 'Contacto', 'izq', true)}`,
    der: `<div class="reticula">
        <h2 class="titulo-cierre" ${area(1, 1, 2, 6)}>¿Conversamos?</h2>
        <p class="entradilla" ${area(3, 1, 2, 6)}>Busco sumarme a una oficina que proyecte vivienda colectiva. ${esc(autor.disponibilidad ?? '')}.</p>
        <div class="acciones acciones--cierre" ${area(5, 1, 2, 6)}>
          <a class="boton boton--primario" href="mailto:${esc(autor.email)}">Escribir un correo</a>
          <button class="boton" type="button" data-accion="imprimir">Descargar PDF</button>
          <button class="boton boton--texto" type="button" data-ir="1">Volver a la portada</button>
        </div>
        <dl class="datos" ${area(9, 1, 3, 6)}>
          <div><dt>Correo</dt><dd><a href="mailto:${esc(autor.email)}">${esc(autor.email)}</a></dd></div>
          ${autor.telefono ? `<div><dt>Teléfono</dt><dd>${esc(autor.telefono)}</dd></div>` : ''}
          <div><dt>Ciudad</dt><dd>${esc(autor.ciudad)}</dd></div>
        </dl>
        ${nota ? `<p class="nota" ${area(12, 1, 1, 6)}>${esc(nota)}</p>` : ''}
      </div>${folio(paginaDer, 'Contacto', 'der')}`,
  };
};
