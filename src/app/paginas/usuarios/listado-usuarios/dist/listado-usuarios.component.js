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
exports.ListadoUsuariosComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var common_1 = require("@angular/common");
var ListadoUsuariosComponent = /** @class */ (function () {
    function ListadoUsuariosComponent(_usuarioService, router, document) {
        this._usuarioService = _usuarioService;
        this.router = router;
        this.document = document;
        this.usuarios = [];
        this.totalRegistros = 0;
        this.pagina = 1;
        this.ultima = 0;
        this.cargando = true;
        this.usuario = this._usuarioService.usuario;
    }
    ListadoUsuariosComponent.prototype.ngOnInit = function () {
        this.cargarUsuarios();
        //console.log(this.usuario);
        //console.log(this.ultima);
    };
    ListadoUsuariosComponent.prototype.cargarUsuarios = function () {
        var _this = this;
        this.cargando = true;
        this._usuarioService.getUsuarios(0).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.total;
            // console.log(resp.total);
            _this.usuarios = resp.usuarios;
            _this.ultima = Math.trunc((_this.totalRegistros - 1) / 10);
            _this.cargando = false;
            // console.log(this.ultima);
            console.log(_this.usuario);
        });
    };
    ListadoUsuariosComponent.prototype.eliminarUsuario = function (usuario) {
        var _this = this;
        // console.log(this.);
        sweetalert2_1["default"]
            .fire({
            title: "Materia prima: " + usuario.nombre,
            text: "¿Eliminar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        })
            .then(function (resultado) {
            if (resultado.value) {
                // Hicieron click en "Sí"
                _this._usuarioService.eliminarUsuarios(usuario._id).subscribe(function (resp) {
                    // this.document.location.reload();
                    _this.cargarUsuarios();
                });
            }
        });
    };
    ListadoUsuariosComponent.prototype.siguiente = function () {
        var _this = this;
        // console.log(this.pagina);
        // console.log(this.ultima);
        if (this.pagina <= this.ultima) {
            this.pagina = this.pagina + 1;
        }
        this._usuarioService.getUsuarios(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.total;
            _this.usuarios = resp.materias;
        });
    };
    ListadoUsuariosComponent.prototype.anterior = function () {
        var _this = this;
        // console.log(this.pagina);
        // console.log(this.ultima);
        if (this.pagina > 1) {
            this.pagina = this.pagina - 1;
        }
        this._usuarioService.getUsuarios(this.pagina - 1).subscribe(function (resp) {
            //console.log(resp);
            _this.totalRegistros = resp.total;
            _this.usuarios = resp.materias;
        });
    };
    ListadoUsuariosComponent.prototype.buscar = function (termino) {
        var _this = this;
        if (termino.length == 0) {
            return;
        }
        if (termino.length < 1) {
            this.cargarUsuarios();
            return;
        }
        this.cargando = true;
        console.log(termino);
        this._usuarioService.buscarUsuarios(termino)
            .subscribe(function (respuesta) {
            _this.usuarios = respuesta;
            console.log(respuesta);
            _this.cargando = false;
        });
    };
    ListadoUsuariosComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-usuarios',
            templateUrl: './listado-usuarios.component.html',
            styleUrls: ['./listado-usuarios.component.css']
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], ListadoUsuariosComponent);
    return ListadoUsuariosComponent;
}());
exports.ListadoUsuariosComponent = ListadoUsuariosComponent;
