import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubirArchivoService } from 'src/app/services/service.index';
import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../services/producto/producto.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';


import { ROJO } from 'src/app/config/config';
import { VERDE } from 'src/app/config/config';
import { TIEMPO_MENSAJE } from 'src/app/config/config';

import Swal from 'sweetalert2';
import { Categoria } from 'src/app/modelos/categoria.model';
import { CategoriaService } from '../../../services/categoria/categoria.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styles: [
  ]
})
export class EditarProductoComponent implements OnInit {




  id: string = '';

  costoUnidad: number = 0;
  cantEmp: number = 0;
  imagenSubir: File | undefined;
  imagen: string = '';
  imagenTemp: string = '';

  categorias: Categoria[] = [];
  producto: Producto | undefined;

  forma: FormGroup = new FormGroup({
    descripcion: new FormControl(null, Validators.required),
    activo: new FormControl(),
    categoria: new FormControl(),
    claveInt: new FormControl(),
    precio: new FormControl(),
    subProducto: new FormControl(),
    existencia: new FormControl(),
    costo: new FormControl(),
    empaque: new FormControl(),
    unidadMedida: new FormControl(),
  });



  constructor(
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService,
    public _categoriasService: CategoriaService,
    public rutaActiva: ActivatedRoute,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.id = this.rutaActiva.snapshot.params.id
  }

  ngOnInit(): void {
    this._categoriasService.getCategorias().subscribe((resp: any) => {
      this.categorias = resp.categorias;
      // console.log(this.categorias);
    });

    this.cargarProducto(this.id);

    //************Nos suscribimos a los cambios del select
    this.forma.get('subProducto')?.valueChanges.subscribe(changes => {
      // console.log(changes);
      // console.log(this.forma.get('subProducto')?.value);

    });

  }


  cargarProducto(id: string) {
    this._productoService.getProductoEspecif(id).subscribe((resp: any) => {
      // console.log(resp);
      this.producto = resp.producto;
      // console.log(this.producto);
      this.forma.get('descripcion')!.setValue(this.producto?.descripcion);
      this.forma.get('activo')!.setValue(this.producto?.activo);
      this.forma.get('categoria')!.setValue(this.producto?.categoria?._id);
      this.forma.get('claveInt')!.setValue(this.producto?.claveInt);
      this.forma.get('precio')!.setValue(this.producto?.precio);
      this.forma.get('existencia')!.setValue(this.producto?.existencia);
      this.forma.get('unidadMedida')!.setValue(this.producto?.unidadMedida);
      this.forma.get('costo')!.setValue(this.producto?.costo);
      this.forma.get('subProducto')!.setValue(this.producto?.subProducto);

      this.imagen = this.producto?.img || '';
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
      //console.log('guardar1');


      this.producto!.descripcion = this.forma.get('descripcion')!.value;
      this.producto!.activo = this.forma.get('activo')!.value;
      this.producto!.categoria = this.forma.get('categoria')!.value;
      this.producto!.claveInt = this.forma.get('claveInt')!.value;
      this.producto!.precio = this.forma.get('precio')!.value;
      this.producto!.existencia = this.forma.get('existencia')!.value;
      this.producto!.unidadMedida = this.forma.get('unidadMedida')!.value;
      this.producto!.costo = this.forma.get('costo')!.value;
      this.producto!.subProducto = this.forma.get('subProducto')!.value;



      console.log(this.producto);
      this._productoService.actualizarProducto(this.producto!)
        .subscribe(resp => {
          console.log(resp);
          Swal.fire({
            title: 'Importante',
            showClass: {
              popup: 'animate__animated animate__fadeIn'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut'
            },
            text: 'Producto actualizado',
            icon: 'success',
            confirmButtonColor: VERDE,
            timer: TIEMPO_MENSAJE,
          });
          this.router.navigate(['/productos/catalogo']);
        },
          error => {
            // console.log(error.error.mensaje);
            Swal.fire({
              title: 'Registro NO actualizado:',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              text: error.error.mensaje,
              icon: 'error',
              confirmButtonColor: ROJO,
              timer: TIEMPO_MENSAJE,
            });
          }
        );
    }
    else {
      console.log('forma invalida');

    }
    return;
  }



  seleccionImagen(event: Event) {

    if (!event) {
      this.imagenSubir = undefined;
      return;
    }


    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    let archivo: File;
    if (fileList) {
      archivo = fileList[0];
      console.log("FileUpload -> files", archivo);


      if (archivo.type.indexOf('image') < 0) {
        Swal.fire({
          title: 'Solo imagenes',
          text: 'El archivo seleccionado no es una imagen',
          icon: 'error',
          confirmButtonColor: "#82E0AA ",
          timer: 2000,
        });
        this.imagenSubir = undefined;
        return;
      }



      this.imagenSubir = archivo;

      let reader = new FileReader();
      let urlImagenTemp = reader.readAsDataURL(archivo);

      reader.onloadend = () => {
        // console.log(reader.result);
        this.imagenTemp = String(reader.result);
      }

    }


  }



  cambiarImagen() {
    let archivo = this.imagenSubir;
    let id = this.producto!._id;

    // console.log(this.materia._id);

    // archivo: File, id: string
    this._subirArchivoService.subirArchivo(archivo!, 'productos', id!)
      .then((resp: any) => {

        Swal.fire({
          title: 'Importante',
          text: 'Imagen actualizada',
          icon: 'success',
          confirmButtonColor: "#82E0AA",
          timer: 2000,
        });
        console.log(resp);
        // console.log(resp.materia.img);
        this.imagen = resp.producto.img;
      })
      .catch(resp => {
        console.log(resp);
      });

  }


}


