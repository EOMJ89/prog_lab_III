"use strict";
function MostrarOpcion() {
    var validación = document.forms[0];
    var nombre = document.getElementById("txtNombre").value;
    var txt = "Nombre: " + nombre + "\nValoraci\u00F3n: ";
    var i;
    for (i = 0; i < validación.length; i++) {
        if (validación[i].checked) {
            txt = txt + validación[i].value;
            break;
        }
    }
    alert(txt);
}
//# sourceMappingURL=clase02_ejercicio18.js.map