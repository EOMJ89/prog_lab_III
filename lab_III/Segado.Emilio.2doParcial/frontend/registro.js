"use strict";
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
var Registro;
(function (Registro) {
    var Manejador = /** @class */ (function () {
        function Manejador() {
        }
        Manejador.VerificarRegistro = function () {
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
                        Registro.Manejador.AgregarUsuario();
                    }
                    else {
                        $('#alertText').html("Error en " + xhr.error + ". Reingrese.");
                        $('.alert').toggle();
                    }
                }
            });
        };
        Manejador.AgregarUsuario = function () {
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
            window.location.replace('./login.html');
        };
        return Manejador;
    }());
    Registro.Manejador = Manejador;
})(Registro || (Registro = {}));
//# sourceMappingURL=registro.js.map