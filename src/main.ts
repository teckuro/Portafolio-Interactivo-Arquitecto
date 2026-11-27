import './styles/tokens.css';
import './styles/base.css';
import './styles/revista.css';
import './styles/pagina.css';
import './styles/componentes.css';
import './styles/impresion.css';

import { portafolioE1 } from './content/ejemplo-e1';
import { Revista } from './ui/revista';

new Revista(document.getElementById('app')!, portafolioE1).montar();
