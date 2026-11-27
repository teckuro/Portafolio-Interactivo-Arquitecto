/**
 * Entradas de navegación (adaptadores): teclado y deslizamiento.
 * La revista no sabe de eventos del navegador; solo recibe "siguiente/anterior".
 */

export interface Navegable {
  siguiente(): void;
  anterior(): void;
  primera(): void;
  ultima(): void;
}

const hayDialogoAbierto = () => Boolean(document.querySelector('dialog[open]'));

export function conectarTeclado(nav: Navegable): () => void {
  const alPresionar = (e: KeyboardEvent) => {
    if (hayDialogoAbierto() || e.altKey || e.ctrlKey || e.metaKey) return;
    const objetivo = e.target as HTMLElement;
    if (objetivo.closest('input, textarea, select')) return;
    const acciones: Record<string, () => void> = {
      ArrowRight: () => nav.siguiente(),
      PageDown: () => nav.siguiente(),
      ArrowLeft: () => nav.anterior(),
      PageUp: () => nav.anterior(),
      Home: () => nav.primera(),
      End: () => nav.ultima(),
    };
    const accion = acciones[e.key];
    if (accion) {
      e.preventDefault();
      accion();
    }
  };
  document.addEventListener('keydown', alPresionar);
  return () => document.removeEventListener('keydown', alPresionar);
}

/** Deslizar horizontalmente; el desplazamiento vertical queda para el navegador. */
export function conectarDeslizamiento(zona: HTMLElement, nav: Navegable): () => void {
  let inicio: { x: number; y: number; t: number } | null = null;
  const abajo = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    inicio = { x: e.clientX, y: e.clientY, t: performance.now() };
  };
  const arriba = (e: PointerEvent) => {
    if (!inicio) return;
    const dx = e.clientX - inicio.x;
    const dy = e.clientY - inicio.y;
    const rapido = performance.now() - inicio.t < 600;
    inicio = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && rapido) {
      if (dx < 0) nav.siguiente();
      else nav.anterior();
    }
  };
  const cancelar = () => (inicio = null);
  zona.addEventListener('pointerdown', abajo);
  zona.addEventListener('pointerup', arriba);
  zona.addEventListener('pointercancel', cancelar);
  return () => {
    zona.removeEventListener('pointerdown', abajo);
    zona.removeEventListener('pointerup', arriba);
    zona.removeEventListener('pointercancel', cancelar);
  };
}
