import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../modelos/usuario.model';

declare function iniciar_plugins(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  forma: FormGroup = new FormGroup({
    correo: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    recordarme: new FormControl(null, Validators.required),
  });

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('email')) {
      this.forma.setValue({
        correo: localStorage.getItem('email'),
        password: '123456',
        recordarme: true,
      });
    }
  }


  ingresar() {

    if (this.forma.invalid) {
      return;
    }

    let correo = this.forma.value.correo;
    let password = this.forma.value.password;
    let usuario = new Usuario('', correo, password);
    let recordar = this.forma.value.recordarme;
    let inicio: boolean = true;
    this._usuarioService.login(usuario, recordar)
      .subscribe(resp => {
        // console.log(resp);
        this.router.navigate(['/inicio']);
        // window.location.href='#/inicio';  //redireccion manual para refrescar
        inicio = true;
      });
    // console.log(this.forma.value);
  }


}
