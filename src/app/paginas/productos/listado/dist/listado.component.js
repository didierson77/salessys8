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
exports.ListadoComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var ListadoComponent = /** @class */ (function () {
    function ListadoComponent(_productoService, router, document) {
        this._productoService = _productoService;
        this.router = router;
        this.document = document;
        this.productos = [];
        this.totalRegistros = 0;
        this.pagina = 1;
        this.ultima = 0;
        this.cargando = true;
    }
    ListadoComponent.prototype.ngOnInit = function () {
        this.cargarProductos();
        //console.log(this.ultima);
    };
    ListadoComponent.prototype.cargarProductos = function () {
        var _this = this;
        this.cargando = true;
        this._productoService.getProductos(0).subscribe(function (resp) {
            // console.log(resp);
            _this.totalRegistros = resp.Total;
            //console.log(resp.productos);
            _this.productos = resp.productos;
            _this.ultima = Math.trunc((_this.totalRegistros - 1) / 10);
            _this.cargando = false;
            // console.log(this.ultima);
        });
    };
    ListadoComponent.prototype.eliminarProducto = function (producto) {
        var _this = this;
        sweetalert2_1["default"]
            .fire({
            title: "Producto: " + producto.descripcion,
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        })
            .then(function (resultado) {
            if (resultado.value) {
                // Hicieron click en "Sí"
                _this._productoService.eliminarProducto(producto._id).subscribe(function (resp) {
                    // this.document.location.reload();
                    _this.cargarProductos();
                });
            }
        });
    };
    ListadoComponent.prototype.siguiente = function () {
        var _this = this;
        // console.log(this.pagina);
        // console.log(this.ultima);
        if (this.pagina <= this.ultima) {
            this.pagina = this.pagina + 1;
        }
        this._productoService.getProductos(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.Total;
            _this.productos = resp.productos;
        });
    };
    ListadoComponent.prototype.anterior = function () {
        var _this = this;
        //console.log(this.pagina);
        //console.log(this.ultima);
        if (this.pagina > 1) {
            this.pagina = this.pagina - 1;
        }
        this._productoService.getProductos(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.Total;
            _this.productos = resp.productos;
        });
    };
    ListadoComponent.prototype.buscar = function (termino) {
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
        this._productoService.buscarProductos(termino)
            .subscribe(function (respuesta) {
            _this.productos = respuesta;
            //console.log(respuesta);
            _this.cargando = false;
        });
    };
    ListadoComponent = __decorate([
        core_1.Component({
            selector: 'app-listado',
            templateUrl: './listado.component.html',
            styles: []
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], ListadoComponent);
    return ListadoComponent;
}());
exports.ListadoComponent = ListadoComponent;
