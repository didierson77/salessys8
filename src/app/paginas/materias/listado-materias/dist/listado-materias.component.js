"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ListadoMateriasComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var common_1 = require("@angular/common");
var ListadoMateriasComponent = /** @class */ (function () {
    function ListadoMateriasComponent(_materiasService, _productoService, router, document) {
        this._materiasService = _materiasService;
        this._productoService = _productoService;
        this.router = router;
        this.document = document;
        this.materias = [];
        this.subProductos = [];
        this.totalRegistros = 0;
        this.pagina = 1;
        this.ultima = 0;
        this.cargando = true;
    }
    ListadoMateriasComponent.prototype.ngOnInit = function () {
        this.cargarMaterias();
        // this._productoService.getProductos(0).subscribe((resp) => {
        // this.subProductos
        // console.log(resp.productos);
        // });
        //console.log(this.ultima);
    };
    ListadoMateriasComponent.prototype.cargarMaterias = function () {
        var _this = this;
        this.cargando = true;
        this._materiasService.getMaterias(0).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.total;
            // console.log(resp.total);
            _this.materias = resp.materias;
            _this.ultima = Math.trunc((_this.totalRegistros - 1) / 10);
            _this.cargando = false;
            // console.log(this.ultima);
        });
    };
    ListadoMateriasComponent.prototype.eliminarMateria = function (materia) {
        var _this = this;
        sweetalert2_1["default"]
            .fire({
            title: "Materia prima: " + materia.descripcion,
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        })
            .then(function (resultado) {
            if (resultado.value) {
                // Hicieron click en "Sí"
                _this._materiasService.eliminarMaterias(materia._id).subscribe(function (resp) {
                    // this.document.location.reload();
                    _this.cargarMaterias();
                });
            }
        });
    };
    ListadoMateriasComponent.prototype.siguiente = function () {
        var _this = this;
        // console.log(this.pagina);
        // console.log(this.ultima);
        if (this.pagina <= this.ultima) {
            this.pagina = this.pagina + 1;
        }
        this._materiasService.getMaterias(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.total;
            _this.materias = resp.materias;
        });
    };
    ListadoMateriasComponent.prototype.anterior = function () {
        var _this = this;
        // console.log(this.pagina);
        // console.log(this.ultima);
        if (this.pagina > 1) {
            this.pagina = this.pagina - 1;
        }
        this._materiasService.getMaterias(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.total;
            _this.materias = resp.materias;
        });
    };
    ListadoMateriasComponent.prototype.buscar = function (termino) {
        var _this = this;
        if (termino.length == 0) {
            return;
        }
        if (termino.length < 1) {
            this.cargarMaterias();
            return;
        }
        this.cargando = true;
        console.log(termino);
        this._materiasService.buscarMaterias(termino)
            .subscribe(function (respuesta) {
            _this.materias = respuesta;
            console.log(respuesta);
            _this.cargando = false;
        });
    };
    ListadoMateriasComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-materias',
            templateUrl: './listado-materias.component.html',
            styles: []
        }),
        __param(3, core_1.Inject(common_1.DOCUMENT))
    ], ListadoMateriasComponent);
    return ListadoMateriasComponent;
}());
exports.ListadoMateriasComponent = ListadoMateriasComponent;
