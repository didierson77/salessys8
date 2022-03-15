import { Injectable } from '@angular/core';

import { Materia } from '../../modelos/materia.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Formula } from 'src/app/modelos/formula.model';



@Injectable({
  providedIn: 'root'
})
export class FormulacionService {
  formulacion: Formula = new Formula();
  token: string = '';

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }


  //*************************************************************/
  //**              CREAR MATERIA PRIMA                      **//
  //************************************************************/
  agregarMateria(materia: Formula) {

    //**    localhost:3000/formulacion?token=var   METODO POST*/

    let url = URL_SERVICIOS + '/formulacion?token=';
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
  //**localhost:3000/formulacion/619fd26470c98fd75c7c128e?token=   */
  eliminarMateria(id: string) {
    // console.log(id);
    let url = URL_SERVICIOS + '/formulacion/' + id;
    // console.log(this.token);
    url += '?token=' + this._usuarioService.token;
    // console.log(url);

    return this.http.delete(url);

  }


  //****************************************************************/
  //**  OBTENER TODAS MATERIAS PRIMAS DE UN PRODUCTO ESPECIFICO  **//
  //****************************************************************/
  getFormula(id: string) {
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/formulacion/' + id;
    // console.log(this._usuarioService.token);
    url += '?token=' + this._usuarioService.token;
    //console.log(url);
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          // console.log(resp);
          let formula = resp.formulacion;
          var arreglo: any = [];
          formula.every((elemento: any) => {
            let importe = 0;
            // if (elemento.matPrima.costoxUnidad) {
            importe = elemento.cantidad * elemento.matPrima!.costoxUnidad;
            // }
            // else {
            // importe = 0;
            // }
            arreglo.push({
              cantidad: elemento.cantidad,
              elemento: elemento.matPrima,
              importe: importe,
              idFormula: elemento._id,
            });
            return arreglo;
          })
          // console.log(arreglo);
          return arreglo;
        }))

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



