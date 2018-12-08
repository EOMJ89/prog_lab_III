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
window.onload = function () { CambiarNoticias(); };
var intervalID = 0;
var noticiaActual = 0;
function CambiarNoticias() {
    var stopAndResume = true;
    var changeMode = document.getElementById("StopResume").value;
    //console.log(changeMode);
    if (changeMode === "Seguir") {
        document.getElementById("StopResume").value = "Detener";
        stopAndResume = true; //Significa "Seguir"
        //console.log("Cambio a Detener");
    }
    else {
        document.getElementById("StopResume").value = "Seguir";
        stopAndResume = false; //Significa "Detener"
        //console.log("Cambio a Seguir");
    }
    AlternarNoticias(stopAndResume);
}
function AlternarNoticias(stopOrResume) {
    if (stopOrResume) {
        intervalID = setInterval(function () {
            console.log("Se llama a la funcion del Ajax");
            EnviarPeticion("seguir");
        }, 2000);
        console.log("Se inicia el intervalo");
    }
    else {
        clearInterval(intervalID);
        intervalID = 0;
        //console.log("Se para el intervalo");
    }
}
function EnviarPeticion(comando) {
    console.log("Noticia actual " + noticiaActual);
    var auxPeticion = "noticia=" + noticiaActual + "&comando=" + comando;
    var xhttp = new Ajax();
    xhttp.Post("./php/AdminNoticias.php", MostrarNoticia, auxPeticion, Informar);
}
function IrAtrasOAdelante(direccion) {
    if (intervalID != 0) {
        document.getElementById("StopResume").value = "Seguir";
        //console.log("Cambio a Seguir");
        AlternarNoticias(false);
    }
    EnviarPeticion(direccion);
}
function Informar(resultado) {
    console.log("Error " + resultado);
}
function MostrarNoticia(resultado) {
    var auxDate = new Date();
    console.log("La respuesta del servidor es: " + resultado);
    var auxDateString = auxDate.toDateString() + " " + auxDate.getHours() + " " + auxDate.getMinutes() + " " + auxDate.getSeconds();
    if (resultado === "false") {
        document.getElementById("auxSpan").innerHTML = "No se pueden mostrar las noticias." + auxDateString;
    }
    else {
        var arrayNoticia = resultado.split("-");
        if (arrayNoticia.length > 1) {
            noticiaActual = parseInt(arrayNoticia[0], 10) + 1;
            document.getElementById("auxSpan").innerHTML = arrayNoticia[1] + "<br>Hora: " + auxDateString;
        }
    }
}
//tsc -target "es5" --outFile ./ejercicio08/Funciones.js ./ejercicio08/Funciones.ts ./ajax.ts
