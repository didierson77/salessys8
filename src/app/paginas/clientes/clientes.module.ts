import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';


@NgModule({
  declarations: [
    ListadoClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
  ]
})
export class ClientesModule { }
