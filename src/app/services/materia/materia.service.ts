import { Injectable } from '@angular/core';
import { Materia } from '../../modelos/materia.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MateriaService {

  materia: Materia | undefined;
  token: string = '';

  constructor(public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService

  ) {

  }




  //*************************************************************/
  //**              CREAR MATERIA PRIMA                      **//
  //************************************************************/
  agregarMateria(materia: Materia) {

    //**    localhost:3000/materias?token=var   METODO POST*/

    let url = URL_SERVICIOS + '/materias?token=';
    url += this._usuarioService.token;
    return this.http.post(url, materia);

  }


  //*************************************************************/
  //**              ACTUALIZAR MATERIA PRIMA                  **//
  //************************************************************/
  //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
  actualizarMateria(materia: Materia) {
    let url = URL_SERVICIOS + '/materias/' + materia._id;
    //console.log(this.token);
    url += '?token=' + this._usuarioService.token;
    //console.log(url);
    return this.http.put(url, materia);
  }


  //*************************************************************/
  //**              ELIMINAR MATERIA PRIMA                    **//
  //************************************************************/
  //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
  eliminarMaterias(id: string) {
    let url = URL_SERVICIOS + '/materias/' + id;
    console.log(this.token);
    url += '?token=' + this._usuarioService.token;
    console.log(url);

    return this.http.delete(url);

  }


  //*************************************************************/
  //**              OBTENER TODAS MATERIAS PRIMA              **//
  //************************************************************/
  getTodasMaterias() {
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/materias/todas';
    //console.log(url);
    return this.http.get(url);
  }






  //*************************************************************/
  //**              OBTENER TODAS MATERIAS PRIMA              **//
  //************************************************************/
  getMaterias(pagina: number) {
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/materias?pagina=' + pagina;
    //console.log(url);
    return this.http.get(url);
  }


  //*************************************************************/
  //**              OBTENER TODAS MATERIAS PRIMA              **//
  //************************************************************/
  getMateriasCosteo() {
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/materias/costeo';
    //console.log(url);
    return this.http.get(url);
  }




  //*************************************************************/
  //**              OBTENER MATERIA PRIMA                      **//
  //************************************************************/
  getMateriaEspecif(id: string) {
    let url = URL_SERVICIOS + '/materias/' + id;
    return this.http.get(url);
  }


  //*************************************************************/
  //**              BUSCAR MATERIA PRIMA                      **//
  //************************************************************/
  buscarMaterias(termino: string) {
    // localhost:3000/busqueda/coleccion/materias/co
    // const URL_SERVICIOS = 'http://localhost:3000';
    let url = URL_SERVICIOS + '/busqueda/coleccion/materias/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        console.log(resp);
        return resp.materias;
      }));

  }



}
