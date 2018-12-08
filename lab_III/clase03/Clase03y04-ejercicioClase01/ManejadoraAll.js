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
        return Alumno;
    }(PersonaAlumno.Persona));
    PersonaAlumno.Alumno = Alumno;
})(PersonaAlumno || (PersonaAlumno = {}));
/// <reference path="./Alumno.ts" />
var PersonaAlumno;
(function (PersonaAlumno) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        //Al dar click al aceptar, toma los textboxt y genera el alumno, lo muestra con un alert    
        Manejadora.AceptarClick = function (legajoId, nombreID, apellidoID, divID) {
            var legajo = parseInt(document.getElementById(legajoId).value, 10);
            var nombre = document.getElementById(nombreID).value;
            var apellido = document.getElementById(apellidoID).value;
            var alumnoAux = new PersonaAlumno.Alumno(nombre, apellido, legajo);
            //alert(alumnoAux.ToString());
            document.getElementById(divID).innerHTML += alumnoAux.ToString() + "<br>";
            //Porcion de memoria del navegador, solo guarda strings.
            if (localStorage.getItem("Alumnos") != null) {
                localStorage.setItem("Alumnos", "" + localStorage.getItem("Alumnos") + alumnoAux.ToString() + ";");
            }
            else {
                localStorage.setItem("Alumnos", alumnoAux.ToString() + ";");
            }
        };
        return Manejadora;
    }());
    PersonaAlumno.Manejadora = Manejadora;
})(PersonaAlumno || (PersonaAlumno = {}));
//tsc -target "es5" --outFile ./ejercicioClase01/ManejadoraAll.js ./ejercicioClase01/Persona ./ejercicioClase01/Alumno ./ejercicioClase01/Manejadora 
