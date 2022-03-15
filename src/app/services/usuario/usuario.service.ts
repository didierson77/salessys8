import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  usuario: Usuario = {
    nombre: '',
    email: '',
    password: '',
    role: 'USER',
  };
  token: string = '';


  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    // console.log('Servicio Usuario, Listo')
  }


  //************************************************************/
  //**              INICIAR SESION                          **//
  //***********************************************************/
  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    }
    else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        // console.log(resp);
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('token', JSON.stringify(resp.usuario));
        return true;
      }
      ));
  }

  //************************************************************/
  //**              CERRAR SESION                           **//
  //***********************************************************/
  logout() {
    this.usuario = {
      nombre: '',
      email: '',
      password: '',
      role: 'USER',
    };

    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  //*************************************************************/
  //**            guarda la informacion en el LocalStorage    **//
  //************************************************************/
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }



  //*************************************************************/
  //**              VERIFICAR SI ESTA LOGUEDO, PARA EL GUARD  **//
  //************************************************************/
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  //*************************************************************/
  //**              CARGAR DEL STORAGE                        **//
  //************************************************************/
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') || '';
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
    }
    else {
      this.token = '';
      this.usuario = {
        nombre: '',
        email: '',
        password: '',
        role: 'USER',
      };
    }
  }


  //*************************************************************/
  //**              CREAR USUARIO                             **//
  //************************************************************/

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    //se manda el usuario y se recibe en el body
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire({
            title: 'Usuario Creado',
            text: usuario.email,
            icon: 'success',
            confirmButtonColor: "#288cf3",
          });

          return resp.usuario;
        }));
  }


  //*************************************************************/
  //**              ELIMINAR USUARIOS                        **//
  //************************************************************/
  //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
  eliminarUsuarios(id: string) {
    let url = URL_SERVICIOS + '/usuarios/' + id;
    console.log(this.token);
    url += '?token=' + this.token;
    console.log(url);
    return this.http.delete(url);

  }





  //*************************************************************/
  //**              OBTENER LOS USUARIOS                      **//
  //************************************************************/
  // localhost:3000/usuario
  getUsuarios(pagina: number) {
    // let paginaReal = pagina - 1;
    //console.log(pagina);
    let url = URL_SERVICIOS + '/usuario?pagina=' + pagina;
    //console.log(url);
    return this.http.get(url);
  }




  //*************************************************************/
  //**              BUSCAR USUARIOS                           **//
  //************************************************************/
  buscarUsuarios(termino: string) {
    // localhost:3000/busqueda/coleccion/materias/co
    // const URL_SERVICIOS = 'http://localhost:3000';
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => {
        console.log(resp);
        return resp.usuario;
      }));

  }



}
