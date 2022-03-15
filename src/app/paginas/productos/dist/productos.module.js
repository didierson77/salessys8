"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductosModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var productos_routing_module_1 = require("./productos-routing.module");
var agregar_component_1 = require("./agregar/agregar.component");
var listado_component_1 = require("./listado/listado.component");
var pipes_module_1 = require("../../pipes/pipes.module");
var editar_producto_component_1 = require("./editar-producto/editar-producto.component");
var costeo_component_1 = require("./costeo/costeo.component");
var ProductosModule = /** @class */ (function () {
    function ProductosModule() {
    }
    ProductosModule = __decorate([
        core_1.NgModule({
            declarations: [
                agregar_component_1.AgregarComponent,
                listado_component_1.ListadoComponent,
                editar_producto_component_1.EditarProductoComponent,
                costeo_component_1.CosteoComponent,
            ],
            imports: [
                common_1.CommonModule,
                productos_routing_module_1.ProductosRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                pipes_module_1.PipesModule
            ]
        })
    ], ProductosModule);
    return ProductosModule;
}());
exports.ProductosModule = ProductosModule;
