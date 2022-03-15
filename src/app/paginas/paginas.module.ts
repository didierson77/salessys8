import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { PaginasComponent } from './paginas.component';

import { MenuComponent } from '../shared/menu/menu.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';

import { PipesModule } from './../pipes/pipes.module';

@NgModule({
  declarations: [
    // DashboardComponent,
    PaginasComponent,
    MenuComponent,
    SidebarComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    PipesModule
  ],
  exports: [
    PaginasComponent,
  ],

})
export class PaginasModule { }
