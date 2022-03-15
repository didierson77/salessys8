"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarProductoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var config_1 = require("src/app/config/config");
var config_2 = require("src/app/config/config");
var config_3 = require("src/app/config/config");
var sweetalert2_1 = require("sweetalert2");
var EditarProductoComponent = /** @class */ (function () {
    function EditarProductoComponent(_productoService, _usuarioService, _categoriasService, rutaActiva, router, _subirArchivoService) {
        this._productoService = _productoService;
        this._usuarioService = _usuarioService;
        this._categoriasService = _categoriasService;
        this.rutaActiva = rutaActiva;
        this.router = router;
        this._subirArchivoService = _subirArchivoService;
        this.id = '';
        this.costoUnidad = 0;
        this.cantEmp = 0;
        this.imagen = '';
        this.imagenTemp = '';
        this.categorias = [];
        this.forma = new forms_1.FormGroup({
            descripcion: new forms_1.FormControl(null, forms_1.Validators.required),
            activo: new forms_1.FormControl(),
            categoria: new forms_1.FormControl(),
            claveInt: new forms_1.FormControl(),
            precio: new forms_1.FormControl(),
            subProducto: new forms_1.FormControl(),
            existencia: new forms_1.FormControl(),
            costo: new forms_1.FormControl(),
            empaque: new forms_1.FormControl(),
            unidadMedida: new forms_1.FormControl()
        });
        this.id = this.rutaActiva.snapshot.params.id;
    }
    EditarProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        this._categoriasService.getCategorias().subscribe(function (resp) {
            _this.categorias = resp.categorias;
            // console.log(this.categorias);
        });
        this.cargarProducto(this.id);
        //************Nos suscribimos a los cambios del select
        (_a = this.forma.get('subProducto')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (changes) {
            // console.log(changes);
            // console.log(this.forma.get('subProducto')?.value);
        });
    };
    EditarProductoComponent.prototype.cargarProducto = function (id) {
        var _this = this;
        this._productoService.getProductoEspecif(id).subscribe(function (resp) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            // console.log(resp);
            _this.producto = resp.producto;
            // console.log(this.producto);
            _this.forma.get('descripcion').setValue((_a = _this.producto) === null || _a === void 0 ? void 0 : _a.descripcion);
            _this.forma.get('activo').setValue((_b = _this.producto) === null || _b === void 0 ? void 0 : _b.activo);
            _this.forma.get('categoria').setValue((_d = (_c = _this.producto) === null || _c === void 0 ? void 0 : _c.categoria) === null || _d === void 0 ? void 0 : _d._id);
            _this.forma.get('claveInt').setValue((_e = _this.producto) === null || _e === void 0 ? void 0 : _e.claveInt);
            _this.forma.get('precio').setValue((_f = _this.producto) === null || _f === void 0 ? void 0 : _f.precio);
            _this.forma.get('existencia').setValue((_g = _this.producto) === null || _g === void 0 ? void 0 : _g.existencia);
            _this.forma.get('unidadMedida').setValue((_h = _this.producto) === null || _h === void 0 ? void 0 : _h.unidadMedida);
            _this.forma.get('costo').setValue((_j = _this.producto) === null || _j === void 0 ? void 0 : _j.costo);
            _this.forma.get('subProducto').setValue((_k = _this.producto) === null || _k === void 0 ? void 0 : _k.subProducto);
            _this.imagen = ((_l = _this.producto) === null || _l === void 0 ? void 0 : _l.img) || '';
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
    EditarProductoComponent.prototype.guardar = function () {
        var _this = this;
        if (this.forma.valid) {
            //console.log('guardar1');
            this.producto.descripcion = this.forma.get('descripcion').value;
            this.producto.activo = this.forma.get('activo').value;
            this.producto.categoria = this.forma.get('categoria').value;
            this.producto.claveInt = this.forma.get('claveInt').value;
            this.producto.precio = this.forma.get('precio').value;
            this.producto.existencia = this.forma.get('existencia').value;
            this.producto.unidadMedida = this.forma.get('unidadMedida').value;
            this.producto.costo = this.forma.get('costo').value;
            this.producto.subProducto = this.forma.get('subProducto').value;
            console.log(this.producto);
            this._productoService.actualizarProducto(this.producto)
                .subscribe(function (resp) {
                console.log(resp);
                sweetalert2_1["default"].fire({
                    title: 'Importante',
                    showClass: {
                        popup: 'animate__animated animate__fadeIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut'
                    },
                    text: 'Producto actualizado',
                    icon: 'success',
                    confirmButtonColor: config_2.VERDE,
                    timer: config_3.TIEMPO_MENSAJE
                });
                _this.router.navigate(['/productos/catalogo']);
            }, function (error) {
                // console.log(error.error.mensaje);
                sweetalert2_1["default"].fire({
                    title: 'Registro NO actualizado:',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    text: error.error.mensaje,
                    icon: 'error',
                    confirmButtonColor: config_1.ROJO,
                    timer: config_3.TIEMPO_MENSAJE
                });
            });
        }
        else {
            console.log('forma invalida');
        }
        return;
    };
    EditarProductoComponent.prototype.seleccionImagen = function (event) {
        var _this = this;
        if (!event) {
            this.imagenSubir = undefined;
            return;
        }
        var element = event.currentTarget;
        var fileList = element.files;
        var archivo;
        if (fileList) {
            archivo = fileList[0];
            console.log("FileUpload -> files", archivo);
            if (archivo.type.indexOf('image') < 0) {
                sweetalert2_1["default"].fire({
                    title: 'Solo imagenes',
                    text: 'El archivo seleccionado no es una imagen',
                    icon: 'error',
                    confirmButtonColor: "#82E0AA ",
                    timer: 2000
                });
                this.imagenSubir = undefined;
                return;
            }
            this.imagenSubir = archivo;
            var reader_1 = new FileReader();
            var urlImagenTemp = reader_1.readAsDataURL(archivo);
            reader_1.onloadend = function () {
                // console.log(reader.result);
                _this.imagenTemp = String(reader_1.result);
            };
        }
    };
    EditarProductoComponent.prototype.cambiarImagen = function () {
        var _this = this;
        var archivo = this.imagenSubir;
        var id = this.producto._id;
        // console.log(this.materia._id);
        // archivo: File, id: string
        this._subirArchivoService.subirArchivo(archivo, 'productos', id)
            .then(function (resp) {
            sweetalert2_1["default"].fire({
                title: 'Importante',
                text: 'Imagen actualizada',
                icon: 'success',
                confirmButtonColor: "#82E0AA",
                timer: 2000
            });
            console.log(resp);
            // console.log(resp.materia.img);
            _this.imagen = resp.producto.img;
        })["catch"](function (resp) {
            console.log(resp);
        });
    };
    EditarProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-producto',
            templateUrl: './editar-producto.component.html',
            styles: []
        })
    ], EditarProductoComponent);
    return EditarProductoComponent;
}());
exports.EditarProductoComponent = EditarProductoComponent;
