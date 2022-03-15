import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MateriasRoutingModule } from './materias-routing.module';
import { ListadoMateriasComponent } from './listado-materias/listado-materias.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    ListadoMateriasComponent,
    AgregarComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [

  ]

})
export class MateriasModule { }
