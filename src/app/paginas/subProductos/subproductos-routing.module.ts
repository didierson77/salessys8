import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoSubProductosComponent } from './listado-sub-productos/listado-sub-productos.component';
import { CosteoSubProductosComponent } from './costeo-sub-productos/costeo-sub-productos.component';
import { AgregarSubProductosComponent } from './agregar-sub-productos/agregar-sub-productos.component';
import { EditarSubProductosComponent } from './editar-sub-productos/editar-sub-productos.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'catalogo', component: ListadoSubProductosComponent },
      { path: 'costeo/:id', component: CosteoSubProductosComponent },
      { path: 'agregar', component: AgregarSubProductosComponent },
      { path: 'editar/:id', component: EditarSubProductosComponent },
      // { path: 'agregar', component: AgregarComponent },
      { path: '**', redirectTo: 'catalogo' },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubProductosRoutingModule { }
