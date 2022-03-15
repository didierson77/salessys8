import { Component, OnInit, ViewChild } from '@angular/core';



export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
  }
}

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styles: [
  ]
})
export class ListadoClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
