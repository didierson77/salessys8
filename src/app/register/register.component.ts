import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// npm install sweetalert2
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})


export class RegisterComponent implements OnInit {

  forma: FormGroup = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    correo: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    password2: new FormControl(null, Validators.required),
    condiciones: new FormControl(false),
  });


  constructor(public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1: string, campo2: string): any {
    return (form: FormGroup) => {
      const password = form.controls[campo1].value;
      const confirmPassword = form.controls[campo2].value;

      if (password === confirmPassword) {
        //console.log('son iguales');
        return null;
      }
      //console.log('no son iguales');
      return { sonIguales: true };
    }
  }


  ngOnInit(): void {
    this.forma.setValue({
      nombre: 'Test',
      correo: 'email@correo.com',
      password: '123456',
      password2: '123456',
      condiciones: true,
    });
    this.forma.validator = this.sonIguales('password', 'password2');
  }


  registro() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: 'Importante',
        text: 'Debe aceptar la condiciones',
        icon: 'warning',
        confirmButtonColor: "#DD6B55",
      });
      //console.log('Debe aceptar las condiciones')
    }

    //console.log('Password: ', this.forma.value.password)
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );


    this._usuarioService.crearUsuario(usuario).subscribe(
      respuesta => {
        console.log(respuesta);
        this.router.navigate(['/login']);
      });

    console.log('Forma valida:', this.forma.valid);
    console.log(this.forma.value);

  }


}
