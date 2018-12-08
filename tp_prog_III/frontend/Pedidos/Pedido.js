"use strict";
var Pedido;
(function (Pedido) {
    var ManejadorPedido = /** @class */ (function () {
        function ManejadorPedido() {
        }
        ManejadorPedido.Buscar = function () {
            var mesa = $("#mesaBuscarText").val();
            var pedido = $("#pedidoBuscarText").val();
            $.ajax({
                method: 'POST',
                url: './backend/Pedidos/TiempoRestante',
                data: {
                    "mesa": mesa,
                    "pedido": pedido
                },
                success: function (xhr) {
                    console.log(xhr);
                    var lista = "";
                    if ((xhr.detalles).length > 0) {
                        lista = Pedido.ManejadorPedido.ArmarLista(xhr.detalles);
                    }
                    else {
                        console.log("Pues todo entregado");
                    }
                    $("#listaRestante").html(lista);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorPedido.ArmarLista = function (arr) {
            var listaString = " <!-- Default panel contents -->\n                                <div class=\"panel panel-default\">\n                                    <div class=\"panel-heading\">Listado de Empleados</div>\n                                    <!-- Table -->\n                                    <div class=\"table-responsive\">\n                                        <table class=\"table table-striped\">\n                                            <thead>\n                                                <th>Producto</th>\n                                                <th>Tiempo Restante</th></thead>";
            for (var det in arr) {
                console.log(arr[det]);
                var detalleAux = arr[det];
                listaString += "<tr>\n                                    <td>" + detalleAux.producto + "</td>";
                if (detalleAux.tiempoRestante == "No iniciado" || detalleAux.tiempoRestante == "Completado") {
                    listaString += "<td>" + detalleAux.tiempoRestante + "</td>";
                }
                else {
                    listaString += "<td>" + detalleAux.tiempoRestante + " minuto/s</td>";
                }
                listaString += "</tr>";
            }
            listaString += '</table></div></div>';
            return listaString;
        };
        ManejadorPedido.VerificarEncuesta = function () {
            var pedido = $("#pedidoBuscarText").val();
            $.ajax({
                method: 'POST',
                url: './backend/Encuestas/VerificarEncuesta',
                data: {
                    "codigoPedido": pedido
                },
                success: function (xhr) {
                    console.log(xhr);
                    var btnString = "Encuesta realizada";
                    if (!(xhr.ok)) {
                        if (xhr.error == "sin-pedido-coincidente") {
                            btnString = "No hay pedido con ese codigo";
                        }
                        else {
                            btnString = "<button type=\"button\" class=\"btn btn-warning\" onclick='' data-toggle=\"modal\" data-target=\"#encuesta\">Hacer Encuesta</button>";
                            $('#idPedido').val(pedido);
                        }
                    }
                    else {
                        if (xhr.error == "pedido-pendiente") {
                            btnString = "";
                        }
                    }
                    $('#divEncuesta').html(btnString);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorPedido.HacerEncuesta = function () {
            var codigoPedido = $('#idPedido').val();
            var mesaPunt = $('#mesaText').val();
            var restaurantePunt = $('#restauranteText').val();
            var mozoPunt = $('#mozoText').val();
            var cocineroPunt = $('#cocineroText').val();
            var review = $('#reviewText').val();
            var formData = new FormData();
            formData.append("codigo", codigoPedido);
            formData.append('mesaPunt', mesaPunt);
            formData.append('restaurantePunt', restaurantePunt);
            formData.append('mozoPunt', mozoPunt);
            formData.append('cocineroPunt', cocineroPunt);
            formData.append('review', review);
            /*console.log(codigoPedido);
            console.log(mesaPunt);
            console.log(restaurantePunt);
            console.log(mozoPunt);
            console.log(cocineroPunt);
            console.log(review);*/
            $.ajax({
                method: 'POST',
                url: './backend/Encuestas/CargarEncuesta',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    console.log(xhr);
                    if (xhr.resultado) {
                        $('#bodyForm').val("Encuesta realizada");
                    }
                    else {
                        $('#bodyForm').val("Error al subir la encuesta");
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        return ManejadorPedido;
    }());
    Pedido.ManejadorPedido = ManejadorPedido;
})(Pedido || (Pedido = {}));
//# sourceMappingURL=Pedido.js.map