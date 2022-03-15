import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    // console.log(img);
    let url = URL_SERVICIOS + '/img';
    // console.log(url);

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      // console.log('https');
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;
      case 'clientes':
        url += '/clientes/' + img;
        break;
      case 'productos':
        url += '/productos/' + img;
        break;
      case 'materias':
        url += '/materias/' + img;
        break;
      default:
        url += '/usuarios/xxx';
    }
    //console.log(url);
    return url;
  }

}
