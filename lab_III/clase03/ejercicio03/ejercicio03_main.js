var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ejercicio03;
(function (Ejercicio03) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, dni, sexo) {
            this._apellido = apellido;
            this._dni = dni;
            this._nombre = nombre;
            this._sexo = sexo[0].toLowerCase();
        }
        Object.defineProperty(Persona.prototype, "GetApellido", {
            get: function () {
                return this._apellido;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "GetDni", {
            get: function () {
                return this._dni;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "GetNombre", {
            get: function () {
                return this._nombre;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "GetSexo", {
            get: function () {
                return this._sexo;
            },
            enumerable: true,
            configurable: true
        });
        Persona.prototype.ToString = function () {
            return this.GetNombre + "-" + this.GetApellido + "-" + this.GetDni + "-" + this.GetSexo;
        };
        return Persona;
    }());
    Ejercicio03.Persona = Persona;
})(Ejercicio03 || (Ejercicio03 = {}));
/// <reference path="./Persona.ts"/>
var Ejercicio03;
(function (Ejercicio03) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, dni, sexo, legajo, sueldo) {
            var _this = _super.call(this, nombre, apellido, dni, sexo) || this;
            _this._sueldo = sueldo;
            _this._legajo = legajo;
            return _this;
        }
        Object.defineProperty(Empleado.prototype, "GetSueldo", {
            get: function () {
                return this._sueldo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Empleado.prototype, "GetLegajo", {
            get: function () {
                return this._legajo;
            },
            enumerable: true,
            configurable: true
        });
        Empleado.prototype.Hablar = function (idioma) {
            return "El empleado habla " + idioma;
        };
        Empleado.prototype.ToString = function () {
            return this.GetLegajo + "-" + _super.prototype.ToString.call(this) + "-" + this.GetSueldo;
        };
        return Empleado;
    }(Ejercicio03.Persona));
    Ejercicio03.Empleado = Empleado;
})(Ejercicio03 || (Ejercicio03 = {}));
/// <reference path="./Empleado.ts"/>
var Ejercicio03;
(function (Ejercicio03) {
    var Fabrica = /** @class */ (function () {
        function Fabrica(razon) {
            this._empleados = new Array();
            this._razonSocial = razon;
        }
        Fabrica.prototype.HayEmpleado = function (persona) {
            var auxRetorno = false;
            this._empleados.forEach(function (personaComp) {
                if (personaComp.GetDni == persona.GetDni) {
                    auxRetorno = true;
                }
            });
            return auxRetorno;
        };
        Fabrica.prototype.AgregarEmpleado = function (persona) {
            var auxRetorno = false;
            if (!(this.HayEmpleado(persona))) {
                this._empleados.push(persona);
                auxRetorno = true;
            }
            return auxRetorno;
        };
        Fabrica.prototype.EliminarEmpleado = function (persona) {
            var auxRetorno = false;
            if (this.HayEmpleado(persona)) {
                var index = this._empleados.indexOf(persona);
                this._empleados.splice(index, 1);
                auxRetorno = true;
            }
            return auxRetorno;
        };
        Fabrica.prototype.CalcularSueldos = function () {
            var auxRetorno = 0;
            this._empleados.forEach(function (personaComp) {
                auxRetorno += personaComp.GetSueldo;
            });
            return auxRetorno;
        };
        Fabrica.prototype.ToString = function () {
            var auxRetorno = this._razonSocial + ";";
            this._empleados.forEach(function (personaComp) {
                auxRetorno += personaComp.ToString() + ";";
            });
            return auxRetorno;
        };
        return Fabrica;
    }());
    Ejercicio03.Fabrica = Fabrica;
})(Ejercicio03 || (Ejercicio03 = {}));
/// <reference path="./Fabrica.ts"/>
var empleado1 = new Ejercicio03.Empleado("A", "B", 1, "M", 100, 5000);
var empleado2 = new Ejercicio03.Empleado("Z", "X", 2, "F", 101, 6000);
var fabrica1 = new Ejercicio03.Fabrica("Razón1");
console.log(empleado1.ToString());
console.log(empleado2.ToString());
if (fabrica1.AgregarEmpleado(empleado1)) {
    console.log("Se ha agregado al Empleado 1");
}
if (fabrica1.AgregarEmpleado(empleado2)) {
    console.log("Se ha agregado al Empleado 2");
}
console.log(fabrica1.ToString());
if (fabrica1.EliminarEmpleado(empleado1)) {
    console.log("Se ha eliminado al Empleado 1");
}
if (fabrica1.EliminarEmpleado(empleado2)) {
    console.log("Se ha eliminado al Empleado 2");
}
//tsc -target "es5" --outFile ./ejercicio03/ejercicio03_main.js ./ejercicio03/Persona ./ejercicio03/Empleado ./ejercicio03/Fabrica ./ejercicio03/ejercicio03_main
