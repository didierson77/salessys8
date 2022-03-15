import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { SubProducto } from '../../modelos/subproducto.model';


@Injectable({
  providedIn: 'root'
})
export class SubProductoService {

  producto: SubProducto | undefined;
  token: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }



  //*************************************************************/
  //**              CREAR SUBPRODUCTO                            **//
  //************************************************************/
  agregarSubProducto(subproducto: SubProducto) {

    //**    localhost:3000/subproductos?token=var   METODO POST*/

    let url = URL_SERVICIOS + '/subproductos?token=';
    url += this._usuarioService.token;
    return this.http.post(url, subproducto);

  }


  //*************************************************************/
  //**              ACTUALIZAR SUBPRODUCTO                       **//
  //************************************************************/
  //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
  actualizarSubProducto(subproducto: SubProducto) {
    let url = URL_SERVICIOS + '/subproductos/' + subproducto._id;
    //console.log(this.token);
    url += '?token=' + this._usuarioService.token;
    //console.log(url);
    return this.http.put(url, subproducto);
  }


  //*************************************************************/
  //**              ELIMINAR SUBPRODUCTO                         **//
  //************************************************************/
  //**localhost:3000/subproducto/619fd26470c98fd75c7c128e?token=   */
  eliminarSubProducto(id: string) {
    let url = URL_SERVICIOS + '/subproductos/' + id;
    console.log(this.token);
    // url += '?token=' + this._usuarioService.token;
    console.log(url);
    return this.http.delete(url);

  }



  //*************************************************************/
  //**              OBTENER TODOS LOS SUBPRODUCTOS            **//
  //************************************************************/
  getSubProductos(pagina: number) {
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/subproductos?pagina=' + pagina;
    //console.log(url);
    return this.http.get(url);
  }



  //*************************************************************/
  //**              OBTENER SUBPRODUCTO                          **//
  //************************************************************/
  getSubProductoEspecif(id: string) {
    let url = URL_SERVICIOS + '/subproductos/' + id;
    return this.http.get(url);
  }



  //*************************************************************/
  //**              BUSCAR SUBPRODUCTO                           **//
  //************************************************************/
  // localhost:3000/busqueda/coleccion/producto/ca
  buscarSubProductos(termino: string) {
    // const URL_SERVICIOS = 'http://localhost:3000';
    let url = URL_SERVICIOS + '/busqueda/coleccion/subproducto/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        console.log(resp);
        return resp.subproducto;
      }));
  }


}

