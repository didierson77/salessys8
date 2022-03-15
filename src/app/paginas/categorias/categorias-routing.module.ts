import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCategoriasComponent } from './listado-categorias/listado-categorias.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'catalogo', component: ListadoCategoriasComponent, data: { titulo: 'Catálogo de Categorias' } },
      { path: '', redirectTo: 'catalogo', pathMatch: 'full' },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
