"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AgregarSubProductosComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AgregarSubProductosComponent = /** @class */ (function () {
    function AgregarSubProductosComponent(_productoService, _subProductoService, _usuarioService, _categoriaService, router) {
        this._productoService = _productoService;
        this._subProductoService = _subProductoService;
        this._usuarioService = _usuarioService;
        this._categoriaService = _categoriaService;
        this.router = router;
        this.costoUnidad = 0;
        this.cantEmp = 0;
        this.subProducto = {
            descripcion: '',
            activo: false
        };
        this.forma = new forms_1.FormGroup({
            descripcion: new forms_1.FormControl(null, forms_1.Validators.required),
            claveInt: new forms_1.FormControl(),
            // categoria: new FormControl(),
            precio: new forms_1.FormControl(),
            unidadMedida: new forms_1.FormControl(),
            costo: new forms_1.FormControl()
        });
        this.usuario = this._usuarioService.usuario;
    }
    AgregarSubProductosComponent.prototype.ngOnInit = function () {
        // this.forma.get('categoria')!.setValue('');
        // this._categoriaService.getCategorias().subscribe((resp: any) => {
        //   // console.log(resp);
        //   this.categorias = resp.categorias;
        //   console.log(this.categorias);
        // });
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
    AgregarSubProductosComponent.prototype.guardar = function () {
        var _this = this;
        if (this.forma.valid) {
            console.log('guardar');
            this.subProducto.descripcion = this.forma.get('descripcion').value;
            this.subProducto.precio = this.forma.get('precio').value;
            this.subProducto.unidadMedida = this.forma.get('unidadMedida').value;
            this.subProducto.costo = this.forma.get('costo').value;
            this.subProducto.claveInt = this.forma.get('claveInt').value;
            console.log(this.subProducto);
            this._subProductoService.agregarSubProducto(this.subProducto)
                .subscribe(function (resp) {
                console.log(resp);
                _this.router.navigate(['/subproductos/catalogo']);
            });
        }
        else {
            console.log('forma invalida');
        }
        return;
    };
    AgregarSubProductosComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-sub-productos',
            templateUrl: './agregar-sub-productos.component.html',
            styles: []
        })
    ], AgregarSubProductosComponent);
    return AgregarSubProductosComponent;
}());
exports.AgregarSubProductosComponent = AgregarSubProductosComponent;
