"use strict";
/// <reference path="../Otras.ts" />
/// <reference path="./Pendientes.ts" />
var Pedidos;
(function (Pedidos) {
    var ManejadoraPedidos = /** @class */ (function () {
        function ManejadoraPedidos() {
        }
        ManejadoraPedidos.IngresarPedido = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            var codigoMesa = $('#mesaText').val();
            var cantComenzales = $('#comenzalesText').val();
            var cliente = $('#clienteText').val();
            var foto = $('#fotoText');
            var pedido = $('#hiddenIn').val();
            //console.log("Estoy en el ingreso");
            var formData = new FormData();
            formData.append("token", token);
            formData.append("codigo", codigoMesa);
            formData.append("comenzales", cantComenzales);
            formData.append("cliente", cliente);
            formData.append("foto", foto[0].files[0]);
            formData.append("pedido", pedido);
            $.ajax({
                method: 'POST',
                url: './backend/Pedidos/',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    if (xhr.respuesta == "non-activo") {
                        $('#resultadoPedido').html('<span class="label label-danger">' + xhr.respuesta + '</span>');
                    }
                    else {
                        $('#resultadoPedido').html('<span class="label label-success">' + xhr.respuesta + '</span>');
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadoraPedidos.TraerPedidos = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            var formData = new FormData();
            formData.append("token", token);
            $.ajax({
                url: './backend/Pedidos/TraerPedidos',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    //console.log("Armo la lista");
                    $("#listaComandas").html(Pedidos.ManejadoraPedidos.ArmarLista(xhr.lista));
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadoraPedidos.ArmarLista = function (arr) {
            var listaString = " <!-- Default panel contents -->\n                                            <div class=\"panel panel-default\">\n                                                <div class=\"panel-heading\">Listado de Comandas</div>\n                                                <!-- Table -->\n                                                <div class=\"table-responsive\">\n                                                    <table class=\"table table-striped\">\n                                                        <thead>\n                                                            <th>Id</th>\n                                                            <th>Codigo</th>\n                                                            <th>Comenzales</th>\n                                                            <th>IdMesa</th>\n                                                            <th>Cliente</th>\n                                                            <th>Foto</th>\n                                                            <th>Hora</th>\n                                                            <th>Acciones</th>\n                                                        </thead>";
            for (var det in arr) {
                console.log(arr[det]);
                var detalleAux = arr[det];
                if (detalleAux.estado != 'cancelado') {
                    listaString += "<tr>\n                                        <td>" + detalleAux.id + "</td>\n                                        <td>" + detalleAux.codigo + "</td>\n                                        <td>" + detalleAux.comenzales + "</td>\n                                        <td>" + detalleAux.idMesa + "</td>\n                                        <td>" + detalleAux.cliente + "</td>";
                    if (detalleAux.fotoMesa != "") {
                        listaString += "<td><img src=\"./backend/fotos/" + detalleAux.fotoMesa + "\" height=\"100px\" width=\"100px\"></td>";
                    }
                    else {
                        listaString += "<td>Sin Foto</td>";
                    }
                    listaString += "<td>" + detalleAux.tiempoInicio + "</td>";
                    if (detalleAux.estado != "pagando" && detalleAux.estado != "completado") {
                        listaString += "<td><button type=\"button\" class=\"btn btn-warning\" onclick='Pedidos.ManejadoraPedidos.CancelarPedido(\"" + detalleAux.codigo + "\")'>Cancelar</button></td>\n                                        <td><button type=\"button\" class=\"btn btn-danger\" onclick='Pedidos.ManejadoraPedidos.CobrarPedido(\"" + detalleAux.codigo + "\",\"" + detalleAux.idMesa + "\")'>Cobrar</button></td>";
                    }
                    else {
                        listaString += "<td colspan=\"2\">Completado</td>";
                    }
                    listaString += "</tr>";
                }
            }
            listaString += '</table></div></div>';
            return listaString;
        };
        ManejadoraPedidos.CancelarPedido = function (codigoPedido) {
            var token = Otras.ManejadoraOtros.GetToken();
            var formData = new FormData();
            formData.append("token", token);
            formData.append("codigoPedido", codigoPedido);
            $.ajax({
                url: './backend/Pedidos/Cancelar',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    console.log("Eliminé el pedido y deberia actualizar la lista");
                    Pedidos.ManejadoraPedidos.TraerPedidos();
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadoraPedidos.CobrarPedido = function (codigoPedido, codigoMesa) {
            var token = Otras.ManejadoraOtros.GetToken();
            var formData = new FormData();
            formData.append("token", token);
            formData.append("codigoPedido", codigoPedido);
            formData.append("codigoMesa", codigoMesa);
            $.ajax({
                url: './backend/Mesas/Cobrar',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    console.log("Cobré el pedido y deberia actualizar la lista");
                    Pedidos.ManejadoraPedidos.TraerPedidos();
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadoraPedidos.TraerCancelados = function () {
            $.ajax({
                url: "./backend/Pedidos/Cancelados",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strReturn = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strReturn += "<tr><td>" + log.idPedido + "</td><td>" + log.producto + "</td><td>" + log.cantidad + "</td><td>" + log.estado + "</td></tr>";
                    }
                    if (strReturn != '') {
                        strReturn = "<table class=\"col-xs-6\"><thead><th>ID</th><th>Producto</th><th>Cantidad</th><th>Estado</th></thead><tbody>" + strReturn + "</tbody></table>";
                    }
                    else {
                        strReturn = "No hay pedido cancelados";
                    }
                    $('#responseCancelados').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadoraPedidos.TraerRetrasados = function () {
            $.ajax({
                url: "./backend/Pedidos/EntregasTardias",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    if (xhr.length > 0) {
                        $("#responseRetrasados").html(Pendientes.ManejadoraPendientes.ArmarLista(xhr));
                    }
                    else {
                        $("#responseRetrasados").html("No hay pedido retrasados");
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        return ManejadoraPedidos;
    }());
    Pedidos.ManejadoraPedidos = ManejadoraPedidos;
})(Pedidos || (Pedidos = {}));
//# sourceMappingURL=Pedidos.js.map