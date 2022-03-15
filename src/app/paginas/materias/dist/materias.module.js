"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MateriasModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var materias_routing_module_1 = require("./materias-routing.module");
var listado_materias_component_1 = require("./listado-materias/listado-materias.component");
var agregar_component_1 = require("./agregar/agregar.component");
var editar_component_1 = require("./editar/editar.component");
var pipes_module_1 = require("../../pipes/pipes.module");
var MateriasModule = /** @class */ (function () {
    function MateriasModule() {
    }
    MateriasModule = __decorate([
        core_1.NgModule({
            declarations: [
                listado_materias_component_1.ListadoMateriasComponent,
                agregar_component_1.AgregarComponent,
                editar_component_1.EditarComponent
            ],
            imports: [
                common_1.CommonModule,
                materias_routing_module_1.MateriasRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                pipes_module_1.PipesModule
            ],
            exports: []
        })
    ], MateriasModule);
    return MateriasModule;
}());
exports.MateriasModule = MateriasModule;
