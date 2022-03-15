import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from '../services/service.index';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'inicio',
    canActivate: [LoginGuardGuard],
    component: DashboardComponent,
  },
  {
    path: 'clientes',
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
    data: { titulo: 'Clientes' }
  },
  {
    path: 'materias',
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./materias/materias.module').then(m => m.MateriasModule),
    data: { titulo: 'Materias Primas' } //para el breadcrumbs
  },
  {
    path: 'usuarios',
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    data: { titulo: '(Usuarios)' } //para el breadcrumbs
  },
  {
    path: 'categorias',
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),
    data: { titulo: '(Categorias)' } //para el breadcrumbs
  },
  {
    path: 'subproductos',
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./subProductos/subproductos.module').then(m => m.SubProductosModule),
    data: { titulo: '(SubProductos)' } //para el breadcrumbs
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
