"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImagenPipe = void 0;
var core_1 = require("@angular/core");
var config_1 = require("../config/config");
var ImagenPipe = /** @class */ (function () {
    function ImagenPipe() {
    }
    ImagenPipe.prototype.transform = function (img, tipo) {
        if (tipo === void 0) { tipo = 'usuarios'; }
        // console.log(img);
        var url = config_1.URL_SERVICIOS + '/img';
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
    };
    ImagenPipe = __decorate([
        core_1.Pipe({
            name: 'imagen'
        })
    ], ImagenPipe);
    return ImagenPipe;
}());
exports.ImagenPipe = ImagenPipe;
