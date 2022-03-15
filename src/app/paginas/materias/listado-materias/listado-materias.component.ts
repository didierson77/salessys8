import { Component, Inject, OnInit } from '@angular/core';
import { Materia } from '../../../modelos/materia.model';
import { MateriaService } from '../../../services/materia/materia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';

import { Producto } from '../../../modelos/producto.model';
import { ProductoService } from '../../../services/producto/producto.service';



@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styles: [
  ]
})
export class ListadoMateriasComponent implements OnInit {

  materias: Materia[] = [];
  subProductos: Producto[] = [];
  totalRegistros: number = 0;
  pagina: number = 1;
  ultima: number = 0;
  cargando = true;


  constructor(public _materiasService: MateriaService,
    public _productoService: ProductoService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit(): void {
    this.cargarMaterias();
    // this._productoService.getProductos(0).subscribe((resp) => {
    // this.subProductos
    // console.log(resp.productos);
    // });
    //console.log(this.ultima);
  }


  cargarMaterias() {
    this.cargando = true;
    this._materiasService.getMaterias(0).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      // console.log(resp.total);
      this.materias = resp.materias;
      this.ultima = Math.trunc((this.totalRegistros - 1) / 10);
      this.cargando = false;
      // console.log(this.ultima);
    });
  }



  eliminarMateria(materia: Materia) {

    Swal
      .fire({
        title: "Materia prima: " + materia.descripcion,
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí"
          this._materiasService.eliminarMaterias(materia._id!).subscribe((resp: any) => {
            // this.document.location.reload();
            this.cargarMaterias();
          });
        }
      });


  }

  siguiente() {
    // console.log(this.pagina);
    // console.log(this.ultima);
    if (this.pagina <= this.ultima) {
      this.pagina = this.pagina + 1;
    }

    this._materiasService.getMaterias(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      this.materias = resp.materias;
    });

  }


  anterior() {
    // console.log(this.pagina);
    // console.log(this.ultima);
    if (this.pagina > 1) {
      this.pagina = this.pagina - 1;
    }
    this._materiasService.getMaterias(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      this.materias = resp.materias;
    });
  }



  buscar(termino: string) {
    if (termino.length == 0) {
      return;
    }

    if (termino.length < 1) {
      this.cargarMaterias();
      return;
    }

    this.cargando = true;

    console.log(termino);
    this._materiasService.buscarMaterias(termino)
      .subscribe((respuesta: Materia[]) => {
        this.materias = respuesta;
        console.log(respuesta);
        this.cargando = false;
      });
  }

}
