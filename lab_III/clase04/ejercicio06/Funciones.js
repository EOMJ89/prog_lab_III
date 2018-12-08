var Ajax = /** @class */ (function () {
    function Ajax() {
        var _this = this;
        this.Get = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
            _this._xhr.open('GET', ruta);
            _this._xhr.send();
            _this._xhr.onreadystatechange = function () {
                if (_this._xhr.readyState === Ajax.DONE) {
                    if (_this._xhr.status === Ajax.OK) {
                        success(_this._xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this._xhr.status);
                        }
                    }
                }
            };
        };
        this.Post = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            _this._xhr.open('POST', ruta, true);
            _this._xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            _this._xhr.send(parametros);
            _this._xhr.onreadystatechange = function () {
                if (_this._xhr.readyState === Ajax.DONE) {
                    if (_this._xhr.status === Ajax.OK) {
                        success(_this._xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this._xhr.status);
                        }
                    }
                }
            };
        };
        this._xhr = new XMLHttpRequest();
        Ajax.DONE = 4;
        Ajax.OK = 200;
    }
    return Ajax;
}());
/// <reference path="../ajax.ts" />
function VerificarNombre() {
    var auxPeticion = "nombre=" + document.getElementById("txtNombre").value;
    var xhttp = new Ajax();
    xhttp.Post("./php/comprobarDisponibilidad.php", Informar, auxPeticion);
}
function Informar(resultado) {
    if (resultado === "SI") {
        document.getElementById("auxSpan").innerHTML = "El nombre de usuario SI está disponible." + (new Date()).getSeconds();
    }
    else {
        var arrayNombres = resultado.split("-");
        if (arrayNombres.length > 1) {
            document.getElementById("auxSpan").innerHTML = "El nombre de usuario NO está disponible." + (new Date()).getSeconds() + "<br>" + arrayNombres[1];
        }
    }
}
function CambiarNombre(nombre) {
    document.getElementById("txtNombre").value = nombre;
    document.getElementById("auxSpan").innerHTML = "";
}
//tsc -target "es5" --outFile ./ejercicio06/Funciones.js ./ejercicio06/Funciones.ts ./ajax.ts
