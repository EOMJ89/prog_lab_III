"use strict";
function CheckNumero(fromTextBox, actualTextBox, toTextBox, minimo) {
    var keyToCheck = event.key;
    var TramiteValido = false;
    var auxNumero = parseInt(actualTextBox.value, 10);
    if (auxNumero > minimo) {
        TramiteValido = true;
    }
    if (keyToCheck === "Enter" && TramiteValido == true) {
        CheckPressedKey(fromTextBox, actualTextBox, toTextBox, keyToCheck);
    }
    else if (keyToCheck === "Escape") {
        CheckPressedKey(fromTextBox, actualTextBox, toTextBox, keyToCheck);
    }
}
function CheckPressedKey(fromTextBox, actualTextBox, toTextBox, keyToCheck) {
    if (keyToCheck === "Enter") {
        PressedEnter(actualTextBox, toTextBox);
    }
    if (keyToCheck === "Escape") {
        PressedEscape(actualTextBox, fromTextBox);
    }
}
function PressedEscape(actualTextBox, fromTextBox) {
    if (fromTextBox !== "") {
        console.log("Ha presionado Escape");
        document.getElementById(fromTextBox).disabled = false;
        document.getElementById(fromTextBox).focus();
        actualTextBox.disabled = true;
    }
}
function PressedEnter(actualTextBox, toTextBox) {
    if (toTextBox !== "") {
        console.log("Ha presionado Enter");
        document.getElementById(toTextBox).disabled = false;
        document.getElementById(toTextBox).focus();
        actualTextBox.disabled = true;
    }
}
//# sourceMappingURL=clase02_ejercicio34.js.map