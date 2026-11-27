import { esc } from '../drawings/svg';
import type { Spread } from '../model/types';

/**
 * Navegación como cota encadenada: cada tramo es una sección y cada división
 * un spread. Muestra dónde está el lector y cuánto falta (RR, PK) sin texto
 * de instrucciones (UA).
 */
export function renderCota(spreads: Spread[]): string {
  const grupos: { seccion: string; spreads: Spread[] }[] = [];
  for (const s of spreads) {
    const ultimo = grupos.at(-1);
    if (ultimo && ultimo.seccion === s.seccion) ultimo.spreads.push(s);
    else grupos.push({ seccion: s.seccion, spreads: [s] });
  }
  return grupos
    .map(
      (g) => `<li class="cota__tramo" style="flex-grow:${g.spreads.length}">
        <span class="cota__rotulo">${esc(g.seccion)}</span>
        <span class="cota__divisiones">${g.spreads
          .map((s) => `<a class="cota__division" href="#/${s.indice * 2 + 1}" data-ir="${s.indice * 2 + 1}" data-spread="${s.indice}" aria-label="${esc(s.seccion)}, páginas ${s.indice * 2 + 1} y ${s.indice * 2 + 2}"></a>`)
          .join('')}</span>
      </li>`,
    )
    .join('');
}

export function marcarCota(raiz: HTMLElement, spread: number): void {
  raiz.querySelectorAll<HTMLElement>('.cota__division').forEach((el) => {
    const actual = Number(el.dataset.spread) === spread;
    el.classList.toggle('es-actual', actual);
    if (actual) el.setAttribute('aria-current', 'page');
    else el.removeAttribute('aria-current');
  });
  raiz.querySelectorAll<HTMLElement>('.cota__tramo').forEach((t) => {
    t.classList.toggle('es-actual', Boolean(t.querySelector('.es-actual')));
  });
}
