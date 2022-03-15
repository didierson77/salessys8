"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AgregarComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var AgregarComponent = /** @class */ (function () {
    function AgregarComponent(_materiaService, _usuarioService, router) {
        this._materiaService = _materiaService;
        this._usuarioService = _usuarioService;
        this.router = router;
        this.costoUnidad = 0;
        this.cantEmp = 0;
        this.materia = {
            descripcion: ''
        };
        this.forma = new forms_1.FormGroup({
            descripcion: new forms_1.FormControl(null, forms_1.Validators.required),
            costo: new forms_1.FormControl(),
            empaque: new forms_1.FormControl(),
            cantidadxEmpaque: new forms_1.FormControl(),
            costoxUnidad: new forms_1.FormControl(),
            unidadMedida: new forms_1.FormControl()
        });
        // costo: number = 0;
        // unidadxEmpaque: number = 0;
        // costoxUnidad: number = 0;
        this.usuario = this._usuarioService.usuario;
    }
    AgregarComponent.prototype.ngOnInit = function () {
        //console.log(this._usuarioService.token);
        //console.log(this.usuario);
    };
    AgregarComponent.prototype.calcular = function () {
        var costo = this.forma.get('costo').value || 0;
        var cantidadxEmpaque = this.forma.get('cantidadxEmpaque').value || 1;
        ;
        if (cantidadxEmpaque > 0) {
            this.costoUnidad = Number(costo / cantidadxEmpaque);
            this.costoUnidad = Number(this.costoUnidad.toFixed(3));
            this.forma.get('costoxUnidad').setValue(this.costoUnidad);
        }
        else {
            //  this.forma.get('cantidadxEmpaque')!.setValue(1);
            this.costoUnidad = Number(costo / cantidadxEmpaque);
            this.costoUnidad = Number(this.costoUnidad.toFixed(3));
            this.forma.get('costoxUnidad').setValue(this.costoUnidad);
        }
    };
    AgregarComponent.prototype.guardar = function () {
        var _this = this;
        if (this.forma.valid) {
            console.log('guardar');
            this.materia.descripcion = this.forma.get('descripcion').value;
            this.materia.empaque = this.forma.get('empaque').value;
            this.materia.cantxEmpaque = this.forma.get('cantidadxEmpaque').value;
            this.materia.costoEmpaque = this.forma.get('costo').value;
            this.materia.unidadMedida = this.forma.get('unidadMedida').value;
            this.materia.costoxUnidad = this.forma.get('costoxUnidad').value;
            console.log(this.materia);
            this._materiaService.agregarMateria(this.materia)
                .subscribe(function (resp) {
                console.log(resp);
                sweetalert2_1["default"].fire({
                    title: 'Materia Prima agregada',
                    text: 'La Materia Prima fue agregada con exito',
                    icon: 'success'
                });
                _this.router.navigate(['/materias/catalogo']);
            });
        }
        else {
            console.log('forma invalida');
        }
        return;
    };
    AgregarComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar',
            templateUrl: './agregar.component.html',
            styleUrls: ['./agregar.component.css']
        })
    ], AgregarComponent);
    return AgregarComponent;
}());
exports.AgregarComponent = AgregarComponent;
