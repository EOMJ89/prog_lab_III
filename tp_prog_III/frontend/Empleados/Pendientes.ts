/// <reference path="../Otras.ts" />

namespace Pendientes {
    export class ManejadoraPendientes {
        public static ListaPendientes() {
            let token = Otras.ManejadoraOtros.GetToken();

            let formData = new FormData();
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
        }

        public static ArmarLista(datos: any) {
            //console.log("Hola en lista?");
            let listaString = ` <!-- Default panel contents -->
                                    <div class="panel panel-default">
                                        <div class="panel-heading">Listado de Pendientes</div>
                                        <!-- Table -->
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <th>Id</th>
                                                    <th>Id Pedido</th>
                                                    <th>Producto</th>
                                                    <th>Estado</th>
                                                    <th>Sector</th>
                                                    <th colspan="2">Accion</th>
                                                </thead>`;

            for (let i in datos) {
                let pendiente = datos[i];
                //console.log(pendiente);
                //console.log(i);
                listaString += ` <tr>
                                    <td>` + pendiente.id + `</td>
                                    <td>` + pendiente.idPedido + `</td>
                                    <td>` + pendiente.producto + `</td>
                                    <td>` + pendiente.estado + `</td>
                                    <td>` + pendiente.sector + `</td>`;

                if (pendiente.estado == "pendiente") {
                    listaString += `<td><button type="button" class='btn btn-primary' onclick='Pendientes.ManejadoraPendientes.PrepararPedido(` + pendiente.id + `, "tiempoPreparacion` + pendiente.id + `")'>Preparar</button></td>
                                    <td><input type='number' id="tiempoPreparacion` + pendiente.id + `"></td>`;
                }
                else if (pendiente.estado == "en preparacion") {
                    listaString += `<td> Tiempo De Preparacion: ` + pendiente.tiempoPreparacion + `</td>`;
                    listaString += `<td><button type="button" class='btn btn-primary' onclick='Pendientes.ManejadoraPendientes.ServirPedido(` + pendiente.id + `)'>Servir</button></td>`;

                }
                else if (pendiente.estado == "listo para servir") {
                    listaString += `<td colspan="2">Servido</td>`;
                }
                else if (pendiente.estado == "cancelado") {
                    listaString += `<td colspan="2">Cancelado</td>`;
                }

                listaString += `</tr>`;
            }

            listaString += `         </table>
                                </div>
                            </div>`;

            return listaString;
        }

        public static PrepararPedido(id: string, idTiempo: string) {
            let tiempo: string = <string>$('#' + idTiempo).val();
            let tiempoN: number = parseInt(tiempo, 10);
            let token = Otras.ManejadoraOtros.GetToken();

            if (tiempoN >= 1) {
                let formData = new FormData();
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
        }

        public static ServirPedido(id: string) {
            let token = Otras.ManejadoraOtros.GetToken();
            //console.log(token);

            let formData = new FormData();
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
        }
    }
}
