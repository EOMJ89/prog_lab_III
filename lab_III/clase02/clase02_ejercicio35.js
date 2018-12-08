"use strict";
function AddSpan(txtMensaje, idEnPag) {
    var spanSpecial = document.createElement("SPAN");
    spanSpecial.innerHTML += "<br>";
    var messageText = document.createTextNode(txtMensaje);
    spanSpecial.appendChild(messageText);
    document.getElementById(idEnPag).appendChild(spanSpecial);
}
function CheckEnter(inputText, keyToCheck) {
    //console.log(keyToCheck);
    if (keyToCheck === "Enter") {
        CheckPalindromo(inputText);
    }
}
function CheckPalindromo(inputToCheck) {
    var textToCheck = inputToCheck.value;
    var auxTring = "";
    for (var i = textToCheck.length - 1; i >= 0; i--) {
        auxTring += textToCheck[i];
    }
    console.log(textToCheck + " " + auxTring);
    if (auxTring === textToCheck) {
        console.log("YES!");
        AddSpan("Es un palindromo!", "tooltip");
    }
    else {
        console.log("NOPE!");
        alert("No es un palindromo!");
    }
}
//# sourceMappingURL=clase02_ejercicio35.js.map