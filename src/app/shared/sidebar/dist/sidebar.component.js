"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(_sidebar, _usuarioService, document) {
        this._sidebar = _sidebar;
        this._usuarioService = _usuarioService;
        this.document = document;
        this.menu = [];
        this.usuario = {
            nombre: '',
            email: '',
            password: '',
            role: 'USER'
        };
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this._usuarioService.cargarStorage();
        this.usuario = this._usuarioService.usuario;
        //*****************************************************/
        //********PARA MOSTRAR Y OCULTAR EL SIDEBAR************/
        //*****************************************************/
        var btnToggle = this.document.querySelector('.toggle-btn');
        // btnToggle?.addEventListener('click', () => {
        //   console.log('click');
        //   this.document.querySelector('#collapse-icon')?.classList.add('fa-angle-double-left');
        //   this.document.querySelector('.menu-collapsed')?.classList.toggle('d-none');
        //   this.document.querySelector('.sidebar-submenu')?.classList.toggle('d-none');
        //   this.document.querySelector('.submenu-icon')?.classList.toggle('d-none');
        //   this.document.querySelector('#sidebar-container')?.classList.toggle('sidebar-collapsed');
        //   this.document.querySelector('.sidebar-separator-title')?.classList.toggle('d-flex');
        //   this.document.querySelector('.toggle-btn span')?.classList.toggle('colapsado');
        //   this.document.querySelector('.menu-collapsed.opcion-submenu')?.classList.toggle('d-none');
        //   this.document.querySelector('#collapse-icon')?.classList.toggle('fa-angle-double-left');
        // });
        // console.log(this._sidebar.menuItems);
        // console.log(this._usuarioService.token);
        // console.log(this.usuario);
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styles: []
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT))
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
