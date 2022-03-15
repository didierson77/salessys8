"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var usuario_model_1 = require("../modelos/usuario.model");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_usuarioService, router) {
        this._usuarioService = _usuarioService;
        this.router = router;
        this.forma = new forms_1.FormGroup({
            correo: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl(null, forms_1.Validators.required),
            recordarme: new forms_1.FormControl(null, forms_1.Validators.required)
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('email')) {
            this.forma.setValue({
                correo: localStorage.getItem('email'),
                password: '123456',
                recordarme: true
            });
        }
    };
    LoginComponent.prototype.ingresar = function () {
        var _this = this;
        if (this.forma.invalid) {
            return;
        }
        var correo = this.forma.value.correo;
        var password = this.forma.value.password;
        var usuario = new usuario_model_1.Usuario('', correo, password);
        var recordar = this.forma.value.recordarme;
        var inicio = true;
        this._usuarioService.login(usuario, recordar)
            .subscribe(function (resp) {
            // console.log(resp);
            _this.router.navigate(['/inicio']);
            // window.location.href='#/inicio';  //redireccion manual para refrescar
            inicio = true;
        });
        // console.log(this.forma.value);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styles: []
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
