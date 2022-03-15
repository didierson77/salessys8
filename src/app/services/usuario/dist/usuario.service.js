"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuarioService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../../config/config");
var operators_1 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, router) {
        this.http = http;
        this.router = router;
        this.usuario = {
            nombre: '',
            email: '',
            password: '',
            role: 'USER'
        };
        this.token = '';
        // console.log('Servicio Usuario, Listo')
    }
    //************************************************************/
    //**              INICIAR SESION                          **//
    //***********************************************************/
    UsuarioService.prototype.login = function (usuario, recordar) {
        var _this = this;
        if (recordar === void 0) { recordar = false; }
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        }
        else {
            localStorage.removeItem('email');
        }
        var url = config_1.URL_SERVICIOS + '/login';
        return this.http.post(url, usuario)
            .pipe(operators_1.map(function (resp) {
            _this.guardarStorage(resp.id, resp.token, resp.usuario);
            // console.log(resp);
            // localStorage.setItem('id', resp.id);
            // localStorage.setItem('token', resp.token);
            // localStorage.setItem('token', JSON.stringify(resp.usuario));
            return true;
        }));
    };
    //************************************************************/
    //**              CERRAR SESION                           **//
    //***********************************************************/
    UsuarioService.prototype.logout = function () {
        this.usuario = {
            nombre: '',
            email: '',
            password: '',
            role: 'USER'
        };
        this.token = '';
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
    };
    //*************************************************************/
    //**            guarda la informacion en el LocalStorage    **//
    //************************************************************/
    UsuarioService.prototype.guardarStorage = function (id, token, usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario = usuario;
        this.token = token;
    };
    //*************************************************************/
    //**              VERIFICAR SI ESTA LOGUEDO, PARA EL GUARD  **//
    //************************************************************/
    UsuarioService.prototype.estaLogueado = function () {
        return (this.token.length > 5) ? true : false;
    };
    //*************************************************************/
    //**              CARGAR DEL STORAGE                        **//
    //************************************************************/
    UsuarioService.prototype.cargarStorage = function () {
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
                role: 'USER'
            };
        }
    };
    //*************************************************************/
    //**              CREAR USUARIO                             **//
    //************************************************************/
    UsuarioService.prototype.crearUsuario = function (usuario) {
        var url = config_1.URL_SERVICIOS + '/usuario';
        //se manda el usuario y se recibe en el body
        return this.http.post(url, usuario)
            .pipe(operators_1.map(function (resp) {
            sweetalert2_1["default"].fire({
                title: 'Usuario Creado',
                text: usuario.email,
                icon: 'success',
                confirmButtonColor: "#288cf3"
            });
            return resp.usuario;
        }));
    };
    //*************************************************************/
    //**              ELIMINAR USUARIOS                        **//
    //************************************************************/
    //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
    UsuarioService.prototype.eliminarUsuarios = function (id) {
        var url = config_1.URL_SERVICIOS + '/usuarios/' + id;
        console.log(this.token);
        url += '?token=' + this.token;
        console.log(url);
        return this.http["delete"](url);
    };
    //*************************************************************/
    //**              OBTENER LOS USUARIOS                      **//
    //************************************************************/
    // localhost:3000/usuario
    UsuarioService.prototype.getUsuarios = function (pagina) {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/usuario?pagina=' + pagina;
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              BUSCAR USUARIOS                           **//
    //************************************************************/
    UsuarioService.prototype.buscarUsuarios = function (termino) {
        // localhost:3000/busqueda/coleccion/materias/co
        // const URL_SERVICIOS = 'http://localhost:3000';
        var url = config_1.URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
        return this.http.get(url)
            .pipe(operators_1.map(function (resp) {
            console.log(resp);
            return resp.usuario;
        }));
    };
    UsuarioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuarioService);
    return UsuarioService;
}());
exports.UsuarioService = UsuarioService;
