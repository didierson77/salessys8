import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
// import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { PaginasComponent } from './paginas/paginas.component';
import { RegisterComponent } from './register/register.component';
import { LoginGuardGuard } from './services/service.index';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// import { ClientesModule } from './paginas/clientes/clientes.module';
// import { ProductosModule } from './paginas/productos/productos.module';



const routes: Routes = [
  {
    path: '',
    component: PaginasComponent,
    children: [
      {
        path: 'inicio',
        canActivate: [LoginGuardGuard],
        component: DashboardComponent,
      },
      {
        path: 'clientes',
        loadChildren: () => import('./paginas/clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./paginas/productos/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'materias',
        loadChildren: () => import('./paginas/materias/materias.module').then(m => m.MateriasModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./paginas/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./paginas/categorias/categorias.module').then(m => m.CategoriasModule)
      },
      {
        path: 'subproductos',
        loadChildren: () => import('./paginas/subProductos/subproductos.module').then(m => m.SubProductosModule)
      },
      { path: '', redirectTo: '/inicio', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'register', component: LoginComponent },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
