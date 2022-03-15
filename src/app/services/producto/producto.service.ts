import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Producto } from '../../modelos/producto.model';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  producto: Producto | undefined;
  token: string = '';

  constructor(public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }



  //*************************************************************/
  //**              CREAR PRODUCTO                            **//
  //************************************************************/
  agregarProducto(producto: Producto) {
    //**    localhost:3000/productos?token=var   METODO POST*/
    let url = URL_SERVICIOS + '/productos?token=';
    url += this._usuarioService.token;
    return this.http.post(url, producto);

  }


  //*************************************************************/
  //**              ACTUALIZAR PRODUCTO                       **//
  //************************************************************/
  //**localhost:3000/productos/619fd26470c98fd75c7c128e?token=   */
  actualizarProducto(producto: Producto) {
    let url = URL_SERVICIOS + '/productos/' + producto._id;
    //console.log(this.token);
    url += '?token=' + this._usuarioService.token;
    //console.log(url);
    return this.http.put(url, producto);
  }


  //*************************************************************/
  //**              ACTUALIZAR COSTO DEL PRODUCTO          **//
  //**********************************************************/
  //**localhost:3000/productos/costo/619fd26470c98fd75c7c128e?token=   */
  actualizarCosto(idProd: string, costo: number) {
    let url = URL_SERVICIOS + '/productos/costo/' + idProd;
    // console.log(idProd);
    // console.log(costo);
    url += '?token=' + this._usuarioService.token;
    //console.log(url);
    // return this.http.put(url, costo);
    return this.http.put(url, { 'costo': costo });
  }



  //*************************************************************/
  //**              AGREGAR MANO DE OBRA A PRODUCTO          **//
  //**********************************************************/
  //**localhost:3000/productos/costo/619fd26470c98fd75c7c128e?token=   */
  manoObra(idProd: string, manoObra: number | undefined) {
    let url = URL_SERVICIOS + '/productos/manoObra/' + idProd;
    // console.log(idProd);
    // console.log(costo);
    url += '?token=' + this._usuarioService.token;
    //console.log(url);
    // return this.http.put(url, costo);
    return this.http.put(url, { 'manoObra': manoObra });
  }


  //*************************************************************/
  //**              ELIMINAR PRODUCTO                         **//
  //************************************************************/
  //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
  eliminarProducto(id: string) {
    let url = URL_SERVICIOS + '/productos/' + id;
    console.log(this.token);
    url += '?token=' + this._usuarioService.token;
    console.log(url);
    return this.http.delete(url);

  }




  //*************************************************************/
  //**              OBTENER TODOS LOS PRODUCTOS               **//
  //************************************************************/
  getProductos(pagina: number) {
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/productos?pagina=' + pagina;
    //console.log(url);
    return this.http.get(url);
  }



  //*************************************************************/
  //**              OBTENER PRODUCTO                          **//
  //************************************************************/
  getProductoEspecif(id: string) {
    let url = URL_SERVICIOS + '/productos/' + id;
    return this.http.get(url);
  }



  //*************************************************************/
  //**              BUSCAR PRODUCTO                           **//
  //************************************************************/
  // localhost:3000/busqueda/coleccion/producto/ca
  buscarProductos(termino: string) {
    // const URL_SERVICIOS = 'http://localhost:3000';
    let url = URL_SERVICIOS + '/busqueda/coleccion/producto/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        console.log(resp);
        return resp.producto;
      }));
  }



}
