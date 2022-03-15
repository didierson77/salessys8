"use strict";
exports.__esModule = true;
exports.Producto = void 0;
var Producto = /** @class */ (function () {
    function Producto(descripcion, activo, categoria, claveInt, precio, existencia, unidadMedida, subProducto, costo, img, _id, manoObra) {
        if (activo === void 0) { activo = false; }
        this.descripcion = descripcion;
        this.activo = activo;
        this.categoria = categoria;
        this.claveInt = claveInt;
        this.precio = precio;
        this.existencia = existencia;
        this.unidadMedida = unidadMedida;
        this.subProducto = subProducto;
        this.costo = costo;
        this.img = img;
        this._id = _id;
        this.manoObra = manoObra;
    }
    return Producto;
}());
exports.Producto = Producto;
