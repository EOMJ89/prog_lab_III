/// <reference path="../Otras.ts" />
/// <reference path="./Pendientes.ts" />

namespace Pedidos {
    export class ManejadoraPedidos {
        public static IngresarPedido() {
            let token = Otras.ManejadoraOtros.GetToken();
            let codigoMesa: string = <string>$('#mesaText').val();
            let cantComenzales: string = <string>$('#comenzalesText').val();
            let cliente: string = <string>$('#clienteText').val();
            let foto: any = $('#fotoText');
            let pedido = (<string>$('#hiddenIn').val());

            //console.log("Estoy en el ingreso");
            let formData: FormData = new FormData();
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
                    } else {
                        $('#resultadoPedido').html('<span class="label label-success">' + xhr.respuesta + '</span>');
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText)
                }
            });
        }

        public static TraerPedidos() {
            let token = Otras.ManejadoraOtros.GetToken();
            let formData: FormData = new FormData();
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
        }

        private static ArmarLista(arr: any) {
            let listaString: string = ` <!-- Default panel contents -->
                                            <div class="panel panel-default">
                                                <div class="panel-heading">Listado de Comandas</div>
                                                <!-- Table -->
                                                <div class="table-responsive">
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <th>Id</th>
                                                            <th>Codigo</th>
                                                            <th>Comenzales</th>
                                                            <th>IdMesa</th>
                                                            <th>Cliente</th>
                                                            <th>Foto</th>
                                                            <th>Hora</th>
                                                            <th>Acciones</th>
                                                        </thead>`;

            for (let det in arr) {
                console.log(arr[det]);
                let detalleAux = arr[det];

                if (detalleAux.estado != 'cancelado') {
                    listaString += `<tr>
                                        <td>`+ detalleAux.id + `</td>
                                        <td>`+ detalleAux.codigo + `</td>
                                        <td>`+ detalleAux.comenzales + `</td>
                                        <td>`+ detalleAux.idMesa + `</td>
                                        <td>`+ detalleAux.cliente + `</td>`;

                    if (detalleAux.fotoMesa != "") {
                        listaString += `<td><img src="./backend/fotos/` + detalleAux.fotoMesa + `" height="100px" width="100px"></td>`;
                    }
                    else {
                        listaString += `<td>Sin Foto</td>`;
                    }

                    listaString += `<td>` + detalleAux.tiempoInicio + `</td>`;
                    if (detalleAux.estado != "pagando" && detalleAux.estado != "completado") {
                        listaString += `<td><button type="button" class="btn btn-warning" onclick='Pedidos.ManejadoraPedidos.CancelarPedido("` + detalleAux.codigo + `")'>Cancelar</button></td>
                                        <td><button type="button" class="btn btn-danger" onclick='Pedidos.ManejadoraPedidos.CobrarPedido("`+ detalleAux.codigo + `","` + detalleAux.idMesa + `")'>Cobrar</button></td>`;
                    }
                    else {
                        listaString += `<td colspan="2">Completado</td>`;
                    }
                    listaString += `</tr>`;

                }
            }

            listaString += '</table></div></div>';
            return listaString;
        }

        public static CancelarPedido(codigoPedido: string) {
            let token = Otras.ManejadoraOtros.GetToken();
            let formData: FormData = new FormData();
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
        }

        public static CobrarPedido(codigoPedido: string, codigoMesa: string) {
            let token = Otras.ManejadoraOtros.GetToken();
            let formData: FormData = new FormData();
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
        }

        public static TraerCancelados() {
            $.ajax({
                url: "./backend/Pedidos/Cancelados",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    let strReturn = '';
                    for (let i in xhr) {
                        let log = xhr[i];
                        strReturn += `<tr><td>` + log.idPedido + `</td><td>` + log.producto + `</td><td>` + log.cantidad + `</td><td>` + log.estado + `</td></tr>`;
                    }

                    if (strReturn != '') {
                        strReturn = `<table class="col-xs-6"><thead><th>ID</th><th>Producto</th><th>Cantidad</th><th>Estado</th></thead><tbody>` + strReturn + `</tbody></table>`;
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
        }

        public static TraerRetrasados() {
            $.ajax({
                url: "./backend/Pedidos/EntregasTardias",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    if ((<Array<any>>xhr).length > 0) {
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
        }
    }
}