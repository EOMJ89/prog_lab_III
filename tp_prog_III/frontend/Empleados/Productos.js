"use strict";
var Productos;
(function (Productos) {
    var ManejadoraProducto = /** @class */ (function () {
        function ManejadoraProducto() {
        }
        ManejadoraProducto.TraerMenu = function () {
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
        };
        ManejadoraProducto.ArmarLista = function (arr) {
            var listaString = " <!-- Default panel contents -->\n                                <div class=\"panel panel-default\">\n                                    <div class=\"panel-heading\">\n                                        Men\u00FA\n                                    </div>\n                                    <!-- Table -->\n                                        <div class=\"table-responsive\">\n                                            <table class=\"table table-striped\">\n                                                <thead>\n                                                    <th colspan=>Nombre</th>\n                                                    <th colspan=\"2\">Cantidad</th>\n                                                    </thead>";
            for (var i in arr) {
                var producto = arr[i];
                //console.log(producto);
                var auxNombre = (producto.nombre.toUpperCase())[0] + producto.nombre.slice(1);
                listaString += "<tr>\n                                    <td>" + auxNombre + "</td>\n                                    <td>\n                                        <input type=\"number\" id=\"id" + producto.nombre + "\" style=\"border-radius: 0.05px\" placeholder=\"0\">\n                                    </td>\n                                    <td align=\"right\"><input type=\"button\" class=\"btn btn-info\"  value=\"Agregar\" onclick='Productos.ManejadoraProducto.AgregarProducto(\"" + producto.nombre + "\", \"id" + producto.nombre + "\")'></td>\n                                </tr>";
            }
            listaString += "        </table>\n                                </div>\n                            </div>";
            return listaString;
        };
        ManejadoraProducto.Validar = function (id, cantidad) {
            var auxReturn = false;
            var auxID = '#' + id;
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
        };
        ManejadoraProducto.AgregarProducto = function (nombre, id) {
            //console.log("Valido y veo si agrego el producto " + nombre + " a la lista con la cantidad en " + id);
            var cantidad = parseInt($('#' + id).val(), 10) ? parseInt($('#' + id).val(), 10) : 0;
            if (ManejadoraProducto.Validar(id, cantidad)) {
                //console.log("Valido");
                $.ajax({
                    url: "./backend/Productos/" + nombre,
                    method: "GET",
                    success: function (xhr) {
                        //console.log(xhr);
                        var producto = xhr[0];
                        var tabla = $('#listaPedidos').html();
                        tabla += "<tr><td>" + producto.nombre + "</td><td>" + producto.precio + "</td><td>" + cantidad + "</td></tr>";
                        $('#listaPedidos').html(tabla);
                        /*Cambiar valor del hidden*/
                        var auxValor = $('#hiddenIn').val();
                        //console.log(auxValor);
                        auxValor += producto.nombre + ':' + cantidad + ',';
                        //console.log(auxValor);
                        $('#hiddenIn').val(auxValor);
                        console.log($('#hiddenIn').val());
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
        };
        ManejadoraProducto.MasVendido = function () {
            $.ajax({
                url: "./backend/Pedidos/MasVendido",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strReturn = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strReturn += "<tr><td>" + log.producto + "</td><td>" + log.cantidad + "</td></tr>";
                    }
                    if (strReturn != '') {
                        strReturn = "<table class=\"col-xs-6\"><thead><th>Producto</th><th>Cantidad</th></thead><tbody>" + strReturn + "</tbody></table>";
                    }
                    $('#responseMasVendido').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadoraProducto.MenosVendido = function () {
            $.ajax({
                url: "./backend/Pedidos/MenosVendido",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strReturn = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strReturn += "<tr><td>" + log.producto + "</td><td>" + log.cantidad + "</td></tr>";
                    }
                    if (strReturn != '') {
                        strReturn = "<table class=\"col-xs-6\"><thead><th>Producto</th><th>Cantidad</th></thead><tbody>" + strReturn + "</tbody></table>";
                    }
                    $('#responseMenosVendido').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        return ManejadoraProducto;
    }());
    Productos.ManejadoraProducto = ManejadoraProducto;
})(Productos || (Productos = {}));
//# sourceMappingURL=Productos.js.map