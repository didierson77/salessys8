"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GeolocalizacionService = void 0;
var core_1 = require("@angular/core");
var GeolocalizacionService = /** @class */ (function () {
    function GeolocalizacionService() {
        this.obtieneLocalizacionUsuario();
    }
    Object.defineProperty(GeolocalizacionService.prototype, "localizacionLista", {
        // public estaCargando
        get: function () {
            //doble negacion si trae localizacion regresa true
            return !!this.localizacionUser;
        },
        enumerable: false,
        configurable: true
    });
    GeolocalizacionService.prototype.obtieneLocalizacionUsuario = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (_a) {
                var coords = _a.coords;
                _this.localizacionUser = [coords.longitude, coords.latitude];
                console.log(_this.localizacionUser);
                resolve([coords.longitude, coords.latitude]);
            }, function (error) {
                alert('no se pudo obtener la localizacion');
                console.log(error);
                reject();
            });
        });
    };
    GeolocalizacionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GeolocalizacionService);
    return GeolocalizacionService;
}());
exports.GeolocalizacionService = GeolocalizacionService;
