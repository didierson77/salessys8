import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';
import Swal from 'sweetalert2';

import { Producto } from '../../../modelos/producto.model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  productos: Producto[] = [];
  totalRegistros: number = 0;
  pagina: number = 1;
  ultima: number = 0;
  cargando = true;


  constructor(public _productoService: ProductoService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document) { }



  ngOnInit(): void {
    this.cargarProductos();
    //console.log(this.ultima);
  }

  cargarProductos() {
    this.cargando = true;
    this._productoService.getProductos(0).subscribe((resp: any) => {
      // console.log(resp);
      this.totalRegistros = resp.Total;
      //console.log(resp.productos);
      this.productos = resp.productos;
      this.ultima = Math.trunc((this.totalRegistros - 1) / 10);
      this.cargando = false;
      // console.log(this.ultima);
    });
  }


  eliminarProducto(producto: Producto) {

    Swal
      .fire({
        title: "Producto: " + producto.descripcion,
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí"
          this._productoService.eliminarProducto(producto._id!).subscribe((resp: any) => {
            // this.document.location.reload();
            this.cargarProductos();
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

    this._productoService.getProductos(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.Total;
      this.productos = resp.productos;
    });

  }


  anterior() {
    //console.log(this.pagina);
    //console.log(this.ultima);
    if (this.pagina > 1) {
      this.pagina = this.pagina - 1;
    }
    this._productoService.getProductos(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.Total;
      this.productos = resp.productos;
    });
  }



  buscar(termino: string) {

    if (termino.length == 0) {
      //console.log('cero');
      //this.cargarProductos();
      return;
    }

    if (termino.length <= 1) {
      //console.log('menor a uno');
      this.cargarProductos();
      return;
    }

    this.cargando = true;

    //console.log(termino);
    this._productoService.buscarProductos(termino)
      .subscribe((respuesta: Producto[]) => {
        this.productos = respuesta;
        //console.log(respuesta);
        this.cargando = false;
      });
  }





}
















