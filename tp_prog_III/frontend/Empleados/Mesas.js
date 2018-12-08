"use strict";
/// <reference path="../Otras.ts" />
var Mesa;
(function (Mesa) {
    var ManejadorMesa = /** @class */ (function () {
        function ManejadorMesa() {
        }
        ManejadorMesa.TraerMesaVacia = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            $.ajax({
                url: "./backend/Mesas/TraerVacia",
                method: "POST",
                data: { "token": token },
                success: function (xhr) {
                    //console.log(xhr);//Me devuelve el json del retorno, mesa siendo el atributo donde tomar la mesa
                    if (xhr['mesa'] != null) {
                        $('#mesaText').val(xhr['mesa'].codigo);
                    }
                    else {
                        console.log("No hay mesa disponible");
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerMesas = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            $.ajax({
                url: "./backend/Mesas/TraerMesas",
                method: "POST",
                data: { "token": token },
                success: function (xhr) {
                    if (xhr['lista'] != null && xhr['lista'] != undefined) {
                        $('#listaMesas').html(Mesa.ManejadorMesa.ArmarLista(xhr.lista));
                    }
                    else {
                        console.log("No hay mesas disponible");
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.ArmarLista = function (datos) {
            var listaString = " <!-- Default panel contents -->\n                                    <div class=\"panel panel-default\">\n                                        <div class=\"panel-heading\">Listado de Pendientes</div>\n                                        <!-- Table -->\n                                        <div class=\"table-responsive\">\n                                            <table class=\"table table-striped\">\n                                                <thead>\n                                                    <th>Id</th>\n                                                    <th>Codigo</th>\n                                                    <th>Cantidad de Usos</th>\n                                                    <th>Estado</th>\n                                                </thead>";
            for (var i in datos) {
                var mesa = datos[i];
                //console.log(pendiente);
                //console.log(i);
                listaString += "<tr>\n                                    <td>" + mesa.id + "</td>\n                                    <td>" + mesa.codigo + "</td>\n                                    <td>" + mesa.canUsos + "</td>";
                if (mesa.estado == 'con clientes pagando') {
                    listaString += "<td><button type=\"button\" class=\"btn btn-danger\" onclick='Mesa.ManejadorMesa.CerrarMesa(\"" + mesa.codigo + "\")'>Cerrar</button></td>";
                }
                else if (mesa.estado == 'cerrada') {
                    listaString += "<td><button type=\"button\" class=\"btn btn-info\" onclick='Mesa.ManejadorMesa.AbrirMesa(\"" + mesa.codigo + "\")'>Abrir</button></td>";
                }
                else {
                    listaString += "<td>" + mesa.estado + "</td>";
                }
                listaString += "</tr>";
            }
            listaString += "         </table>\n                                </div>\n                            </div>";
            return listaString;
        };
        ManejadorMesa.CerrarMesa = function (idMesa) {
            var token = Otras.ManejadoraOtros.GetToken();
            $.ajax({
                url: "./backend/Mesas/Cerrar",
                method: "POST",
                data: {
                    "token": token,
                    "codigoMesa": idMesa
                },
                success: function (xhr) {
                    Mesa.ManejadorMesa.TraerMesas();
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.AbrirMesa = function (idMesa) {
            var token = Otras.ManejadoraOtros.GetToken();
            $.ajax({
                url: "./backend/Mesas/Abrir",
                method: "POST",
                data: {
                    "token": token,
                    "codigoMesa": idMesa
                },
                success: function (xhr) {
                    Mesa.ManejadorMesa.TraerMesas();
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerEstadisticas = function () {
            Mesa.ManejadorMesa.TraerMasUsada();
            Mesa.ManejadorMesa.TraerMenosUsada();
            Mesa.ManejadorMesa.TraerSinUsar();
            Mesa.ManejadorMesa.MasFacturo();
            Mesa.ManejadorMesa.MenosFacturo();
        };
        ManejadorMesa.TraerMasUsada = function () {
            $.ajax({
                url: "./backend/Mesas/MasUsada",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.codigo + "</td><td>" + log.canUsos + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Codigo</th><th>Usos</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay mesas usadas";
                    }
                    $("#responseMesasMasUsada").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerMenosUsada = function () {
            $.ajax({
                url: "./backend/Mesas/MenosUsada",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.codigo + "</td><td>" + log.canUsos + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Codigo</th><th>Usos</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay mesas usadas";
                    }
                    $("#responseMesasMenosUsada").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerSinUsar = function () {
            $.ajax({
                url: "./backend/Mesas/NoSeUso",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.codigo + "</td><td>" + log.canUsos + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Codigo</th><th>Usos</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay mesas sin usar";
                    }
                    $("#responseMesasNoUsada").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.MasFacturo = function () {
            $.ajax({
                url: "./backend/Mesas/MasFacturo",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.codigoMesa + "</td><td>" + log.total + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Codigo</th><th>Total</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay mesas";
                    }
                    $("#responseMesasMasFacturo").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.MenosFacturo = function () {
            $.ajax({
                url: "./backend/Mesas/MenosFacturo",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.codigoMesa + "</td><td>" + log.total + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Codigo</th><th>Total</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay mesas";
                    }
                    $("#responseMesasMenosFacturo").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerFacturas = function () {
            Mesa.ManejadorMesa.TraerMenorFactura();
            Mesa.ManejadorMesa.TraerMayorFactura();
        };
        ManejadorMesa.TraerMenorFactura = function () {
            $.ajax({
                url: "./backend/Mesas/MenorFactura",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.codigoMesa + "</td><td>" + log.total + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Codigo</th><th>Total</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay facturas";
                    }
                    $("#responseMenorFactura").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerMayorFactura = function () {
            $.ajax({
                url: "./backend/Mesas/MayorFactura",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.codigoMesa + "</td><td>" + log.total + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Codigo</th><th>Total</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay facturas";
                    }
                    $("#responseMayorFactura").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerFacturasFechas = function () {
            var mesa = $('#mesaDesdeHasta').val();
            var inicio = $('#inicio').val();
            var hasta = $('#hasta').val();
            if (mesa != '') {
                $.ajax({
                    url: "./backend/Mesas/FacturadoEntreFechas",
                    method: "POST",
                    data: { "mesa": mesa, "desde": inicio, "hasta": hasta },
                    success: function (xhr) {
                        console.log(xhr);
                        if (xhr[0].total != null) {
                            $('#responseDesdeHasta').html("El importe obtenido es " + xhr[0].total);
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            }
        };
        ManejadorMesa.TraerPeorReview = function () {
            $.ajax({
                url: "./backend/Encuestas/Peor",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.id + "</td><td>" + log.codigoPedido + "</td><td>" + log.mesaPunt + "</td><td>" + log.restaurantePunt + "</td><td>" + log.mozoPunt + "</td><td>" + log.cocineroPunt + "</td><td>" + log.review + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Id</th><th>Pedido</th><th>Meza</th><th>Restaurante</th><th>Mozo</th><th>Cocinero</th><th>Review</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay reviews";
                    }
                    $("#responsePeorReview").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorMesa.TraerMejorReview = function () {
            $.ajax({
                url: "./backend/Encuestas/Mejor",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strLista = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strLista += "<tr><td>" + log.id + "</td><td>" + log.codigoPedido + "</td><td>" + log.mesaPunt + "</td><td>" + log.restaurantePunt + "</td><td>" + log.mozoPunt + "</td><td>" + log.cocineroPunt + "</td><td>" + log.review + "</td></tr>";
                    }
                    if (strLista != "") {
                        strLista = "<table class=\"col-xs-6\"><thead><th>Id</th><th>Pedido</th><th>Meza</th><th>Restaurante</th><th>Mozo</th><th>Cocinero</th><th>Review</th></thead><tbody>" + strLista + "<tbody></table>";
                    }
                    else {
                        strLista = "No hay reviews";
                    }
                    $("#responseMejorReview").html(strLista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        return ManejadorMesa;
    }());
    Mesa.ManejadorMesa = ManejadorMesa;
})(Mesa || (Mesa = {}));
//# sourceMappingURL=Mesas.js.map