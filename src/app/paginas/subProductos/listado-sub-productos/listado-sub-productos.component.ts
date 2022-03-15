import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SubProducto } from '../../../modelos/subproducto.model';
import { SubProductoService } from '../../../services/subProducto/sub-producto.service';



@Component({
  selector: 'app-listado-sub-productos',
  templateUrl: './listado-sub-productos.component.html',
  styles: [
  ]
})
export class ListadoSubProductosComponent implements OnInit {

  subProductos: SubProducto[] = [];
  totalRegistros: number = 0;
  pagina: number = 1;
  ultima: number = 0;
  cargando = true;


  constructor(
    public _subProductoService: SubProductoService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document

  ) { }

  ngOnInit(): void {
    this.cargarProductos();

  }

  cargarProductos() {
    this.cargando = true;
    this._subProductoService.getSubProductos(0).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.Total;
      //console.log(resp.productos);
      this.subProductos = resp.subProductos;
      console.log(this.subProductos);
      this.ultima = Math.trunc((this.totalRegistros - 1) / 10);
      this.cargando = false;
      //console.log(this.ultima);
    });
  }


  eliminarSubProducto(subProducto: SubProducto) {
    // console.log('Eliminar');
    console.log(subProducto);
    console.log(subProducto._id);
    Swal
      .fire({
        title: "Producto: " + subProducto.descripcion,
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí"
          this._subProductoService.eliminarSubProducto(subProducto._id!).subscribe((resp: any) => {
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

    this._subProductoService.getSubProductos(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.Total;
      this.subProductos = resp.productos;
    });

  }


  anterior() {
    //console.log(this.pagina);
    //console.log(this.ultima);
    if (this.pagina > 1) {
      this.pagina = this.pagina - 1;
    }
    this._subProductoService.getSubProductos(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.Total;
      this.subProductos = resp.productos;
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
    this._subProductoService.buscarSubProductos(termino)
      .subscribe((respuesta: SubProducto[]) => {
        this.subProductos = respuesta;
        //console.log(respuesta);
        this.cargando = false;
      });
  }


}

