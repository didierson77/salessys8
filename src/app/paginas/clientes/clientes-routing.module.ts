import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado', component: ListadoClientesComponent, data: { titulo: 'Catálogo de Clientes' } },
      { path: '', redirectTo: 'listado', pathMatch: 'full' },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
