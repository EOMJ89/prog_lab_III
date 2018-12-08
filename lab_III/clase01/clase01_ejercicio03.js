"use strict";
function MostrarTexto(veces, texto) {
    if (texto) {
        for (var i = 0; i < veces; i++) {
            console.log(texto);
        }
    }
    else {
        console.log(veces * -1);
    }
}
MostrarTexto(3);
MostrarTexto(3, "Texto");
//# sourceMappingURL=clase01_ejercicio03.js.map