"use strict";
function AniadirElemento() {
    var elementoNuevo = document.getElementById("cuadroText").value;
    if (elementoNuevo !== "") {
        document.getElementById("lista").innerHTML += "<li>" + elementoNuevo + "</li>";
    }
}
//# sourceMappingURL=clase02_ejercicio26.js.map