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
var Ejercicio06;
(function (Ejercicio06) {
    function RecibirJsonArray() {
        var xhttps = new Ajax();
        var backend = "backend/recibirColeccion.php";
        var comando = "comando=recibirJson";
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio06.RecibirJsonArray = RecibirJsonArray;
    function Mostrar(resultado) {
        var auxJson = JSON.parse(resultado);
        console.log(resultado);
        for (var _i = 0, auxJson_1 = auxJson; _i < auxJson_1.length; _i++) {
            var producto = auxJson_1[_i];
            console.log(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio);
            //alert(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio);
        }
    }
    Ejercicio06.Mostrar = Mostrar;
    function Fail(resultado) {
        console.log("Error: " + resultado);
    }
    Ejercicio06.Fail = Fail;
})(Ejercicio06 || (Ejercicio06 = {}));
// tsc -target "es5" --outFile "./ejercicio06/text/javascript.js" "./ejercicio06/text/javascript.ts"
