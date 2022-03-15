import { XhrFactory } from '@angular/common';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() {
  }





  //************ SUBIR ARCHIVO ********/
  subirArchivo(archivo: File, tipo: string, id: string) {
    // se crea una promesa para notificar a las demas pantallas que ya terminó
    return new Promise((resolve, reject) => {
      let formDatos = new FormData();
      let xhr = new XMLHttpRequest();

      formDatos.append('imagen', archivo, archivo.name);

      // ***** PETICION AJAX  ******/
      xhr.onreadystatechange = function () {
        // cuando termine
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Archivo subido');
            resolve(JSON.parse(xhr.response));
          }
          else {
            console.log('Fallo al subir archivo');
            reject(JSON.parse(xhr.response));
          }
        }
      };
      // localhost:3000/upload/materias/61f1a8787c30badf9a258294
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formDatos);


    });



  }



}
