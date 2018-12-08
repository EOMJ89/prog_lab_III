"use strict";
function AddErrorAll() {
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var dni = document.getElementById("txtDni").value;
    var sexo = document.getElementById("txtSexo").value;
    //alert(`a${nombre}s\na${apellido}s\na${dni}s\na${sexo}s`)
    CheckError(nombre, "errorNombre", "Nombre");
    CheckError(apellido, "errorApellido", "Apellido");
    CheckError(dni, "errorDni", "Dni");
    CheckErrorSexo(sexo, "errorSexo");
}
function CheckError(texto, idEnPagina, textoEnMensaje) {
    if (texto === "") {
        document.getElementById(idEnPagina).innerHTML = textoEnMensaje + " est\u00E1 vacio.";
    }
    else {
        document.getElementById(idEnPagina).innerHTML = "";
    }
}
function CheckErrorSexo(texto, idEnPagina) {
    texto = texto.toLowerCase();
    if (texto !== "m" && texto !== "f") {
        document.getElementById(idEnPagina).innerHTML = "Por favor, ingrese f o m.";
    }
    else {
        document.getElementById(idEnPagina).innerHTML = "";
    }
}
//# sourceMappingURL=clase02_ejercicio24.js.map