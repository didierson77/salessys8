import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoMateriasComponent } from './listado-materias/listado-materias.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'catalogo', component: ListadoMateriasComponent },
      { path: 'agregar', component: AgregarComponent },
      { path: 'editar/:id', component: EditarComponent },
      { path: '**', redirectTo: 'catalogo' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule { }
