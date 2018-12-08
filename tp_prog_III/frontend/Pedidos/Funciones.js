"use strict";
/// <reference path="./Pedido.ts" />
$(document).ready(function () {
    /*Cuando el formulario esté completamente cargado*/
    $("#btnEmpleados").off('click').click(function () {
        window.location.replace('Empleados.html');
    });
    $("#pedidoForm").off('submit').submit(function (event) {
        Pedido.ManejadorPedido.Buscar();
        Pedido.ManejadorPedido.VerificarEncuesta();
        event.preventDefault();
    });
    $("#encuestaForm").off('submit').submit(function (event) {
        Pedido.ManejadorPedido.HacerEncuesta();
        event.preventDefault();
    });
});
//# sourceMappingURL=Funciones.js.map