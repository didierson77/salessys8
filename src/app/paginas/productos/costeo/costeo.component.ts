import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../services/producto/producto.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Materia } from '../../../modelos/materia.model';
import { MateriaService } from '../../../services/materia/materia.service';


import { SubProducto } from 'src/app/modelos/subproducto.model';
import { SubProductoService } from '../../../services/subProducto/sub-producto.service';
import { Costeo } from 'src/app/modelos/costeo.model';

import Swal from 'sweetalert2';

import { jsPDF } from "jspdf";
import { Formula } from '../../../modelos/formula.model';
import { FormulacionService } from 'src/app/services/formulacion/formulacion.service';
import { GeolocalizacionService } from 'src/app/services/service.index';
import { environment } from '../../../../environments/environment.prod';

import * as mapboxgl from 'mapbox-gl';
import { Lugar } from 'src/app/modelos/lugar.model';


@Component({
  selector: 'app-costeo',
  templateUrl: './costeo.component.html',
  styles: []
})
export class CosteoComponent implements OnInit {

  mapa: mapboxgl.Map | undefined;

  lugares: Lugar[] = [{
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



  materias: Materia[] = [];
  producto: Producto | undefined;
  imagenSubir: File | undefined;
  idProd: string = '';


  claveProd: string = '';
  descripcion: string = '';
  unidMedida: string = '';
  cantidad: number = 0;
  precio: number = 0;
  importe: number = 0;

  nuevoMaterial: Formula = new Formula();

  costoTotal: number = 0;
  costoMateria: number = 0;
  manoDeObra: number | undefined = 0;
  totalFormulacion: number = 0;

  cargando: boolean = true;
  materias1: Costeo[] = [];
  formula: Costeo[] = [];

  posicion: [number, number] | undefined;
  posicionMapa: [number, number] | undefined;
  lat: number | undefined;
  long: number | undefined;
  // formulacion: Formula = new Formula();
  formulacion: any[] = [];

  centroDeMapa: [number, number] = [0, 0];
  nivelZoom: number = 0;

  @ViewChild("btn-agregar") btnAgregar: ElementRef | undefined;
  @ViewChild('mapa') divMapa!: ElementRef;

  subProducto: SubProducto = {
    descripcion: '',
    activo: true,
  };



  forma: FormGroup = new FormGroup({
    claveProd: new FormControl(null, Validators.required),
    precio: new FormControl(),
    materia: new FormControl(),
    costo: new FormControl(),
    cantidad: new FormControl(),
    importe: new FormControl(),
    unidadMedida: new FormControl(),
    unidades: new FormControl(),
    costoTotal: new FormControl(),
    costoMateria: new FormControl(),
    manoObra: new FormControl(),
    unidadMedidaProd: new FormControl(),
    costoUnidad: new FormControl(),
    lat: new FormControl(),
  });


  constructor(
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService,
    public _materiaService: MateriaService,
    public _formulacionService: FormulacionService,
    public rutaActiva: ActivatedRoute,
    public router: Router,
    public _geolocalizacion: GeolocalizacionService,
  ) {
    this.idProd = this.rutaActiva.snapshot.params.id;
  }



  //*********************************************************/
  //*     NGONINIT
  //*********************************************************/
  ngOnInit(): void {

    //*****TRAE TODAS LAS MATERIAS PRIMAS PARA LLENAR EL SELECT */
    this._materiaService.getMateriasCosteo()
      .subscribe((resp: any) => {
        this.materias = resp.materias;
        // console.log(resp.materias);
      });
    // this._materiaService.getTodasMaterias().subscribe((resp: any) => {
    //   this.materias = resp.materias;
    //   console.log(this.materias);
    // });

    var output = document.getElementById("salida");
    if (!navigator.geolocation) {
      output!.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }
    else {
      output!.innerHTML = "<p>Geolocation supported by your browser</p>";
    }

    //************Trae los detalles del producto
    this._productoService.getProductoEspecif(this.idProd).subscribe((resp: any) => {
      this.producto = resp.producto;
      console.log(this.producto);
      // if (this.producto?.manoObra) {
      this.forma.get('manoObra')?.setValue(this.producto?.manoObra);
      // }
    });

    //***********Trae las materias primas para el producto seleccionado
    this._formulacionService.getFormula(this.idProd).subscribe((resp: any) => {
      //console.log(resp);
      this.formulacion = resp;
      // console.log(this.formulacion.length);
      this.calculaTotal();
    });




    this._geolocalizacion.obtieneLocalizacionUsuario().then(resp => {
      //console.log(resp);
      this.posicion = resp;
      this.lat = resp[1];
      this.long = resp[0];
      this.posicionMapa = [this.lat, this.long];
      console.log(this.posicion);

    });
    // ///***********NOS SUSCRIBIMOS A LOS CAMBIOS DE LA MANO DE OBRA*********/
    // this.forma.get('manoObra')?.value.subscribe(valor => {
    //   // console.log('cambios');
    //   console.log(valor);

    // });


    // {"lng":-101.22517767951285,"lat":19.702329316087344}  CASA
    // {"lng":-101.13555135984734,"lat":19.731272733619022} TRABAJO
    (mapboxgl as any).accessToken = environment.mapBoxKey;
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
    this.forma.get('claveProd')?.valueChanges.subscribe(changes => {
      // console.log(changes);
      let claveProucto = this.forma.get('claveProd')?.value;
      // console.log(claveProucto);
      if (claveProucto != '') {
        //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "true");
        //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "disabled");
      }


      //********************Trae los detalles de la materia prima seleccionada
      this._materiaService.getMateriaEspecif(changes)
        .subscribe((resp: any) => {
          //console.log(resp);
          this.forma.get('precio')?.setValue(resp.materia.costoxUnidad);
          this.forma.get('unidadMedida')?.setValue(resp.materia.unidadMedida);
          this.forma.get('cantidad')?.setValue(1);
          this.descripcion = resp.materia.descripcion;
        });
    });


    //************Nos suscribimo a los cambios de la cantidad de la materia prima
    this.forma.get('cantidad')?.valueChanges.subscribe(cantidad => {
      // console.log(cantidad);
      let precio = this.forma.get('precio')?.value;
      if (cantidad >= 0) {
        let importe = Number(precio * cantidad).toFixed(3);
        this.forma.get('importe')?.setValue(importe);
      }
      else {
        this.forma.get('cantidad')?.setValue(1);
      }
    });




    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      // Show a map centered at latitude / longitude.
      console.log(latitude);
      this.lat = latitude;
      this.long = longitude;
      console.log(longitude);
      this.forma.get('lat')?.setValue(latitude);
      // console.log(latitude);
      // accuracy

    });

  }
  //*********************************************************/
  //*     FIN DE NgOnInit
  //*********************************************************/



  ngAfterViewInit(): void {

    this.nivelZoom = 13;

    this.getUserLocation();
    // console.log('afterview',this.divMapa);//
    // this.centroDeMapa = [this.lat, this.lng];
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v9', // style URL
      center: [2.168, 41.381], // starting position [lng, lat]
      zoom: this.nivelZoom, // starting zoom
    });

    // Add geolocate control to the map.
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
        // showUserLocation:true,
      })
    );

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
    this.mapa.on('move', (evento) => {
      // console.log(evento);
      const target = evento.target;
      //target.getCenter();
      // console.log(target.getCenter());
      const { lng, lat } = target.getCenter();
      this.centroDeMapa = [lng, lat];
      // console.log('lng:', lng);
      // console.log('lat:', lat);

    });

  }







  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        // console.log('latitud:', this.lat1);
        this.long = position.coords.longitude;
        // console.log('longitud:', this.lng1);
      });
      console.log('longitud:', this.long);
    } else {
      console.log("User not allow")

    }

  }





  //*********************************************************/
  //*     CARGAR INFORMACION
  //*********************************************************/

  cargarInfo() {
    //***********Trae las materias primas para el producto seleccionado
    this._formulacionService.getFormula(this.idProd).subscribe((resp: any) => {
      // console.log(resp);
      this.formulacion = resp;
      this.calculaTotal();
    });
    // this.formulacion.forEach(())
    // this._subProductoService.getSubProductoEspecif(this.id).subscribe((resp: any) => {
    //   // console.log(resp);
    //   this.subProducto = resp.subproducto;
    //   // console.log(this.subProducto);
    // });

  }


  //*********************************************************/
  //*     ACTUALIZA EL COSTO DE LA MANO DE OBRA EN EL PRODUCTO
  //*********************************************************/
  manoObra() {
    this.manoDeObra = this.forma.get('manoObra')?.value;
    this._productoService.manoObra(this.idProd, this.manoDeObra).subscribe(resp => {
      console.log(resp);
    });
    this.calculaTotal();
    //***SE TIENE QUE HACER LA CONSULTA EN EL SERVICIO PRODUCTO PARA ACTUALIZAR EL COSTO DE LA MANO DE OBRA  */
  }


  //*********************************************************/
  //*     AGREGAR MATERIAS PRIMAS
  //*********************************************************/

  agregar() {
    //console.log('agregar');
    this.nuevoMaterial.cantidad = this.forma.get('cantidad')?.value;
    this.nuevoMaterial.matPrima = this.forma.get('claveProd')?.value;
    this.nuevoMaterial.producto = this.idProd;
    this.nuevoMaterial.importe = this.forma.get('importe')?.value;

    if (this.forma.get('claveProd')?.value) {
      // console.log(this.formulacion);
      const descripciones = this.formulacion.map(form => form.elemento.descripcion);
      // console.log(descripciones);
      if (descripciones.indexOf((this.descripcion)) >= 0) {
        Swal.fire({
          title: 'Importante',
          text: 'La Materia Prima ya fue agregada',
          icon: 'warning',
          // confirmButtonColor: "#82E0AA",
          // timer: 2000,
        });
        return;
      }
      else {
        this._formulacionService.agregarMateria(this.nuevoMaterial).subscribe((resp) => {
          // console.log(resp);

          Swal.fire({
            title: 'Materia Prima agregada',
            text: 'La Materia Prima fue agregada con exito',
            icon: 'success',
            // confirmButtonColor: "#82E0AA",
            // timer: 2000,
          });
          this.cargarInfo();
          this.calculaTotal();

        });
        // this.formula.push(nuevoElemento);
        // this.calculaTotal();
      }

      // console.log(this.formulacion);
      // console.log(JSON.stringify(this.formula));

    }
    else {

      Swal.fire({
        title: 'Seleccione Materia Prima',
        text: 'Debe seleccionar una Materia Prima',
        icon: 'success',
        // confirmButtonColor: "#82E0AA",
        // timer: 2000,
      });
    }



  }


  //*********************************************************/
  //*     calcular el totales de costo y mostrar valores en pantalla
  //*********************************************************/
  calculaTotal() {
    // console.log(this.formulacion.length);
    this.costoTotal = 0;
    this.totalFormulacion = 0;
    this.manoDeObra = 0;
    // TODO: FALTA AGREGAR EL NUMERO DE UNIDADES DE LA MEZCLA A UN SERVICIO Y ACTUALIZAR LA COLECCION



    // console.log(this.formulacion.length);
    //    console.log(this.formulacion);
    this._productoService.getProductoEspecif(this.idProd).subscribe((resp: any) => {
      this.producto = resp.producto;
      console.log(this.producto);
      this.forma.get('manoObra')?.setValue(this.producto?.manoObra);
      this.manoDeObra = this.producto?.manoObra;
      // }
    });


    for (let i = 0; i < this.formulacion.length; i++) {
      this.costoTotal += this.formulacion[i].importe;
    }


    for (let i = 0; i < this.formulacion.length; i++) {
      this.totalFormulacion += this.formulacion[i].cantidad;
    }
    console.log(this.totalFormulacion);
    this.forma.get('unidades')?.setValue(this.totalFormulacion);
    this.forma.get('unidadMedidaProd')?.setValue(this.producto?.unidadMedida);
    console.log(this.producto);

    this._productoService.actualizarCosto(this.idProd, this.costoTotal).subscribe((resp: any) => {
      // console.log(resp);
      this.manoDeObra = resp.producto?.manoObra;
      // console.log(this.manoDeObra);

      this.costoMateria = this.costoTotal;
      this.costoTotal += this.manoDeObra!;
      this.forma.get('costoTotal')?.setValue(this.costoTotal.toFixed(3));
      this.forma.get('costoMateria')?.setValue(this.costoMateria.toFixed(3));
      this.forma.get('costoUnidad')?.setValue((this.costoTotal / this.totalFormulacion).toFixed(3));

    });


  }



  eliminar(descrip: string) {

    this._formulacionService.eliminarMateria(descrip)
      .subscribe((resp: any) => {
        Swal.fire({
          title: 'Materia Prima eliminada',
          text: 'La Materia Prima fue eliminada con exito',
          icon: 'success',
          // confirmButtonColor: "#82E0AA",
          // timer: 2000,
        });
        this.cargarInfo();
        this.calculaTotal();
        // console.log(this.idProd);
        // console.log(this.costoTotal);
        this._productoService.actualizarCosto(this.idProd, this.costoTotal).subscribe((resp) => {
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

  }


  guardar() {

  }


  imprimir() {


    // Default export is a4 paper, portrait, using millimeters for units
    //*******primer parametro p(portrait) ó l (landscape) ******** */
    const doc = new jsPDF('p', 'px', 'letter');

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
  }

}













