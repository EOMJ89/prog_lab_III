"use strict";
function CrearTabla(filas, columnas) {
    var table = document.createElement("table");
    table.border = "1";
    table.createTBody();
    for (var i = 0; i < parseInt(filas, 10); i++) {
        var row = table.insertRow(0);
        for (var j = 0; j < parseInt(columnas, 10); j++) {
            var cell = row.insertCell(0);
            cell.innerHTML = "HEY!";
        }
    }
    var nodeSpecialNode = document.getElementById("auxDiv");
    nodeSpecialNode.appendChild(table);
}
//# sourceMappingURL=clase02_ejercicio28.js.map