"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubProductoService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("src/app/config/config");
var operators_1 = require("rxjs/operators");
var SubProductoService = /** @class */ (function () {
    function SubProductoService(http, router, _usuarioService) {
        this.http = http;
        this.router = router;
        this._usuarioService = _usuarioService;
        this.token = '';
    }
    //*************************************************************/
    //**              CREAR SUBPRODUCTO                            **//
    //************************************************************/
    SubProductoService.prototype.agregarSubProducto = function (subproducto) {
        //**    localhost:3000/subproductos?token=var   METODO POST*/
        var url = config_1.URL_SERVICIOS + '/subproductos?token=';
        url += this._usuarioService.token;
        return this.http.post(url, subproducto);
    };
    //*************************************************************/
    //**              ACTUALIZAR SUBPRODUCTO                       **//
    //************************************************************/
    //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
    SubProductoService.prototype.actualizarSubProducto = function (subproducto) {
        var url = config_1.URL_SERVICIOS + '/subproductos/' + subproducto._id;
        //console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        //console.log(url);
        return this.http.put(url, subproducto);
    };
    //*************************************************************/
    //**              ELIMINAR SUBPRODUCTO                         **//
    //************************************************************/
    //**localhost:3000/subproducto/619fd26470c98fd75c7c128e?token=   */
    SubProductoService.prototype.eliminarSubProducto = function (id) {
        var url = config_1.URL_SERVICIOS + '/subproductos/' + id;
        console.log(this.token);
        // url += '?token=' + this._usuarioService.token;
        console.log(url);
        return this.http["delete"](url);
    };
    //*************************************************************/
    //**              OBTENER TODOS LOS SUBPRODUCTOS            **//
    //************************************************************/
    SubProductoService.prototype.getSubProductos = function (pagina) {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/subproductos?pagina=' + pagina;
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              OBTENER SUBPRODUCTO                          **//
    //************************************************************/
    SubProductoService.prototype.getSubProductoEspecif = function (id) {
        var url = config_1.URL_SERVICIOS + '/subproductos/' + id;
        return this.http.get(url);
    };
    //*************************************************************/
    //**              BUSCAR SUBPRODUCTO                           **//
    //************************************************************/
    // localhost:3000/busqueda/coleccion/producto/ca
    SubProductoService.prototype.buscarSubProductos = function (termino) {
        // const URL_SERVICIOS = 'http://localhost:3000';
        var url = config_1.URL_SERVICIOS + '/busqueda/coleccion/subproducto/' + termino;
        return this.http.get(url)
            .pipe(operators_1.map(function (resp) {
            console.log(resp);
            return resp.subproducto;
        }));
    };
    SubProductoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SubProductoService);
    return SubProductoService;
}());
exports.SubProductoService = SubProductoService;
