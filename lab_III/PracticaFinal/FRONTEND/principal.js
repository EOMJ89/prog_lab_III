"use strict";
/// <reference path="../librerias/jquery/index.d.ts" />
/// <reference path="./login.ts" />
var userActual = null;
$(document).ready(function () {
    console.log("Terminé de cargar el documento");
    Principal.Manejador.VerificarToken(true);
    $('#btnGuardarCambios').off('click').click(function () {
        Principal.Manejador.GuardarCambios();
        Principal.Manejador.VerificarToken(false);
    });
});
var Principal;
(function (Principal) {
    var Manejador = /** @class */ (function () {
        function Manejador() {
        }
        Manejador.CrearListado = function (userActual) {
            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
            var listaString = " <div class=\"table-responsive\">\n                                            <table class=\"table table-striped\" id=\"tablaUsers\">\n                                                <thead>\n                                                    <th>Correo</th>\n                                                    <th>Nombre</th>\n                                                    <th>Apellido</th>\n                                                    <th>Perfil</th>\n                                                    <th>Legajo</th>\n                                                    <th>Foto</th>";
            if (userActual.perfil !== "invitado") {
                listaString += "                    <th>Acciones</th>";
            }
            listaString += "                    </thead><tbody>";
            for (var _i = 0, _a = arrUsuarios; _i < _a.length; _i++) {
                var user = _a[_i];
                listaString += "<tr>\n                                    <td>" + user.correo + "</td>\n                                    <td>" + user.nombre + "</td>\n                                    <td>" + user.apellido + "</td>\n                                    <td>" + user.perfil + "</td>\n                                    <td>" + user.legajo + "</td>\n                                    <td><img src=\"./backend/fotos/" + user.foto + "\" height=\"50px\" width=\"50px\"></td>\n                                    ";
                switch (userActual.perfil) {
                    case "admin": {
                        listaString += "<td><button type=\"button\" class=\"btn btn-danger\" onclick='Principal.Manejador.Eliminar(\"" + user.correo + "\")' data-toggle=\"modal\" data-target=\"#confirmarEliminar\">Eliminar</button></td>";
                        break;
                    }
                    case "superadmin": {
                        listaString += "<td><button type=\"button\" class=\"btn btn-warning\" onclick='Principal.Manejador.Modificar(\"" + user.correo + "\")' data-toggle=\"modal\" data-target=\"#modificacion\">Modificar</button></td>";
                        break;
                    }
                    default:
                        break;
                }
                listaString += "</tr>";
            }
            listaString += "        </tbody>\n                                </table>\n                            </div>";
            $('#listadoDiv').html(listaString);
            Principal.Manejador.CambiarAspecto();
            if (userActual.perfil === "invitado") {
                $('#controles').prop('hidden', false);
            }
        };
        Manejador.AlterarJson = function () {
            $.ajax({
                method: "GET",
                url: "./backend/Usuarios/TraerTodos",
                success: function (xhr) {
                    console.log("Ajax exitoso (TraerTodos)");
                    localStorage.setItem('usuarios', JSON.stringify(xhr));
                    console.log(JSON.parse(localStorage.getItem('usuarios')));
                    Principal.Manejador.CrearListado(userActual);
                },
                error: function (xhr) {
                    console.log("Error en Ajax (TraerTodos)");
                    console.log(xhr.responseText);
                }
            });
        };
        Manejador.Eliminar = function (correo) {
            Principal.Manejador.VerificarToken(false);
            $("#confirmarTexto").html("Desea eliminar el usuario con correo " + correo + "?");
            $("#modal-btn-si").off('click').on("click", function () {
                Principal.Manejador.EliminarUsuario(correo);
            });
        };
        Manejador.EliminarUsuario = function (correo) {
            $.ajax({
                method: "DELETE",
                url: "./backend/Usuarios/Eliminar",
                data: { "correo": correo },
                success: function (xhr) {
                    console.log("Ajax exitoso (Eliminar)");
                    if (xhr.ok != 0) {
                        localStorage.removeItem('usuarios');
                        Principal.Manejador.AlterarJson();
                    }
                    else {
                        console.log("No se ha eliminado el usuario");
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        Manejador.GuardarCambios = function () {
            Principal.Manejador.VerificarToken(false);
            var colorFondo = $('#colorFondo').val();
            var colorFuente = $('#colorFuente').val();
            var estiloFoto = $('#marcoImagen').val();
            var opciones = {
                "fondo": colorFondo,
                "fuente": colorFuente,
                "estilo": estiloFoto
            };
            localStorage.setItem("op_" + userActual.correo, JSON.stringify(opciones));
            Principal.Manejador.CrearListado(userActual);
        };
        Manejador.CambiarAspecto = function () {
            if (localStorage.getItem('op_' + userActual.correo) != null) {
                //console.log("Encuentro opciones");
                var opciones_1 = JSON.parse(localStorage.getItem('op_' + userActual.correo));
                $('#tablaUsers').css({ 'background-color': opciones_1.fondo, 'color': opciones_1.fuente });
                $('#colorFondo').val(opciones_1.fondo);
                $('#colorFuente').val(opciones_1.fuente);
                $('#marcoImagen').val(opciones_1.estilo);
                $("#tablaUsers tbody tr").each(function () {
                    //console.log("Entré a la tabla");
                    //console.log(this);
                    $(this).children("td").each(function () {
                        if (opciones_1.estilo != "") {
                            //console.log(opciones.estilo);
                            $(this).children('img').addClass('img-' + opciones_1.estilo);
                        }
                    });
                });
            }
        };
        Manejador.Modificar = function (correo) {
            $('#modMesnaje').prop('hidden', true);
            $('#registroForm').prop('hidden', false);
            $("#registroForm").off('submit').submit(function (event) {
                event.preventDefault();
                Principal.Manejador.VerificarModificacion();
            });
            Principal.Manejador.VerificarToken(false);
            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
            for (var _i = 0, arrUsuarios_1 = arrUsuarios; _i < arrUsuarios_1.length; _i++) {
                var user = arrUsuarios_1[_i];
                if (user.correo === correo) {
                    $('#nombreText').val(user.nombre);
                    $('#apellidoText').val(user.apellido);
                    $('#mailText').val(user.correo);
                    $('#legajoText').val(user.legajo);
                    $('#perfilText').val(user.perfil);
                    $('#claveText').val(user.clave);
                    $('#claveDuplicadaText').val(user.clave);
                    break;
                }
            }
        };
        Manejador.VerificarModificacion = function () {
            var nombre = $('#nombreText').val();
            var apellido = $('#apellidoText').val();
            var mail = $('#mailText').val();
            var legajo = $('#legajoText').val();
            var perfil = $('#perfilText').val();
            var clave = $('#claveText').val();
            var fotoFile = $('#fotoFile')[0];
            var pathFoto = fotoFile.value.split('\\').reverse()[0];
            var usuario = {
                "correo": mail,
                "clave": clave,
                "nombre": nombre,
                "apellido": apellido,
                "legajo": legajo,
                "perfil": perfil,
                "foto": pathFoto
            };
            var formData = new FormData();
            formData.append("foto", fotoFile.files[0]);
            formData.append("usuario", JSON.stringify(usuario));
            $.ajax({
                method: "POST",
                url: "./backend/Usuarios/Modificar",
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    //let respuesta: any = JSON.parse(<string>xhr);
                    console.log(xhr);
                    if (xhr.id != 0) {
                        localStorage.removeItem('usuarios');
                        Principal.Manejador.AlterarJson();
                        $('#registroForm').prop('hidden', true);
                        $('#modMesnaje').prop('hidden', false);
                    }
                    else {
                        $('#alertText').html("Error en " + xhr.error + ". Reingrese.");
                        $('.alert').toggle();
                    }
                }
            });
        };
        Manejador.VerificarToken = function (recargar) {
            var token = localStorage.getItem('token');
            $.ajax({
                method: "GET",
                url: "./backend/Sesion/Verificar",
                headers: { "token": token },
                success: function (xhr) {
                    if (!xhr.ok) {
                        localStorage.removeItem('usuarios');
                        localStorage.removeItem('token');
                        window.location.replace("./login.html");
                    }
                    else {
                        //console.log("El token todavia es valido");
                        if (userActual === null) {
                            userActual = xhr['resultado'];
                        }
                        if (recargar) {
                            Principal.Manejador.CrearListado(userActual);
                        }
                    }
                },
                error: function (xhr) {
                    console.log("Vine por un error");
                    console.log(xhr.responseText);
                }
            });
        };
        return Manejador;
    }());
    Principal.Manejador = Manejador;
})(Principal || (Principal = {}));
//# sourceMappingURL=principal.js.map