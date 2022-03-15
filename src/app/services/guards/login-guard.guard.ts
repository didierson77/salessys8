import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
    public router: Router) {

  }
  canActivate() {
    // console.log('Pasó por el Login Guard');
    if (this._usuarioService.estaLogueado()) {
      // console.log('Pasó el GUARD');
      return true;
    }
    else {
      // console.log('Bloqueado por el GUARD');
      this.router.navigate(['/login']);
    }

    return true;
  }

}
