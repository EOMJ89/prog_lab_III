"use strict";
/// <reference path="../Otras.ts" />
var Empleados;
(function (Empleados) {
    var ManejadorEmpleados = /** @class */ (function () {
        function ManejadorEmpleados() {
        }
        ManejadorEmpleados.Ingresar = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            var datos = {
                "usuario": $('#usuarioText').val(),
                "clave": $('#passwordText').val(),
                "sector": $('#sectorText').val(),
                "perfil": $('#perfilText').val(),
            };
            var formData = new FormData();
            formData.append("token", token);
            formData.append("datos", JSON.stringify(datos));
            $.ajax({
                url: "./backend/Empleado/",
                method: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    //console.log(xhr);
                    console.log("Peticion realizada con exito:\n");
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.Traer = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            var datos = { "token": token };
            $.ajax({
                url: "./backend/Empleado/ListaEmpleados",
                method: "POST",
                data: datos,
                success: function (xhr) {
                    //console.log(xhr);
                    $('#listadoEmpleados').html(ManejadorEmpleados.ArmarLista(xhr));
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.ArmarLista = function (arr) {
            var listaString = '<!-- Default panel contents --><div class="panel panel-default"><div class="panel-heading">Listado de Empleados</div><!-- Table --><div class="table-responsive"><table class="table table-striped"><thead><th>ID</th><th>Usuario</th><th>Sector</th><th>Perfil</th><th>Estado</th>';
            listaString += '<th colspan="2">Acciones</th>';
            listaString += '</thead>';
            for (var i in arr) {
                var empleado = arr[i];
                listaString += '<tr><td>' + empleado.id + '</td><td>' + empleado.usuario + '</td><td>' + empleado.sector + '</td><td>' + empleado.perfil + '</td><td>' + empleado.estado + '</td>';
                listaString += "<td><input type=\"button\" class=\"btn btn-warning\" value=\"Modificar\" onclick='Empleados.ManejadorEmpleados.Modificar(\"" + empleado.id + "\")'></td>";
                listaString += "<td><input type=\"button\" align=\"center\" id=\"btnSuspender\" class=\"btn btn-danger\" value=\"";
                if (empleado.estado == "activo") {
                    listaString += "Suspender";
                }
                else {
                    listaString += "Activar";
                }
                listaString += "\" onclick='Empleados.ManejadorEmpleados.Suspender(\"" + empleado.id + "\",\"" + empleado.estado + "\", \"" + empleado.usuario + "\")' data-toggle=\"modal\" data-target=\"#confirmSuspender\"></td>";
                listaString += '</tr>';
            }
            listaString += '</table></div></div>';
            return listaString;
        };
        ManejadorEmpleados.Modificar = function (id) {
            $.ajax({
                url: "./backend/Empleado/TraerUno/" + (parseInt(id, 10)),
                method: "GET",
                success: function (xhr) {
                    ManejadorEmpleados.ModificarForm(xhr[0]);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.ModificarForm = function (empleado) {
            //console.log(empleado);
            $('#usuarioText').val(empleado.usuario);
            $('#passwordText').val(empleado.clave);
            $('#sectorText').val(empleado.sector);
            $('#perfilText').val(empleado.perfil);
            $('#groupGuardar').prop("hidden", true);
            $('#groupModificar').prop('hidden', false);
            $('#empleadosForm').off('submit').submit(function (event) {
                Empleados.ManejadorEmpleados.ModificarEmpleado(parseInt(empleado.id, 10));
                event.preventDefault();
            });
            $('#btnCancelar').off('click').click(function (event) {
                location.reload();
            });
        };
        ManejadorEmpleados.ModificarEmpleado = function (id) {
            var token = Otras.ManejadoraOtros.GetToken();
            var datos = {
                "id": id,
                "usuario": $('#usuarioText').val(),
                "clave": $('#passwordText').val(),
                "sector": $('#sectorText').val(),
                "perfil": $('#perfilText').val(),
            };
            var formData = new FormData();
            formData.append("token", token);
            formData.append("datos", JSON.stringify(datos));
            //console.log(empleado);
            $.ajax({
                url: "./backend/Empleado/Modificar",
                method: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    console.log("Modificación realizada con exito:\n" + xhr[0]);
                    location.reload();
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.Suspender = function (id, estado, usuario) {
            var mensaje = "Desea ";
            if (estado === "activo") {
                mensaje += "suspender";
            }
            else {
                mensaje += "activar";
            }
            mensaje += " al empleado " + usuario + "?";
            $("#confirmarTexto").html(mensaje);
            $("#modal-btn-si").off('click').on("click", function () {
                var token = Otras.ManejadoraOtros.GetToken();
                var datos = {
                    "token": token,
                    "id": id,
                    "estado": estado
                };
                $.ajax({
                    url: "./backend/Empleado/Suspender",
                    method: "POST",
                    data: datos,
                    success: function (xhr) {
                        //console.log(xhr)
                        ManejadorEmpleados.Traer();
                        $("#confirmSuspender").hide();
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                    }
                });
            });
            $("#modal-btn-no").off('click').on("click", function () {
                $("#confirmSuspender").hide();
            });
        };
        ManejadorEmpleados.CantOperaciones = function () {
            var idEmp = ($('#idTextOperaciones').val() === '') ? 0 : parseInt($('#idTextOperaciones').val(), 10);
            $.ajax({
                url: "./backend/Empleado/Operaciones/" + idEmp,
                method: "GET",
                success: function (xhr) {
                    $('#responseOperaciones').html("Operaciones: " + xhr);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.MostrarLogs = function () {
            $.ajax({
                url: "./backend/Empleado/Logueos",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strReturn = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strReturn += "<tr><td>" + log.usuario + "</td><td>" + log.horaInicio + "</td></tr>";
                    }
                    if (strReturn != '') {
                        strReturn = "<table class=\"col-xs-6\"><thead><th>Usuario</th><th>Hora</th></thead><tbody>" + strReturn + "</tbody></table>";
                    }
                    $('#responseLogs').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.MostrarOperaciones = function () {
            $.ajax({
                url: "./backend/Empleado/OperacionesEmpleados",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strReturn = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strReturn += "<tr><td>" + log.empleado + "</td><td>" + log.operaciones + "</td></tr>";
                    }
                    if (strReturn != '') {
                        strReturn = "<table class=\"col-xs-6\"><thead><th>Empleado</th><th>Operaciones</th></thead><tbody>" + strReturn + "</tbody></table>";
                    }
                    $('#operacionesLogs').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.MostrarOperacionesSector = function () {
            $.ajax({
                url: "./backend/Empleado/OperacionesSector",
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strReturn = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strReturn += "<tr><td>" + log.sector + "</td><td>" + log.operaciones + "</td></tr>";
                    }
                    if (strReturn != '') {
                        strReturn = "<table class=\"col-xs-6\"><thead><th>Sector</th><th>Operaciones</th></thead><tbody>" + strReturn + "</tbody></table>";
                    }
                    $('#opSector').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorEmpleados.MostrarOperacionesSectorEmpleado = function () {
            var sector = $('#idTextSector').val();
            $.ajax({
                url: "./backend/Empleado/OperacionesEmpleadoSector/" + sector,
                method: "GET",
                success: function (xhr) {
                    console.log(xhr);
                    var strReturn = '';
                    for (var i in xhr) {
                        var log = xhr[i];
                        strReturn += "<tr><td>" + log.usuario + "</td><td>" + log.operaciones + "</td></tr>";
                    }
                    if (strReturn != '') {
                        strReturn = "<table class=\"col-xs-6\"><thead><th>Usuario</th><th>Operaciones</th></thead><tbody>" + strReturn + "</tbody></table>";
                    }
                    $('#responseOperacionesSectorEmpleado').html(strReturn);
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        return ManejadorEmpleados;
    }());
    Empleados.ManejadorEmpleados = ManejadorEmpleados;
})(Empleados || (Empleados = {}));
//# sourceMappingURL=Empleados.js.map