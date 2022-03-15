

export class Costeo {

  constructor(
    public claveProd: string,
    public descripcion: string,
    public cantidad: number,
    public costoxUnidad: number,
    public unidadMedida: string,
    public importe: number,
    public _id?: string,
  ) {

  }
}
