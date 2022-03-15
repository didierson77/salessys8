"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormulacionService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("src/app/config/config");
var operators_1 = require("rxjs/operators");
var formula_model_1 = require("src/app/modelos/formula.model");
var FormulacionService = /** @class */ (function () {
    function FormulacionService(http, router, _usuarioService) {
        this.http = http;
        this.router = router;
        this._usuarioService = _usuarioService;
        this.formulacion = new formula_model_1.Formula();
        this.token = '';
        this.token = this._usuarioService.token;
    }
    //*************************************************************/
    //**              CREAR MATERIA PRIMA                      **//
    //************************************************************/
    FormulacionService.prototype.agregarMateria = function (materia) {
        //**    localhost:3000/formulacion?token=var   METODO POST*/
        var url = config_1.URL_SERVICIOS + '/formulacion?token=';
        url += this._usuarioService.token;
        return this.http.post(url, materia);
    };
    //*************************************************************/
    //**              ACTUALIZAR MATERIA PRIMA                  **//
    //************************************************************/
    //**localhost:3000/materias/619fd26470c98fd75c7c128e?token=   */
    FormulacionService.prototype.actualizarMateria = function (materia) {
        var url = config_1.URL_SERVICIOS + '/materias/' + materia._id;
        //console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        //console.log(url);
        return this.http.put(url, materia);
    };
    //*************************************************************/
    //**              ELIMINAR MATERIA PRIMA                    **//
    //************************************************************/
    //**localhost:3000/formulacion/619fd26470c98fd75c7c128e?token=   */
    FormulacionService.prototype.eliminarMateria = function (id) {
        // console.log(id);
        var url = config_1.URL_SERVICIOS + '/formulacion/' + id;
        // console.log(this.token);
        url += '?token=' + this._usuarioService.token;
        // console.log(url);
        return this.http["delete"](url);
    };
    //****************************************************************/
    //**  OBTENER TODAS MATERIAS PRIMAS DE UN PRODUCTO ESPECIFICO  **//
    //****************************************************************/
    FormulacionService.prototype.getFormula = function (id) {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/formulacion/' + id;
        // console.log(this._usuarioService.token);
        url += '?token=' + this._usuarioService.token;
        //console.log(url);
        return this.http.get(url)
            .pipe(operators_1.map(function (resp) {
            // console.log(resp);
            var formula = resp.formulacion;
            var arreglo = [];
            formula.every(function (elemento) {
                var importe = 0;
                // if (elemento.matPrima.costoxUnidad) {
                importe = elemento.cantidad * elemento.matPrima.costoxUnidad;
                // }
                // else {
                // importe = 0;
                // }
                arreglo.push({
                    cantidad: elemento.cantidad,
                    elemento: elemento.matPrima,
                    importe: importe,
                    idFormula: elemento._id
                });
                return arreglo;
            });
            // console.log(arreglo);
            return arreglo;
        }));
    };
    //*************************************************************/
    //**              OBTENER TODAS MATERIAS PRIMA              **//
    //************************************************************/
    FormulacionService.prototype.getMaterias = function (pagina) {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/materias?pagina=' + pagina;
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              OBTENER TODAS MATERIAS PRIMA              **//
    //************************************************************/
    FormulacionService.prototype.getMateriasCosteo = function () {
        // let paginaReal = pagina - 1;
        //console.log(pagina);
        var url = config_1.URL_SERVICIOS + '/materias/costeo';
        //console.log(url);
        return this.http.get(url);
    };
    //*************************************************************/
    //**              OBTENER MATERIA PRIMA                      **//
    //************************************************************/
    FormulacionService.prototype.getMateriaEspecif = function (id) {
        var url = config_1.URL_SERVICIOS + '/materias/' + id;
        return this.http.get(url);
    };
    //*************************************************************/
    //**              BUSCAR MATERIA PRIMA                      **//
    //************************************************************/
    FormulacionService.prototype.buscarMaterias = function (termino) {
        // localhost:3000/busqueda/coleccion/materias/co
        // const URL_SERVICIOS = 'http://localhost:3000';
        var url = config_1.URL_SERVICIOS + '/busqueda/coleccion/materias/' + termino;
        return this.http.get(url)
            .pipe(operators_1.map(function (resp) {
            console.log(resp);
            return resp.materias;
        }));
    };
    FormulacionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FormulacionService);
    return FormulacionService;
}());
exports.FormulacionService = FormulacionService;
