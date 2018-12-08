/// <reference path="../librerias/jquery/index.d.ts" />

$(document).ready(function () {
    console.log("Terminé de cargar el documento, pero me inicio luego de registroValidator.js");

    $('#toggleAlert').click(function () {
        $('.alert').toggle();
    });

    $("#registroForm").off('submit').submit(function (event) {
        event.preventDefault();

        Registro.Manejador.VerificarRegistro();
    });
});

namespace Registro {
    export class Manejador {
        public static VerificarRegistro() {
            let fotoFile: any = $('#fotoFile')[0];
            let formData = new FormData();
            formData.append("foto", fotoFile.files[0]);

            $.ajax({
                method: "POST",
                url: "./backend/guardarImagen.php",
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    let respuesta: any = JSON.parse(<string>xhr);

                    if (respuesta.ok) {
                        Registro.Manejador.AgregarUsuario();
                    }
                    else {
                        $('#alertText').html("Error en " + xhr.error + ". Reingrese.");
                        $('.alert').toggle();
                    }
                }
            });
        }

        public static AgregarUsuario() {
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

            let arrUsuarios: any = JSON.parse(<string>localStorage.getItem('usuarios'));
            arrUsuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(arrUsuarios));
            window.location.replace('./login.html');
        }
    }
}
