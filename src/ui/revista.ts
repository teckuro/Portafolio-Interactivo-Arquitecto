import { verificar } from '../core/checks';
import { componer, construirSumario } from '../core/composer';
import { esc } from '../drawings/svg';
import { LAYOUTS } from '../layouts';
import type { EntradaSumario, Pieza, Portafolio, Spread } from '../model/types';
import { marcarCota, renderCota } from './cota';
import { abrirAmpliacion, abrirContenido, abrirProceso, abrirVerificacion } from './dialogos';
import { conectarDeslizamiento, conectarTeclado, type Navegable } from './gestos';

type Modo = 'spread' | 'pagina';

const RAIZ2 = Math.SQRT2;
const FLECHA = (d: string) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

/**
 * Controlador de la revista. Mantiene un único estado (página actual y modo)
 * y deriva todo lo demás: desplazamiento, páginas inertes, URL, cota y aviso
 * para lectores de pantalla.
 *
 * - Escritorio: un spread por pantalla (D13).
 * - Pantallas angostas: una página por pantalla; en teléfonos, la página
 *   fluye en vertical para que el texto siga siendo legible (REV-R1).
 */
export class Revista implements Navegable {
  private readonly spreads: Spread[];
  private readonly sumario: EntradaSumario[];
  private readonly total: number;
  private readonly piezas = new Map<string, Pieza>();

  private pagina = 1;
  private modo: Modo = 'spread';
  private anchoPagina = 0;

  private escenario!: HTMLElement;
  private pliego!: HTMLElement;
  private paginas: HTMLElement[] = [];
  private cota!: HTMLElement;
  private aviso!: HTMLElement;
  private posicion!: HTMLElement;
  private dialogo!: HTMLDialogElement;

  constructor(private readonly raiz: HTMLElement, private readonly portafolio: Portafolio) {
    this.spreads = componer(portafolio);
    this.sumario = construirSumario(this.spreads);
    this.total = this.spreads.length * 2;
    for (const p of [...portafolio.proyectos.flatMap((x) => x.piezas), ...portafolio.otros]) this.piezas.set(p.id, p);
  }

  montar(): void {
    this.raiz.innerHTML = this.plantilla();
    this.escenario = this.raiz.querySelector('.escenario')!;
    this.pliego = this.raiz.querySelector('.pliego')!;
    this.paginas = [...this.raiz.querySelectorAll<HTMLElement>('.pagina')];
    this.cota = this.raiz.querySelector('.cota')!;
    this.aviso = this.raiz.querySelector('.aviso')!;
    this.posicion = this.raiz.querySelector('.posicion')!;
    this.dialogo = this.raiz.querySelector('dialog')!;

    this.raiz.addEventListener('click', (e) => this.alHacerClic(e));
    this.conectarLlamadas();
    conectarTeclado(this);
    conectarDeslizamiento(this.escenario, this);
    new ResizeObserver(() => this.medir()).observe(this.escenario);
    window.addEventListener('hashchange', () => this.ir(this.leerHash(), false));

    this.mostrarVerificacionSiCorresponde();
    this.medir();
    this.ir(this.leerHash(), false);
    requestAnimationFrame(() => this.raiz.classList.add('esta-lista'));
  }

  // ------------------------------------------------------------ navegación

  siguiente(): void {
    this.ir(this.modo === 'spread' ? this.spreadActual() * 2 + 3 : this.pagina + 1);
  }

  anterior(): void {
    this.ir(this.modo === 'spread' ? this.spreadActual() * 2 - 1 : this.pagina - 1);
  }

  primera(): void {
    this.ir(1);
  }

  ultima(): void {
    this.ir(this.total);
  }

  ir(pagina: number, actualizarUrl = true): void {
    this.pagina = Math.min(Math.max(1, Math.round(pagina) || 1), this.total);
    const spread = this.spreadActual();
    const visibles = this.modo === 'spread' ? [spread * 2 + 1, spread * 2 + 2] : [this.pagina];
    const desde = visibles[0] - 1;

    this.pliego.style.transform = `translate3d(${-desde * this.anchoPagina}px, 0, 0)`;
    this.paginas.forEach((el, i) => {
      const visible = visibles.includes(i + 1);
      el.inert = !visible;
      el.setAttribute('aria-hidden', String(!visible));
    });
    // En el modo de lectura vertical, cada página nueva empieza arriba.
    this.paginas[this.pagina - 1]?.scrollTo?.({ top: 0 });

    marcarCota(this.cota, spread);
    const seccion = this.spreads[spread].seccion;
    const rango = visibles.length === 2 ? `${visibles[0]}–${visibles[1]}` : `${visibles[0]}`;
    this.posicion.textContent = `${rango} / ${this.total}`;
    this.aviso.textContent = `${seccion}. Página ${rango} de ${this.total}.`;
    this.raiz.querySelector<HTMLButtonElement>('[data-accion="anterior"]')!.disabled = visibles[0] <= 1;
    this.raiz.querySelector<HTMLButtonElement>('[data-accion="siguiente"]')!.disabled = visibles.at(-1)! >= this.total;

    if (actualizarUrl) history.replaceState(null, '', `#/${this.modo === 'spread' ? visibles[0] : this.pagina}`);
  }

  private spreadActual(): number {
    return Math.floor((this.pagina - 1) / 2);
  }

  private leerHash(): number {
    const n = Number(location.hash.replace(/^#\/?/, ''));
    return Number.isFinite(n) && n > 0 ? n : 1;
  }

  // ---------------------------------------------------------------- medida

  /** Decide el modo y el tamaño de página según el espacio disponible. */
  private medir(): void {
    const ancho = this.escenario.clientWidth;
    const alto = this.escenario.clientHeight;
    if (!ancho || !alto) return;

    const modo: Modo = ancho >= 860 && ancho / alto >= 1.15 ? 'spread' : 'pagina';
    const margenX = modo === 'spread' ? 72 : ancho >= 640 ? 64 : 0;
    const margenY = ancho >= 640 ? 20 : 0;
    const disponibleX = ancho - margenX * 2;
    const disponibleY = alto - margenY * 2;

    let altoPagina = modo === 'spread' ? Math.min(disponibleY, (disponibleX / 2) * RAIZ2) : Math.min(disponibleY, disponibleX * RAIZ2);
    let anchoPagina = altoPagina / RAIZ2;
    const fluida = modo === 'pagina' && anchoPagina < 480;
    if (fluida) {
      anchoPagina = ancho;
      altoPagina = alto;
    }

    this.modo = modo;
    this.anchoPagina = anchoPagina;
    this.raiz.dataset.modo = modo;
    this.raiz.toggleAttribute('data-fluida', fluida);
    this.raiz.style.setProperty('--pagina-w', `${anchoPagina}px`);
    this.raiz.style.setProperty('--pagina-h', `${altoPagina}px`);
    this.ir(this.pagina, false);
  }

  // ----------------------------------------------------------- interacción

  private alHacerClic(e: MouseEvent): void {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-ir], [data-accion]');
    if (!el) return;

    if (el.dataset.ir) {
      e.preventDefault();
      if (this.dialogo.open) this.dialogo.close();
      this.ir(Number(el.dataset.ir));
      this.escenario.focus({ preventScroll: true });
      return;
    }

    const acciones: Record<string, () => void> = {
      siguiente: () => this.siguiente(),
      anterior: () => this.anterior(),
      contenido: () => abrirContenido(this.dialogo, this.sumario, this.total),
      imprimir: () => window.print(),
      cerrar: () => this.dialogo.close(),
      verificar: () => abrirVerificacion(this.dialogo, verificar(this.portafolio, this.spreads)),
      ampliar: () => {
        const pieza = this.piezas.get(el.dataset.pieza ?? '');
        if (pieza) abrirAmpliacion(this.dialogo, pieza);
      },
      proceso: () => {
        const proyecto = this.portafolio.proyectos.find((p) => p.id === el.dataset.proyecto);
        if (proyecto) abrirProceso(this.dialogo, proyecto);
      },
      zoom: () => {
        const arte = this.dialogo.querySelector<HTMLElement>('.ampliacion__arte');
        if (!arte) return;
        const activo = arte.dataset.zoom !== 'si';
        arte.dataset.zoom = activo ? 'si' : 'no';
        el.setAttribute('aria-pressed', String(activo));
        el.textContent = activo ? 'Alejar' : 'Acercar';
      },
    };
    acciones[el.dataset.accion ?? '']?.();
  }

  /**
   * Llamadas enlazadas (CU-R2): al apuntar un marcador de la planta se
   * destaca la figura con el mismo número dentro del spread, y viceversa.
   */
  private conectarLlamadas(): void {
    const alternar = (e: Event, activo: boolean) => {
      const el = (e.target as Element).closest<HTMLElement | SVGElement>('[data-llamada]');
      const pagina = el?.closest<HTMLElement>('.pagina');
      if (!el || !pagina) return;
      const n = (el as HTMLElement).dataset.llamada;
      this.raiz
        .querySelectorAll(`.pagina[data-spread="${pagina.dataset.spread}"] [data-llamada="${n}"]`)
        .forEach((x) => x.classList.toggle('esta-enlazada', activo));
    };
    for (const [tipo, activo] of [['pointerover', true], ['pointerout', false], ['focusin', true], ['focusout', false]] as const) {
      this.pliego.addEventListener(tipo, (e) => alternar(e, activo));
    }
  }

  private mostrarVerificacionSiCorresponde(): void {
    if (!new URLSearchParams(location.search).has('verificar')) return;
    const resultados = verificar(this.portafolio, this.spreads);
    console.table(resultados);
    const ok = resultados.filter((r) => r.ok).length;
    this.raiz.querySelector('.barra__acciones')!.insertAdjacentHTML(
      'afterbegin',
      `<button class="boton boton--barra" type="button" data-accion="verificar">Verificación ${ok}/${resultados.length}</button>`,
    );
  }

  // ------------------------------------------------------------- plantilla

  private plantilla(): string {
    const { autor } = this.portafolio;
    const paginas = this.spreads
      .map((spread) => {
        const izq = spread.indice * 2 + 1;
        const der = izq + 1;
        const r = LAYOUTS[spread.layout]({ spread, portafolio: this.portafolio, sumario: this.sumario, paginaIzq: izq, paginaDer: der, totalPaginas: this.total });
        const pagina = (n: number, lado: 'izq' | 'der', html: string, clase = '') =>
          `<article class="pagina pagina--${lado} pagina--${spread.layout} ${clase}" data-pagina="${n}" data-spread="${spread.indice}" aria-label="Página ${n}">${html}</article>`;
        return pagina(izq, 'izq', r.izq, r.claseIzq) + pagina(der, 'der', r.der, r.claseDer);
      })
      .join('');

    return `
      <a class="saltar" href="#/3" data-ir="3">Ir al contenido</a>
      <header class="barra">
        <a class="barra__autor" href="#/1" data-ir="1">${esc(autor.nombre)}</a>
        <nav class="barra__acciones" aria-label="Acciones">
          <button class="boton boton--barra" type="button" data-accion="contenido">Contenido</button>
          <button class="boton boton--barra" type="button" data-accion="imprimir">Descargar PDF</button>
        </nav>
      </header>
      <main class="escenario" tabindex="-1" aria-roledescription="revista" aria-label="Portafolio de ${esc(autor.nombre)}">
        <div class="ventana"><div class="pliego">${paginas}</div><div class="lomo" aria-hidden="true"></div></div>
        <button class="flecha flecha--anterior" type="button" data-accion="anterior" aria-label="Anterior">${FLECHA('M15 4 L7 12 L15 20')}</button>
        <button class="flecha flecha--siguiente" type="button" data-accion="siguiente" aria-label="Siguiente">${FLECHA('M9 4 L17 12 L9 20')}</button>
      </main>
      <footer class="navegacion">
        <ol class="cota" aria-label="Secciones del portafolio">${renderCota(this.spreads)}</ol>
        <p class="posicion" aria-hidden="true"></p>
      </footer>
      <p class="aviso oculto" aria-live="polite"></p>
      <dialog class="dialogo" aria-label="Detalle"></dialog>`;
  }
}
