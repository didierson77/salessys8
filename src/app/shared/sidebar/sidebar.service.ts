import { Injectable } from '@angular/core';
interface OpcionesMenu {
  ruta?: string,
  nombre: string,
  icono?: string,
  submenu?: Submenu[],
}

interface Submenu {
  ruta?: string,
  nombre: string,
}

@Injectable({
  providedIn: 'root'
})



export class SidebarService {

  menuItems: OpcionesMenu[] = [
    {
      nombre: 'Materia Prima',
      icono: 'nav-icon fas fa-th',
      submenu: [
        {
          ruta: '/materias/catalogo',
          nombre: 'Catálogo',
        }
      ]
    },
    {
      // ruta: '/materias/',
      nombre: 'Productos',
      icono: 'nav-icon fas fa-box-open',
      submenu: [
        {
          ruta: '/productos/listado',
          nombre: 'Catálogo',
        },
        {
          ruta: '/productos',
          nombre: 'Formulación',
        }
      ]
    },
    {
      // ruta: '/materias/',
      nombre: 'Sub productos',
      icono: 'nav-icon fas fa-box-open',
      submenu: [
        {
          ruta: '/subproductos/catalogo',
          nombre: 'Catálogo',
        },
        {
          ruta: '/productos',
          nombre: 'Formulación',
        }
      ]
    },
    {
      // ruta: '/materias/',
      nombre: 'Pedidos',
      icono: 'nav-icon fas fa-clipboard-list',
    },
    {
      // ruta: '/materias/',
      nombre: 'Ventas',
      icono: 'nav-icon fas fa-chart-line',
    },
    {
      // ruta: '/clientes/listado-clientes',
      nombre: 'Clientes',
      icono: 'nav-icon fas fa-users-cog',
      submenu: [
        {
          ruta: '/clientes',
          nombre: 'Catálogo',
        }
      ]
    },
    {
      // ruta: '/clientes/listado-clientes',
      nombre: 'Administración',
      icono: 'nav-icon fas fa-users-cog',
      submenu: [
        {
          ruta: '/usuarios/catalogo',
          nombre: 'Usuarios',
        },
        {
          ruta: '/categorias/catalogo',
          nombre: 'Categorias',
        }
      ]
    },

  ]

  constructor() { }
}
