import type { IdLayout } from '../model/types';
import { apertura } from './apertura';
import { cierre } from './cierre';
import { otrosCv } from './otros-cv';
import { perfilSumario } from './perfil-sumario';
import { planimetria } from './planimetria';
import { portada } from './portada';
import { proyectoBreve } from './proyecto-breve';
import type { Layout } from './tipos';

/** Registro de plantillas: el compositor elige el id, el registro resuelve cómo se dibuja. */
export const LAYOUTS: Record<IdLayout, Layout> = {
  portada,
  'perfil-sumario': perfilSumario,
  apertura,
  planimetria,
  'proyecto-breve': proyectoBreve,
  'otros-cv': otrosCv,
  cierre,
};

export type { CtxLayout, Layout, Paginas } from './tipos';
