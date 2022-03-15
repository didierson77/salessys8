"use strict";
exports.__esModule = true;
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombre, email, password, img, role, activo, _id) {
        if (role === void 0) { role = 'USER'; }
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.img = img;
        this.role = role;
        this.activo = activo;
        this._id = _id;
    }
    return Usuario;
}());
exports.Usuario = Usuario;
