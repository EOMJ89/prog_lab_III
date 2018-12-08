"use strict";
/// <reference path="../Otras.ts" />
var Pendientes;
(function (Pendientes) {
    var ManejadoraPendientes = /** @class */ (function () {
        function ManejadoraPendientes() {
        }
        ManejadoraPendientes.ListaPendientes = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            var formData = new FormData();
            formData.append("token", token);
            $.ajax({
                url: './backend/Pedidos/PendientesEmpleado',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    //console.log(xhr);
                    //console.log(xhr[0]);
                    $('#listaPendientes').html(Pendientes.ManejadoraPendientes.ArmarLista(xhr['lista']));
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadoraPendientes.ArmarLista = function (datos) {
            //console.log("Hola en lista?");
            var listaString = " <!-- Default panel contents -->\n                                    <div class=\"panel panel-default\">\n                                        <div class=\"panel-heading\">Listado de Pendientes</div>\n                                        <!-- Table -->\n                                        <div class=\"table-responsive\">\n                                            <table class=\"table table-striped\">\n                                                <thead>\n                                                    <th>Id</th>\n                                                    <th>Id Pedido</th>\n                                                    <th>Producto</th>\n                                                    <th>Estado</th>\n                                                    <th>Sector</th>\n                                                    <th colspan=\"2\">Accion</th>\n                                                </thead>";
            for (var i in datos) {
                var pendiente = datos[i];
                //console.log(pendiente);
                //console.log(i);
                listaString += " <tr>\n                                    <td>" + pendiente.id + "</td>\n                                    <td>" + pendiente.idPedido + "</td>\n                                    <td>" + pendiente.producto + "</td>\n                                    <td>" + pendiente.estado + "</td>\n                                    <td>" + pendiente.sector + "</td>";
                if (pendiente.estado == "pendiente") {
                    listaString += "<td><button type=\"button\" class='btn btn-primary' onclick='Pendientes.ManejadoraPendientes.PrepararPedido(" + pendiente.id + ", \"tiempoPreparacion" + pendiente.id + "\")'>Preparar</button></td>\n                                    <td><input type='number' id=\"tiempoPreparacion" + pendiente.id + "\"></td>";
                }
                else if (pendiente.estado == "en preparacion") {
                    listaString += "<td> Tiempo De Preparacion: " + pendiente.tiempoPreparacion + "</td>";
                    listaString += "<td><button type=\"button\" class='btn btn-primary' onclick='Pendientes.ManejadoraPendientes.ServirPedido(" + pendiente.id + ")'>Servir</button></td>";
                }
                else if (pendiente.estado == "listo para servir") {
                    listaString += "<td colspan=\"2\">Servido</td>";
                }
                else if (pendiente.estado == "cancelado") {
                    listaString += "<td colspan=\"2\">Cancelado</td>";
                }
                listaString += "</tr>";
            }
            listaString += "         </table>\n                                </div>\n                            </div>";
            return listaString;
        };
        ManejadoraPendientes.PrepararPedido = function (id, idTiempo) {
            var tiempo = $('#' + idTiempo).val();
            var tiempoN = parseInt(tiempo, 10);
            var token = Otras.ManejadoraOtros.GetToken();
            if (tiempoN >= 1) {
                var formData = new FormData();
                formData.append("token", token);
                formData.append("tiempoPreparacion", tiempoN.toString());
                formData.append("idDetalle", id);
                $.ajax({
                    url: './backend/Pedidos/PrepararPedido',
                    method: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (xhr) {
                        console.log(xhr);
                        Pendientes.ManejadoraPendientes.ListaPendientes();
                        //console.log(xhr[0]);
                        //Pendientes.ManejadoraPendientes.ArmarLista(xhr['lista']);
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            }
        };
        ManejadoraPendientes.ServirPedido = function (id) {
            var token = Otras.ManejadoraOtros.GetToken();
            //console.log(token);
            var formData = new FormData();
            formData.append("token", token);
            formData.append("idDetalle", id);
            $.ajax({
                url: './backend/Pedidos/ServirPedido',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    console.log(xhr);
                    Pendientes.ManejadoraPendientes.ListaPendientes();
                    //console.log(xhr[0]);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        return ManejadoraPendientes;
    }());
    Pendientes.ManejadoraPendientes = ManejadoraPendientes;
})(Pendientes || (Pendientes = {}));
//# sourceMappingURL=Pendientes.js.map