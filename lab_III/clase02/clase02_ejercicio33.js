"use strict";
function VerificarFuncion(event) {
    var keyToCheck = event.key;
    var stringSave = event.target.value;
    console.log(stringSave);
    if (keyToCheck < '0' || keyToCheck > '9') {
        event.preventDefault();
    }
    /*else
    {
        (<HTMLInputElement> event.target).value = stringSave+keyToCheck;
    }*/
}
//# sourceMappingURL=clase02_ejercicio33.js.map