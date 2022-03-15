
import { UsuarioService } from 'src/app/services/service.index';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../modelos/usuario.model';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto/producto.service';
import { Producto } from '../../../modelos/producto.model';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Categoria } from '../../../modelos/categoria.model';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})


export class AgregarComponent implements OnInit {

  costoUnidad: number = 0;
  cantEmp: number = 0;

  producto: Producto = {
    descripcion: '',
    activo: false,
  };

  forma: FormGroup = new FormGroup({
    descripcion: new FormControl(null, Validators.required),
    claveInt: new FormControl(),
    categoria: new FormControl(),
    precio: new FormControl(),
    unidadMedida: new FormControl(),
    costo: new FormControl(),
    subProducto: new FormControl(),
  });

  usuario: Usuario = this._usuarioService.usuario;
  categorias!: Categoria[];

  constructor(
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService,
    public _categoriaService: CategoriaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.forma.get('categoria')!.setValue('');

    this._categoriaService.getCategorias().subscribe((resp: any) => {
      // console.log(resp);
      this.categorias = resp.categorias;
      console.log(this.categorias);
    });


    this.forma.get('subProducto')?.valueChanges.subscribe(changes => {
      // console.log(changes);
      let claveProucto = this.forma.get('subProducto')?.value;
      console.log(claveProucto);
      // if (claveProucto != '') {
      //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "true");
      //this.renderer.setAttribute(this.btnAgregar!.nativeElement, "disabled", "disabled");
      this.producto.subProducto = claveProucto;
      // }
      console.log(this.producto);
    });


  }


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


  guardar() {
    if (this.forma.valid) {
      console.log('guardar');

      this.producto.descripcion = this.forma.get('descripcion')!.value;
      this.producto.claveInt = this.forma.get('claveInt')!.value;
      this.producto.categoria = this.forma.get('categoria')!.value;
      this.producto.precio = this.forma.get('precio')!.value;
      this.producto.unidadMedida = this.forma.get('unidadMedida')!.value;
      this.producto.costo = this.forma.get('costo')!.value;

      console.log(this.producto);
      this._productoService.agregarProducto(this.producto)
        .subscribe(

          resp => {
            console.log(resp);
            this.router.navigate(['/productos/catalogo']);
          },
          err => {
            console.log(err.error.error);
            if (err.error.error.code) {

              Swal.fire({
                title: 'Clave Interna, Ya Existe',
                text: 'La Clave Interna debe ser única',
                icon: 'error',
                // confirmButtonColor: "#82E0AA",
                timer: 1500,
              });
              // console.log('clave interna');
            }
            if (err.error.error.errors.categoria) {
              Swal.fire({
                title: 'Seleccione una Categoria',
                text: 'Debe asignarle una categoria al producto',
                icon: 'error',
                // confirmButtonColor: "#82E0AA",
                timer: 1500,
              });

              console.log('categoria');
            }

          }
        );
    }
    else {
      console.log('forma invalida');
    }
    return;

  }



}

