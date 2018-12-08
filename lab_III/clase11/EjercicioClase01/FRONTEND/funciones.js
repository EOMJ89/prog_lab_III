"use strict";
$(document).ready(function () {
    /*Cuando el formulario esté completamente cargado*/
    $("#loginForm").submit(function () {
        var auxReturn = true;
        var usuario = $("#usuarioText").val();
        var password = $("#passwordText").val();
        var auxMensaje = "Se ha encontrado un problema:\n";
        if (usuario === "") {
            auxReturn = false;
            auxMensaje += "El usuario está vacio\n";
        }
        if (password === "") {
            auxReturn = false;
            auxMensaje += "La contraseña está vacia\n";
        }
        if (!auxReturn) {
            console.log(auxMensaje);
        }
        return auxReturn;
    });
});
//# sourceMappingURL=funciones.js.map