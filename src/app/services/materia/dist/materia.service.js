"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MateriaService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("src/app/config/config");
var operators_1 = require("rxjs/operators");
var MateriaService = /** @class */ (function () {
    function MateriaService(http, router, _usuarioService) {
        this.http = http;
        this.router = router;
        this._usuarioService = _usuarioService;
        this.token = '';
    }
    //*************************************************************/
    //**              CREAR MATERIA PRIMA                      **//
    //************************************************************/
    MateriaService.prototype.agregarMateria = function (materia) {
        //**    localhost:3000/materias?token=var   METODO POST*/
        var url = config_1.URL_SERVICIOS + '/materias?token=';
        url += this._usuarioService.token;
        return this.http.post(url, materia);
    };
    //*************************************************************/
    //**              ACTUALIZAR MATERIA PRIMA                  **//
    //************************************************************/
    //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
    MateriaService.prototype.actualizarMateria = function (materia) {
        var url = config_1.URL_SERVICIOS + '/materias/' + materia._id;
        //console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        //console.log(url);
        return this.http.put(url, materia);
    };
    //*************************************************************/
    //**              ELIMINAR MATERIA PRIMA                    **//
    //************************************************************/
    //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
    MateriaService.prototype.eliminarMaterias = function (id) {
        var url = config_1.URL_SERVICIOS + '/materias/' + id;
        console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        console.log(url);
        return this.http["delete"](url);
    };
    //*************************************************************/
    //**              OBTENER TODAS MATERIAS PRIMA              **//
    //************************************************************/
    MateriaService.prototype.getTodasMaterias = function () {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/materias/todas';
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              OBTENER TODAS MATERIAS PRIMA              **//
    //************************************************************/
    MateriaService.prototype.getMaterias = function (pagina) {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/materias?pagina=' + pagina;
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              OBTENER TODAS MATERIAS PRIMA              **//
    //************************************************************/
    MateriaService.prototype.getMateriasCosteo = function () {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/materias/costeo';
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              OBTENER MATERIA PRIMA                      **//
    //************************************************************/
    MateriaService.prototype.getMateriaEspecif = function (id) {
        var url = config_1.URL_SERVICIOS + '/materias/' + id;
        return this.http.get(url);
    };
    //*************************************************************/
    //**              BUSCAR MATERIA PRIMA                      **//
    //************************************************************/
    MateriaService.prototype.buscarMaterias = function (termino) {
        // localhost:3000/busqueda/coleccion/materias/co
        // const URL_SERVICIOS = 'http://localhost:3000';
        var url = config_1.URL_SERVICIOS + '/busqueda/coleccion/materias/' + termino;
        return this.http.get(url)
            .pipe(operators_1.map(function (resp) {
            console.log(resp);
            return resp.materias;
        }));
    };
    MateriaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MateriaService);
    return MateriaService;
}());
exports.MateriaService = MateriaService;
