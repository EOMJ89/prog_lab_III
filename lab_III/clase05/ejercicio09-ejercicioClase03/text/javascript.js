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
var Ejercicio09;
(function (Ejercicio09) {
    function ObtenerJsonArray() {
        var xhttps = new Ajax();
        var backend = "backend/traerAutos.php";
        var comando = "comando=traer";
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio09.ObtenerJsonArray = ObtenerJsonArray;
    function Mostrar(resultado) {
        var jsonObj = JSON.parse(resultado);
        var i = 1;
        jsonObj.forEach(function (autos) {
            console.log(i);
            console.log(autos);
            i++;
        });
        CrearTabla(jsonObj);
    }
    function Fail(resultado) {
        console.log("Error: " + resultado);
    }
    function CrearTabla(jsonObj) {
        var auxTable = "<table border='1'><tr><th>ID</th><th>Marca</th><th>Precio</th><th>Color</th><th>Modelo</th></tr>";
        for (var _i = 0, jsonObj_1 = jsonObj; _i < jsonObj_1.length; _i++) {
            var auto = jsonObj_1[_i];
            auxTable += "<tr><td>" + auto.Id + "</td><td>" + auto.Marca + "</td><td>" + auto.Precio + "</td><td>" + auto.Color + "</td><td>" + auto.Modelo + "</td></tr>";
        }
        auxTable += "</table>";
        document.getElementById("auxDiv").innerHTML = auxTable;
    }
})(Ejercicio09 || (Ejercicio09 = {}));
// tsc -target "es5" --outFile "./ejercicio09-ejercicioClase03/text/javascript.js" "./ejercicio09-ejercicioClase03/text/javascript.ts"
