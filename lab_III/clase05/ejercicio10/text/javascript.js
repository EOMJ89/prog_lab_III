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
var Ejercicio10;
(function (Ejercicio10) {
    function ObtenerJsonArray() {
        var xhttps = new Ajax();
        var backend = "backend/administrarCiudades.php";
        var comando = "comando=traerCiudades";
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio10.ObtenerJsonArray = ObtenerJsonArray;
    function Mostrar(resultado) {
        console.log(resultado);
        var jsonObj = JSON.parse(resultado);
        var i = 1;
        jsonObj.forEach(function (ciudad) {
            console.log(i);
            console.log(ciudad);
            i++;
        });
        CrearTabla(jsonObj);
    }
    function Fail(resultado) {
        console.log("Error: " + resultado);
    }
    function CrearTabla(jsonObj) {
        var auxTable = "<table border='1'><tr><th>ID</th><th>Name</th><th>Country</th><th>Coord Lon</th><th>Coord Lat</th></tr>";
        for (var _i = 0, jsonObj_1 = jsonObj; _i < jsonObj_1.length; _i++) {
            var ciudad = jsonObj_1[_i];
            auxTable += "<tr><td>" + ciudad._id + "</td><td>" + ciudad.name + "</td><td>" + ciudad.country + "</td><td>" + ciudad.coord.lon + "</td><td>" + ciudad.coord.lat + "</td></tr>";
        }
        auxTable += "</table>";
        document.getElementById("auxDiv").innerHTML = auxTable;
    }
})(Ejercicio10 || (Ejercicio10 = {}));
// tsc -target "es5" --outFile "./ejercicio10/text/javascript.js" "./ejercicio10/text/javascript.ts"
