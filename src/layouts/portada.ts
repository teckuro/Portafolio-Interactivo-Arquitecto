import { esc } from '../drawings/svg';
import { area, burbuja, pieSobreImagen, sangre } from './partes';
import type { CtxLayout, Layout, Paginas } from './tipos';

/**
 * S1 · Portada. Si el proyecto pico trae un modelo 3D, la primera página lo
 * muestra como una maqueta interactiva y la segunda lista sus pisos, enlazados
 * con el modelo (CU-R2). Si no, la imagen del pico va a sangre (PF-R1).
 */
export const portada: Layout = (ctx) => {
  const pico = ctx.portafolio.proyectos.find((p) => p.prioridad === 'pico');
  return pico?.modelo ? portadaConModelo(ctx) : portadaConImagen(ctx);
};

function encabezado(ctx: CtxLayout): string {
  const { autor } = ctx.portafolio;
  return `<header class="portada">
      <h1 class="portada__nombre">${esc(autor.nombre)}</h1>
      <p class="portada__disciplina">${esc(autor.disciplina)}<br>${esc(autor.ciudad)}</p>
    </header>`;
}

function portadaConImagen(ctx: CtxLayout): Paginas {
  const { portada: imagen, anio } = ctx.portafolio;
  return {
    claseIzq: 'pagina--sangre',
    claseDer: 'pagina--sangre',
    izq: `${sangre(imagen, 'izq')}${encabezado(ctx)}`,
    der: `${sangre(imagen, 'der')}
      <p class="portada__cabecera">Portafolio ${esc(anio)}</p>
      ${pieSobreImagen(imagen, 'abajo-der')}`,
  };
}

function portadaConModelo(ctx: CtxLayout): Paginas {
  const { portafolio, sumario } = ctx;
  const pico = portafolio.proyectos.find((p) => p.prioridad === 'pico')!;
  const modelo = pico.modelo!;
  const paginaProyecto = sumario.find((e) => e.proyecto.id === pico.id)?.paginaInicio ?? 5;
  const pisos = [...modelo.pisos]
    .reverse()
    .map((p) => `<li class="pisos__item" data-piso="${p.n}" tabindex="0">${burbuja(p.n)}<span class="pisos__programa">${esc(p.programa)}</span><span class="pisos__altura">${String(p.altura).replace('.', ',')} m</span></li>`)
    .join('');

  return {
    claseIzq: 'pagina--sangre pagina--modelo',
    izq: `<div class="modelo3d" data-modelo3d="${pico.id}" role="img" aria-label="Modelo 3D de ${esc(pico.nombre)}, ${modelo.pisos.length} pisos. Se puede girar arrastrando."></div>
      ${encabezado(ctx)}
      <div class="modelo3d__controles">
        <button class="boton" type="button" data-accion="separar" aria-pressed="false">Separar pisos</button>
        <p class="pie"><span><span class="pie__tipo">Modelo 3D.</span> Arrastra para girarlo.</span></p>
      </div>`,
    der: `<div class="reticula">
        <p class="portada__anio" ${area(1, 1, 1, 6)}>Portafolio ${esc(portafolio.anio)}</p>
        <div ${area(3, 1, 3, 6)}>
          <p class="antetitulo">Proyecto de título, ${esc(pico.ficha.anio)}</p>
          <h2 class="titulo-proyecto">${esc(pico.nombre)}</h2>
        </div>
        <p class="entradilla" ${area(6, 1, 2, 6)}>${esc(pico.sintesis)}</p>
        <ol class="pisos" ${area(8, 1, 4, 6)} aria-label="Programa por piso">${pisos}</ol>
        <div class="acciones" ${area(12, 1, 1, 6)}>
          <a class="boton boton--primario" href="#/${paginaProyecto}" data-ir="${paginaProyecto}">Ver el proyecto</a>
        </div>
      </div>`,
  };
}
