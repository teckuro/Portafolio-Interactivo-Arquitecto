import type { Portafolio } from '../model/types';

/**
 * Caso E1 (docs/05-descripcion-de-entrada.md): arquitecta recién titulada que
 * postula a oficinas de vivienda colectiva. Persona, proyectos y datos son
 * ficticios. Las imágenes son ilustraciones generadas como marcador de posición.
 */
export const portafolioE1: Portafolio = {
  anio: '2026',
  nota: 'Contenido de ejemplo. La autora, los proyectos y las imágenes son ficticios.',
  autor: {
    nombre: 'Isidora Lagos Fuentes',
    disciplina: 'Arquitecta',
    ciudad: 'Valparaíso, Chile',
    perfil:
      'Arquitecta recién titulada. Me interesa la vivienda colectiva en terrenos difíciles: pendientes, bordes y quebradas. En mi práctica desarrollé planimetría de detalle para un edificio en Viña del Mar, y quiero seguir aprendiendo en una oficina que proyecte y construya vivienda.',
    email: 'isidora.lagos@example.com',
    telefono: '+56 9 0000 0000',
    disponibilidad: 'Disponible desde enero de 2027',
    idiomas: ['Español, nativo', 'Inglés, B2'],
    software: ['Revit', 'Rhino', 'AutoCAD', 'Grasshopper', 'Twinmotion', 'Adobe InDesign'],
    formacion: [
      { periodo: '2025', texto: 'Título de arquitecta', detalle: 'Proyecto de título: Habitar la pendiente' },
      { periodo: '2019–2025', texto: 'Licenciatura en Arquitectura', detalle: 'Escuela de Arquitectura, Valparaíso' },
    ],
    experiencia: [
      { periodo: '2024', texto: 'Práctica profesional, Taller Litoral', detalle: 'Seis meses. Planimetría de detalle y coordinación' },
      { periodo: '2023', texto: 'Ayudante del taller de construcción', detalle: 'Construcción 1:1 de un pabellón de madera' },
    ],
    reconocimientos: [
      { periodo: '2024', texto: 'Mención honrosa', detalle: 'Concurso estudiantil de vivienda de emergencia' },
    ],
  },

  portada: {
    id: 'portada',
    tipo: 'render',
    arte: { k: 'ilustracion', escena: 'cerro' },
    pie: 'Habitar la pendiente, vista desde el cerro Alegre.',
    nivel: 1,
  },

  cierre: {
    id: 'cierre',
    tipo: 'render',
    arte: { k: 'ilustracion', escena: 'cerro-tarde' },
    pie: 'Habitar la pendiente al atardecer.',
    nivel: 1,
  },

  proyectos: [
    // ---------------------------------------------------------------- pico
    {
      id: 'pendiente',
      nombre: 'Habitar la pendiente',
      prioridad: 'pico',
      tipologia: 'vivienda',
      sintesis: 'Veinticuatro viviendas que bajan con el cerro y abren un paso público entre dos calles.',
      concepto:
        'El terreno, en el cerro Polanco, tiene 22 metros de desnivel entre la calle alta y la baja. En vez de aplanarlo, el proyecto lo sigue con terrazas de una vivienda de ancho. Cada vivienda usa la cubierta de la inferior como patio, de modo que todas reciben sol y vista al puerto. Una escalera pública ordena el conjunto: une las dos calles, da acceso a cada casa y funciona como lugar de encuentro. El zócalo es de hormigón, contiene el terreno y aloja los recintos húmedos; sobre él, la estructura es de madera laminada, más liviana y rápida de montar en un cerro sin acceso vehicular.',
      destacado: 'La escalera no es un acceso: es la calle del conjunto.',
      ficha: {
        anio: '2025',
        ubicacion: 'Cerro Polanco, Valparaíso',
        programa: 'Vivienda colectiva, 24 unidades',
        superficie: '3.240 m²',
        estado: 'academico',
        rol: 'Autora. Proyecto de título individual',
        equipo: 'Profesor guía: R. Medina',
        herramientas: ['Rhino', 'Revit', 'Twinmotion', 'Maqueta en cartón'],
      },
      recintos: {
        1: 'Estar-comedor',
        2: 'Cocina',
        3: 'Dormitorio',
        4: 'Dormitorio',
        5: 'Baño',
        6: 'Patio-terraza',
        7: 'Escalera pública',
      },
      piezas: [
        { id: 'p1-hero', tipo: 'render', arte: { k: 'ilustracion', escena: 'cerro' }, pie: 'Vista desde el cerro Alegre hacia el conjunto.', nivel: 1, proporcion: 1.6 },
        { id: 'p1-diagrama', tipo: 'diagrama', arte: { k: 'diagrama', variante: 'pendiente' }, pie: 'Estrategia: seguir el terreno, escalonar las viviendas y abrir un recorrido público.', nivel: 3, proporcion: 3 },
        {
          id: 'p1-planta',
          tipo: 'planta',
          pie: 'Planta del nivel +14,40. Escala 1:200.',
          nivel: 2,
          proporcion: 1.5,
          arte: {
            k: 'planta',
            ancho: 16,
            alto: 10,
            norte: 25,
            ejesX: [3, 7.5, 12],
            ejesY: [0, 5.5, 10],
            corte: { y: 1.9 },
            recintos: [
              { x: 0, y: 0, w: 3, h: 10, n: 7, exterior: true },
              { x: 3, y: 0, w: 6, h: 5.5, n: 1 },
              { x: 9, y: 0, w: 3, h: 3, n: 2 },
              { x: 9, y: 3, w: 3, h: 2.5, n: 5 },
              { x: 3, y: 5.5, w: 4.5, h: 4.5, n: 3 },
              { x: 7.5, y: 5.5, w: 4.5, h: 4.5, n: 4 },
              { x: 12, y: 0, w: 4, h: 10, n: 6, exterior: true },
            ],
            puertas: [
              { x: 3, y: 1.2, l: 1, o: 'v', giro: 1 },
              { x: 4.2, y: 5.5, l: 0.9, o: 'h', giro: 1 },
              { x: 9.8, y: 5.5, l: 0.9, o: 'h', giro: 1 },
              { x: 9, y: 3.7, l: 0.8, o: 'v', giro: -1 },
            ],
            ventanas: [
              { x: 4, y: 0, l: 3.5, o: 'h' },
              { x: 9.6, y: 0, l: 1.6, o: 'h' },
              { x: 4, y: 10, l: 2.6, o: 'h' },
              { x: 8.4, y: 10, l: 2.6, o: 'h' },
              { x: 12, y: 0.8, l: 3.6, o: 'v' },
              { x: 12, y: 6.4, l: 2.6, o: 'v' },
            ],
            vistas: [
              { n: 1, x: 1.5, y: 8.6, ang: -90 },
              { n: 2, x: 14.4, y: 8.4, ang: -125 },
            ],
          },
        },
        { id: 'p1-corte', tipo: 'corte', arte: { k: 'corte', variante: 'pendiente' }, pie: 'Corte A-A. Las viviendas siguen el desnivel de 22 m.', nivel: 2, proporcion: 2.2 },
        { id: 'p1-v1', tipo: 'render', arte: { k: 'ilustracion', escena: 'escalera' }, pie: 'La escalera pública atraviesa el conjunto.', nivel: 2, llamada: 1, proporcion: 1.25 },
        { id: 'p1-v2', tipo: 'render', arte: { k: 'ilustracion', escena: 'terraza' }, pie: 'Cada vivienda usa la cubierta de la inferior como patio.', nivel: 2, llamada: 2, proporcion: 1.25 },
        { id: 'p1-croquis', tipo: 'croquis', arte: { k: 'croquis', escena: 'cerro' }, pie: 'Primeros croquis del lugar.', nivel: 3, proporcion: 1.5 },
        { id: 'p1-maqueta', tipo: 'maqueta', arte: { k: 'maqueta', escena: 'pendiente' }, pie: 'Maqueta de estudio en cartón gris, escala 1:200.', nivel: 3, proporcion: 1.5 },
      ],
    },

    // ----------------------------------------------------------- principal
    {
      id: 'acacias',
      nombre: 'Conjunto Las Acacias',
      prioridad: 'principal',
      tipologia: 'vivienda-profesional',
      sintesis: 'Práctica profesional: desarrollé la planimetría de detalle de un edificio de 42 departamentos.',
      concepto:
        'Durante seis meses en Taller Litoral trabajé en el desarrollo del proyecto, desde el anteproyecto aprobado hasta el set de licitación. Me encargué de la fachada ventilada: definí la modulación de los paneles, resolví los encuentros con losas y ventanas y coordiné con cálculo e instalaciones para que las fijaciones no interfirieran con los pasos de ductos.',
      ficha: {
        anio: '2024',
        ubicacion: 'Viña del Mar',
        programa: 'Vivienda colectiva, 42 departamentos',
        superficie: '3.900 m²',
        estado: 'en-desarrollo',
        rol: 'Planimetría de detalle de fachadas y coordinación de especialidades',
        equipo: 'Oficina: Taller Litoral. Arquitecto a cargo: P. Rojas',
        herramientas: ['Revit', 'AutoCAD'],
      },
      aportes: [
        'Modulación de 320 paneles de fachada ventilada',
        '14 láminas de detalle de encuentros, escalas 1:10 y 1:5',
        'Coordinación semanal con cálculo e instalaciones',
        'Cubicación de terminaciones para la licitación',
      ],
      recintos: {
        1: 'Estar-comedor',
        2: 'Dormitorio',
        3: 'Dormitorio',
        4: 'Pasillo común',
        5: 'Escalera y ascensor',
        6: 'Logia',
      },
      piezas: [
        { id: 'p2-hero', tipo: 'render', arte: { k: 'ilustracion', escena: 'conjunto' }, pie: 'Fachada norte. Render de la oficina.', credito: 'Imagen: Taller Litoral', nivel: 1, proporcion: 1.4 },
        {
          id: 'p2-planta',
          tipo: 'planta',
          pie: 'Planta de piso tipo. Escala 1:200.',
          nivel: 2,
          proporcion: 2.1,
          arte: {
            k: 'planta',
            ancho: 20,
            alto: 9,
            norte: -10,
            ejesX: [0, 6, 14, 20],
            ejesY: [0, 9],
            detalle: { x: 0, y: 2.4, n: 1 },
            recintos: [
              { x: 0, y: 0, w: 6, h: 5, n: 1 },
              { x: 0, y: 5, w: 3.2, h: 4, n: 2 },
              { x: 3.2, y: 5, w: 2.8, h: 4, n: 3 },
              { x: 8, y: 0, w: 4, h: 3.5, n: 5 },
              { x: 6, y: 3.5, w: 8, h: 2, n: 4 },
              { x: 6, y: 5.5, w: 8, h: 3.5, n: 6, exterior: true },
              { x: 14, y: 0, w: 6, h: 5, n: 1 },
              { x: 14, y: 5, w: 3, h: 4, n: 2 },
              { x: 17, y: 5, w: 3, h: 4, n: 3 },
            ],
            puertas: [
              { x: 6, y: 3.9, l: 0.9, o: 'v', giro: 1 },
              { x: 14, y: 3.9, l: 0.9, o: 'v', giro: -1 },
              { x: 1, y: 5, l: 0.8, o: 'h', giro: 1 },
              { x: 4.2, y: 5, l: 0.8, o: 'h', giro: -1 },
              { x: 15, y: 5, l: 0.8, o: 'h', giro: 1 },
              { x: 18, y: 5, l: 0.8, o: 'h', giro: -1 },
            ],
            ventanas: [
              { x: 1, y: 0, l: 4, o: 'h' },
              { x: 15, y: 0, l: 4, o: 'h' },
              { x: 0.6, y: 9, l: 2, o: 'h' },
              { x: 3.6, y: 9, l: 2, o: 'h' },
              { x: 14.5, y: 9, l: 2, o: 'h' },
              { x: 17.5, y: 9, l: 2, o: 'h' },
            ],
          },
        },
        { id: 'p2-detalle', tipo: 'detalle', arte: { k: 'detalle' }, pie: 'Detalle D1: encuentro de losa y fachada ventilada. Escala 1:10.', nivel: 2, llamada: 1, proporcion: 0.8 },
      ],
    },

    // ---------------------------------------------------------- secundarios
    {
      id: 'mercado',
      nombre: 'Mercado del Almendral',
      prioridad: 'secundario',
      tipologia: 'equipamiento',
      sintesis: 'Un mercado de barrio bajo una cubierta de dientes de sierra que deja entrar la luz del sur.',
      concepto:
        'El mercado ocupa media manzana en el plan de Valparaíso. Una sola nave libre de 30 metros reúne los puestos y se abre a la calle con portones que convierten la vereda en parte del mercado. La cubierta en dientes de sierra lleva luz pareja al interior sin calentar los productos.',
      ficha: {
        anio: '2024',
        ubicacion: 'Barrio El Almendral, Valparaíso',
        programa: 'Mercado de barrio',
        superficie: '1.850 m²',
        estado: 'academico',
        rol: 'Coautora: anteproyecto, planimetría y maqueta',
        equipo: 'Con C. Soto. Taller 9, profesora M. Ibáñez',
        herramientas: ['Rhino', 'Illustrator'],
      },
      recintos: { 1: 'Nave de puestos', 2: 'Servicios', 3: 'Bodega', 4: 'Cafetería' },
      piezas: [
        { id: 'p3-hero', tipo: 'render', arte: { k: 'ilustracion', escena: 'mercado' }, pie: 'Interior de la nave a media mañana.', nivel: 1, proporcion: 1.4 },
        {
          id: 'p3-planta',
          tipo: 'planta',
          pie: 'Planta general. Escala 1:500.',
          nivel: 2,
          proporcion: 2.1,
          arte: {
            k: 'planta',
            ancho: 30,
            alto: 14,
            norte: 0,
            ejesX: [0, 7.5, 15, 22.5, 30],
            recintos: [
              { x: 0, y: 0, w: 30, h: 10, n: 1 },
              { x: 0, y: 10, w: 8, h: 4, n: 2 },
              { x: 8, y: 10, w: 8, h: 4, n: 3 },
              { x: 16, y: 10, w: 14, h: 4, n: 4 },
            ],
            puertas: [
              { x: 3, y: 0, l: 3, o: 'h', giro: 1 },
              { x: 13.5, y: 0, l: 3, o: 'h', giro: 1 },
              { x: 24, y: 0, l: 3, o: 'h', giro: 1 },
              { x: 20, y: 10, l: 1, o: 'h', giro: -1 },
            ],
            ventanas: [
              { x: 0, y: 2, l: 6, o: 'v' },
              { x: 30, y: 2, l: 6, o: 'v' },
              { x: 18, y: 14, l: 10, o: 'h' },
            ],
          },
        },
      ],
    },
    {
      id: 'pabellon',
      nombre: 'Pabellón de varas',
      prioridad: 'secundario',
      tipologia: 'construccion',
      sintesis: 'Pabellón de 36 m² construido con varas de eucalipto en un taller de seis semanas.',
      concepto:
        'Diseñamos y construimos un refugio para la feria de la quebrada con varas de eucalipto de descarte. Mi equipo resolvió las uniones: una pieza de terciado y dos pernos que permiten armar la retícula sin herramientas especiales.',
      ficha: {
        anio: '2023',
        ubicacion: 'Quebrada Verde, Valparaíso',
        programa: 'Pabellón comunitario',
        superficie: '36 m²',
        estado: 'construido',
        rol: 'Diseño de uniones y construcción, en un equipo de doce',
        equipo: 'Taller de construcción 1:1',
        herramientas: ['Grasshopper', 'Construcción a mano'],
      },
      recintos: { 1: 'Área cubierta' },
      piezas: [
        { id: 'p4-hero', tipo: 'fotografia', arte: { k: 'ilustracion', escena: 'pabellon' }, pie: 'El pabellón el día de la inauguración.', credito: 'Foto: equipo del taller', nivel: 1, proporcion: 1.4 },
        {
          id: 'p4-planta',
          tipo: 'planta',
          pie: 'Planta de la retícula. Escala 1:100.',
          nivel: 2,
          proporcion: 1.2,
          arte: {
            k: 'planta',
            ancho: 6,
            alto: 6,
            norte: 40,
            ejesX: [0, 2, 4, 6],
            ejesY: [0, 2, 4, 6],
            recintos: [{ x: 0, y: 0, w: 6, h: 6, n: 1, exterior: true }],
          },
        },
      ],
    },
  ],

  otros: [
    { id: 'o1', tipo: 'croquis', arte: { k: 'croquis', escena: 'chiloe' }, pie: 'Croquis de viaje. Castro, Chiloé, 2023.', nivel: 2, proporcion: 1.3 },
    { id: 'o2', tipo: 'render', arte: { k: 'ilustracion', escena: 'concurso' }, pie: 'Vivienda de emergencia. Concurso estudiantil, mención honrosa, 2024.', nivel: 2, proporcion: 1.3 },
    { id: 'o3', tipo: 'maqueta', arte: { k: 'maqueta', escena: 'pendiente' }, pie: 'Maqueta de trabajo, Taller 8, 2023.', nivel: 2, proporcion: 1.3 },
  ],
};
