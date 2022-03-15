"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubProductosModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var subproductos_routing_module_1 = require("./subproductos-routing.module");
var listado_sub_productos_component_1 = require("./listado-sub-productos/listado-sub-productos.component");
var forms_1 = require("@angular/forms");
var pipes_module_1 = require("src/app/pipes/pipes.module");
var SubProductosModule = /** @class */ (function () {
    function SubProductosModule() {
    }
    SubProductosModule = __decorate([
        core_1.NgModule({
            declarations: [
                listado_sub_productos_component_1.ListadoSubProductosComponent,
            ],
            imports: [
                common_1.CommonModule,
                subproductos_routing_module_1.SubProductosRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                pipes_module_1.PipesModule
            ]
        })
    ], SubProductosModule);
    return SubProductosModule;
}());
exports.SubProductosModule = SubProductosModule;
