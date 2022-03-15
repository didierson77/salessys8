import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../../../modelos/usuario.model';
// import { MateriaService } from '../../../services/materia/materia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { UsuarioService } from '../../../services/usuario/usuario.service';



@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  totalRegistros: number = 0;
  pagina: number = 1;
  ultima: number = 0;
  cargando = true;


  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document) {

  }

  usuario: Usuario = this._usuarioService.usuario;

  ngOnInit(): void {
    this.cargarUsuarios();
    //console.log(this.usuario);
    //console.log(this.ultima);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.getUsuarios(0).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      // console.log(resp.total);
      this.usuarios = resp.usuarios;
      this.ultima = Math.trunc((this.totalRegistros - 1) / 10);
      this.cargando = false;
      // console.log(this.ultima);

      console.log(this.usuario);
    });
  }


  eliminarUsuario(usuario: Usuario) {
    // console.log(this.);
    Swal
      .fire({
        title: "Materia prima: " + usuario.nombre,
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí"
          this._usuarioService.eliminarUsuarios(usuario._id!).subscribe((resp: any) => {
            // this.document.location.reload();
            this.cargarUsuarios();
          });
        }
      });

  }

  siguiente() {
    // console.log(this.pagina);
    // console.log(this.ultima);
    if (this.pagina <= this.ultima) {
      this.pagina = this.pagina + 1;
    }

    this._usuarioService.getUsuarios(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.materias;
    });

  }


  anterior() {
    // console.log(this.pagina);
    // console.log(this.ultima);
    if (this.pagina > 1) {
      this.pagina = this.pagina - 1;
    }
    this._usuarioService.getUsuarios(this.pagina - 1).subscribe((resp: any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.materias;
    });
  }



  buscar(termino: string) {
    if (termino.length == 0) {
      return;
    }

    if (termino.length < 1) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    console.log(termino);
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((respuesta: Usuario[]) => {
        this.usuarios = respuesta;
        console.log(respuesta);
        this.cargando = false;
      });
  }
}









