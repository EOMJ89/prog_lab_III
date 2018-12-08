"use strict";
function MostrarInformación(texto) {
    var msj;
    var cont = 0;
    for (var i = 0; i < texto.length; i++) {
        if ((texto[i].toUpperCase()) == texto[i]) {
            cont++;
        }
        ;
    }
    switch (cont) {
        case texto.length:
            {
                msj = "Mayusculas";
                break;
            }
        case 0:
            {
                msj = "Minusculas";
                break;
            }
        default:
            {
                msj = "Ambas";
                break;
            }
    }
    console.log(msj);
}
MostrarInformación("AbC");
MostrarInformación("ABC");
MostrarInformación("abc");
//# sourceMappingURL=clase01_ejercicio10.js.map