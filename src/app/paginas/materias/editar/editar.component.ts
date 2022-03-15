
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Materia } from 'src/app/modelos/materia.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { UsuarioService } from 'src/app/services/service.index';
import { SubirArchivoService } from '../../../services/subirArchivo/subir-archivo.service';


import { ROJO } from 'src/app/config/config';
import { VERDE } from 'src/app/config/config';
import { TIEMPO_MENSAJE } from 'src/app/config/config';



import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styles: [
  ]
})
export class EditarComponent implements OnInit {

  usuario: Usuario = this._usuarioService.usuario;

  materia: Materia = {
    descripcion: '',
  };
  id: string = '';

  costoUnidad: number = 0;
  cantEmp: number = 0;
  imagenSubir: File | undefined;
  imagen: string = '';
  imagenTemp: string = '';

  forma: FormGroup = new FormGroup({
    descripcion: new FormControl(null, Validators.required),
    costo: new FormControl(),
    empaque: new FormControl(),
    cantidadxEmpaque: new FormControl(),
    costoxUnidad: new FormControl(),
    unidadMedida: new FormControl(),
  });


  constructor(public _materiaService: MateriaService,
    public _usuarioService: UsuarioService,
    public rutaActiva: ActivatedRoute,
    public router: Router,
    public _subirArchivoService: SubirArchivoService

  ) {
    this.id = this.rutaActiva.snapshot.params.id;
  }


  ngOnInit(): void {
    //console.log(this._usuarioService.token);
    //console.log(this.usuario);
    //console.log(this.id);
    this.cargarMateria(this.id);
    //console.log(this.materia);
  }

  cargarMateria(id: string) {
    this._materiaService.getMateriaEspecif(id).subscribe((resp: any) => {
      //console.log(resp);
      this.materia = resp.materia;
      console.log(this.materia);
      this.forma.get('descripcion')!.setValue(this.materia?.descripcion);
      this.forma.get('empaque')!.setValue(this.materia?.empaque);
      this.forma.get('cantidadxEmpaque')!.setValue(this.materia?.cantxEmpaque);
      this.forma.get('unidadMedida')!.setValue(this.materia?.unidadMedida);
      this.forma.get('costo')!.setValue(this.materia?.costoEmpaque);
      this.forma.get('costoxUnidad')!.setValue(this.materia?.costoxUnidad);
      this.imagen = this.materia.img || '';
    });
  }


  calcular() {

    let costo = this.forma.get('costo')!.value || 0;
    let cantidadxEmpaque = this.forma.get('cantidadxEmpaque')!.value || 1;;

    if (cantidadxEmpaque > 0) {
      this.costoUnidad = Number(costo / cantidadxEmpaque);
      this.costoUnidad = Number(this.costoUnidad.toFixed(3));
      this.forma.get('costoxUnidad')!.setValue(this.costoUnidad);
    }
    else {
      //  this.forma.get('cantidadxEmpaque')!.setValue(1);
      this.costoUnidad = Number(costo / cantidadxEmpaque);
      this.costoUnidad = Number(this.costoUnidad.toFixed(3));
      this.forma.get('costoxUnidad')!.setValue(this.costoUnidad);
    }
  }


  guardar() {
    if (this.forma.valid) {
      //console.log('guardar1');
      this.materia.descripcion = this.forma.get('descripcion')!.value;
      this.materia.empaque = this.forma.get('empaque')!.value;
      this.materia.cantxEmpaque = this.forma.get('cantidadxEmpaque')!.value;
      this.materia.costoEmpaque = this.forma.get('costo')!.value;
      this.materia.unidadMedida = this.forma.get('unidadMedida')!.value;
      this.materia.costoxUnidad = this.forma.get('costoxUnidad')!.value;

      // console.log(this.materia);
      this._materiaService.actualizarMateria(this.materia)
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
            text: 'Materia Prima actualizada',
            icon: 'success',
            confirmButtonColor: VERDE,
            timer: TIEMPO_MENSAJE,
          });
          this.router.navigate(['/materias/catalogo']);
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
    let id = this.materia._id;

    // console.log(this.materia._id);

    // archivo: File, id: string
    this._subirArchivoService.subirArchivo(archivo!, 'materias', id!)
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
        this.imagen = resp.materia.img;
      })
      .catch(resp => {
        console.log(resp);
      });

  }


}
