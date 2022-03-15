import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../modelos/categoria.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators/';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoria: Categoria | undefined;
  token = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }


  //*************************************************************/
  //**              OBTENER TODAS LAS CATEGORIAS             **//
  //************************************************************/
  getCategorias() {
    // localhost:3000/categorias/activas
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/categorias';
    //console.log(url);
    return this.http.get(url);
  }



  //*************************************************************/
  //**              BUSCAR CATEGORIAS                         **//
  //************************************************************/
  buscarCategorias(termino: string) {
    // localhost:3000/busqueda/coleccion/materias/co
    // const URL_SERVICIOS = 'http://localhost:3000';
    let url = URL_SERVICIOS + '/busqueda/coleccion/categorias/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        console.log(resp);
        return resp.categorias;
      }));

  }


  // MARCA LAS CATEGORIAS COMO NO ACTIVAS
  // //*************************************************************/
  // //**              ELIMINAR CATEGORIAS                       **//
  // //************************************************************/
  // //**localhost:3000/categorias/borrar/619fd26470c98fd75c7c128e?token=   */
  // eliminarCategorias(id: string) {
  //   let url = URL_SERVICIOS + '/categorias/borrar/' + id;
  //   // console.log(this.token);
  //   url += '?token=' + this._usuarioService.token;
  //   console.log(url);
  //   return this.http.put(url, id);

  // }


  // //*************************************************************/
  // //**              ELIMINAR CATEGORIAS                       **//
  // //************************************************************/
  // //**localhost:3000/categorias/619fd26470c98fd75c7c128e?token=   */
  eliminarCategorias(id: string) {
    let url = URL_SERVICIOS + '/categorias/' + id;
    // console.log(this.token);
    url += '?token=' + this._usuarioService.token;
    console.log(url);
    return this.http.delete(url);

  }



  //*************************************************************/
  //**              CREAR CATEGORIAS                          **//
  //************************************************************/
  //**localhost:3000/categorias/619fd26470c98fd75c7c128e?token=   */
  crearCategorias(descripcion: string) {
    let url = URL_SERVICIOS + '/categorias?token=';
    url += this._usuarioService.token;
    // console.log(this.token);
    // console.log(url);
    return this.http.post(url, { descripcion: descripcion })
      .pipe(map((res: any) => {
        // console.log(res);
        return res.categoria;
      })
      );
    ;

  }



}
