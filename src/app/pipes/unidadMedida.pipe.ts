import { Pipe, PipeTransform } from '@angular/core';
//import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'unidadMedida'
})
export class unidadMedidaPipe implements PipeTransform {

  transform(unidadMedida: string, unidades: number): any {

    // console.log(img);

    //   if (!img) {
    //     return url + '/usuarios/xxx';
    //   }

    //   if (img.indexOf('https') >= 0) {
    //     // console.log('https');
    //     return img;
    //   }

    //   switch (tipo) {
    //     case 'usuarios':
    //       url += '/usuarios/' + img;
    //       break;
    //     case 'clientes':
    //       url += '/clientes/' + img;
    //       break;
    //     case 'productos':
    //       url += '/productos/' + img;
    //       break;
    //     case 'materias':
    //       url += '/materias/' + img;
    //       break;
    //     default:
    //       url += '/usuarios/xxx';
    //   }
    //   //console.log(url);
    //   return url;
    // }
    return 'PipeUnidadMedida';
  }


}
