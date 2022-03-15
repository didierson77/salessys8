"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriaService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("src/app/config/config");
var operators_1 = require("rxjs/operators/");
var CategoriaService = /** @class */ (function () {
    function CategoriaService(http, router, _usuarioService) {
        this.http = http;
        this.router = router;
        this._usuarioService = _usuarioService;
        this.token = '';
    }
    //*************************************************************/
    //**              OBTENER TODAS LAS CATEGORIAS             **//
    //************************************************************/
    CategoriaService.prototype.getCategorias = function () {
        // localhost:3000/categorias/activas
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/categorias';
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              BUSCAR CATEGORIAS                         **//
    //************************************************************/
    CategoriaService.prototype.buscarCategorias = function (termino) {
        // localhost:3000/busqueda/coleccion/materias/co
        // const URL_SERVICIOS = 'http://localhost:3000';
        var url = config_1.URL_SERVICIOS + '/busqueda/coleccion/categorias/' + termino;
        return this.http.get(url)
            .pipe(operators_1.map(function (resp) {
            console.log(resp);
            return resp.categorias;
        }));
    };
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
    CategoriaService.prototype.eliminarCategorias = function (id) {
        var url = config_1.URL_SERVICIOS + '/categorias/' + id;
        // console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        console.log(url);
        return this.http["delete"](url);
    };
    //*************************************************************/
    //**              CREAR CATEGORIAS                          **//
    //************************************************************/
    //**localhost:3000/categorias/619fd26470c98fd75c7c128e?token=   */
    CategoriaService.prototype.crearCategorias = function (descripcion) {
        var url = config_1.URL_SERVICIOS + '/categorias?token=';
        url += this._usuarioService.token;
        // console.log(this.token);
        // console.log(url);
        return this.http.post(url, { descripcion: descripcion })
            .pipe(operators_1.map(function (res) {
            // console.log(res);
            return res.categoria;
        }));
        ;
    };
    CategoriaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CategoriaService);
    return CategoriaService;
}());
exports.CategoriaService = CategoriaService;
