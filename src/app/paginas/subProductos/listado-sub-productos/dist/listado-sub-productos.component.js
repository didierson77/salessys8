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
exports.ListadoSubProductosComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var ListadoSubProductosComponent = /** @class */ (function () {
    function ListadoSubProductosComponent(_subProductoService, router, document) {
        this._subProductoService = _subProductoService;
        this.router = router;
        this.document = document;
        this.subProductos = [];
        this.totalRegistros = 0;
        this.pagina = 1;
        this.ultima = 0;
        this.cargando = true;
    }
    ListadoSubProductosComponent.prototype.ngOnInit = function () {
        this.cargarProductos();
    };
    ListadoSubProductosComponent.prototype.cargarProductos = function () {
        var _this = this;
        this.cargando = true;
        this._subProductoService.getSubProductos(0).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.Total;
            //console.log(resp.productos);
            _this.subProductos = resp.subProductos;
            console.log(_this.subProductos);
            _this.ultima = Math.trunc((_this.totalRegistros - 1) / 10);
            _this.cargando = false;
            //console.log(this.ultima);
        });
    };
    ListadoSubProductosComponent.prototype.eliminarSubProducto = function (subProducto) {
        var _this = this;
        // console.log('Eliminar');
        console.log(subProducto);
        console.log(subProducto._id);
        sweetalert2_1["default"]
            .fire({
            title: "Producto: " + subProducto.descripcion,
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        })
            .then(function (resultado) {
            if (resultado.value) {
                // Hicieron click en "Sí"
                _this._subProductoService.eliminarSubProducto(subProducto._id).subscribe(function (resp) {
                    // this.document.location.reload();
                    _this.cargarProductos();
                });
            }
        });
    };
    ListadoSubProductosComponent.prototype.siguiente = function () {
        var _this = this;
        // console.log(this.pagina);
        // console.log(this.ultima);
        if (this.pagina <= this.ultima) {
            this.pagina = this.pagina + 1;
        }
        this._subProductoService.getSubProductos(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.Total;
            _this.subProductos = resp.productos;
        });
    };
    ListadoSubProductosComponent.prototype.anterior = function () {
        var _this = this;
        //console.log(this.pagina);
        //console.log(this.ultima);
        if (this.pagina > 1) {
            this.pagina = this.pagina - 1;
        }
        this._subProductoService.getSubProductos(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.Total;
            _this.subProductos = resp.productos;
        });
    };
    ListadoSubProductosComponent.prototype.buscar = function (termino) {
        var _this = this;
        if (termino.length == 0) {
            //console.log('cero');
            //this.cargarProductos();
            return;
        }
        if (termino.length <= 1) {
            //console.log('menor a uno');
            this.cargarProductos();
            return;
        }
        this.cargando = true;
        //console.log(termino);
        this._subProductoService.buscarSubProductos(termino)
            .subscribe(function (respuesta) {
            _this.subProductos = respuesta;
            //console.log(respuesta);
            _this.cargando = false;
        });
    };
    ListadoSubProductosComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-sub-productos',
            templateUrl: './listado-sub-productos.component.html',
            styles: []
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], ListadoSubProductosComponent);
    return ListadoSubProductosComponent;
}());
exports.ListadoSubProductosComponent = ListadoSubProductosComponent;
