"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriasModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var categorias_routing_module_1 = require("./categorias-routing.module");
var listado_categorias_component_1 = require("./listado-categorias/listado-categorias.component");
var CategoriasModule = /** @class */ (function () {
    function CategoriasModule() {
    }
    CategoriasModule = __decorate([
        core_1.NgModule({
            declarations: [
                listado_categorias_component_1.ListadoCategoriasComponent
            ],
            imports: [
                common_1.CommonModule,
                categorias_routing_module_1.CategoriasRoutingModule,
            ]
        })
    ], CategoriasModule);
    return CategoriasModule;
}());
exports.CategoriasModule = CategoriasModule;
