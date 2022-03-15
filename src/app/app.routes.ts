// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './paginas/dashboard/dashboard.component';
// import { PaginasComponent } from './paginas/paginas.component';
// import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: PaginasComponent,
//     children: [
//       {
//         path: 'clientes',
//         loadChildren: () => import('./paginas/clientes/clientes.module').then(m => m.ClientesModule)
//       },
//       {
//         path: 'materias',
//         loadChildren: () => import('./paginas/materias/materias.module').then(m => m.MateriasModule)
//       },
//       {
//         path: '',
//         redirectTo: '/dashboard',
//         pathMatch: 'full',
//       }
//     ]
//   },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: LoginComponent },
//   { path: '**', component: NopagefoundComponent },

// ];

// export const APP_ROUTES = RouterModule.forRoot(routes);
