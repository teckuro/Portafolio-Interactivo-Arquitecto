import './styles/tokens.css';
import './styles/base.css';
import './styles/revista.css';
import './styles/pagina.css';
import './styles/componentes.css';
import './styles/impresion.css';

import { portafolioCatalina } from './content/catalina-garate';
import { portafolioE1 } from './content/ejemplo-e1';
import type { Portafolio } from './model/types';
import { Revista } from './ui/revista';

/** Portafolios de ejemplo; se elige con ?portafolio=… (por defecto, el de Catalina). */
const PORTAFOLIOS: Record<string, Portafolio> = {
  catalina: portafolioCatalina,
  e1: portafolioE1,
};

const id = new URLSearchParams(location.search).get('portafolio') ?? 'catalina';
new Revista(document.getElementById('app')!, PORTAFOLIOS[id] ?? portafolioCatalina).montar();
