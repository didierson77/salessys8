"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarService = void 0;
var core_1 = require("@angular/core");
var SidebarService = /** @class */ (function () {
    function SidebarService() {
        this.menuItems = [
            {
                nombre: 'Materia Prima',
                icono: 'nav-icon fas fa-th',
                submenu: [
                    {
                        ruta: '/materias/catalogo',
                        nombre: 'Catálogo'
                    }
                ]
            },
            {
                // ruta: '/materias/',
                nombre: 'Productos',
                icono: 'nav-icon fas fa-box-open',
                submenu: [
                    {
                        ruta: '/productos/listado',
                        nombre: 'Catálogo'
                    },
                    {
                        ruta: '/productos',
                        nombre: 'Formulación'
                    }
                ]
            },
            {
                // ruta: '/materias/',
                nombre: 'Sub productos',
                icono: 'nav-icon fas fa-box-open',
                submenu: [
                    {
                        ruta: '/subproductos/catalogo',
                        nombre: 'Catálogo'
                    },
                    {
                        ruta: '/productos',
                        nombre: 'Formulación'
                    }
                ]
            },
            {
                // ruta: '/materias/',
                nombre: 'Pedidos',
                icono: 'nav-icon fas fa-clipboard-list'
            },
            {
                // ruta: '/materias/',
                nombre: 'Ventas',
                icono: 'nav-icon fas fa-chart-line'
            },
            {
                // ruta: '/clientes/listado-clientes',
                nombre: 'Clientes',
                icono: 'nav-icon fas fa-users-cog',
                submenu: [
                    {
                        ruta: '/clientes',
                        nombre: 'Catálogo'
                    }
                ]
            },
            {
                // ruta: '/clientes/listado-clientes',
                nombre: 'Administración',
                icono: 'nav-icon fas fa-users-cog',
                submenu: [
                    {
                        ruta: '/usuarios/catalogo',
                        nombre: 'Usuarios'
                    },
                    {
                        ruta: '/categorias/catalogo',
                        nombre: 'Categorias'
                    }
                ]
            },
        ];
    }
    SidebarService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SidebarService);
    return SidebarService;
}());
exports.SidebarService = SidebarService;
