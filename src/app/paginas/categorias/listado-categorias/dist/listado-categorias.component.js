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
exports.ListadoCategoriasComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var common_1 = require("@angular/common");
var ListadoCategoriasComponent = /** @class */ (function () {
    function ListadoCategoriasComponent(_categoriaService, router, document) {
        this._categoriaService = _categoriaService;
        this.router = router;
        this.document = document;
        this.categorias = [];
        this.totalRegistros = 0;
        this.pagina = 1;
        this.ultima = 0;
        this.cargando = true;
    }
    ListadoCategoriasComponent.prototype.ngOnInit = function () {
        this.cargarCategorias();
    };
    ListadoCategoriasComponent.prototype.cargarCategorias = function () {
        var _this = this;
        this.cargando = true;
        this._categoriaService.getCategorias().subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.total;
            // console.log(resp.total);
            _this.categorias = resp.categorias;
            _this.ultima = Math.trunc((_this.totalRegistros - 1) / 10);
            _this.cargando = false;
            // console.log(this.ultima);
        });
    };
    ListadoCategoriasComponent.prototype.eliminarCategoria = function (categoria) {
        var _this = this;
        console.log(categoria);
        sweetalert2_1["default"]
            .fire({
            title: "Categoria: " + categoria.descripcion,
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        })
            .then(function (resultado) {
            if (resultado.value) {
                // Hicieron click en "Sí"
                _this._categoriaService.eliminarCategorias(categoria._id).subscribe(function (resp) {
                    // this.document.location.reload();
                    _this.cargarCategorias();
                });
            }
        });
    };
    // siguiente() {
    //   // console.log(this.pagina);
    //   // console.log(this.ultima);
    //   if (this.pagina <= this.ultima) {
    //     this.pagina = this.pagina + 1;
    //   }
    //   this._categoriaService.getCategorias(this.pagina - 1).subscribe((resp: any) => {
    //     //console.log(resp);
    //     this.totalRegistros = resp.total;
    //     this.categorias = resp.categorias;
    //   });
    // }
    // anterior() {
    //   // console.log(this.pagina);
    //   // console.log(this.ultima);
    //   if (this.pagina > 1) {
    //     this.pagina = this.pagina - 1;
    //   }
    //   this._categoriaService.getCategorias(this.pagina - 1).subscribe((resp: any) => {
    //     //console.log(resp);
    //     this.totalRegistros = resp.total;
    //     this.categorias = resp.categorias;
    //   });
    // }
    ListadoCategoriasComponent.prototype.crearCategoria = function () {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Crear Categoría',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'on'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            showLoaderOnConfirm: true
        }).then(function (result) {
            // console.log(result.value);
            if (result.value) {
                _this._categoriaService.crearCategorias(result.value)
                    .subscribe(function (resp) {
                    // console.log(resp);
                    _this.cargarCategorias();
                });
                // Swal.fire({
                //   title: `${result.value}`,
                // })
            }
        });
        // Swal
        //   .fire({
        //     title: "Crear Categoria:",
        //     text: "Ingrese el nombre de la categoria",
        //     icon: 'info',
        //     showCancelButton: true,
        //     confirmButtonText: "Aceptar",
        //     cancelButtonText: "Cancelar",
        //   })
        //   .then(valor => {
        //     if (!valor || valor == undefined) {
        //       // Hicieron click en "Sí"
        //       return;
        //     }
        //     else {
        //       // this._categoriaService.crearCategorias(valor).subscribe({
        //       // });
        //       console.log(valor);
        //     }
        //   });
    };
    ListadoCategoriasComponent.prototype.buscar = function (termino) {
        var _this = this;
        if (termino.length == 0) {
            return;
        }
        if (termino.length <= 1) {
            this.cargarCategorias();
            return;
        }
        this.cargando = true;
        console.log(termino);
        this._categoriaService.buscarCategorias(termino)
            .subscribe(function (respuesta) {
            _this.categorias = respuesta;
            // console.log(respuesta.length);
            _this.totalRegistros = respuesta.length;
            _this.cargando = false;
        });
    };
    ListadoCategoriasComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-categorias',
            templateUrl: './listado-categorias.component.html',
            styleUrls: ['./listado-categorias.component.css']
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], ListadoCategoriasComponent);
    return ListadoCategoriasComponent;
}());
exports.ListadoCategoriasComponent = ListadoCategoriasComponent;
