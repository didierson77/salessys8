"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductoService = void 0;
var config_1 = require("src/app/config/config");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var ProductoService = /** @class */ (function () {
    function ProductoService(http, router, _usuarioService) {
        this.http = http;
        this.router = router;
        this._usuarioService = _usuarioService;
        this.token = '';
    }
    //*************************************************************/
    //**              CREAR PRODUCTO                            **//
    //************************************************************/
    ProductoService.prototype.agregarProducto = function (producto) {
        //**    localhost:3000/productos?token=var   METODO POST*/
        var url = config_1.URL_SERVICIOS + '/productos?token=';
        url += this._usuarioService.token;
        return this.http.post(url, producto);
    };
    //*************************************************************/
    //**              ACTUALIZAR PRODUCTO                       **//
    //************************************************************/
    //**localhost:3000/productos/619fd26470c98fd75c7c128e?token=   */
    ProductoService.prototype.actualizarProducto = function (producto) {
        var url = config_1.URL_SERVICIOS + '/productos/' + producto._id;
        //console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        //console.log(url);
        return this.http.put(url, producto);
    };
    //*************************************************************/
    //**              ACTUALIZAR COSTO DEL PRODUCTO          **//
    //**********************************************************/
    //**localhost:3000/productos/costo/619fd26470c98fd75c7c128e?token=   */
    ProductoService.prototype.actualizarCosto = function (idProd, costo) {
        var url = config_1.URL_SERVICIOS + '/productos/costo/' + idProd;
        // console.log(idProd);
        // console.log(costo);
        url += '?token=' + this._usuarioService.token;
        //console.log(url);
        // return this.http.put(url, costo);
        return this.http.put(url, { 'costo': costo });
    };
    //*************************************************************/
    //**              AGREGAR MANO DE OBRA A PRODUCTO          **//
    //**********************************************************/
    //**localhost:3000/productos/costo/619fd26470c98fd75c7c128e?token=   */
    ProductoService.prototype.manoObra = function (idProd, manoObra) {
        var url = config_1.URL_SERVICIOS + '/productos/manoObra/' + idProd;
        // console.log(idProd);
        // console.log(costo);
        url += '?token=' + this._usuarioService.token;
        //console.log(url);
        // return this.http.put(url, costo);
        return this.http.put(url, { 'manoObra': manoObra });
    };
    //*************************************************************/
    //**              ELIMINAR PRODUCTO                         **//
    //************************************************************/
    //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
    ProductoService.prototype.eliminarProducto = function (id) {
        var url = config_1.URL_SERVICIOS + '/productos/' + id;
        console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        console.log(url);
        return this.http["delete"](url);
    };
    //*************************************************************/
    //**              OBTENER TODOS LOS PRODUCTOS               **//
    //************************************************************/
    ProductoService.prototype.getProductos = function (pagina) {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/productos?pagina=' + pagina;
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              OBTENER PRODUCTO                          **//
    //************************************************************/
    ProductoService.prototype.getProductoEspecif = function (id) {
        var url = config_1.URL_SERVICIOS + '/productos/' + id;
        return this.http.get(url);
    };
    //*************************************************************/
    //**              BUSCAR PRODUCTO                           **//
    //************************************************************/
    // localhost:3000/busqueda/coleccion/producto/ca
    ProductoService.prototype.buscarProductos = function (termino) {
        // const URL_SERVICIOS = 'http://localhost:3000';
        var url = config_1.URL_SERVICIOS + '/busqueda/coleccion/producto/' + termino;
        return this.http.get(url)
            .pipe(operators_1.map(function (resp) {
            console.log(resp);
            return resp.producto;
        }));
    };
    ProductoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductoService);
    return ProductoService;
}());
exports.ProductoService = ProductoService;
