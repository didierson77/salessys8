import { Component, Inject, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario.model';
import { DOCUMENT } from '@angular/common';

interface OpcionesMenu {
  ruta?: string,
  nombre: string,
  icono?: string,
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})


export class SidebarComponent implements OnInit {

  usuario: Usuario;
  menu: OpcionesMenu[] = [];

  constructor(public _sidebar: SidebarService,
    public _usuarioService: UsuarioService,
    @Inject(DOCUMENT) private document: Document) {

    this.usuario = {
      nombre: '',
      email: '',
      password: '',
      role: 'USER',
    }

  }

  ngOnInit(): void {
    this._usuarioService.cargarStorage();
    this.usuario = this._usuarioService.usuario;

    //*****************************************************/
    //********PARA MOSTRAR Y OCULTAR EL SIDEBAR************/
    //*****************************************************/
    const btnToggle = this.document.querySelector('.toggle-btn');
    // btnToggle?.addEventListener('click', () => {
    //   console.log('click');

    //   this.document.querySelector('#collapse-icon')?.classList.add('fa-angle-double-left');

    //   this.document.querySelector('.menu-collapsed')?.classList.toggle('d-none');

    //   this.document.querySelector('.sidebar-submenu')?.classList.toggle('d-none');
    //   this.document.querySelector('.submenu-icon')?.classList.toggle('d-none');

    //   this.document.querySelector('#sidebar-container')?.classList.toggle('sidebar-collapsed');
    //   this.document.querySelector('.sidebar-separator-title')?.classList.toggle('d-flex');

    //   this.document.querySelector('.toggle-btn span')?.classList.toggle('colapsado');

    //   this.document.querySelector('.menu-collapsed.opcion-submenu')?.classList.toggle('d-none');

    //   this.document.querySelector('#collapse-icon')?.classList.toggle('fa-angle-double-left');

    // });


    // console.log(this._sidebar.menuItems);
    // console.log(this._usuarioService.token);
    // console.log(this.usuario);
  }


  // mostrarSidebar() {
  //   const btnToggle = this.document.querySelector('.toggle-btn');
  //   btnToggle?.addEventListener('click', () => {
  //     console.log('click');
  //   });
  // }


}
