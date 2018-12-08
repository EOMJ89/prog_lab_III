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
var EmpleadosEnFabrica;
(function (EmpleadosEnFabrica) {
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
    EmpleadosEnFabrica.Persona = Persona;
})(EmpleadosEnFabrica || (EmpleadosEnFabrica = {}));
/// <reference path="./Persona.ts"/>
var EmpleadosEnFabrica;
(function (EmpleadosEnFabrica) {
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
    }(EmpleadosEnFabrica.Persona));
    EmpleadosEnFabrica.Empleado = Empleado;
})(EmpleadosEnFabrica || (EmpleadosEnFabrica = {}));
/// <reference path="./Empleado.ts"/>
var EmpleadosEnFabrica;
(function (EmpleadosEnFabrica) {
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
    EmpleadosEnFabrica.Fabrica = Fabrica;
})(EmpleadosEnFabrica || (EmpleadosEnFabrica = {}));
/// <reference path="./Fabrica.ts"/>
function AgregarEmpleado() {
    var auxReturn = false;
    var legajo = parseInt(document.getElementById("txtLegajo").value, 10);
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var dni = parseInt(document.getElementById("txtDni").value, 10);
    var sueldo = parseInt(document.getElementById("txtSueldo").value, 10);
    var sexo = document.getElementById("slcSexo").value;
    var auxPeticion = "legajo=" + legajo + "&nombre=" + nombre + "&apellido=" + apellido + "&dni=" + dni + "&sueldo=" + sueldo;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            if (xhttp.responseText == "true") {
                console.log("Guardado");
                var empleadoAux = new EmpleadosEnFabrica.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);
                auxReturn = true;
                document.getElementById("auxDiv").innerHTML = empleadoAux.ToString();
            }
            else {
                console.log("Error en Guardado");
            }
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("POST", "./administracion.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send(auxPeticion);
    console.log(auxReturn);
    return auxReturn;
}
