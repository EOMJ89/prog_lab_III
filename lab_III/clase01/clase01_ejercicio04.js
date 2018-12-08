"use strict";
/**
 * Realizar una función que reciba un número y que muestre (por consola) un mensaje como el siguiente:
El número 5 es impar, siendo 5 el número recibido como parámetro. */
function MostrarNumero(numero) {
    var retorno = "El número " + numero + " es ";
    retorno += numero % 2 == 0 ? "par" : "impar"; //Operador Ternario, preferible para usar en if/else no anidados.
    console.log(retorno);
}
MostrarNumero(5);
MostrarNumero(10);
//# sourceMappingURL=clase01_ejercicio04.js.map