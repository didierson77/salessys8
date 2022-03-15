"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubirArchivoService = void 0;
var core_1 = require("@angular/core");
var config_1 = require("src/app/config/config");
var SubirArchivoService = /** @class */ (function () {
    function SubirArchivoService() {
    }
    //************ SUBIR ARCHIVO ********/
    SubirArchivoService.prototype.subirArchivo = function (archivo, tipo, id) {
        // se crea una promesa para notificar a las demas pantallas que ya terminó
        return new Promise(function (resolve, reject) {
            var formDatos = new FormData();
            var xhr = new XMLHttpRequest();
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
            var url = config_1.URL_SERVICIOS + '/upload/' + tipo + '/' + id;
            xhr.open('PUT', url, true);
            xhr.send(formDatos);
        });
    };
    SubirArchivoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SubirArchivoService);
    return SubirArchivoService;
}());
exports.SubirArchivoService = SubirArchivoService;
