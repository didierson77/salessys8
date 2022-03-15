import { Categoria } from "./categoria.model";


export class Producto {
  constructor(
    public descripcion: string,
    public activo: boolean = false,
    public categoria?: Categoria,
    public claveInt?: string,
    public precio?: number,
    public existencia?: number,
    public unidadMedida?: string,
    public subProducto?: boolean,
    public costo?: number,
    public img?: string,
    public _id?: string,
    public manoObra?: number,
  ) {
  }
}
