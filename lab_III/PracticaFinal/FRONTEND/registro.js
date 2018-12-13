"use strict";
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
var Registro;
(function (Registro) {
    var Manejador = /** @class */ (function () {
        function Manejador() {
        }
        Manejador.VerificarRegistro = function () {
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
        };
        return Manejador;
    }());
    Registro.Manejador = Manejador;
})(Registro || (Registro = {}));
//# sourceMappingURL=registro.js.map