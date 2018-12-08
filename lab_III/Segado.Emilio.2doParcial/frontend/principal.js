"use strict";
/// <reference path="../librerias/jquery/index.d.ts" />
$(document).ready(function () {
    console.log("Terminé de cargar el documento");
    $('#btnGuardarCambios').off('click').click(function (event) {
        Principal.Manejador.GuardarCambios();
    });
    Principal.Manejador.CrearListado();
});
var Principal;
(function (Principal) {
    var Manejador = /** @class */ (function () {
        function Manejador() {
        }
        Manejador.CrearListado = function () {
            var userActual = JSON.parse(localStorage.getItem('usuarioActual'));
            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
            var listaString = " <div class=\"table-responsive\">\n                                            <table class=\"table table-striped\" id=\"tablaUsers\">\n                                                <thead>\n                                                    <th>Correo</th>\n                                                    <th>Nombre</th>\n                                                    <th>Apellido</th>\n                                                    <th>Perfil</th>\n                                                    <th>Legajo</th>\n                                                    <th>Foto</th>";
            if (userActual.perfil !== "invitado") {
                listaString += "                    <th>Acciones</th>";
            }
            listaString += "                    </thead><tbody>";
            for (var _i = 0, arrUsuarios_1 = arrUsuarios; _i < arrUsuarios_1.length; _i++) {
                var user = arrUsuarios_1[_i];
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
        Manejador.Eliminar = function (correo) {
            $("#confirmarTexto").html("Desea eliminar el usuario con correo " + correo + "?");
            $("#modal-btn-si").off('click').on("click", function () {
                Principal.Manejador.EliminarUsuario(correo);
            });
        };
        /**
         * name
         */
        Manejador.EliminarUsuario = function (correo) {
            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
            var nuevoArray = new Array();
            for (var _i = 0, arrUsuarios_2 = arrUsuarios; _i < arrUsuarios_2.length; _i++) {
                var user = arrUsuarios_2[_i];
                if (user.correo === correo) {
                    console.log("Me salteo el usuario");
                    continue;
                }
                else {
                    nuevoArray.push(user);
                }
            }
            //console.log("Seteo la nueva lista y actualizo");
            localStorage.setItem('usuarios', JSON.stringify(nuevoArray));
            Principal.Manejador.CrearListado();
        };
        Manejador.GuardarCambios = function () {
            var userActual = JSON.parse(localStorage.getItem('usuarioActual'));
            var colorFondo = $('#colorFondo').val();
            var colorFuente = $('#colorFuente').val();
            var estiloFoto = $('#marcoImagen').val();
            var opciones = {
                "fondo": colorFondo,
                "fuente": colorFuente,
                "estilo": estiloFoto
            };
            localStorage.setItem("op_" + userActual.correo, JSON.stringify(opciones));
            Principal.Manejador.CrearListado();
        };
        Manejador.CambiarAspecto = function () {
            var userActual = JSON.parse(localStorage.getItem('usuarioActual'));
            if (localStorage.getItem('op_' + userActual.correo) != null) {
                console.log("Encuentro opciones");
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
            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
            for (var _i = 0, arrUsuarios_3 = arrUsuarios; _i < arrUsuarios_3.length; _i++) {
                var user = arrUsuarios_3[_i];
                if (user.correo === correo) {
                    $('#nombreText').val(user.nombre);
                    $('#apellidoText').val(user.apellido);
                    $('#mailText').val(user.correo);
                    $('#legajoText').val(user.legajo);
                    $('#perfilText').val(user.perfil);
                    $('#claveText').val(user.clave);
                    $('#claveDuplicadaText').val(user.clave);
                    Principal.Manejador.EliminarUsuario(user.correo);
                    break;
                }
            }
            $("#registroForm").off('submit').submit(function (event) {
                event.preventDefault();
                Principal.Manejador.VerificarModificacion();
            });
        };
        Manejador.VerificarModificacion = function () {
            var fotoFile = $('#fotoFile')[0];
            var formData = new FormData();
            formData.append("foto", fotoFile.files[0]);
            $.ajax({
                method: "POST",
                url: "./backend/guardarImagen.php",
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    var respuesta = JSON.parse(xhr);
                    if (respuesta.ok) {
                        Principal.Manejador.ModificarUsuario();
                    }
                    else {
                        $('#alertText').html("Error en " + xhr.error + ". Reingrese.");
                        $('.alert').toggle();
                    }
                }
            });
        };
        Manejador.ModificarUsuario = function () {
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
            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
            arrUsuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(arrUsuarios));
            Principal.Manejador.CrearListado();
        };
        return Manejador;
    }());
    Principal.Manejador = Manejador;
})(Principal || (Principal = {}));
//# sourceMappingURL=principal.js.map