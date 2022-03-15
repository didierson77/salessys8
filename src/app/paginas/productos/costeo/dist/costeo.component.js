"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CosteoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var jspdf_1 = require("jspdf");
var formula_model_1 = require("../../../modelos/formula.model");
var environment_prod_1 = require("../../../../environments/environment.prod");
var mapboxgl = require("mapbox-gl");
var CosteoComponent = /** @class */ (function () {
    function CosteoComponent(_productoService, _usuarioService, _materiaService, _formulacionService, rutaActiva, router, _geolocalizacion) {
        this._productoService = _productoService;
        this._usuarioService = _usuarioService;
        this._materiaService = _materiaService;
        this._formulacionService = _formulacionService;
        this.rutaActiva = rutaActiva;
        this.router = router;
        this._geolocalizacion = _geolocalizacion;
        this.lugares = [{
                id: '1',
                nombre: 'Fernando',
                lng: -75.75512993582937,
                lat: 45.349977429009954,
                color: '#dd8fee'
            },
            {
                id: '2',
                nombre: 'Amy',
                lng: -75.75195645527508,
                lat: 45.351584045823756,
                color: '#790af0'
            },
            {
                id: '3',
                nombre: 'Orlando',
                lng: -75.75900589557777,
                lat: 45.34794635758547,
                color: '#19884b'
            }];
        this.materias = [];
        this.idProd = '';
        this.claveProd = '';
        this.descripcion = '';
        this.unidMedida = '';
        this.cantidad = 0;
        this.precio = 0;
        this.importe = 0;
        this.nuevoMaterial = new formula_model_1.Formula();
        this.costoTotal = 0;
        this.costoMateria = 0;
        this.manoDeObra = 0;
        this.totalFormulacion = 0;
        this.cargando = true;
        this.materias1 = [];
        this.formula = [];
        // formulacion: Formula = new Formula();
        this.formulacion = [];
        this.centroDeMapa = [0, 0];
        this.nivelZoom = 0;
        this.subProducto = {
            descripcion: '',
            activo: true
        };
        this.forma = new forms_1.FormGroup({
            claveProd: new forms_1.FormControl(null, forms_1.Validators.required),
            precio: new forms_1.FormControl(),
            materia: new forms_1.FormControl(),
            costo: new forms_1.FormControl(),
            cantidad: new forms_1.FormControl(),
            importe: new forms_1.FormControl(),
            unidadMedida: new forms_1.FormControl(),
            unidades: new forms_1.FormControl(),
            costoTotal: new forms_1.FormControl(),
            costoMateria: new forms_1.FormControl(),
            manoObra: new forms_1.FormControl(),
            unidadMedidaProd: new forms_1.FormControl(),
            costoUnidad: new forms_1.FormControl(),
            lat: new forms_1.FormControl()
        });
        this.idProd = this.rutaActiva.snapshot.params.id;
    }
    //*********************************************************/
    //*     NGONINIT
    //*********************************************************/
    CosteoComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b;
        //*****TRAE TODAS LAS MATERIAS PRIMAS PARA LLENAR EL SELECT */
        this._materiaService.getMateriasCosteo()
            .subscribe(function (resp) {
            _this.materias = resp.materias;
            // console.log(resp.materias);
        });
        // this._materiaService.getTodasMaterias().subscribe((resp: any) => {
        //   this.materias = resp.materias;
        //   console.log(this.materias);
        // });
        var output = document.getElementById("salida");
        if (!navigator.geolocation) {
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }
        else {
            output.innerHTML = "<p>Geolocation supported by your browser</p>";
        }
        //************Trae los detalles del producto
        this._productoService.getProductoEspecif(this.idProd).subscribe(function (resp) {
            var _a, _b;
            _this.producto = resp.producto;
            console.log(_this.producto);
            // if (this.producto?.manoObra) {
            (_a = _this.forma.get('manoObra')) === null || _a === void 0 ? void 0 : _a.setValue((_b = _this.producto) === null || _b === void 0 ? void 0 : _b.manoObra);
            // }
        });
        //***********Trae las materias primas para el producto seleccionado
        this._formulacionService.getFormula(this.idProd).subscribe(function (resp) {
            //console.log(resp);
            _this.formulacion = resp;
            // console.log(this.formulacion.length);
            _this.calculaTotal();
        });
        this._geolocalizacion.obtieneLocalizacionUsuario().then(function (resp) {
            //console.log(resp);
            _this.posicion = resp;
            _this.lat = resp[1];
            _this.long = resp[0];
            _this.posicionMapa = [_this.lat, _this.long];
            console.log(_this.posicion);
        });
        // ///***********NOS SUSCRIBIMOS A LOS CAMBIOS DE LA MANO DE OBRA*********/
        // this.forma.get('manoObra')?.value.subscribe(valor => {
        //   // console.log('cambios');
        //   console.log(valor);
        // });
        // {"lng":-101.22517767951285,"lat":19.702329316087344}  CASA
        // {"lng":-101.13555135984734,"lat":19.731272733619022} TRABAJO
        mapboxgl.accessToken = environment_prod_1.environment.mapBoxKey;
        // console.log(this.lat);
        // console.log(this.long);
        // this.mapa = new mapboxgl.Map({
        //   // accessToken: environment.mapBoxKey,
        //   container: 'mapa', // container ID
        //   style: 'mapbox://styles/mapbox/streets-v11', // style URL
        //   center: [-101.22517767951285, 19.702329316087344], // starting position
        //   zoom: 16.6 // starting zoom
        // });
        // Add zoom and rotation controls to the map.
        // this.mapa.addControl(new mapboxgl.NavigationControl());
        // Add geolocate control to the map.
        // this.mapa.addControl(
        //   new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //       enableHighAccuracy: true
        //     },
        //   })
        // );
        //************Nos suscribimos a los cambios del select
        (_a = this.forma.get('claveProd')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (changes) {
            var _a;
            // console.log(changes);
            var claveProucto = (_a = _this.forma.get('claveProd')) === null || _a === void 0 ? void 0 : _a.value;
            // console.log(claveProucto);
            if (claveProucto != '') {
                //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "true");
                //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "disabled");
            }
            //********************Trae los detalles de la materia prima seleccionada
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
        //************Nos suscribimo a los cambios de la cantidad de la materia prima
        (_b = this.forma.get('cantidad')) === null || _b === void 0 ? void 0 : _b.valueChanges.subscribe(function (cantidad) {
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
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(function (position) {
            var _a;
            var _b = position.coords, latitude = _b.latitude, longitude = _b.longitude;
            // Show a map centered at latitude / longitude.
            console.log(latitude);
            _this.lat = latitude;
            _this.long = longitude;
            console.log(longitude);
            (_a = _this.forma.get('lat')) === null || _a === void 0 ? void 0 : _a.setValue(latitude);
            // console.log(latitude);
            // accuracy
        });
    };
    //*********************************************************/
    //*     FIN DE NgOnInit
    //*********************************************************/
    CosteoComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.nivelZoom = 13;
        this.getUserLocation();
        // console.log('afterview',this.divMapa);//
        // this.centroDeMapa = [this.lat, this.lng];
        this.mapa = new mapboxgl.Map({
            container: this.divMapa.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [2.168, 41.381],
            zoom: this.nivelZoom
        });
        // Add geolocate control to the map.
        this.mapa.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        }));
        // this.leerLocalStorage();
        // Create a default Marker and add it to the map.
        // console.log(this.lng1);
        // const markerHTML:HTMLElement=document.createElement('div');
        // markerHTML.innerHTML='Hola Mundo';
        // const marker1 = new mapboxgl.Marker()
        //   // {
        //   //             element: markerHTML,
        //   // }
        //   .setLngLat(this.centroDeMapa)
        //   .addTo(this.mapa);
        //*AL MOVER EL MAPA
        this.mapa.on('move', function (evento) {
            // console.log(evento);
            var target = evento.target;
            //target.getCenter();
            // console.log(target.getCenter());
            var _a = target.getCenter(), lng = _a.lng, lat = _a.lat;
            _this.centroDeMapa = [lng, lat];
            // console.log('lng:', lng);
            // console.log('lat:', lat);
        });
    };
    CosteoComponent.prototype.getUserLocation = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.lat = position.coords.latitude;
                // console.log('latitud:', this.lat1);
                _this.long = position.coords.longitude;
                // console.log('longitud:', this.lng1);
            });
            console.log('longitud:', this.long);
        }
        else {
            console.log("User not allow");
        }
    };
    //*********************************************************/
    //*     CARGAR INFORMACION
    //*********************************************************/
    CosteoComponent.prototype.cargarInfo = function () {
        var _this = this;
        //***********Trae las materias primas para el producto seleccionado
        this._formulacionService.getFormula(this.idProd).subscribe(function (resp) {
            // console.log(resp);
            _this.formulacion = resp;
            _this.calculaTotal();
        });
        // this.formulacion.forEach(())
        // this._subProductoService.getSubProductoEspecif(this.id).subscribe((resp: any) => {
        //   // console.log(resp);
        //   this.subProducto = resp.subproducto;
        //   // console.log(this.subProducto);
        // });
    };
    //*********************************************************/
    //*     ACTUALIZA EL COSTO DE LA MANO DE OBRA EN EL PRODUCTO
    //*********************************************************/
    CosteoComponent.prototype.manoObra = function () {
        var _a;
        this.manoDeObra = (_a = this.forma.get('manoObra')) === null || _a === void 0 ? void 0 : _a.value;
        this._productoService.manoObra(this.idProd, this.manoDeObra).subscribe(function (resp) {
            console.log(resp);
        });
        this.calculaTotal();
        //***SE TIENE QUE HACER LA CONSULTA EN EL SERVICIO PRODUCTO PARA ACTUALIZAR EL COSTO DE LA MANO DE OBRA  */
    };
    //*********************************************************/
    //*     AGREGAR MATERIAS PRIMAS
    //*********************************************************/
    CosteoComponent.prototype.agregar = function () {
        var _this = this;
        var _a, _b, _c, _d;
        //console.log('agregar');
        this.nuevoMaterial.cantidad = (_a = this.forma.get('cantidad')) === null || _a === void 0 ? void 0 : _a.value;
        this.nuevoMaterial.matPrima = (_b = this.forma.get('claveProd')) === null || _b === void 0 ? void 0 : _b.value;
        this.nuevoMaterial.producto = this.idProd;
        this.nuevoMaterial.importe = (_c = this.forma.get('importe')) === null || _c === void 0 ? void 0 : _c.value;
        if ((_d = this.forma.get('claveProd')) === null || _d === void 0 ? void 0 : _d.value) {
            // console.log(this.formulacion);
            var descripciones = this.formulacion.map(function (form) { return form.elemento.descripcion; });
            // console.log(descripciones);
            if (descripciones.indexOf((this.descripcion)) >= 0) {
                sweetalert2_1["default"].fire({
                    title: 'Importante',
                    text: 'La Materia Prima ya fue agregada',
                    icon: 'warning'
                });
                return;
            }
            else {
                this._formulacionService.agregarMateria(this.nuevoMaterial).subscribe(function (resp) {
                    // console.log(resp);
                    sweetalert2_1["default"].fire({
                        title: 'Materia Prima agregada',
                        text: 'La Materia Prima fue agregada con exito',
                        icon: 'success'
                    });
                    _this.cargarInfo();
                    _this.calculaTotal();
                });
                // this.formula.push(nuevoElemento);
                // this.calculaTotal();
            }
            // console.log(this.formulacion);
            // console.log(JSON.stringify(this.formula));
        }
        else {
            sweetalert2_1["default"].fire({
                title: 'Seleccione Materia Prima',
                text: 'Debe seleccionar una Materia Prima',
                icon: 'success'
            });
        }
    };
    //*********************************************************/
    //*     calcular el totales de costo y mostrar valores en pantalla
    //*********************************************************/
    CosteoComponent.prototype.calculaTotal = function () {
        var _this = this;
        var _a, _b, _c;
        // console.log(this.formulacion.length);
        this.costoTotal = 0;
        this.totalFormulacion = 0;
        this.manoDeObra = 0;
        // TODO: FALTA AGREGAR EL NUMERO DE UNIDADES DE LA MEZCLA A UN SERVICIO Y ACTUALIZAR LA COLECCION
        // console.log(this.formulacion.length);
        //    console.log(this.formulacion);
        this._productoService.getProductoEspecif(this.idProd).subscribe(function (resp) {
            var _a, _b, _c;
            _this.producto = resp.producto;
            console.log(_this.producto);
            (_a = _this.forma.get('manoObra')) === null || _a === void 0 ? void 0 : _a.setValue((_b = _this.producto) === null || _b === void 0 ? void 0 : _b.manoObra);
            _this.manoDeObra = (_c = _this.producto) === null || _c === void 0 ? void 0 : _c.manoObra;
            // }
        });
        for (var i = 0; i < this.formulacion.length; i++) {
            this.costoTotal += this.formulacion[i].importe;
        }
        for (var i = 0; i < this.formulacion.length; i++) {
            this.totalFormulacion += this.formulacion[i].cantidad;
        }
        console.log(this.totalFormulacion);
        (_a = this.forma.get('unidades')) === null || _a === void 0 ? void 0 : _a.setValue(this.totalFormulacion);
        (_b = this.forma.get('unidadMedidaProd')) === null || _b === void 0 ? void 0 : _b.setValue((_c = this.producto) === null || _c === void 0 ? void 0 : _c.unidadMedida);
        console.log(this.producto);
        this._productoService.actualizarCosto(this.idProd, this.costoTotal).subscribe(function (resp) {
            var _a, _b, _c, _d;
            // console.log(resp);
            _this.manoDeObra = (_a = resp.producto) === null || _a === void 0 ? void 0 : _a.manoObra;
            // console.log(this.manoDeObra);
            _this.costoMateria = _this.costoTotal;
            _this.costoTotal += _this.manoDeObra;
            (_b = _this.forma.get('costoTotal')) === null || _b === void 0 ? void 0 : _b.setValue(_this.costoTotal.toFixed(3));
            (_c = _this.forma.get('costoMateria')) === null || _c === void 0 ? void 0 : _c.setValue(_this.costoMateria.toFixed(3));
            (_d = _this.forma.get('costoUnidad')) === null || _d === void 0 ? void 0 : _d.setValue((_this.costoTotal / _this.totalFormulacion).toFixed(3));
        });
    };
    CosteoComponent.prototype.eliminar = function (descrip) {
        var _this = this;
        this._formulacionService.eliminarMateria(descrip)
            .subscribe(function (resp) {
            sweetalert2_1["default"].fire({
                title: 'Materia Prima eliminada',
                text: 'La Materia Prima fue eliminada con exito',
                icon: 'success'
            });
            _this.cargarInfo();
            _this.calculaTotal();
            // console.log(this.idProd);
            // console.log(this.costoTotal);
            _this._productoService.actualizarCosto(_this.idProd, _this.costoTotal).subscribe(function (resp) {
                // console.log(resp);
            });
            // console.log(resp);
        });
        // const ids = this.formula.map(el => el.claveProd);
        // console.log(ids);
        // let posicion = ids.indexOf(descrip);
        // console.log(posicion);
        // this.formula.splice(posicion, 1);
        // console.log(this.formula);
        // this.calculaTotal();
        // console.log(JSON.stringify(this.formula));
    };
    CosteoComponent.prototype.guardar = function () {
    };
    CosteoComponent.prototype.imprimir = function () {
        // Default export is a4 paper, portrait, using millimeters for units
        //*******primer parametro p(portrait) ó l (landscape) ******** */
        var doc = new jspdf_1.jsPDF('p', 'px', 'letter');
        doc.rect(20, 20, 400, 100);
        //doc.text("Hello world!", 10, 10);
        // doc.rect(20, 20, 10, 10); // empty square
        // doc.rect(40, 20, 10, 10, 'F'); // filled square
        // doc.setDrawColor(255, 0, 0);
        // doc.rect(60, 20, 10, 10); // empty red square
        // doc.setDrawColor(255, 0, 0);
        // doc.rect(80, 20, 10, 10, 'FD'); // filled square with red borders
        // doc.setDrawColor(0);
        // doc.setFillColor(255, 0, 0);
        // doc.rect(100, 20, 10, 10, 'F'); // filled red square
        // doc.setDrawColor(0);
        // doc.setFillColor(255, 0, 0);
        // doc.rect(120, 20, 10, 10, 'FD'); // filled red square with black borders
        // doc.setDrawColor(0);
        // doc.setFillColor(255, 255, 255);
        // doc.roundedRect(140, 20, 10, 10, 3, 3, 'FD'); //  Black sqaure with rounded cornerssquare with red borders
        // doc.line(20, 20, 60, 20); // horizontal line
        // doc.setLineWidth(0.5);
        // doc.line(20, 25, 60, 25);
        // doc.setLineWidth(1);
        // doc.line(20, 30, 60, 30);
        // doc.setLineWidth(1.5);
        // doc.line(20, 35, 60, 35);
        // doc.setDrawColor(255, 0, 0); // draw red lines
        // doc.setLineWidth(0.1);
        // doc.line(100, 20, 100, 60); // vertical line
        // doc.setLineWidth(0.5);
        // doc.line(105, 20, 105, 60);
        // doc.setLineWidth(1);
        // doc.line(110, 20, 110, 60);
        // doc.setLineWidth(1.5);
        // doc.line(115, 20, 115, 60);
        doc.save("ejemplo.pdf");
    };
    __decorate([
        core_1.ViewChild("btn-agregar")
    ], CosteoComponent.prototype, "btnAgregar");
    __decorate([
        core_1.ViewChild('mapa')
    ], CosteoComponent.prototype, "divMapa");
    CosteoComponent = __decorate([
        core_1.Component({
            selector: 'app-costeo',
            templateUrl: './costeo.component.html',
            styles: []
        })
    ], CosteoComponent);
    return CosteoComponent;
}());
exports.CosteoComponent = CosteoComponent;
