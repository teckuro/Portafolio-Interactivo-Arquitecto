import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import type { Modelo3D, PisoModelo, VolumenModelo } from '../model/types';

/**
 * Modelo 3D de la portada: una maqueta blanca con aristas en tinta, vista en
 * axonometría (cámara ortográfica). Se gira arrastrando, los pisos se pueden
 * separar (axonometría explotada) y cada piso se enlaza con su fila en la
 * lista de programas (CU-R2). Solo dibuja cuando algo cambia.
 */

export interface ControlModelo {
  separar(separado: boolean): void;
  resaltar(piso: number | null): void;
  destruir(): void;
}

interface Opciones {
  /** HTML de respaldo si el navegador no tiene WebGL. */
  respaldo: string;
  /** Avisa qué piso está bajo el cursor, para enlazar la lista. */
  alResaltar: (piso: number | null) => void;
}

const COLOR = {
  muro: 0xf5f4ef,
  vidrio: 0x8ea5b1,
  nucleo: 0xd3d2ca,
  base: 0xd9d8d1,
  oscuro: 0x2f363b,
  linea: 0x161616,
  resaltado: 0xffe14d,
};

const SEPARACION = 4.6;
const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function montarModelo3D(contenedor: HTMLElement, modelo: Modelo3D, { respaldo, alResaltar }: Opciones): ControlModelo | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  } catch {
    contenedor.innerHTML = respaldo;
    contenedor.classList.add('modelo3d--respaldo');
    return null;
  }

  const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  contenedor.appendChild(renderer.domElement);

  const etiquetas = new CSS2DRenderer();
  etiquetas.domElement.className = 'modelo3d__etiquetas';
  contenedor.appendChild(etiquetas.domElement);

  const escena = new THREE.Scene();
  const edificio = new THREE.Group();
  edificio.position.set(-modelo.terreno.w / 2, 0, -modelo.terreno.d / 2);
  escena.add(edificio);

  // ---------------------------------------------------------- materiales
  const linea = new THREE.LineBasicMaterial({ color: COLOR.linea });
  const mat = {
    base: new THREE.MeshLambertMaterial({ color: COLOR.base }),
    nucleo: new THREE.MeshLambertMaterial({ color: COLOR.nucleo }),
    oscuro: new THREE.MeshLambertMaterial({ color: COLOR.oscuro }),
  };

  const caja = (w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number, aristas = true) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const malla = new THREE.Mesh(geo, material);
    malla.position.set(x, y, z);
    malla.castShadow = true;
    malla.receiveShadow = true;
    if (aristas) malla.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), linea));
    return malla;
  };

  // Base de la maqueta
  const { w: tw, d: td } = modelo.terreno;
  edificio.add(caja(tw + 4, 0.8, td + 4, mat.base, tw / 2, -0.4, td / 2));

  // ---------------------------------------------------------- pisos
  interface Piso {
    datos: PisoModelo;
    grupo: THREE.Group;
    base: number;
    materiales: THREE.MeshLambertMaterial[];
    vidrios: THREE.MeshLambertMaterial[];
    etiqueta: HTMLElement;
  }
  const pisos: Piso[] = [];
  const seleccionables: THREE.Object3D[] = [];
  let altura = 0;

  modelo.pisos.forEach((datos, i) => {
    const grupo = new THREE.Group();
    grupo.userData.piso = datos.n;
    const muro = new THREE.MeshLambertMaterial({ color: COLOR.muro });
    const vidrio = new THREE.MeshLambertMaterial({ color: COLOR.vidrio, transparent: true, opacity: 0.55 });
    const h = datos.altura;

    for (const v of datos.volumenes) agregarVolumen(grupo, v, h, muro, vidrio);

    // El núcleo se corta en cada piso, así también se separa
    const n = modelo.nucleo;
    const extra = i === modelo.pisos.length - 1 ? 1.6 : 0;
    grupo.add(caja(n.w, h + extra, n.d, mat.nucleo, n.x + n.w / 2, (h + extra) / 2, n.z + n.d / 2));

    // Burbuja con el número de piso, ubicada en la esquina más al oriente
    const este = datos.volumenes.reduce((a, b) => (a.x + a.w > b.x + b.w ? a : b));
    const div = document.createElement('span');
    div.className = 'modelo3d__piso';
    div.textContent = String(datos.n);
    const etiqueta = new CSS2DObject(div);
    etiqueta.position.set(este.x + este.w + 2.2, h / 2, este.z + este.d);
    grupo.add(etiqueta);

    grupo.position.y = altura;
    edificio.add(grupo);
    grupo.traverse((o) => {
      if (o instanceof THREE.Mesh) seleccionables.push(o);
    });
    pisos.push({ datos, grupo, base: altura, materiales: [muro], vidrios: [vidrio], etiqueta: div });
    altura += h;
  });

  function agregarVolumen(grupo: THREE.Group, v: VolumenModelo, h: number, muro: THREE.Material, vidrio: THREE.Material) {
    const cx = v.x + v.w / 2;
    const cz = v.z + v.d / 2;
    if (v.tipo === 'terraza') {
      grupo.add(caja(v.w, 0.4, v.d, muro, cx, 0.2, cz));
      const baranda = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(v.w, 1.1, v.d)), linea);
      baranda.position.set(cx, 0.95, cz);
      grupo.add(baranda);
      return;
    }
    if (v.tipo === 'vidrio') {
      grupo.add(caja(v.w, h - 0.5, v.d, vidrio, cx, (h - 0.5) / 2, cz));
      grupo.add(caja(v.w + 0.8, 0.5, v.d + 0.8, muro, cx, h - 0.25, cz));
      // Montantes de la fachada vidriada
      const puntos: THREE.Vector3[] = [];
      for (let x = v.x; x <= v.x + v.w + 0.01; x += 2.6) {
        for (const z of [v.z, v.z + v.d]) puntos.push(new THREE.Vector3(x, 0, z), new THREE.Vector3(x, h - 0.5, z));
      }
      grupo.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(puntos), linea));
      return;
    }
    grupo.add(caja(v.w, h, v.d, muro, cx, h / 2, cz));
    if (v.fachada === 'franja') {
      for (const z of [v.z + v.d + 0.06, v.z - 0.06]) grupo.add(caja(v.w * 0.9, h * 0.36, 0.12, mat.oscuro, cx, h * 0.52, z, false));
    }
    if (v.fachada === 'celosia') {
      for (let x = v.x + 0.8; x < v.x + v.w - 0.4; x += 1.5) grupo.add(caja(0.22, h - 0.7, 0.9, muro, x, h / 2, v.z + v.d + 0.45));
    }
  }

  // ---------------------------------------------------------- luz y cámara
  escena.add(new THREE.HemisphereLight(0xffffff, 0xbdb8ab, 1.5));
  const sol = new THREE.DirectionalLight(0xffffff, 2.4);
  sol.position.set(45, 70, 55);
  sol.castShadow = true;
  sol.shadow.mapSize.set(2048, 2048);
  Object.assign(sol.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 220 });
  sol.shadow.bias = -0.0004;
  sol.shadow.normalBias = 0.03;
  escena.add(sol);

  const radio = Math.hypot(tw / 2, td / 2, (altura + SEPARACION * modelo.pisos.length) / 2);
  const camara = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 600);
  const objetivo = new THREE.Vector3(0, altura * 0.42, 0);
  camara.position.copy(objetivo).add(new THREE.Vector3().setFromSphericalCoords(160, 1.02, 0.72));
  camara.lookAt(objetivo);

  const controles = new OrbitControls(camara, renderer.domElement);
  Object.assign(controles, { enablePan: false, enableZoom: false, enableDamping: true, dampingFactor: 0.09, rotateSpeed: 0.75, minPolarAngle: 0.3, maxPolarAngle: 1.4 });
  controles.target.copy(objetivo);
  controles.update();

  // El arrastre gira la maqueta; no debe pasar de página.
  renderer.domElement.addEventListener('pointerdown', (e) => e.stopPropagation());

  // ---------------------------------------------------------- dibujo bajo demanda
  let ancho = 0;
  let alto = 0;
  const dibujar = () => {
    if (!ancho || !alto) return;
    renderer.render(escena, camara);
    etiquetas.render(escena, camara);
  };

  let activoHasta = 0;
  let enCurso = false;
  const animaciones = new Set<(t: number) => boolean>();
  const bucle = (t: number) => {
    controles.update();
    for (const a of [...animaciones]) if (a(t)) animaciones.delete(a);
    dibujar();
    if (animaciones.size || performance.now() < activoHasta) requestAnimationFrame(bucle);
    else enCurso = false;
  };
  const despertar = (ms = 900) => {
    activoHasta = Math.max(activoHasta, performance.now() + ms);
    if (!enCurso) {
      enCurso = true;
      requestAnimationFrame(bucle);
    }
  };
  controles.addEventListener('start', () => despertar(60_000));
  controles.addEventListener('end', () => (activoHasta = performance.now() + 900));

  const medir = () => {
    ancho = contenedor.clientWidth;
    alto = contenedor.clientHeight;
    if (!ancho || !alto) return;
    renderer.setSize(ancho, alto);
    etiquetas.setSize(ancho, alto);
    const aspecto = ancho / alto;
    const mitad = radio * (aspecto < 0.8 ? 1.05 / aspecto : 0.95);
    Object.assign(camara, { left: -mitad * aspecto, right: mitad * aspecto, top: mitad, bottom: -mitad });
    camara.updateProjectionMatrix();
    dibujar();
  };
  const observador = new ResizeObserver(medir);
  observador.observe(contenedor);
  medir();

  // ---------------------------------------------------------- separar pisos
  const desplazar = (destinos: number[], duracion: number, retrasoPorPiso = 0) => {
    const inicio = performance.now();
    const origen = pisos.map((p) => p.grupo.position.y);
    animaciones.add((t) => {
      let terminado = true;
      pisos.forEach((p, i) => {
        const k = Math.min(1, Math.max(0, (t - inicio - i * retrasoPorPiso) / duracion));
        p.grupo.position.y = origen[i] + (destinos[i] - origen[i]) * suave(k);
        if (k < 1) terminado = false;
      });
      return terminado;
    });
    despertar();
  };

  const destinos = (separado: boolean) => pisos.map((p, i) => p.base + (separado ? i * SEPARACION : 0));

  /** Reencuadra la cámara: más lejos y más arriba cuando los pisos están separados. */
  let alzaActual = 0;
  const encuadrar = (separado: boolean, duracion: number) => {
    const zoom0 = camara.zoom;
    const zoom1 = separado ? 0.8 : 1;
    const alza0 = alzaActual;
    const alza1 = separado ? SEPARACION * (pisos.length - 1) * 0.42 : 0;
    const inicio = performance.now();
    animaciones.add((t) => {
      const k = duracion ? Math.min(1, (t - inicio) / duracion) : 1;
      const e = suave(k);
      const alza = alza0 + (alza1 - alza0) * e;
      camara.position.y += alza - alzaActual;
      controles.target.y += alza - alzaActual;
      alzaActual = alza;
      camara.zoom = zoom0 + (zoom1 - zoom0) * e;
      camara.updateProjectionMatrix();
      return k >= 1;
    });
    despertar();
  };

  // Único momento coreografiado: los pisos se apilan al abrir la portada.
  if (!sinMovimiento) {
    pisos.forEach((p, i) => (p.grupo.position.y = p.base + 14 + i * 5));
    desplazar(destinos(false), 900, 110);
  } else {
    dibujar();
  }

  // ---------------------------------------------------------- resaltar
  let resaltado: number | null = null;
  const resaltar = (n: number | null) => {
    if (n === resaltado) return;
    resaltado = n;
    for (const p of pisos) {
      const activo = p.datos.n === n;
      p.materiales.forEach((m) => m.color.setHex(activo ? COLOR.resaltado : COLOR.muro));
      p.vidrios.forEach((m) => m.color.setHex(activo ? COLOR.resaltado : COLOR.vidrio));
      p.etiqueta.classList.toggle('es-activa', activo);
    }
    dibujar();
  };

  const rayo = new THREE.Raycaster();
  const puntero = new THREE.Vector2();
  let arrastrando = false;
  controles.addEventListener('start', () => (arrastrando = true));
  controles.addEventListener('end', () => (arrastrando = false));
  renderer.domElement.addEventListener('pointermove', (e) => {
    if (arrastrando) return;
    const r = renderer.domElement.getBoundingClientRect();
    puntero.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    rayo.setFromCamera(puntero, camara);
    const golpe = rayo.intersectObjects(seleccionables, false)[0];
    let n: number | null = null;
    for (let o: THREE.Object3D | null = golpe?.object ?? null; o; o = o.parent) {
      if (o.userData.piso) {
        n = o.userData.piso;
        break;
      }
    }
    resaltar(n);
    alResaltar(n);
  });
  renderer.domElement.addEventListener('pointerleave', () => {
    resaltar(null);
    alResaltar(null);
  });

  return {
    separar(separado) {
      if (sinMovimiento) {
        pisos.forEach((p, i) => (p.grupo.position.y = destinos(separado)[i]));
        encuadrar(separado, 0);
      } else {
        desplazar(destinos(separado), 650);
        encuadrar(separado, 650);
      }
    },
    resaltar,
    destruir() {
      observador.disconnect();
      controles.dispose();
      renderer.dispose();
    },
  };
}
