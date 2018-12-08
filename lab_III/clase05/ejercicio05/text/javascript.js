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
/// <reference path="../../ajax.ts" />
var Ejercicio05;
(function (Ejercicio05) {
    function RecibirJson() {
        var xhttps = new Ajax();
        var backend = "backend/recibirJson.php";
        var comando = "comando=recibirJson";
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio05.RecibirJson = RecibirJson;
    function Mostrar(resultado) {
        var auxJson = JSON.parse(resultado);
        console.log(resultado);
        console.log(auxJson.codigoBarra + " - " + auxJson.nombre + " - " + auxJson.precio);
        alert(auxJson.codigoBarra + " - " + auxJson.nombre + " - " + auxJson.precio);
    }
    Ejercicio05.Mostrar = Mostrar;
    function Fail(resultado) {
        console.log("Error: " + resultado);
    }
    Ejercicio05.Fail = Fail;
})(Ejercicio05 || (Ejercicio05 = {}));
// tsc -target "es5" --outFile "./ejercicio05/text/javascript.js" "./ejercicio05/text/javascript.ts"
