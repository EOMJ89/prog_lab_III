"use strict";
function EsPalindromo(texto) {
    var auxText = "";
    for (var i = texto.length - 1; i >= 0; i--) {
        auxText += texto[i];
    }
    var msj = auxText == texto ? "Si" : "No";
    console.log(msj);
}
EsPalindromo("anana");
EsPalindromo("banana");
//# sourceMappingURL=clase01_ejercicio11.js.map