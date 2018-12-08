"use strict";
function CreateToolTip(txtMensaje, idEnPag) {
    var spanSpecial = document.createElement("span");
    spanSpecial.className = "tooltiptext";
    spanSpecial.innerHTML = txtMensaje;
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    console.log(mouseX + " " + mouseY);
    document.getElementsByClassName(idEnPag)[0].appendChild(spanSpecial);
}
//# sourceMappingURL=clase02_ejercicio29.js.map