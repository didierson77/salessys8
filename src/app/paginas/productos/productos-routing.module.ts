import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { CosteoComponent } from './costeo/costeo.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'catalogo', component: ListadoComponent },
      { path: 'costeo/:id', component: CosteoComponent },
      { path: 'editar/:id', component: EditarProductoComponent },
      { path: 'agregar', component: AgregarComponent },
      { path: '**', redirectTo: 'catalogo' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
