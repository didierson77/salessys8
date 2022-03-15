
import { ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../../../services/usuario/usuario.service';

import { MateriaService } from '../../../services/materia/materia.service';
import { SubProducto } from 'src/app/modelos/subproducto.model';
import { SubProductoService } from '../../../services/subProducto/sub-producto.service';
import { Costeo } from 'src/app/modelos/costeo.model';

import { Component, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-costeo-sub-productos',
  templateUrl: './costeo-sub-productos.component.html',
  styles: [
  ]
})

export class CosteoSubProductosComponent implements OnInit {
  claveProd: string = '';
  descripcion: string = '';
  unidMedida: string = '';
  cantidad: number = 0;
  precio: number = 0;
  importe: number = 0;

  costoTotal: number = 0;

  cargando: boolean = true;
  materias: Costeo[] = [];
  formula: Costeo[] = [];

  @ViewChild("btn-agregar") btnAgregar: ElementRef | undefined;

  subProducto: SubProducto = {
    descripcion: '',
    activo: true,
  };
  imagenSubir: File | undefined;

  id: string = '';


  forma: FormGroup = new FormGroup({
    claveProd: new FormControl(null, Validators.required),
    precio: new FormControl(),
    materia: new FormControl(),
    costo: new FormControl(),
    cantidad: new FormControl(),
    importe: new FormControl(),
    unidadMedida: new FormControl(),
    costoTotal: new FormControl(),

  });



  constructor(
    public _subProductoService: SubProductoService,
    public _usuarioService: UsuarioService,
    public _materiaService: MateriaService,
    public rutaActiva: ActivatedRoute,
    public router: Router,
    private renderer: Renderer2

  ) {
    this.id = this.rutaActiva.snapshot.params.id;
  }

  ngOnInit(): void {
    this.forma.get('claveProd')?.setValue('');
    this.cargarInfo();

    this._materiaService.getMateriasCosteo()
      .subscribe((resp: any) => {
        this.materias = resp.materias;
        //console.log(resp.materias);
      });

    this.forma.get('claveProd')?.valueChanges.subscribe(changes => {
      // console.log(changes);
      let claveProucto = this.forma.get('claveProd')?.value;
      console.log(claveProucto);
      if (claveProucto != '') {
        //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "true");
        //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "disabled");
      }


      this._materiaService.getMateriaEspecif(changes)
        .subscribe((resp: any) => {
          //console.log(resp);
          this.forma.get('precio')?.setValue(resp.materia.costoxUnidad);
          this.forma.get('unidadMedida')?.setValue(resp.materia.unidadMedida);
          this.forma.get('cantidad')?.setValue(1);
          this.descripcion = resp.materia.descripcion;
        });

    });




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

  }

  cargarInfo() {

    this._subProductoService.getSubProductoEspecif(this.id).subscribe((resp: any) => {
      // console.log(resp);
      this.subProducto = resp.subproducto;
      // console.log(this.subProducto);
    });

  }


  agregar() {
    //console.log('agregar');
    this.claveProd = this.forma.get('claveProd')?.value;
    this.precio = this.forma.get('precio')?.value;
    this.cantidad = this.forma.get('cantidad')?.value;
    this.unidMedida = this.forma.get('unidadMedida')?.value;
    this.importe = this.forma.get('importe')?.value;


    //console.log(this.descripcion);


    var nuevoElemento: Costeo = {
      claveProd: (this.claveProd),
      descripcion: (this.descripcion),
      unidadMedida: (this.unidMedida),
      cantidad: (this.cantidad),
      costoxUnidad: (this.precio),
      importe: (this.importe)
    };

    const descripciones = this.formula.map(elemento => elemento.descripcion);
    console.log();
    console.log(descripciones);
    if (descripciones.indexOf((this.descripcion)) >= 0) {
      Swal.fire({
        title: 'Importante',
        text: 'La Materia Prima ya fue agregada',
        icon: 'warning',
        // confirmButtonColor: "#82E0AA",
        timer: 2000,
      });

      return;
    }
    else {
      this.formula.push(nuevoElemento);
      this.calculaTotal();

    }

    console.log(this.formula);
    console.log(JSON.stringify(this.formula));
  }



  calculaTotal() {
    const totales = this.formula.map(el => el.importe);
    let total = 0;
    for (let i of totales) total += Number(i);
    this.costoTotal = total;
    // console.log(total)
    this.forma.get('costoTotal')?.setValue(total.toFixed(3));
  }



  eliminar(descrip: string) {
    const ids = this.formula.map(el => el.claveProd);
    console.log(ids);
    let posicion = ids.indexOf(descrip);
    console.log(posicion);
    this.formula.splice(posicion, 1);
    console.log(this.formula);
    this.calculaTotal();
    console.log(JSON.stringify(this.formula));
  }

  guardar() {

  }






}



