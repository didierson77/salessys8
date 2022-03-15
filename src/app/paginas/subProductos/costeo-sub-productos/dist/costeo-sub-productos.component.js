"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CosteoSubProductosComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var CosteoSubProductosComponent = /** @class */ (function () {
    function CosteoSubProductosComponent(_subProductoService, _usuarioService, _materiaService, rutaActiva, router, renderer) {
        this._subProductoService = _subProductoService;
        this._usuarioService = _usuarioService;
        this._materiaService = _materiaService;
        this.rutaActiva = rutaActiva;
        this.router = router;
        this.renderer = renderer;
        this.claveProd = '';
        this.descripcion = '';
        this.unidMedida = '';
        this.cantidad = 0;
        this.precio = 0;
        this.importe = 0;
        this.costoTotal = 0;
        this.cargando = true;
        this.materias = [];
        this.formula = [];
        this.subProducto = {
            descripcion: '',
            activo: true
        };
        this.id = '';
        this.forma = new forms_1.FormGroup({
            claveProd: new forms_1.FormControl(null, forms_1.Validators.required),
            precio: new forms_1.FormControl(),
            materia: new forms_1.FormControl(),
            costo: new forms_1.FormControl(),
            cantidad: new forms_1.FormControl(),
            importe: new forms_1.FormControl(),
            unidadMedida: new forms_1.FormControl(),
            costoTotal: new forms_1.FormControl()
        });
        this.id = this.rutaActiva.snapshot.params.id;
    }
    CosteoSubProductosComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b, _c;
        (_a = this.forma.get('claveProd')) === null || _a === void 0 ? void 0 : _a.setValue('');
        this.cargarInfo();
        this._materiaService.getMateriasCosteo()
            .subscribe(function (resp) {
            _this.materias = resp.materias;
            //console.log(resp.materias);
        });
        (_b = this.forma.get('claveProd')) === null || _b === void 0 ? void 0 : _b.valueChanges.subscribe(function (changes) {
            var _a;
            // console.log(changes);
            var claveProucto = (_a = _this.forma.get('claveProd')) === null || _a === void 0 ? void 0 : _a.value;
            console.log(claveProucto);
            if (claveProucto != '') {
                //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "true");
                //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "disabled");
            }
            _this._materiaService.getMateriaEspecif(changes)
                .subscribe(function (resp) {
                var _a, _b, _c;
                //console.log(resp);
                (_a = _this.forma.get('precio')) === null || _a === void 0 ? void 0 : _a.setValue(resp.materia.costoxUnidad);
                (_b = _this.forma.get('unidadMedida')) === null || _b === void 0 ? void 0 : _b.setValue(resp.materia.unidadMedida);
                (_c = _this.forma.get('cantidad')) === null || _c === void 0 ? void 0 : _c.setValue(1);
                _this.descripcion = resp.materia.descripcion;
            });
        });
        (_c = this.forma.get('cantidad')) === null || _c === void 0 ? void 0 : _c.valueChanges.subscribe(function (cantidad) {
            var _a, _b, _c;
            // console.log(cantidad);
            var precio = (_a = _this.forma.get('precio')) === null || _a === void 0 ? void 0 : _a.value;
            if (cantidad >= 0) {
                var importe = Number(precio * cantidad).toFixed(3);
                (_b = _this.forma.get('importe')) === null || _b === void 0 ? void 0 : _b.setValue(importe);
            }
            else {
                (_c = _this.forma.get('cantidad')) === null || _c === void 0 ? void 0 : _c.setValue(1);
            }
        });
    };
    CosteoSubProductosComponent.prototype.cargarInfo = function () {
        var _this = this;
        this._subProductoService.getSubProductoEspecif(this.id).subscribe(function (resp) {
            // console.log(resp);
            _this.subProducto = resp.subproducto;
            // console.log(this.subProducto);
        });
    };
    CosteoSubProductosComponent.prototype.agregar = function () {
        var _a, _b, _c, _d, _e;
        //console.log('agregar');
        this.claveProd = (_a = this.forma.get('claveProd')) === null || _a === void 0 ? void 0 : _a.value;
        this.precio = (_b = this.forma.get('precio')) === null || _b === void 0 ? void 0 : _b.value;
        this.cantidad = (_c = this.forma.get('cantidad')) === null || _c === void 0 ? void 0 : _c.value;
        this.unidMedida = (_d = this.forma.get('unidadMedida')) === null || _d === void 0 ? void 0 : _d.value;
        this.importe = (_e = this.forma.get('importe')) === null || _e === void 0 ? void 0 : _e.value;
        //console.log(this.descripcion);
        var nuevoElemento = {
            claveProd: (this.claveProd),
            descripcion: (this.descripcion),
            unidadMedida: (this.unidMedida),
            cantidad: (this.cantidad),
            costoxUnidad: (this.precio),
            importe: (this.importe)
        };
        var descripciones = this.formula.map(function (elemento) { return elemento.descripcion; });
        console.log();
        console.log(descripciones);
        if (descripciones.indexOf((this.descripcion)) >= 0) {
            sweetalert2_1["default"].fire({
                title: 'Importante',
                text: 'La Materia Prima ya fue agregada',
                icon: 'warning',
                // confirmButtonColor: "#82E0AA",
                timer: 2000
            });
            return;
        }
        else {
            this.formula.push(nuevoElemento);
            this.calculaTotal();
        }
        console.log(this.formula);
        console.log(JSON.stringify(this.formula));
    };
    CosteoSubProductosComponent.prototype.calculaTotal = function () {
        var _a;
        var totales = this.formula.map(function (el) { return el.importe; });
        var total = 0;
        for (var _i = 0, totales_1 = totales; _i < totales_1.length; _i++) {
            var i = totales_1[_i];
            total += Number(i);
        }
        this.costoTotal = total;
        // console.log(total)
        (_a = this.forma.get('costoTotal')) === null || _a === void 0 ? void 0 : _a.setValue(total.toFixed(3));
    };
    CosteoSubProductosComponent.prototype.eliminar = function (descrip) {
        var ids = this.formula.map(function (el) { return el.claveProd; });
        console.log(ids);
        var posicion = ids.indexOf(descrip);
        console.log(posicion);
        this.formula.splice(posicion, 1);
        console.log(this.formula);
        this.calculaTotal();
        console.log(JSON.stringify(this.formula));
    };
    CosteoSubProductosComponent.prototype.guardar = function () {
    };
    __decorate([
        core_1.ViewChild("btn-agregar")
    ], CosteoSubProductosComponent.prototype, "btnAgregar");
    CosteoSubProductosComponent = __decorate([
        core_2.Component({
            selector: 'app-costeo-sub-productos',
            templateUrl: './costeo-sub-productos.component.html',
            styles: []
        })
    ], CosteoSubProductosComponent);
    return CosteoSubProductosComponent;
}());
exports.CosteoSubProductosComponent = CosteoSubProductosComponent;
