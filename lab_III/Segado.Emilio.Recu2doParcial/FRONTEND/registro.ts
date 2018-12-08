/// <reference path="../librerias/jquery/index.d.ts" />
/// <reference path="./login.ts" />



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
                url: "./backend/Usuarios/",
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    //let respuesta: any = JSON.parse(<string>xhr);
                    console.log(xhr);
                    if (xhr.id != 0) {
                        //Registro.Manejador.AgregarUsuario();
                        console.log("Okay en agregar");
                        localStorage.removeItem('usuarios');
                        Login.Manejador.IniciarJson();
                        window.location.replace('./login.html');
                    }
                    else {
                        $('#alertText').html("Error en " + xhr.error + ". Reingrese.");
                        $('.alert').toggle();
                    }
                }
            });
        }
    }
}
