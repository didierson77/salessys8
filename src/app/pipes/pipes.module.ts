import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //ngif, ngfor
import { ImagenPipe } from './imagen.pipe';
import { unidadMedidaPipe } from './unidadMedida.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    unidadMedidaPipe,
  ],
  imports: [

  ],
  exports: [
    ImagenPipe,
    unidadMedidaPipe,
  ]
})

export class PipesModule { }
