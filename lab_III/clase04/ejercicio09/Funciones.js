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
window.onload = function () { CargarNoticias(); };
function CargarNoticias() {
    var auxPeticion = "comando=cargar";
    EnviarPeticion(auxPeticion);
}
function EnviarPeticion(peticion) {
    var xhttp = new Ajax();
    xhttp.Post("./php/AdminProvincias.php", MostrarNoticia, peticion, InformarR);
}
function InformarR(resultado) {
    console.log("Error " + resultado);
}
function MostrarNoticia(resultado) {
    console.log(resultado);
    if (resultado === "false") {
        console.log("No se pueden mostrar las provincias.");
    }
    else {
        var arrayResultado = resultado.split("-");
        if (arrayResultado.length > 1) {
            document.getElementById("listaCiu").innerHTML = arrayResultado[1];
        }
        else {
            document.getElementById("listaProv").innerHTML = resultado;
        }
        console.log("Petición aceptada y retornada correctamente");
    }
}
function CambiarCiudades(codProvincia) {
    console.log(codProvincia);
    var auxPeticion = "comando=cambiar&codigo=" + codProvincia;
    EnviarPeticion(auxPeticion);
}
//tsc -target "es5" --outFile ./ejercicio09/Funciones.js ./ejercicio09/Funciones.ts ./ajax.ts
