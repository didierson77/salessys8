"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaginasModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var paginas_routing_module_1 = require("./paginas-routing.module");
var paginas_component_1 = require("./paginas.component");
var menu_component_1 = require("../shared/menu/menu.component");
var sidebar_component_1 = require("../shared/sidebar/sidebar.component");
var breadcrumbs_component_1 = require("../shared/breadcrumbs/breadcrumbs.component");
var pipes_module_1 = require("./../pipes/pipes.module");
var PaginasModule = /** @class */ (function () {
    function PaginasModule() {
    }
    PaginasModule = __decorate([
        core_1.NgModule({
            declarations: [
                // DashboardComponent,
                paginas_component_1.PaginasComponent,
                menu_component_1.MenuComponent,
                sidebar_component_1.SidebarComponent,
                breadcrumbs_component_1.BreadcrumbsComponent,
            ],
            imports: [
                common_1.CommonModule,
                paginas_routing_module_1.PaginasRoutingModule,
                pipes_module_1.PipesModule
            ],
            exports: [
                paginas_component_1.PaginasComponent,
            ]
        })
    ], PaginasModule);
    return PaginasModule;
}());
exports.PaginasModule = PaginasModule;
