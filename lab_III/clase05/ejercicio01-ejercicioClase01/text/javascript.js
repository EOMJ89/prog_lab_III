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
var Ejercicio01;
(function (Ejercicio01) {
    function CrearJson() {
        var producto = { "codigoBarra": "Cod01", "nombre": "Test1", "precio": 2 };
        console.log(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio);
        alert(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio);
    }
    Ejercicio01.CrearJson = CrearJson;
    function CrearJsonArray() {
        var producto = [
            { "codigoBarra": "Cod01", "nombre": "Test1", "precio": 2 },
            { "codigoBarra": "Cod02", "nombre": "Test2", "precio": 34 },
            { "codigoBarra": "Cod03", "nombre": "Test3", "precio": 43 },
            { "codigoBarra": "Cod04", "nombre": "Test4", "precio": 98 },
        ];
        producto.forEach(function (productoA) {
            console.log(productoA.codigoBarra + " - " + productoA.nombre + " - " + productoA.precio);
            alert(productoA.codigoBarra + " - " + productoA.nombre + " - " + productoA.precio);
        });
    }
    Ejercicio01.CrearJsonArray = CrearJsonArray;
    function EnviarJson() {
        var producto = { "codigoBarra": "Cod01", "nombre": "Test1", "precio": 2 };
        var xhttps = new Ajax();
        var backend = "backend/adminJson.php";
        var comando = "producto=" + JSON.stringify(producto);
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio01.EnviarJson = EnviarJson;
    function EnviarJsonArray() {
        var producto = [
            { "codigoBarra": "Cod01", "nombre": "Test1", "precio": 2 },
            { "codigoBarra": "Cod02", "nombre": "Test2", "precio": 34 },
            { "codigoBarra": "Cod03", "nombre": "Test3", "precio": 43 },
            { "codigoBarra": "Cod04", "nombre": "Test4", "precio": 98 },
        ];
        var xhttps = new Ajax();
        var backend = "backend/adminJson.php";
        var comando = "producto=" + JSON.stringify(producto);
        xhttps.Post(backend, Mostrar, comando, Fail);
    }
    Ejercicio01.EnviarJsonArray = EnviarJsonArray;
    function Mostrar(resultado) {
        console.log(resultado);
    }
    Ejercicio01.Mostrar = Mostrar;
    function Fail(resultado) {
        console.log("Error: " + resultado);
    }
    Ejercicio01.Fail = Fail;
})(Ejercicio01 || (Ejercicio01 = {}));
// tsc -target "es5" --outFile "./ejercicio01-ejercicioClase01/text/javascript.js" "./ejercicio01-ejercicioClase01/text/javascript.ts"
