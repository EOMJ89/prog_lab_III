"use strict";
/// <reference path="./ajax.ts" />
/// <reference path="./Alien.ts" />
window.onload = function () {
    var auxManejadora = new RecuperatorioPrimerParcial.Manejadora();
    RecuperatorioPrimerParcial.Manejadora.MostrarAliens();
};
var RecuperatorioPrimerParcial;
(function (RecuperatorioPrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAlien = function (funcionExtra) {
            var cuadrante = document.getElementById("cuadrante").value;
            var edad = parseInt(document.getElementById("edad").value, 10);
            var altura = parseFloat(document.getElementById("altura").value);
            var raza = document.getElementById("raza").value;
            var planeta = document.getElementById("cboPlaneta").value;
            var fotoInput = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var auxAlien = new Entidades.Alien(cuadrante, edad, altura, raza, planeta, pathFoto);
            var ajax = new Ajax();
            var form = new FormData();
            form.append("caso", "agregar");
            form.append("cadenaJson", JSON.stringify(auxAlien.ToJson()));
            form.append("foto", fotoInput.files[0]);
            if (funcionExtra === undefined) {
                funcionExtra = Manejadora.Mostrar;
            }
            ajax.PostDataForm('./BACKEND/administrar.php', funcionExtra, form, Manejadora.Mostrar);
        };
        Manejadora.Mostrar = function (response) {
            console.log(response);
        };
        Manejadora.MostrarAliens = function () {
            var ajax = new Ajax();
            var params = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.MostrarTabla, params, Manejadora.Mostrar);
        };
        Manejadora.MostrarTabla = function (response) {
            console.log(response);
            var jsonObj = JSON.parse(response);
            var auxTable = "<table border='1'><tr><th>Cuadrante</th><th>Edad</th><th>Altura</th><th>Raza</th><th>Planeta de Origen</th><th>Foto</th><th>Acciones</th></tr><th>";
            for (var _i = 0, jsonObj_1 = jsonObj; _i < jsonObj_1.length; _i++) {
                var alien = jsonObj_1[_i];
                auxTable += "<tr><th>" + alien.cuadrante + "</th><th>" + alien.edad + "</th><th>" + alien.altura + "</th><th>" + alien.raza + "</th><th>" + alien.planetaOrigen + "</th><th><img src='./BACKEND/fotos/";
                if (alien.pathFoto !== "undefined") {
                    auxTable += alien.pathFoto;
                }
                else {
                    auxTable += "alien_defecto.jpg";
                }
                auxTable += "' height=100 width=100 ></img></th>";
                auxTable += "<th><input type=\"button\" value=\"Eliminar\" class=\"btn btn-default\" onclick=\"auxManejadora.EliminarAlien('" + alien.cuadrante + "','" + alien.raza + "')\"/> <input type=\"button\" value=\"Modificar\" class=\"btn btn-default\" onclick=\"auxManejadora.ModificarAlien('" + alien.cuadrante + "','" + alien.raza + "')\"/></th></tr>";
            }
            auxTable += "</table>";
            document.getElementById("divTabla").innerHTML = auxTable;
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var ajax = new Ajax();
            var params = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.Guardar, params, Manejadora.Guardar);
        };
        Manejadora.Guardar = function (response) {
            localStorage.setItem("aliens_local_storage", response + ";");
            console.log("Se ha guardado en el Local Storage");
        };
        Manejadora.VerificarExistencia = function () {
            var auxLocalStorage = "";
            var cuadrante = document.getElementById("cuadrante").value ? document.getElementById("cuadrante").value : "";
            var raza = document.getElementById("raza").value ? document.getElementById("raza").value : "";
            if (localStorage.getItem("aliens_local_storage") !== "") {
                auxLocalStorage = localStorage.getItem("aliens_local_storage");
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                console.log(auxLocalStorage);
                var auxJson = JSON.parse(auxLocalStorage);
                var puedeAgregar = true;
                for (var _i = 0, auxJson_1 = auxJson; _i < auxJson_1.length; _i++) {
                    var alien = auxJson_1[_i];
                    if (alien.cuadrante === cuadrante && alien.raza === raza) {
                        puedeAgregar = false;
                        break;
                    }
                }
                if (puedeAgregar) {
                    Manejadora.AgregarAlien(Manejadora.GuardarEnLocalStorage);
                }
                else {
                    var mensaje = "El alien del cuadrante " + cuadrante + " y raza " + raza + " ya existe.";
                    alert(mensaje);
                    console.log(mensaje);
                }
            }
        };
        Manejadora.ObtenerAliensPorCuadrante = function () {
            var auxContador = new Array();
            var auxLocalStorage = "";
            if (localStorage.getItem("aliens_local_storage") !== "") {
                auxLocalStorage = localStorage.getItem("aliens_local_storage");
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                //console.log(auxLocalStorage);
                var auxJson = JSON.parse(auxLocalStorage);
                for (var _i = 0, auxJson_2 = auxJson; _i < auxJson_2.length; _i++) {
                    var alien = auxJson_2[_i];
                    if (auxContador[alien.planetaOrigen] === undefined) {
                        auxContador[alien.planetaOrigen] = 0;
                    }
                    auxContador[alien.planetaOrigen]++;
                }
                //console.log(auxContador);
                var auxMax = undefined;
                var auxMin = undefined;
                for (var planeta in auxContador) {
                    if (auxMax === undefined && auxMin === undefined) {
                        auxMax = auxContador[planeta];
                        auxMin = auxContador[planeta];
                    }
                    var cantAliens = auxContador[planeta];
                    //console.log(planeta, cantAliens);
                    if (auxMax < cantAliens) {
                        auxMax = cantAliens;
                        console.log("Cambio el maximo");
                    }
                    if (auxMin > cantAliens) {
                        auxMin = cantAliens;
                        console.log("Cambio el minimo");
                    }
                }
                var planetasMax = new Array();
                var planetasMin = new Array();
                for (var planeta in auxContador) {
                    if (auxContador[planeta] == auxMax) {
                        planetasMax.push(planeta);
                    }
                    else if (auxContador[planeta] == auxMin) {
                        planetasMin.push(planeta);
                    }
                }
                //console.log(planetasMax +"\nCambio a min\n"+ planetasMin);
                var mensaje = "El/Los planetas con mas aliens son ";
                if (planetasMax.length > 0) {
                    for (var _a = 0, planetasMax_1 = planetasMax; _a < planetasMax_1.length; _a++) {
                        var planeta = planetasMax_1[_a];
                        mensaje += "\n-" + planeta;
                    }
                    mensaje += "\nCon " + auxMax;
                    console.log(mensaje);
                }
                if (planetasMin.length > 0) {
                    mensaje = "El/Los planetas con menos aliens son ";
                    for (var _b = 0, planetasMin_1 = planetasMin; _b < planetasMin_1.length; _b++) {
                        var planeta = planetasMin_1[_b];
                        mensaje += "\n-" + planeta;
                    }
                    mensaje += "\nCon " + auxMin;
                    console.log(mensaje);
                }
            }
        };
        Manejadora.prototype.EliminarAlien = function (cuadrante, raza) {
            var auxAlien = new Entidades.Alien(cuadrante, 0, 0, raza, "", "");
            var mensaje = 'Desea eliminar el alien del cuadrante ' + cuadrante + ' y raza ' + raza + '?';
            if (confirm(mensaje)) {
                console.log("Confirmado");
                var ajax = new Ajax();
                var form = new FormData();
                form.append("caso", "eliminar");
                form.append("cadenaJson", JSON.stringify(auxAlien.ToJson()));
                ajax.PostDataForm('./BACKEND/administrar.php', Manejadora.Refrescar, form, Manejadora.Mostrar);
            }
        };
        Manejadora.Refrescar = function (response) {
            console.log(response);
            Manejadora.GuardarEnLocalStorage();
            Manejadora.MostrarAliens();
        };
        Manejadora.prototype.ModificarAlien = function () {
            throw new Error("Method not implemented.");
        };
        return Manejadora;
    }());
    RecuperatorioPrimerParcial.Manejadora = Manejadora;
})(RecuperatorioPrimerParcial || (RecuperatorioPrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map