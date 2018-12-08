"use strict";
function MostrarPosicion() {
    var cursorX = event.clientX;
    var cursorY = event.clientY;
    var cursorXNav = event.offsetX;
    var cursorYNav = event.offsetY;
    document.getElementById('test').innerHTML = "Respecto de la pagina x: " + cursorXNav + ", y: " + cursorYNav;
    document.getElementById('test').innerHTML += "<br>Respecto del navegador x: " + cursorX + ", y: " + cursorY;
}
document.addEventListener("mousemove", MostrarPosicion);
//# sourceMappingURL=clase02_ejercicio30.js.map