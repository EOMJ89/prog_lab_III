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
var Ejercicio07;
(function (Ejercicio07) {
    function ObtenerJson() {
        var xhttps = new Ajax();
        var backend = "backend/traerAuto.php";
        var comando = "comando=traer";
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio07.ObtenerJson = ObtenerJson;
    function Mostrar(resultado) {
        var jsonObj = JSON.parse(resultado);
        //console.log(jsonObj);
        alert(jsonObj.Id + " - " + jsonObj.Marca + " - " + jsonObj.Precio + " - " + jsonObj.Color + " - " + jsonObj.Modelo);
        console.log(jsonObj.Id + " - " + jsonObj.Marca + " - " + jsonObj.Precio + " - " + jsonObj.Color + " - " + jsonObj.Modelo);
        ArmarInputs(jsonObj);
    }
    function Fail(resultado) {
        console.log("Error: " + resultado);
    }
    function ArmarInputs(jsonObj) {
        var auxReturn = "<table>";
        auxReturn += '<tr><td><input type="text" value="' + jsonObj.Id + '"</td></tr>';
        auxReturn += '<tr><td><input type="text" value="' + jsonObj.Marca + '"</td></tr>';
        auxReturn += '<tr><td><input type="text" value="' + jsonObj.Precio + '"</td></tr>';
        auxReturn += '<tr><td><input type="text" value="' + jsonObj.Color + '"</td></tr>';
        auxReturn += '<tr><td><input type="text" value="' + jsonObj.Modelo + '"</td></tr>';
        auxReturn += "</table>";
        document.getElementById("auxDiv").innerHTML = auxReturn;
    }
})(Ejercicio07 || (Ejercicio07 = {}));
// tsc -target "es5" --outFile "./ejercicio07-ejercicioClase02/text/javascript.js" "./ejercicio07-ejercicioClase02/text/javascript.ts"
