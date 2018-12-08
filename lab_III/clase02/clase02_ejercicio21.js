"use strict";
function ObtenerOpcion() {
    var validación = document.getElementsByName("opcionesOperaciones")[0];
    var txt = "";
    var i;
    for (i = 0; i < validación.length; i++) {
        if (validación[i].checked) {
            txt = validación[i].value;
            break;
        }
    }
    return txt;
}
function CalcularOperacion() {
    var resultado = 0;
    var operacion = ObtenerOpcion();
    alert("test" + operacion + "test");
    var primerOperando = document.getElementById("primerOperando").value;
    var auxPrimerOperando = parseInt(primerOperando, 10);
    var segundoOperando = document.getElementById("segundoOperando").value;
    var auxSegundoOperando = parseInt(segundoOperando, 10);
    if (isNaN(auxPrimerOperando)) {
        auxPrimerOperando = 0;
    }
    if (isNaN(auxSegundoOperando)) {
        auxSegundoOperando = 0;
    }
    switch (operacion) {
        case "+":
            {
                resultado = auxPrimerOperando + auxSegundoOperando;
                break;
            }
        case "-":
            {
                resultado = auxPrimerOperando - auxSegundoOperando;
                break;
            }
        case "*":
            {
                resultado = auxPrimerOperando * auxSegundoOperando;
                break;
            }
        default:
            {
                resultado = auxPrimerOperando / auxSegundoOperando;
                break;
            }
    }
    alert("El resultado es " + resultado);
}
//# sourceMappingURL=clase02_ejercicio21.js.map