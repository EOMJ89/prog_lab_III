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
function EjecutarOperacion() {
    var primerNumero = 0;
    if (document.getElementById("priOperando").value !== "") {
        primerNumero = (parseInt(document.getElementById("priOperando").value, 10));
    }
    var segundoNumero = 0;
    if (document.getElementById("segOperando").value !== "") {
        segundoNumero = (parseInt(document.getElementById("segOperando").value, 10));
    }
    var auxPeticion = "priOp=" + primerNumero + "&segOp=" + segundoNumero + "&operator=" + document.getElementById("slcOperacion").value;
    var xhttp = new Ajax();
    xhttp.Post("./php/Calcular.php", CambiarSpan, auxPeticion, CambiarSpanError);
}
function CambiarSpan(resultado) {
    if (resultado === "false/") {
        document.getElementById("auxSpan").innerHTML = "Error, no se ha podido realizar la operacion porque el segundo operando es 0.";
    }
    else {
        var auxResultado = 0;
        if (resultado !== "") {
            auxResultado = parseInt(resultado, 10);
        }
        document.getElementById("auxSpan").innerHTML = "Resultado: " + auxResultado;
    }
}
function CambiarSpanError(resultado) {
    document.getElementById("auxSpan").innerHTML = "Error, el servidor ha regresado " + resultado;
}
//tsc -target "es5" --outFile ./ejercicio04/Operaciones.js ./ejercicio04/Operaciones.ts ./ajax.ts
