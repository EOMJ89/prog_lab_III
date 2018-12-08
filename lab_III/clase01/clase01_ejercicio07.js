"use strict";
function MostrarPrimos() {
    var cantPrimos = 0;
    var i = 0;
    while (cantPrimos < 20) {
        var cont = 0;
        for (var j = 0; j <= i; j++) {
            if (cont > 2) {
                break;
            }
            if (i % j === 0) {
                cont++;
            }
        }
        if (cont === 2) {
            console.log(i);
            cantPrimos++;
        }
        i++;
    }
}
MostrarPrimos();
//# sourceMappingURL=clase01_ejercicio07.js.map