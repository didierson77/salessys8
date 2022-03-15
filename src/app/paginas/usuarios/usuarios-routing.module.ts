import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'catalogo', component: ListadoUsuariosComponent },
      { path: '**', redirectTo: 'catalogo' },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
