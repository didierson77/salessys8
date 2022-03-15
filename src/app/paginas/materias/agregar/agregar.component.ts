import { UsuarioService } from 'src/app/services/service.index';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Materia } from '../../../modelos/materia.model';
import { MateriaService } from '../../../services/materia/materia.service';
import { Usuario } from '../../../modelos/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  costoUnidad: number = 0;
  cantEmp: number = 0;

  materia: Materia = {
    descripcion: '',
  };

  forma: FormGroup = new FormGroup({
    descripcion: new FormControl(null, Validators.required),
    costo: new FormControl(),
    empaque: new FormControl(),
    cantidadxEmpaque: new FormControl(),
    costoxUnidad: new FormControl(),
    unidadMedida: new FormControl(),
  });

  // costo: number = 0;
  // unidadxEmpaque: number = 0;
  // costoxUnidad: number = 0;

  usuario: Usuario = this._usuarioService.usuario;

  constructor(public _materiaService: MateriaService,
    public _usuarioService: UsuarioService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    //console.log(this._usuarioService.token);
    //console.log(this.usuario);

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
      console.log('guardar');
      this.materia.descripcion = this.forma.get('descripcion')!.value;
      this.materia.empaque = this.forma.get('empaque')!.value;
      this.materia.cantxEmpaque = this.forma.get('cantidadxEmpaque')!.value;
      this.materia.costoEmpaque = this.forma.get('costo')!.value;
      this.materia.unidadMedida = this.forma.get('unidadMedida')!.value;
      this.materia.costoxUnidad = this.forma.get('costoxUnidad')!.value;

      console.log(this.materia);
      this._materiaService.agregarMateria(this.materia)
        .subscribe(resp => {
          console.log(resp);
          Swal.fire({
            title: 'Materia Prima agregada',
            text: 'La Materia Prima fue agregada con exito',
            icon: 'success',
            // confirmButtonColor: "#82E0AA",
            // timer: 2000,
          });

          this.router.navigate(['/materias/catalogo']);
        });
    }
    else {
      console.log('forma invalida');
    }
    return;

  }

}
