import type { Portafolio } from '../model/types';

/**
 * Portafolio de ejemplo: Catalina Garate Rojas, arquitecta recién titulada.
 * Proyecto de título: un centro cultural de cinco pisos, con modelo 3D en la
 * portada. Todos los datos son ficticios.
 */
export const portafolioCatalina: Portafolio = {
  anio: '2026',
  nota: 'Contenido de ejemplo. Los proyectos, datos e imágenes son ficticios.',
  autor: {
    nombre: 'Catalina Garate Rojas',
    disciplina: 'Arquitecta',
    ciudad: 'Concepción, Chile',
    perfil:
      'Arquitecta recién titulada. Me interesan los edificios públicos que se recorren como una calle: centros culturales, bibliotecas y equipamientos de barrio. En mi práctica desarrollé planimetría de vivienda colectiva, y quiero sumarme a una oficina que proyecte espacio público.',
    email: 'catalina.garate@example.com',
    telefono: '+56 9 0000 0000',
    disponibilidad: 'Disponible desde marzo de 2027',
    idiomas: ['Español, nativo', 'Inglés, B2'],
    software: ['Revit', 'Rhino', 'AutoCAD', 'Enscape', 'Blender', 'Adobe InDesign'],
    formacion: [
      { periodo: '2025', texto: 'Título de arquitecta', detalle: 'Proyecto de título: Centro Cultural Estación' },
      { periodo: '2019–2025', texto: 'Licenciatura en Arquitectura', detalle: 'Escuela de Arquitectura, Concepción' },
    ],
    experiencia: [
      { periodo: '2024', texto: 'Práctica profesional, Taller Biobío', detalle: 'Seis meses. Planimetría de detalle y coordinación' },
      { periodo: '2023', texto: 'Ayudante del taller de primer año', detalle: 'Corrección de maquetas y croquis' },
    ],
    reconocimientos: [
      { periodo: '2025', texto: 'Proyecto de título destacado', detalle: 'Muestra anual de titulación de la escuela' },
    ],
  },

  portada: {
    id: 'cg-portada',
    tipo: 'render',
    arte: { k: 'ilustracion', escena: 'centro-cultural' },
    pie: 'Centro Cultural Estación desde la plaza.',
    nivel: 1,
  },

  cierre: {
    id: 'cg-cierre',
    tipo: 'render',
    arte: { k: 'ilustracion', escena: 'centro-cultural-tarde' },
    pie: 'Centro Cultural Estación al atardecer.',
    nivel: 1,
  },

  proyectos: [
    // --------------------------------------------- pico: proyecto de título
    {
      id: 'estacion',
      nombre: 'Centro Cultural Estación',
      prioridad: 'pico',
      tipologia: 'cultural',
      sintesis: 'Cinco pisos apilados que suben la plaza del barrio hasta una terraza abierta sobre la ciudad.',
      concepto:
        'El terreno, junto a la antigua estación de trenes, es hoy un estacionamiento sin sombra. El proyecto apila los cinco programas del centro cultural en vez de extenderlos: libera el suelo como plaza pública y ordena el edificio en altura. Cada piso se desplaza respecto del anterior; así aparecen aleros que cubren la plaza y terrazas que miran al río. Una escalera pública exterior une los cinco niveles sin pasar por el control de acceso, de modo que la terraza del quinto piso funciona como un mirador abierto al barrio. La estructura es de hormigón armado, con el auditorio colgado de vigas de gran luz.',
      ficha: {
        anio: '2025',
        ubicacion: 'Barrio Estación, Concepción',
        programa: 'Centro cultural: auditorio, salas de exposición, talleres y biblioteca',
        superficie: '6.800 m²',
        estado: 'academico',
        rol: 'Autora. Proyecto de título individual',
        equipo: 'Profesora guía: A. Fuentealba',
        herramientas: ['Rhino', 'Revit', 'Enscape', 'Maqueta en balsa'],
      },
      modelo: {
        terreno: { w: 50, d: 34 },
        nucleo: { x: 15, z: 11, w: 6, d: 7 },
        pisos: [
          { n: 1, programa: 'Hall de acceso, café y sala multiuso', altura: 5, volumenes: [{ x: 5, z: 5, w: 26, d: 17, tipo: 'vidrio' }] },
          { n: 2, programa: 'Auditorio de 300 butacas', altura: 7, volumenes: [{ x: 1, z: 3, w: 26, d: 21 }] },
          { n: 3, programa: 'Salas de exposición', altura: 4.5, volumenes: [{ x: 9, z: 7, w: 34, d: 15, fachada: 'franja' }] },
          { n: 4, programa: 'Talleres y salas de ensayo', altura: 4.5, volumenes: [{ x: 3, z: 4, w: 28, d: 18, fachada: 'celosia' }] },
          {
            n: 5,
            programa: 'Biblioteca y terraza mirador',
            altura: 4.5,
            volumenes: [
              { x: 7, z: 7, w: 17, d: 13, fachada: 'franja' },
              { x: 24, z: 7, w: 9, d: 13, tipo: 'terraza' },
            ],
          },
        ],
      },
      recintos: {
        1: 'Biblioteca',
        2: 'Sala de lectura',
        3: 'Escaleras y ascensores',
        4: 'Terraza mirador',
        5: 'Escalera pública',
      },
      piezas: [
        { id: 'cg1-hero', tipo: 'render', arte: { k: 'ilustracion', escena: 'centro-cultural' }, pie: 'El centro cultural desde la plaza de la estación.', nivel: 1, proporcion: 1.6 },
        {
          id: 'cg1-planta',
          tipo: 'planta',
          pie: 'Planta del quinto piso. Escala 1:250.',
          nivel: 2,
          proporcion: 1.6,
          arte: {
            k: 'planta',
            ancho: 30,
            alto: 20,
            norte: -15,
            ejesX: [0, 7, 14, 24, 30],
            ejesY: [0, 12, 20],
            corte: { y: 4 },
            recintos: [
              { x: 0, y: 0, w: 14, h: 12, n: 1 },
              { x: 14, y: 0, w: 10, h: 7, n: 2 },
              { x: 14, y: 7, w: 10, h: 5, n: 3 },
              { x: 0, y: 12, w: 24, h: 8, n: 4, exterior: true },
              { x: 24, y: 0, w: 6, h: 20, n: 5, exterior: true },
            ],
            puertas: [
              { x: 5, y: 12, l: 2, o: 'h', giro: 1 },
              { x: 14, y: 2.5, l: 1, o: 'v', giro: -1 },
              { x: 17, y: 12, l: 1.4, o: 'h', giro: 1 },
            ],
            ventanas: [
              { x: 1, y: 0, l: 12, o: 'h' },
              { x: 15, y: 0, l: 8, o: 'h' },
              { x: 0, y: 1, l: 10, o: 'v' },
              { x: 24, y: 1, l: 5, o: 'v' },
            ],
            vistas: [
              { n: 1, x: 27, y: 17.5, ang: -90 },
              { n: 2, x: 9, y: 17, ang: 200 },
            ],
          },
        },
        { id: 'cg1-corte', tipo: 'corte', arte: { k: 'corte', variante: 'cultural' }, pie: 'Corte A-A. Los pisos se desplazan y dejan aleros y terrazas.', nivel: 2, proporcion: 2.1 },
        { id: 'cg1-v1', tipo: 'render', arte: { k: 'ilustracion', escena: 'escalera' }, pie: 'La escalera pública sube por la fachada oriente.', nivel: 2, llamada: 1, proporcion: 1.25 },
        { id: 'cg1-v2', tipo: 'render', arte: { k: 'ilustracion', escena: 'terraza' }, pie: 'Terraza mirador del quinto piso, abierta al barrio.', nivel: 2, llamada: 2, proporcion: 1.25 },
        { id: 'cg1-diagrama', tipo: 'diagrama', arte: { k: 'diagrama', variante: 'apilado' }, pie: 'Estrategia: reunir el programa, apilarlo y desplazar los pisos.', nivel: 3, proporcion: 3 },
        { id: 'cg1-maqueta', tipo: 'maqueta', arte: { k: 'maqueta', escena: 'apilado' }, pie: 'Maqueta de estudio en balsa, escala 1:200.', nivel: 3, proporcion: 1.5 },
      ],
    },

    // -------------------------------------------- principal: práctica
    {
      id: 'aromos',
      nombre: 'Edificio Los Aromos',
      prioridad: 'principal',
      tipologia: 'vivienda-profesional',
      sintesis: 'Práctica profesional: desarrollé la planimetría de detalle de un edificio de 36 departamentos.',
      concepto:
        'Durante seis meses en Taller Biobío trabajé en el desarrollo del proyecto, desde el anteproyecto aprobado hasta el set de licitación. Me encargué de la fachada ventilada: definí la modulación de los paneles, resolví los encuentros con losas y ventanas y coordiné con cálculo e instalaciones para que las fijaciones no interfirieran con los pasos de ductos.',
      ficha: {
        anio: '2024',
        ubicacion: 'Talcahuano',
        programa: 'Vivienda colectiva, 36 departamentos',
        superficie: '3.400 m²',
        estado: 'en-desarrollo',
        rol: 'Planimetría de detalle de fachadas y coordinación de especialidades',
        equipo: 'Oficina: Taller Biobío. Arquitecta a cargo: M. Sandoval',
        herramientas: ['Revit', 'AutoCAD'],
      },
      aportes: [
        'Modulación de 280 paneles de fachada ventilada',
        '12 láminas de detalle de encuentros, escalas 1:10 y 1:5',
        'Coordinación semanal con cálculo e instalaciones',
        'Cubicación de terminaciones para la licitación',
      ],
      recintos: { 1: 'Estar-comedor', 2: 'Dormitorio', 3: 'Dormitorio', 4: 'Pasillo común', 5: 'Escalera y ascensor', 6: 'Logia' },
      piezas: [
        { id: 'cg2-hero', tipo: 'render', arte: { k: 'ilustracion', escena: 'conjunto' }, pie: 'Fachada norte. Render de la oficina.', credito: 'Imagen: Taller Biobío', nivel: 1, proporcion: 1.4 },
        {
          id: 'cg2-planta',
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
        { id: 'cg2-detalle', tipo: 'detalle', arte: { k: 'detalle' }, pie: 'Detalle D1: encuentro de losa y fachada ventilada. Escala 1:10.', nivel: 2, llamada: 1, proporcion: 0.8 },
      ],
    },

    // ------------------------------------------------------- secundarios
    {
      id: 'mercado-tome',
      nombre: 'Mercado de Tomé',
      prioridad: 'secundario',
      tipologia: 'equipamiento',
      sintesis: 'Un mercado costero bajo una cubierta de dientes de sierra que deja entrar la luz del sur.',
      concepto:
        'El mercado ocupa el borde de la caleta. Una sola nave libre de 30 metros reúne los puestos de pescadores y agricultores y se abre a la costanera con portones que convierten la vereda en parte del mercado. La cubierta en dientes de sierra lleva luz pareja al interior sin calentar los productos.',
      ficha: {
        anio: '2024',
        ubicacion: 'Caleta de Tomé',
        programa: 'Mercado de barrio',
        superficie: '1.900 m²',
        estado: 'academico',
        rol: 'Coautora: anteproyecto, planimetría y maqueta',
        equipo: 'Con J. Muñoz. Taller 9, profesor R. Saavedra',
        herramientas: ['Rhino', 'Illustrator'],
      },
      recintos: { 1: 'Nave de puestos', 2: 'Servicios', 3: 'Bodega', 4: 'Cocinería' },
      piezas: [
        { id: 'cg3-hero', tipo: 'render', arte: { k: 'ilustracion', escena: 'mercado' }, pie: 'Interior de la nave a media mañana.', nivel: 1, proporcion: 1.4 },
        {
          id: 'cg3-planta',
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
      id: 'pabellon-pino',
      nombre: 'Pabellón de pino',
      prioridad: 'secundario',
      tipologia: 'construccion',
      sintesis: 'Pabellón de 36 m² construido con listones de pino en un taller de seis semanas.',
      concepto:
        'Diseñamos y construimos un refugio para la feria del parque con listones de pino de descarte. Mi equipo resolvió las uniones: una pieza de terciado y dos pernos que permiten armar la retícula sin herramientas especiales.',
      ficha: {
        anio: '2023',
        ubicacion: 'Parque Ecuador, Concepción',
        programa: 'Pabellón comunitario',
        superficie: '36 m²',
        estado: 'construido',
        rol: 'Diseño de uniones y construcción, en un equipo de diez',
        equipo: 'Taller de construcción 1:1',
        herramientas: ['Grasshopper', 'Construcción a mano'],
      },
      recintos: { 1: 'Área cubierta' },
      piezas: [
        { id: 'cg4-hero', tipo: 'fotografia', arte: { k: 'ilustracion', escena: 'pabellon' }, pie: 'El pabellón el día de la inauguración.', credito: 'Foto: equipo del taller', nivel: 1, proporcion: 1.4 },
        {
          id: 'cg4-planta',
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
    { id: 'cg-o1', tipo: 'croquis', arte: { k: 'croquis', escena: 'chiloe' }, pie: 'Croquis de viaje. Castro, Chiloé, 2023.', nivel: 2, proporcion: 1.3 },
    { id: 'cg-o2', tipo: 'render', arte: { k: 'ilustracion', escena: 'concurso' }, pie: 'Vivienda de emergencia. Concurso estudiantil, 2024.', nivel: 2, proporcion: 1.3 },
    { id: 'cg-o3', tipo: 'maqueta', arte: { k: 'maqueta', escena: 'apilado' }, pie: 'Maqueta de estudio del proyecto de título, 2025.', nivel: 2, proporcion: 1.3 },
  ],
};
