"use strict";
/// <reference path="../librerias/jquery/index.d.ts" />
$(document).ready(function () {
    console.log("Terminé de cargar el documento, pero me inicio luego de loginValidator.js");
    Login.Manejador.IniciarJson();
    $('#toggleAlert').click(function () {
        $('.alert').toggle();
    });
    $("#loginForm").off('submit').submit(function (event) {
        event.preventDefault();
        var email = $("#mailText").val();
        var clave = $("#claveText").val();
        Login.Manejador.VerificarLogin(email, clave);
    });
    $("#btnRegistrar").off('click').click(function () {
        window.location.replace('./registro.html');
    });
});
var Login;
(function (Login) {
    var Manejador = /** @class */ (function () {
        function Manejador() {
        }
        Manejador.IniciarJson = function () {
            if (localStorage.getItem('usuarios') == null) {
                /*
                let arrUsuarios = [{
                    "correo": "alviggi1@gmail.com",
                    "clave": "1234",
                    "nombre": "Augusto",
                    "apellido": "Alviggi",
                    "legajo": "001",
                    "perfil": "invitado",
                    "foto": "001.jpg"
                },
                {
                    "correo": "fatori2@gmail.com",
                    "clave": "4567",
                    "nombre": "Nicolas",
                    "apellido": "Fatori",
                    "legajo": "002",
                    "perfil": "admin",
                    "foto": "002.jpg"
                },
                {
                    "correo": "segado3@gmail.com",
                    "clave": "78910",
                    "nombre": "Emilio",
                    "apellido": "Segado",
                    "legajo": "003",
                    "perfil": "superadmin",
                    "foto": "003.jpg"
                },
                {
                    "correo": "user4@gmail.com",
                    "clave": "14710",
                    "nombre": "User",
                    "apellido": "Cuatro",
                    "legajo": "004",
                    "perfil": "invitado",
                    "foto": "004.jpg"
                },
                {
                    "correo": "user5@gmail.com",
                    "clave": "36912",
                    "nombre": "User",
                    "apellido": "Cinco",
                    "legajo": "005",
                    "perfil": "admin",
                    "foto": "005.png"
                }];
                */
                $.ajax({
                    method: "GET",
                    url: "./backend/Usuarios/",
                    success: function (xhr) {
                        console.log("Vine por success");
                        localStorage.setItem('usuarios', JSON.stringify(xhr));
                        console.log(JSON.parse(localStorage.getItem('usuarios')));
                    },
                    error: function (xhr) {
                        console.log("Vine por un error");
                        console.log(xhr.responseText);
                    }
                });
            }
            else {
                console.log("Los usuarios están cargados");
                console.log(JSON.parse(localStorage.getItem('usuarios')));
            }
        };
        Manejador.VerificarLogin = function (email, clave) {
            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
            var strError = "";
            var boolValido = false;
            var strCorreo = "";
            for (var _i = 0, arrUsuarios_1 = arrUsuarios; _i < arrUsuarios_1.length; _i++) {
                var user = arrUsuarios_1[_i];
                //console.log(user);
                if (user.correo === email) {
                    if (user.clave === clave) {
                        boolValido = true;
                        localStorage.setItem('usuarioActual', JSON.stringify(user));
                        strCorreo = user.correo;
                        break;
                    }
                    else {
                        strError = "clave";
                    }
                }
                else {
                    strError = "usuario";
                }
            }
            if (boolValido) {
                $.ajax({
                    method: "POST",
                    url: "./backend/JWT/Crear",
                    data: { "correo": strCorreo },
                    success: function (xhr) {
                        console.log(xhr);
                        if (xhr.token != null) {
                            localStorage.setItem('token', xhr.token);
                            console.log("Okay en login");
                            window.location.replace('./principal.html');
                        }
                        else {
                            $('#alertText').html("Error en " + xhr.error + ". Reingrese.");
                            $('.alert').toggle();
                        }
                    }
                });
            }
            else {
                $('#alertText').html("Error en " + strError + ". Reingrese.");
                $('.alert').toggle();
            }
        };
        return Manejador;
    }());
    Login.Manejador = Manejador;
})(Login || (Login = {}));
//# sourceMappingURL=login.js.map