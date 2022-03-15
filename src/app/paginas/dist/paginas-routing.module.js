"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaginasRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var service_index_1 = require("../services/service.index");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var routes = [
    {
        path: 'inicio',
        canActivate: [service_index_1.LoginGuardGuard],
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'clientes',
        canActivate: [service_index_1.LoginGuardGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./clientes/clientes.module'); }).then(function (m) { return m.ClientesModule; }); },
        data: { titulo: 'Clientes' }
    },
    {
        path: 'materias',
        canActivate: [service_index_1.LoginGuardGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./materias/materias.module'); }).then(function (m) { return m.MateriasModule; }); },
        data: { titulo: 'Materias Primas' } //para el breadcrumbs
    },
    {
        path: 'usuarios',
        canActivate: [service_index_1.LoginGuardGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./usuarios/usuarios.module'); }).then(function (m) { return m.UsuariosModule; }); },
        data: { titulo: '(Usuarios)' } //para el breadcrumbs
    },
    {
        path: 'categorias',
        canActivate: [service_index_1.LoginGuardGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./categorias/categorias.module'); }).then(function (m) { return m.CategoriasModule; }); },
        data: { titulo: '(Categorias)' } //para el breadcrumbs
    },
    {
        path: 'subproductos',
        canActivate: [service_index_1.LoginGuardGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./subProductos/subproductos.module'); }).then(function (m) { return m.SubProductosModule; }); },
        data: { titulo: '(SubProductos)' } //para el breadcrumbs
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }
];
var PaginasRoutingModule = /** @class */ (function () {
    function PaginasRoutingModule() {
    }
    PaginasRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PaginasRoutingModule);
    return PaginasRoutingModule;
}());
exports.PaginasRoutingModule = PaginasRoutingModule;
