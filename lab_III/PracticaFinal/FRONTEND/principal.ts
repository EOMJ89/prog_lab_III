/// <reference path="../librerias/jquery/index.d.ts" />
/// <reference path="./login.ts" />

var userActual: Array<any> | null = null;

$(document).ready(function () {
    console.log("Terminé de cargar el documento");
    Principal.Manejador.VerificarToken(true);

    $('#btnGuardarCambios').off('click').click(function () {
        Principal.Manejador.GuardarCambios();
        Principal.Manejador.VerificarToken(false);
    });
});

namespace Principal {
    export class Manejador {
        public static CrearListado(userActual: any) {
            let arrUsuarios: Array<any> = JSON.parse(<string>localStorage.getItem('usuarios'));

            let listaString: string = ` <div class="table-responsive">
                                            <table class="table table-striped" id="tablaUsers">
                                                <thead>
                                                    <th>Correo</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>
                                                    <th>Perfil</th>
                                                    <th>Legajo</th>
                                                    <th>Foto</th>`;

            if (userActual.perfil !== "invitado") {
                listaString += `                    <th>Acciones</th>`;
            }

            listaString += `                    </thead><tbody>`;

            for (let user of (<Array<any>>arrUsuarios)) {
                listaString += `<tr>
                                    <td>`+ user.correo + `</td>
                                    <td>`+ user.nombre + `</td>
                                    <td>`+ user.apellido + `</td>
                                    <td>`+ user.perfil + `</td>
                                    <td>`+ user.legajo + `</td>
                                    <td><img src="./backend/fotos/`+ user.foto + `" height="50px" width="50px"></td>
                                    `;

                switch (userActual.perfil) {
                    case "admin": {
                        listaString += `<td><button type="button" class="btn btn-danger" onclick='Principal.Manejador.Eliminar("` + user.correo + `")' data-toggle="modal" data-target="#confirmarEliminar">Eliminar</button></td>`;
                        break;
                    }
                    case "superadmin": {
                        listaString += `<td><button type="button" class="btn btn-warning" onclick='Principal.Manejador.Modificar("` + user.correo + `")' data-toggle="modal" data-target="#modificacion">Modificar</button></td>`;
                        break;
                    }
                    default:
                        break;
                }
                listaString += `</tr>`;
            }

            listaString += `        </tbody>
                                </table>
                            </div>`;

            $('#listadoDiv').html(listaString);

            Principal.Manejador.CambiarAspecto();

            if (userActual.perfil === "invitado") {
                $('#controles').prop('hidden', false);
            }
        }

        public static AlterarJson() {
            $.ajax({
                method: "GET",
                url: "./backend/Usuarios/TraerTodos",
                success: function (xhr) {
                    console.log("Ajax exitoso (TraerTodos)");
                    localStorage.setItem('usuarios', JSON.stringify(xhr));
                    console.log(JSON.parse(<string>localStorage.getItem('usuarios')));
                    Principal.Manejador.CrearListado(userActual);
                },
                error: function (xhr) {
                    console.log("Error en Ajax (TraerTodos)");
                    console.log(xhr.responseText);
                }
            });
        }

        public static Eliminar(correo: string) {
            Principal.Manejador.VerificarToken(false);
            $("#confirmarTexto").html("Desea eliminar el usuario con correo " + correo + "?");

            $("#modal-btn-si").off('click').on("click", function () {
                Principal.Manejador.EliminarUsuario(correo);
            });
        }

        public static EliminarUsuario(correo: string) {
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
        }

        public static GuardarCambios() {
            Principal.Manejador.VerificarToken(false);
            let colorFondo = $('#colorFondo').val();
            let colorFuente = $('#colorFuente').val();
            let estiloFoto = $('#marcoImagen').val();

            let opciones: any = {
                "fondo": colorFondo,
                "fuente": colorFuente,
                "estilo": estiloFoto
            };

            localStorage.setItem("op_" + (<any>userActual).correo, JSON.stringify(opciones));
            Principal.Manejador.CrearListado(userActual);
        }

        private static CambiarAspecto() {
            if (localStorage.getItem('op_' + (<any>userActual).correo) != null) {
                //console.log("Encuentro opciones");
                let opciones = JSON.parse(<string>localStorage.getItem('op_' + (<any>userActual).correo));
                $('#tablaUsers').css({ 'background-color': opciones.fondo, 'color': opciones.fuente });

                $('#colorFondo').val(opciones.fondo);
                $('#colorFuente').val(opciones.fuente);
                $('#marcoImagen').val(opciones.estilo);

                $("#tablaUsers tbody tr").each(function () {
                    //console.log("Entré a la tabla");
                    //console.log(this);
                    $(this).children("td").each(function () {
                        if (opciones.estilo != "") {
                            //console.log(opciones.estilo);
                            $(this).children('img').addClass('img-' + opciones.estilo);
                        }
                    });
                });
            }
        }


        public static Modificar(correo: string) {
            $('#modMesnaje').prop('hidden', true);
            $('#registroForm').prop('hidden', false);
            
            $("#registroForm").off('submit').submit(function (event) {
                event.preventDefault();
                Principal.Manejador.VerificarModificacion();
            });

            Principal.Manejador.VerificarToken(false);
            let arrUsuarios: any = JSON.parse(<string>localStorage.getItem('usuarios'));

            for (let user of arrUsuarios) {
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
        }

        public static VerificarModificacion() {
            let nombre: string = <string>$('#nombreText').val();
            let apellido: string = <string>$('#apellidoText').val();
            let mail: string = <string>$('#mailText').val();
            let legajo: string = <string>$('#legajoText').val();
            let perfil: string = <string>$('#perfilText').val();
            let clave: string = <string>$('#claveText').val();
            let fotoFile: any = $('#fotoFile')[0];
            let pathFoto = (<string>(<HTMLInputElement>fotoFile).value).split('\\').reverse()[0];

            let usuario: any = {
                "correo": mail,
                "clave": clave,
                "nombre": nombre,
                "apellido": apellido,
                "legajo": legajo,
                "perfil": perfil,
                "foto": pathFoto
            };

            let formData = new FormData();
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
        }

        public static VerificarToken(recargar: boolean) {
            let token = <string>localStorage.getItem('token');

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
        }
    }
}