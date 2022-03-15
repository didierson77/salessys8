import { Producto } from './producto.model';
import { Materia } from './materia.model';


export class Formula {

  constructor(
    public producto?: string,
    public matPrima?: string,
    public cantidad?: number,
    public importe?: number,
  ) {

  }
}
