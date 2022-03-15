
import { UsuarioService } from 'src/app/services/service.index';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../modelos/usuario.model';
import { Router } from '@angular/router';
import { ProductoService } from '../../../services/producto/producto.service';
import { Producto } from '../../../modelos/producto.model';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Categoria } from '../../../modelos/categoria.model';
import { SubProductoService } from 'src/app/services/subProducto/sub-producto.service';
import { SubProducto } from '../../../modelos/subproducto.model';

@Component({
  selector: 'app-agregar-sub-productos',
  templateUrl: './agregar-sub-productos.component.html',
  styles: [
  ]
})
export class AgregarSubProductosComponent implements OnInit {
  costoUnidad: number = 0;
  cantEmp: number = 0;

  subProducto: SubProducto = {
    descripcion: '',
    activo: false,
  };

  forma: FormGroup = new FormGroup({
    descripcion: new FormControl(null, Validators.required),
    claveInt: new FormControl(),
    // categoria: new FormControl(),
    precio: new FormControl(),
    unidadMedida: new FormControl(),
    costo: new FormControl(),
  });

  usuario: Usuario = this._usuarioService.usuario;
  categorias!: Categoria[];




  constructor(
    public _productoService: ProductoService,
    public _subProductoService: SubProductoService,
    public _usuarioService: UsuarioService,
    public _categoriaService: CategoriaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // this.forma.get('categoria')!.setValue('');
    // this._categoriaService.getCategorias().subscribe((resp: any) => {
    //   // console.log(resp);
    //   this.categorias = resp.categorias;
    //   console.log(this.categorias);
    // });
  }



  // calcular() {

  //   let costo = this.forma.get('costo')!.value || 0;
  //   let cantidadxEmpaque = this.forma.get('cantidadxEmpaque')!.value || 1;;

  //   if (cantidadxEmpaque > 0) {
  //     this.costoUnidad = Number(costo / cantidadxEmpaque);
  //     this.costoUnidad = Number(this.costoUnidad.toFixed(3));
  //     this.forma.get('costoxUnidad')!.setValue(this.costoUnidad);
  //   }
  //   else {
  //     //  this.forma.get('cantidadxEmpaque')!.setValue(1);
  //     this.costoUnidad = Number(costo / cantidadxEmpaque);
  //     this.costoUnidad = Number(this.costoUnidad.toFixed(3));
  //     this.forma.get('costoxUnidad')!.setValue(this.costoUnidad);
  //   }
  // }


  guardar() {
    if (this.forma.valid) {
      console.log('guardar');

      this.subProducto.descripcion = this.forma.get('descripcion')!.value;
      this.subProducto.precio = this.forma.get('precio')!.value;
      this.subProducto.unidadMedida = this.forma.get('unidadMedida')!.value;
      this.subProducto.costo = this.forma.get('costo')!.value;
      this.subProducto.claveInt = this.forma.get('claveInt')!.value;

      console.log(this.subProducto);
      this._subProductoService.agregarSubProducto(this.subProducto)
        .subscribe(resp => {
          console.log(resp);

          this.router.navigate(['/subproductos/catalogo']);
        });
    }
    else {
      console.log('forma invalida');
    }
    return;

  }


}


