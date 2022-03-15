
export class SubProducto {
  constructor(
    public descripcion: string,
    public activo: boolean = false,
    public precio?: number,
    public existencia?: number,
    public unidadMedida?: string,
    public costo?: number,
    public claveInt?: string,
    public img?: string,
    public _id?: string,
  ) {
  }
}
