"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubProductosRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var listado_sub_productos_component_1 = require("./listado-sub-productos/listado-sub-productos.component");
var costeo_sub_productos_component_1 = require("./costeo-sub-productos/costeo-sub-productos.component");
var agregar_sub_productos_component_1 = require("./agregar-sub-productos/agregar-sub-productos.component");
var editar_sub_productos_component_1 = require("./editar-sub-productos/editar-sub-productos.component");
var routes = [
    {
        path: '',
        children: [
            { path: 'catalogo', component: listado_sub_productos_component_1.ListadoSubProductosComponent },
            { path: 'costeo/:id', component: costeo_sub_productos_component_1.CosteoSubProductosComponent },
            { path: 'agregar', component: agregar_sub_productos_component_1.AgregarSubProductosComponent },
            { path: 'editar/:id', component: editar_sub_productos_component_1.EditarSubProductosComponent },
            // { path: 'agregar', component: AgregarComponent },
            { path: '**', redirectTo: 'catalogo' },
        ]
    }
];
var SubProductosRoutingModule = /** @class */ (function () {
    function SubProductosRoutingModule() {
    }
    SubProductosRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], SubProductosRoutingModule);
    return SubProductosRoutingModule;
}());
exports.SubProductosRoutingModule = SubProductosRoutingModule;
