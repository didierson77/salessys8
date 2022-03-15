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
    function AgregarComponent(_productoService, _usuarioService, _categoriaService, router) {
        this._productoService = _productoService;
        this._usuarioService = _usuarioService;
        this._categoriaService = _categoriaService;
        this.router = router;
        this.costoUnidad = 0;
        this.cantEmp = 0;
        this.producto = {
            descripcion: '',
            activo: false
        };
        this.forma = new forms_1.FormGroup({
            descripcion: new forms_1.FormControl(null, forms_1.Validators.required),
            claveInt: new forms_1.FormControl(),
            categoria: new forms_1.FormControl(),
            precio: new forms_1.FormControl(),
            unidadMedida: new forms_1.FormControl(),
            costo: new forms_1.FormControl(),
            subProducto: new forms_1.FormControl()
        });
        this.usuario = this._usuarioService.usuario;
    }
    AgregarComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this.forma.get('categoria').setValue('');
        this._categoriaService.getCategorias().subscribe(function (resp) {
            // console.log(resp);
            _this.categorias = resp.categorias;
            console.log(_this.categorias);
        });
        (_a = this.forma.get('subProducto')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (changes) {
            var _a;
            // console.log(changes);
            var claveProucto = (_a = _this.forma.get('subProducto')) === null || _a === void 0 ? void 0 : _a.value;
            console.log(claveProucto);
            // if (claveProucto != '') {
            //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "true");
            //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "disabled");
            _this.producto.subProducto = claveProucto;
            // }
            console.log(_this.producto);
        });
    };
    // calcular() {
    //   let costo = this.forma.get('costo')!.value || 0;
    //   let cantidadxEmpaque = this.forma.get('cantidadxEmpaque')!.value || 1;;
    //   if (cantidadxEmpaque > 0) {
    //     this.costoUnidad = Number(costo / cantidadxEmpaque);
    //     this.costoUnidad = Number(this.costoUnidad.toFixed(3));
    //     this.forma.get('costoxUnidad')!.setValue(this.costoUnidad);
    //   }
    //   else {
    //     //  this.forma.get('cantidadxEmpaque')!.setValue(1);
    //     this.costoUnidad = Number(costo / cantidadxEmpaque);
    //     this.costoUnidad = Number(this.costoUnidad.toFixed(3));
    //     this.forma.get('costoxUnidad')!.setValue(this.costoUnidad);
    //   }
    // }
    AgregarComponent.prototype.guardar = function () {
        var _this = this;
        if (this.forma.valid) {
            console.log('guardar');
            this.producto.descripcion = this.forma.get('descripcion').value;
            this.producto.claveInt = this.forma.get('claveInt').value;
            this.producto.categoria = this.forma.get('categoria').value;
            this.producto.precio = this.forma.get('precio').value;
            this.producto.unidadMedida = this.forma.get('unidadMedida').value;
            this.producto.costo = this.forma.get('costo').value;
            console.log(this.producto);
            this._productoService.agregarProducto(this.producto)
                .subscribe(function (resp) {
                console.log(resp);
                _this.router.navigate(['/productos/catalogo']);
            }, function (err) {
                console.log(err.error.error);
                if (err.error.error.code) {
                    sweetalert2_1["default"].fire({
                        title: 'Clave Interna, Ya Existe',
                        text: 'La Clave Interna debe ser única',
                        icon: 'error',
                        // confirmButtonColor: "#82E0AA",
                        timer: 1500
                    });
                    // console.log('clave interna');
                }
                if (err.error.error.errors.categoria) {
                    sweetalert2_1["default"].fire({
                        title: 'Seleccione una Categoria',
                        text: 'Debe asignarle una categoria al producto',
                        icon: 'error',
                        // confirmButtonColor: "#82E0AA",
                        timer: 1500
                    });
                    console.log('categoria');
                }
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
            styles: []
        })
    ], AgregarComponent);
    return AgregarComponent;
}());
exports.AgregarComponent = AgregarComponent;
