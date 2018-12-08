"use strict";
function CalcularSalario() {
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var email = document.getElementById("txtEmail").value;
    var horas = document.getElementById("txtNumero").value;
    var auxHoras = parseInt(horas, 10);
    var salario = 0;
    if (isNaN(auxHoras)) {
        auxHoras = 0;
    }
    salario = auxHoras * ObtenerCoeficiente();
    var txt = "Empleado: " + apellido + "," + nombre + "<br>Email: " + email + "<br>Salario por " + horas + " horas trabajadas: " + salario + ".";
    document.getElementById("auxCalculo").innerHTML = txt;
}
function ObtenerCoeficiente() {
    return 6.88;
}
//# sourceMappingURL=clase02_ejercicio23.js.map