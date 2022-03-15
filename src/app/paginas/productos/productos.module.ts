import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductosRoutingModule } from './productos-routing.module';
import { AgregarComponent } from './agregar/agregar.component';
import { ListadoComponent } from './listado/listado.component';
import { PipesModule } from '../../pipes/pipes.module';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { CosteoComponent } from './costeo/costeo.component';


@NgModule({
  declarations: [
    AgregarComponent,
    ListadoComponent,
    EditarProductoComponent,
    CosteoComponent,
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ProductosModule { }
