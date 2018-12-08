"use strict";
function MostrarSeleccion() {
    var op1 = document.getElementById("chkYahoo").checked;
    var op2 = document.getElementById("chkGmail").checked;
    var op3 = document.getElementById("chkHotmail").checked;
    //var nombre: string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
    //var txt = `Nombre: ${nombre}\nValoración: `;
    var msj = "No hay elementos seleccionados";
    if (op1 === true || op2 === true || op3 === true) {
        msj = "Elementos seleccionados:\n";
    }
    if (op1) {
        msj = msj + "@yahoo.com\n";
    }
    if (op2) {
        msj = msj + "@gmail.com\n";
    }
    if (op3) {
        msj = msj + "@hotmail.com\n";
    }
    alert(msj);
}
//# sourceMappingURL=clase02_ejercicio19.js.map