import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  UsuarioService,
  SidebarService,
  LoginGuardGuard,
  SubirArchivoService,
  GeolocalizacionService
} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    GeolocalizacionService,
  ],
})
export class ServiceModule { }
