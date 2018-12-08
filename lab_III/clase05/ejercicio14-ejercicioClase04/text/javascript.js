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
var Ejercicio14;
(function (Ejercicio14) {
    function ObtenerJsonArray() {
        var xhttps = new Ajax();
        var backend = "backend/administrarRemeras.php";
        var comando = "comando=traerRemeras";
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio14.ObtenerJsonArray = ObtenerJsonArray;
    function Mostrar(resultado) {
        var jsonObj = JSON.parse(resultado);
        for (var _i = 0, jsonObj_1 = jsonObj; _i < jsonObj_1.length; _i++) {
            var remera = jsonObj_1[_i];
            console.log(remera.id + " - " + remera.slogan + " - " + remera.size + " - " + remera.price + " - " + remera.color + " - " + remera.manofacturer.name + " - " + remera.manofacturer.logo + " - " + remera.manofacturer.location.country + " - " + remera.manofacturer.location.city);
        }
        CrearTabla(jsonObj);
    }
    function Fail(resultado) {
        console.log("Error: " + resultado);
    }
    function CrearTabla(jsonObj) {
        var auxTable = "<table border='1'><tr><th>ID</th><th>Slogan</th><th>Size</th><th>Price</th><th>Color</th><th>Manufacturer</th><th>Logo</img></th><th>Country</th><th>City</th></tr>";
        for (var _i = 0, jsonObj_2 = jsonObj; _i < jsonObj_2.length; _i++) {
            var remera = jsonObj_2[_i];
            //console.log("<td>"+remera.id + "</td><td>" + remera.slogan + "</td><td>" + remera.size + "</td><td>" + remera.price + "</td><td>" + remera.color + "</td><td>" + remera.manofacturer.name + '</td><td><img src="' + remera.manofacturer.logo + '"></img></td><td>' + remera.manofacturer.location.country + "</td><td>" + remera.manofacturer.location.city + "</td>");
            auxTable += "<tr><td>" + remera.id + "</td><td>" + remera.slogan + "</td><td>" + remera.size + "</td><td>" + remera.price + "</td><td>" + remera.color + "</td><td>" + remera.manofacturer.name + '</td><td><img src="' + remera.manofacturer.logo + '"></img></td><td>' + remera.manofacturer.location.country + "</td><td>" + remera.manofacturer.location.city + "</td></tr>";
        }
        auxTable += "</table>";
        document.getElementById("auxDiv").innerHTML = auxTable;
    }
})(Ejercicio14 || (Ejercicio14 = {}));
// tsc -target "es5" --outFile "./ejercicio14-ejercicioClase04/text/javascript.js" "./ejercicio14-ejercicioClase04/text/javascript.ts" 
