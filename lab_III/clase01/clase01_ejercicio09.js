"use strict";
function MostrarFactorialOCubo(numero) {
    var resultado = numero > 0 ? CalcularFactorial(numero) : CalcularCubo(numero);
    console.log(numero + " - " + resultado);
}
function CalcularCubo(numero) {
    return Math.pow(numero, 3);
}
function CalcularFactorial(numero) {
    if (numero != 0) {
        return numero * CalcularFactorial(numero - 1);
    }
    else {
        return 1;
    }
}
MostrarFactorialOCubo(5);
MostrarFactorialOCubo(-4);
//# sourceMappingURL=clase01_ejercicio09.js.map