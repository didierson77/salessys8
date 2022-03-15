"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var config_1 = require("src/app/config/config");
var config_2 = require("src/app/config/config");
var config_3 = require("src/app/config/config");
var sweetalert2_1 = require("sweetalert2");
var EditarComponent = /** @class */ (function () {
    function EditarComponent(_materiaService, _usuarioService, rutaActiva, router, _subirArchivoService) {
        this._materiaService = _materiaService;
        this._usuarioService = _usuarioService;
        this.rutaActiva = rutaActiva;
        this.router = router;
        this._subirArchivoService = _subirArchivoService;
        this.usuario = this._usuarioService.usuario;
        this.materia = {
            descripcion: ''
        };
        this.id = '';
        this.costoUnidad = 0;
        this.cantEmp = 0;
        this.imagen = '';
        this.imagenTemp = '';
        this.forma = new forms_1.FormGroup({
            descripcion: new forms_1.FormControl(null, forms_1.Validators.required),
            costo: new forms_1.FormControl(),
            empaque: new forms_1.FormControl(),
            cantidadxEmpaque: new forms_1.FormControl(),
            costoxUnidad: new forms_1.FormControl(),
            unidadMedida: new forms_1.FormControl()
        });
        this.id = this.rutaActiva.snapshot.params.id;
    }
    EditarComponent.prototype.ngOnInit = function () {
        //console.log(this._usuarioService.token);
        //console.log(this.usuario);
        //console.log(this.id);
        this.cargarMateria(this.id);
        //console.log(this.materia);
    };
    EditarComponent.prototype.cargarMateria = function (id) {
        var _this = this;
        this._materiaService.getMateriaEspecif(id).subscribe(function (resp) {
            var _a, _b, _c, _d, _e, _f;
            //console.log(resp);
            _this.materia = resp.materia;
            console.log(_this.materia);
            _this.forma.get('descripcion').setValue((_a = _this.materia) === null || _a === void 0 ? void 0 : _a.descripcion);
            _this.forma.get('empaque').setValue((_b = _this.materia) === null || _b === void 0 ? void 0 : _b.empaque);
            _this.forma.get('cantidadxEmpaque').setValue((_c = _this.materia) === null || _c === void 0 ? void 0 : _c.cantxEmpaque);
            _this.forma.get('unidadMedida').setValue((_d = _this.materia) === null || _d === void 0 ? void 0 : _d.unidadMedida);
            _this.forma.get('costo').setValue((_e = _this.materia) === null || _e === void 0 ? void 0 : _e.costoEmpaque);
            _this.forma.get('costoxUnidad').setValue((_f = _this.materia) === null || _f === void 0 ? void 0 : _f.costoxUnidad);
            _this.imagen = _this.materia.img || '';
        });
    };
    EditarComponent.prototype.calcular = function () {
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
    EditarComponent.prototype.guardar = function () {
        var _this = this;
        if (this.forma.valid) {
            //console.log('guardar1');
            this.materia.descripcion = this.forma.get('descripcion').value;
            this.materia.empaque = this.forma.get('empaque').value;
            this.materia.cantxEmpaque = this.forma.get('cantidadxEmpaque').value;
            this.materia.costoEmpaque = this.forma.get('costo').value;
            this.materia.unidadMedida = this.forma.get('unidadMedida').value;
            this.materia.costoxUnidad = this.forma.get('costoxUnidad').value;
            // console.log(this.materia);
            this._materiaService.actualizarMateria(this.materia)
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
                    text: 'Materia Prima actualizada',
                    icon: 'success',
                    confirmButtonColor: config_2.VERDE,
                    timer: config_3.TIEMPO_MENSAJE
                });
                _this.router.navigate(['/materias/catalogo']);
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
    EditarComponent.prototype.seleccionImagen = function (event) {
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
    EditarComponent.prototype.cambiarImagen = function () {
        var _this = this;
        var archivo = this.imagenSubir;
        var id = this.materia._id;
        // console.log(this.materia._id);
        // archivo: File, id: string
        this._subirArchivoService.subirArchivo(archivo, 'materias', id)
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
            _this.imagen = resp.materia.img;
        })["catch"](function (resp) {
            console.log(resp);
        });
    };
    EditarComponent = __decorate([
        core_1.Component({
            selector: 'app-editar',
            templateUrl: './editar.component.html',
            styles: []
        })
    ], EditarComponent);
    return EditarComponent;
}());
exports.EditarComponent = EditarComponent;
