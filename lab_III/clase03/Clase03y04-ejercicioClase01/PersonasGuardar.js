var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PersonaAlumno;
(function (PersonaAlumno) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido) {
            this._nombre = nombre;
            this._apellido = apellido;
        }
        Object.defineProperty(Persona.prototype, "GetNombre", {
            get: function () {
                return this._nombre;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "SetNombre", {
            set: function (value) {
                this._nombre = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "GetApellido", {
            get: function () {
                return this._apellido;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "SetApellido", {
            set: function (value) {
                this._apellido = value;
            },
            enumerable: true,
            configurable: true
        });
        Persona.prototype.ToString = function () {
            return this.GetNombre + "-" + this.GetApellido;
        };
        return Persona;
    }());
    PersonaAlumno.Persona = Persona;
})(PersonaAlumno || (PersonaAlumno = {}));
/// <reference path="./Persona.ts" />
var LoadVentana;
(function (LoadVentana) {
    window.onload = function () {
        PersonaAlumno.Alumno.TraerDeArchivo();
    };
})(LoadVentana || (LoadVentana = {}));
var PersonaAlumno;
(function (PersonaAlumno) {
    var Alumno = /** @class */ (function (_super) {
        __extends(Alumno, _super);
        function Alumno(nombre, apellido, legajo) {
            var _this = _super.call(this, nombre, apellido) || this;
            _this._legajo = legajo;
            return _this;
        }
        Object.defineProperty(Alumno.prototype, "GetLegajo", {
            get: function () {
                return this._legajo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Alumno.prototype, "SetLegajo", {
            set: function (value) {
                this._legajo = value;
            },
            enumerable: true,
            configurable: true
        });
        Alumno.prototype.ToString = function () {
            return this.GetLegajo + "-" + _super.prototype.ToString.call(this);
        };
        Alumno.GuardarEnArchivo = function () {
            var legajo = parseInt(document.getElementById("txtNumero").value, 10);
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var alumnoAux = new PersonaAlumno.Alumno(nombre, apellido, legajo);
            var auxPeticion = "alumno=" + alumnoAux.ToString() + "&method=GuardarEnArchivo";
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText == "true") {
                        console.log("Guardado");
                        PersonaAlumno.Alumno.TraerDeArchivo();
                    }
                    else {
                        console.log("Error en Guardado");
                    }
                    console.log(xhttp.responseText);
                }
            };
            xhttp.open("POST", "./Backend/Gestor.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send(auxPeticion);
        };
        Alumno.TraerDeArchivo = function () {
            var auxPeticion = "method=TraerDeArchivo";
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    document.getElementById("divListado").innerHTML = xhttp.responseText;
                }
            };
            xhttp.open("POST", "./Backend/Gestor.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send(auxPeticion);
        };
        Alumno.Eliminar = function () {
            var auxPeticion = "method=Eliminar";
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText == "true") {
                        console.log("Eliminado");
                        PersonaAlumno.Alumno.TraerDeArchivo();
                    }
                    else {
                        console.log("Error en Eliminar");
                    }
                    console.log(xhttp.responseText);
                }
            };
            xhttp.open("POST", "./Backend/Gestor.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send(auxPeticion);
        };
        return Alumno;
    }(PersonaAlumno.Persona));
    PersonaAlumno.Alumno = Alumno;
})(PersonaAlumno || (PersonaAlumno = {}));
//tsc -target "es5" --outFile ./PersonasGuardar.js ./Persona ./Alumno 
