"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
// npm install sweetalert2
// ES6 Modules or TypeScript
var sweetalert2_1 = require("sweetalert2");
var usuario_model_1 = require("../modelos/usuario.model");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_usuarioService, router) {
        this._usuarioService = _usuarioService;
        this.router = router;
        this.forma = new forms_1.FormGroup({
            nombre: new forms_1.FormControl(null, forms_1.Validators.required),
            correo: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl(null, forms_1.Validators.required),
            password2: new forms_1.FormControl(null, forms_1.Validators.required),
            condiciones: new forms_1.FormControl(false)
        });
    }
    RegisterComponent.prototype.sonIguales = function (campo1, campo2) {
        return function (form) {
            var password = form.controls[campo1].value;
            var confirmPassword = form.controls[campo2].value;
            if (password === confirmPassword) {
                //console.log('son iguales');
                return null;
            }
            //console.log('no son iguales');
            return { sonIguales: true };
        };
    };
    RegisterComponent.prototype.ngOnInit = function () {
        this.forma.setValue({
            nombre: 'Test',
            correo: 'email@correo.com',
            password: '123456',
            password2: '123456',
            condiciones: true
        });
        this.forma.validator = this.sonIguales('password', 'password2');
    };
    RegisterComponent.prototype.registro = function () {
        var _this = this;
        if (this.forma.invalid) {
            return;
        }
        if (!this.forma.value.condiciones) {
            sweetalert2_1["default"].fire({
                title: 'Importante',
                text: 'Debe aceptar la condiciones',
                icon: 'warning',
                confirmButtonColor: "#DD6B55"
            });
            //console.log('Debe aceptar las condiciones')
        }
        //console.log('Password: ', this.forma.value.password)
        var usuario = new usuario_model_1.Usuario(this.forma.value.nombre, this.forma.value.correo, this.forma.value.password);
        this._usuarioService.crearUsuario(usuario).subscribe(function (respuesta) {
            console.log(respuesta);
            _this.router.navigate(['/login']);
        });
        console.log('Forma valida:', this.forma.valid);
        console.log(this.forma.value);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styles: []
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
