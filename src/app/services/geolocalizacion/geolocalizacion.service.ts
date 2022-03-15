import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizacionService {

  public localizacionUser: [number, number] | undefined;
  // public estaCargando

  get localizacionLista(): boolean {
    //doble negacion si trae localizacion regresa true
    return !!this.localizacionUser;
  }

  constructor() {
    this.obtieneLocalizacionUsuario();
  }

  obtieneLocalizacionUsuario(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.localizacionUser = [coords.longitude, coords.latitude];
          console.log(this.localizacionUser);
          resolve([coords.longitude, coords.latitude]);
        },
        (error) => {
          alert('no se pudo obtener la localizacion');
          console.log(error);
          reject();
        }
      );
    });
  }

}
