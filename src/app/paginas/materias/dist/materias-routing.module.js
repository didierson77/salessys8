"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MateriasRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var listado_materias_component_1 = require("./listado-materias/listado-materias.component");
var agregar_component_1 = require("./agregar/agregar.component");
var editar_component_1 = require("./editar/editar.component");
var routes = [
    {
        path: '',
        children: [
            { path: 'catalogo', component: listado_materias_component_1.ListadoMateriasComponent },
            { path: 'agregar', component: agregar_component_1.AgregarComponent },
            { path: 'editar/:id', component: editar_component_1.EditarComponent },
            { path: '**', redirectTo: 'catalogo' },
        ]
    }
];
var MateriasRoutingModule = /** @class */ (function () {
    function MateriasRoutingModule() {
    }
    MateriasRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], MateriasRoutingModule);
    return MateriasRoutingModule;
}());
exports.MateriasRoutingModule = MateriasRoutingModule;
