namespace Productos {
    export class ManejadoraProducto {
        public static TraerMenu() {
            $.ajax({
                url: "./backend/Productos/",
                method: "GET",
                success: function (xhr) {
                    //console.log(xhr);//Me devuelve el json del retorno, mesa siendo el atributo donde tomar la mesa
                    //$('#mesaText').val(xhr['mesa'].codigo);

                    $('#listaProductos').html(ManejadoraProducto.ArmarLista(xhr));
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        }

        private static ArmarLista(arr: any) {
            let listaString = ` <!-- Default panel contents -->
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        Menú
                                    </div>
                                    <!-- Table -->
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <th colspan=>Nombre</th>
                                                    <th colspan="2">Cantidad</th>
                                                    </thead>`;

            for (let i in arr) {
                let producto = arr[i];
                //console.log(producto);
                let auxNombre = ((<string>producto.nombre).toUpperCase())[0] + (<string>producto.nombre).slice(1);

                listaString += `<tr>
                                    <td>`+ auxNombre + `</td>
                                    <td>
                                        <input type="number" id="id`+ producto.nombre + `" style="border-radius: 0.05px" placeholder="0">
                                    </td>
                                    <td align="right"><input type="button" class="btn btn-info"  value="Agregar" onclick='Productos.ManejadoraProducto.AgregarProducto("`+ producto.nombre + `", "id` + producto.nombre + `")'></td>
                                </tr>`;
            }

            listaString += `        </table>
                                </div>
                            </div>`;

            return listaString;
        }

        public static Validar(id: string, cantidad: number): boolean {
            let auxReturn = false;
            let auxID = '#' + id;

            //console.log(cantidad);
            //console.log("Valido el id " + id);

            if (cantidad >= 1) {
                auxReturn = true;
                $(auxID).css('border', 'solid green 1.5 px');
            }
            else {
                $(auxID).css('border', 'solid red 1.5 px');
            }

            return auxReturn;
        }

        public static AgregarProducto(nombre: string, id: string) {
            //console.log("Valido y veo si agrego el producto " + nombre + " a la lista con la cantidad en " + id);
            let cantidad = parseInt((<string>$('#' + id).val()), 10) ? parseInt((<string>$('#' + id).val()), 10) : 0;

            if (ManejadoraProducto.Validar(id, cantidad)) {
                //console.log("Valido");

                $.ajax({
                    url: "./backend/Productos/" + nombre,
                    method: "GET",
                    success: function (xhr) {
                        //console.log(xhr);
                        let producto = xhr[0];
                        let tabla: string = (<string>$('#listaPedidos').html());

                        tabla += `<tr><td>` + producto.nombre + `</td><td>` + producto.precio + `</td><td>` + cantidad + `</td></tr>`;
                        $('#listaPedidos').html(tabla);

                        /*Cambiar valor del hidden*/
                        let auxValor = <string>$('#hiddenIn').val();
                        //console.log(auxValor);
                        auxValor += producto.nombre + ':' + cantidad + ',';
                        //console.log(auxValor);
                        $('#hiddenIn').val(auxValor);

                        console.log(<string>$('#hiddenIn').val());
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                }); 
                $('#tablaPedidos').prop("hidden", false);
            }
            else {
                console.log("La cantidad es invalida");
            }
        }

        public static MasVendido() {
            $.ajax({
                url: "./backend/Pedidos/MasVendido",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    let strReturn = '';
                    for (let i in xhr) {
                        let log = xhr[i];
                        strReturn += `<tr><td>` + log.producto + `</td><td>` + log.cantidad + `</td></tr>`;
                    }

                    if (strReturn != '') {
                        strReturn = `<table class="col-xs-6"><thead><th>Producto</th><th>Cantidad</th></thead><tbody>` + strReturn + `</tbody></table>`;
                    }

                    $('#responseMasVendido').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        }

        

        public static MenosVendido() {
            $.ajax({
                url: "./backend/Pedidos/MenosVendido",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    let strReturn = '';
                    for (let i in xhr) {
                        let log = xhr[i];
                        strReturn += `<tr><td>` + log.producto + `</td><td>` + log.cantidad + `</td></tr>`;
                    }

                    if (strReturn != '') {
                        strReturn = `<table class="col-xs-6"><thead><th>Producto</th><th>Cantidad</th></thead><tbody>` + strReturn + `</tbody></table>`;
                    }

                    $('#responseMenosVendido').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        }
    }
}