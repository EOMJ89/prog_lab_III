namespace Pedido {
    export class ManejadorPedido {
        public static Buscar() {
            let mesa: string = <string>$("#mesaBuscarText").val();
            let pedido: string = <string>$("#pedidoBuscarText").val();

            $.ajax({
                method: 'POST',
                url: './backend/Pedidos/TiempoRestante',
                data: {
                    "mesa": mesa,
                    "pedido": pedido
                },
                success: function (xhr) {
                    console.log(xhr);
                    let lista = "";
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
        }


        private static ArmarLista(arr: any) {
            let listaString = ` <!-- Default panel contents -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">Listado de Empleados</div>
                                    <!-- Table -->
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <th>Producto</th>
                                                <th>Tiempo Restante</th></thead>`;

            for (let det in arr) {
                console.log(arr[det]);
                let detalleAux = arr[det];
                listaString += `<tr>
                                    <td>`+ detalleAux.producto + `</td>`;

                if (detalleAux.tiempoRestante == "No iniciado" || detalleAux.tiempoRestante == "Completado") {
                    listaString += `<td>` + detalleAux.tiempoRestante + `</td>`;
                }
                else {
                    listaString += `<td>` + detalleAux.tiempoRestante + ` minuto/s</td>`;
                }
                listaString += `</tr>`;
            }

            listaString += '</table></div></div>';
            return listaString;
        }

        public static VerificarEncuesta() {
            let pedido: string = <string>$("#pedidoBuscarText").val();

            $.ajax({
                method: 'POST',
                url: './backend/Encuestas/VerificarEncuesta',
                data: {
                    "codigoPedido": pedido
                },
                success: function (xhr) {
                    console.log(xhr);
                    let btnString = `Encuesta realizada`;

                    if (!(xhr.ok)) {
                        if (xhr.error == "sin-pedido-coincidente") {
                            btnString = "No hay pedido con ese codigo";
                        }
                        else {
                            btnString = `<button type="button" class="btn btn-warning" onclick='' data-toggle="modal" data-target="#encuesta">Hacer Encuesta</button>`;

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
        }

        public static HacerEncuesta() {
            let codigoPedido: string = <string>$('#idPedido').val();
            let mesaPunt: string = <string>$('#mesaText').val();
            let restaurantePunt: string = <string>$('#restauranteText').val();
            let mozoPunt: string = <string>$('#mozoText').val();
            let cocineroPunt: string = <string>$('#cocineroText').val();
            let review: string = <string>$('#reviewText').val();

            let formData: FormData = new FormData();

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
        }
    }
}