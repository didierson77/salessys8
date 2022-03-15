import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubProductosRoutingModule } from './subproductos-routing.module';
import { ListadoSubProductosComponent } from './listado-sub-productos/listado-sub-productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CosteoSubProductosComponent } from './costeo-sub-productos/costeo-sub-productos.component';
import { AgregarSubProductosComponent } from './agregar-sub-productos/agregar-sub-productos.component';
import { EditarSubProductosComponent } from './editar-sub-productos/editar-sub-productos.component';


@NgModule({
  declarations: [
    ListadoSubProductosComponent,
    CosteoSubProductosComponent,
    AgregarSubProductosComponent,
    EditarSubProductosComponent,
  ],
  imports: [
    CommonModule,
    SubProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class SubProductosModule { }
