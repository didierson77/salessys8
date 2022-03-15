
import { Component, Inject, OnInit } from '@angular/core';

import { Categoria } from '../../../modelos/categoria.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';


@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
  styleUrls: ['./listado-categorias.component.css']
})
export class ListadoCategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  totalRegistros: number = 0;
  pagina: number = 1;
  ultima: number = 0;
  cargando = true;


  constructor(public _categoriaService: CategoriaService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit(): void {
    this.cargarCategorias();

  }





  cargarCategorias() {
    this.cargando = true;
    this._categoriaService.getCategorias().subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      // console.log(resp.total);
      this.categorias = resp.categorias;
      this.ultima = Math.trunc((this.totalRegistros - 1) / 10);
      this.cargando = false;
      // console.log(this.ultima);
    });
  }



  eliminarCategoria(categoria: Categoria) {
    console.log(categoria);
    Swal
      .fire({
        title: "Categoria: " + categoria.descripcion,
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí"
          this._categoriaService.eliminarCategorias(categoria._id!).subscribe((resp: any) => {
            // this.document.location.reload();
            this.cargarCategorias();
          });
        }
      });


  }


  // siguiente() {
  //   // console.log(this.pagina);
  //   // console.log(this.ultima);
  //   if (this.pagina <= this.ultima) {
  //     this.pagina = this.pagina + 1;
  //   }

  //   this._categoriaService.getCategorias(this.pagina - 1).subscribe((resp: any) => {
  //     //console.log(resp);
  //     this.totalRegistros = resp.total;
  //     this.categorias = resp.categorias;
  //   });
  // }


  // anterior() {
  //   // console.log(this.pagina);
  //   // console.log(this.ultima);
  //   if (this.pagina > 1) {
  //     this.pagina = this.pagina - 1;
  //   }
  //   this._categoriaService.getCategorias(this.pagina - 1).subscribe((resp: any) => {
  //     //console.log(resp);
  //     this.totalRegistros = resp.total;
  //     this.categorias = resp.categorias;
  //   });
  // }

  crearCategoria() {

    Swal.fire({
      title: 'Crear Categoría',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'on'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      // console.log(result.value);
      if (result.value) {
        this._categoriaService.crearCategorias(result.value)
          .subscribe((resp) => {
            // console.log(resp);
            this.cargarCategorias();
          });
        // Swal.fire({
        //   title: `${result.value}`,
        // })
      }
    })




    // Swal
    //   .fire({
    //     title: "Crear Categoria:",
    //     text: "Ingrese el nombre de la categoria",
    //     icon: 'info',
    //     showCancelButton: true,
    //     confirmButtonText: "Aceptar",
    //     cancelButtonText: "Cancelar",
    //   })
    //   .then(valor => {
    //     if (!valor || valor == undefined) {
    //       // Hicieron click en "Sí"
    //       return;
    //     }
    //     else {
    //       // this._categoriaService.crearCategorias(valor).subscribe({

    //       // });

    //       console.log(valor);
    //     }
    //   });
  }


  buscar(termino: string) {
    if (termino.length == 0) {
      return;
    }

    if (termino.length <= 1) {
      this.cargarCategorias();
      return;
    }

    this.cargando = true;

    console.log(termino);
    this._categoriaService.buscarCategorias(termino)
      .subscribe((respuesta: Categoria[]) => {
        this.categorias = respuesta;
        // console.log(respuesta.length);
        this.totalRegistros = respuesta.length;
        this.cargando = false;
      });
  }



}

