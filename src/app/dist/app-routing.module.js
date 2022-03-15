"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var dashboard_component_1 = require("./paginas/dashboard/dashboard.component");
// import { DashboardComponent } from './paginas/dashboard/dashboard.component';
var paginas_component_1 = require("./paginas/paginas.component");
var register_component_1 = require("./register/register.component");
var service_index_1 = require("./services/service.index");
var nopagefound_component_1 = require("./shared/nopagefound/nopagefound.component");
// import { ClientesModule } from './paginas/clientes/clientes.module';
// import { ProductosModule } from './paginas/productos/productos.module';
var routes = [
    {
        path: '',
        component: paginas_component_1.PaginasComponent,
        children: [
            {
                path: 'inicio',
                canActivate: [service_index_1.LoginGuardGuard],
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'clientes',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./paginas/clientes/clientes.module'); }).then(function (m) { return m.ClientesModule; }); }
            },
            {
                path: 'productos',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./paginas/productos/productos.module'); }).then(function (m) { return m.ProductosModule; }); }
            },
            {
                path: 'materias',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./paginas/materias/materias.module'); }).then(function (m) { return m.MateriasModule; }); }
            },
            {
                path: 'usuarios',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./paginas/usuarios/usuarios.module'); }).then(function (m) { return m.UsuariosModule; }); }
            },
            {
                path: 'categorias',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./paginas/categorias/categorias.module'); }).then(function (m) { return m.CategoriasModule; }); }
            },
            {
                path: 'subproductos',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./paginas/subProductos/subproductos.module'); }).then(function (m) { return m.SubProductosModule; }); }
            },
            { path: '', redirectTo: '/inicio', pathMatch: 'full' }
        ]
    },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    // { path: 'register', component: LoginComponent },
    { path: '**', component: nopagefound_component_1.NopagefoundComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
