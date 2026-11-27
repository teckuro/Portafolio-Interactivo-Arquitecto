import { renderArte } from '../drawings';
import { esc } from '../drawings/svg';
import { burbuja } from '../layouts/partes';
import { itemsIndice } from '../layouts/perfil-sumario';
import type { ResultadoCheck } from '../core/checks';
import type { EntradaSumario, Pieza, Proyecto, TipoPieza } from '../model/types';

/**
 * Diálogos nativos (<dialog>): foco atrapado, Esc para cerrar y regreso del
 * foco al botón que los abrió, sin código extra. Sirven para la divulgación
 * progresiva (N3) sin sacar al lector del spread en que estaba (DP-R2).
 */

const BOTON_CERRAR = `<button class="dialogo__cerrar" type="button" data-accion="cerrar" aria-label="Cerrar"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" stroke-width="1.8"/></svg></button>`;

function abrir(dialogo: HTMLDialogElement, html: string, clase = ''): void {
  dialogo.className = `dialogo ${clase}`;
  dialogo.innerHTML = `${BOTON_CERRAR}<div class="dialogo__cuerpo">${html}</div>`;
  dialogo.showModal();
}

export function abrirContenido(d: HTMLDialogElement, sumario: EntradaSumario[], totalPaginas: number): void {
  abrir(
    d,
    `<h2 class="titulo-seccion">Contenido</h2>
     <ol class="indice indice--dialogo">${itemsIndice(sumario)}
       <li><a class="indice__item indice__item--simple" href="#/${totalPaginas - 3}" data-ir="${totalPaginas - 3}"><span class="indice__nombre">Otros trabajos y trayectoria</span></a></li>
       <li><a class="indice__item indice__item--simple" href="#/${totalPaginas}" data-ir="${totalPaginas}"><span class="indice__nombre">Contacto</span></a></li>
     </ol>`,
    'dialogo--lateral',
  );
}

export function abrirAmpliacion(d: HTMLDialogElement, pieza: Pieza): void {
  abrir(
    d,
    `<figure class="ampliacion">
       <div class="ampliacion__arte" data-zoom="no">${renderArte(pieza)}</div>
       <figcaption class="pie">${esc(pieza.pie)}</figcaption>
     </figure>
     <div class="acciones"><button class="boton" type="button" data-accion="zoom" aria-pressed="false">Acercar</button></div>`,
    'dialogo--visor',
  );
}

const ORDEN_PROCESO: TipoPieza[] = ['croquis', 'diagrama', 'maqueta', 'render'];

/** Proceso como secuencia conectada (CU-R1): del croquis al resultado. */
export function abrirProceso(d: HTMLDialogElement, proyecto: Proyecto): void {
  const pasos = [
    ...proyecto.piezas.filter((p) => p.nivel === 3),
    ...proyecto.piezas.filter((p) => p.nivel === 1),
  ].sort((a, b) => ORDEN_PROCESO.indexOf(a.tipo) - ORDEN_PROCESO.indexOf(b.tipo));
  abrir(
    d,
    `<h2 class="titulo-seccion">Proceso de ${esc(proyecto.nombre)}</h2>
     <ol class="proceso">${pasos
       .map((p, i) => `<li class="proceso__paso">${burbuja(i + 1)}<div class="proceso__arte" style="--proporcion:${p.proporcion ?? 1.4}">${renderArte(p)}</div><p class="pie">${esc(p.pie)}</p></li>`)
       .join('')}</ol>`,
    'dialogo--visor',
  );
}

export function abrirVerificacion(d: HTMLDialogElement, resultados: ResultadoCheck[]): void {
  const ok = resultados.filter((r) => r.ok).length;
  abrir(
    d,
    `<h2 class="titulo-seccion">Verificación de leyes de UX</h2>
     <p class="entradilla">${ok} de ${resultados.length} comprobaciones cumplidas.</p>
     <table class="verificacion"><thead><tr><th>Regla</th><th>Comprobación</th><th>Resultado</th></tr></thead><tbody>${resultados
       .map((r) => `<tr class="${r.ok ? 'es-ok' : 'es-falla'}"><td>${r.id}</td><td>${esc(r.descripcion)}</td><td>${r.ok ? 'Cumple' : 'No cumple'}: ${esc(r.detalle)}</td></tr>`)
       .join('')}</tbody></table>`,
    'dialogo--lateral',
  );
}
