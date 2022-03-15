import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';


@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    EditarUsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class UsuariosModule { }
