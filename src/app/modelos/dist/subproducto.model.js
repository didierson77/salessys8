"use strict";
exports.__esModule = true;
exports.SubProducto = void 0;
var SubProducto = /** @class */ (function () {
    function SubProducto(descripcion, activo, precio, existencia, unidadMedida, costo, claveInt, img, _id) {
        if (activo === void 0) { activo = false; }
        this.descripcion = descripcion;
        this.activo = activo;
        this.precio = precio;
        this.existencia = existencia;
        this.unidadMedida = unidadMedida;
        this.costo = costo;
        this.claveInt = claveInt;
        this.img = img;
        this._id = _id;
    }
    return SubProducto;
}());
exports.SubProducto = SubProducto;
