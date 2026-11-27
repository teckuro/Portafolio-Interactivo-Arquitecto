/**
 * Modelo de datos del portafolio.
 * Refleja docs/02-anatomia-portafolio.md: autor, proyectos, ficha técnica y piezas.
 * Las piezas describen su contenido (tipo, nivel, llamada) y no su posición:
 * la composición la decide el sistema (Ley de Tesler, TES-R1/R2).
 */

export type Estado = 'academico' | 'concurso' | 'en-desarrollo' | 'construido';

export type TipoPieza =
  | 'render'
  | 'fotografia'
  | 'planta'
  | 'corte'
  | 'detalle'
  | 'diagrama'
  | 'croquis'
  | 'maqueta';

/** Divulgación progresiva (DP): 1 apertura · 2 cuerpo · 3 detalle bajo demanda. */
export type Nivel = 1 | 2 | 3;

/** Jerarquía de curaduría (PAR-R1, PF-R1). */
export type Prioridad = 'pico' | 'principal' | 'secundario';

// ---------------------------------------------------------------------------
// Especificaciones de dibujo (se renderizan como SVG en src/drawings)
// ---------------------------------------------------------------------------

export interface Recinto {
  /** Posición y tamaño en metros. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Número de recinto para la leyenda (RR-R3). */
  n?: number;
  /** Recinto exterior (patio, terraza): se dibuja sin muro grueso. */
  exterior?: boolean;
}

export interface Abertura {
  x: number;
  y: number;
  /** Largo en metros. */
  l: number;
  /** Orientación del muro: horizontal o vertical. */
  o: 'h' | 'v';
}

export interface Puerta extends Abertura {
  /** Hacia qué lado abre la hoja. */
  giro: 1 | -1;
}

export interface MarcadorVista {
  /** Número de llamada compartido con una figura (CU-R2, RR-R4). */
  n: number;
  x: number;
  y: number;
  /** Dirección de la vista en grados (0 = hacia la derecha). */
  ang: number;
}

export interface EspecPlanta {
  k: 'planta';
  ancho: number;
  alto: number;
  recintos: Recinto[];
  puertas?: Puerta[];
  ventanas?: Abertura[];
  /** Ejes estructurales (m). */
  ejesX?: number[];
  ejesY?: number[];
  vistas?: MarcadorVista[];
  /** Línea de corte A-A. */
  corte?: { y: number };
  /** Marca de detalle (D1). */
  detalle?: { x: number; y: number; n: number };
  /** Rotación del norte en grados. */
  norte?: number;
}

export type Escena = 'cerro' | 'cerro-tarde' | 'escalera' | 'terraza' | 'mercado' | 'pabellon' | 'conjunto' | 'concurso';

export type EspecArte =
  | EspecPlanta
  | { k: 'corte'; variante: 'pendiente' | 'mercado' }
  | { k: 'detalle' }
  | { k: 'diagrama'; variante: 'pendiente' }
  | { k: 'ilustracion'; escena: Escena }
  | { k: 'croquis'; escena: 'cerro' | 'chiloe' }
  | { k: 'maqueta'; escena: 'pendiente' };

// ---------------------------------------------------------------------------
// Contenido
// ---------------------------------------------------------------------------

export interface Pieza {
  id: string;
  tipo: TipoPieza;
  /** Dibujo generado; si existe `src`, se usa la imagen real. */
  arte?: EspecArte;
  src?: string;
  pie: string;
  credito?: string;
  nivel: Nivel;
  /** Número compartido con un marcador de planta (CU-R2). */
  llamada?: number;
  /** Proporción ancho / alto, para la versión móvil. */
  proporcion?: number;
}

export interface Ficha {
  anio: string;
  ubicacion: string;
  programa: string;
  superficie?: string;
  estado: Estado;
  /** Siempre visible (TES-R6, PAR-R3, DEF-R5). */
  rol: string;
  equipo?: string;
  herramientas: string[];
}

export interface Proyecto {
  id: string;
  nombre: string;
  /** Frase síntesis, ≤ 20 palabras (CC-R2). */
  sintesis: string;
  /** Concepto, ≤ 150 palabras (CC-R2). */
  concepto: string;
  /** Destacado opcional para la apertura. */
  destacado?: string;
  prioridad: Prioridad;
  /** Tipología, para alternar el orden (PS-R3). */
  tipologia: string;
  ficha: Ficha;
  /** Qué hizo el autor, en concreto (refuerza el rol, PAR-R3). */
  aportes?: string[];
  /** Leyenda de recintos en la misma página que la planta (RR-R3). */
  recintos?: Record<number, string>;
  piezas: Pieza[];
}

export interface EntradaCV {
  periodo: string;
  texto: string;
  detalle?: string;
}

export interface Autor {
  nombre: string;
  disciplina: string;
  ciudad: string;
  /** ≤ 50 palabras (UA-R1). */
  perfil: string;
  email: string;
  telefono?: string;
  disponibilidad?: string;
  idiomas: string[];
  software: string[];
  formacion: EntradaCV[];
  experiencia: EntradaCV[];
  reconocimientos?: EntradaCV[];
}

export interface Portafolio {
  autor: Autor;
  anio: string;
  proyectos: Proyecto[];
  /** Otros trabajos en formato compacto (S5). */
  otros: Pieza[];
  /** Imagen de la portada y del cierre (PF-R3). */
  portada: Pieza;
  cierre: Pieza;
  /** Aclaración sobre el contenido de ejemplo. */
  nota?: string;
}

// ---------------------------------------------------------------------------
// Composición
// ---------------------------------------------------------------------------

export type IdLayout =
  | 'portada'
  | 'perfil-sumario'
  | 'apertura'
  | 'planimetria'
  | 'proyecto-breve'
  | 'otros-cv'
  | 'cierre';

export interface Spread {
  indice: number;
  layout: IdLayout;
  /** Nombre que aparece en el cintillo y en la cota de navegación. */
  seccion: string;
  proyecto?: Proyecto;
}

export interface EntradaSumario {
  proyecto: Proyecto;
  paginaInicio: number;
  paginaFin: number;
  minutos: number;
}
