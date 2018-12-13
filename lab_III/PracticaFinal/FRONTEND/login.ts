/// <reference path="../librerias/jquery/index.d.ts" />

$(document).ready(function () {
    console.log("Terminé de cargar el documento, pero me inicio luego de loginValidator.js");
    Login.Manejador.IniciarJson();

    $('#toggleAlert').click(function () {
        $('.alert').toggle();
    });

    $("#loginForm").off('submit').submit(function (event) {
        event.preventDefault();

        let email = <string>$("#mailText").val();
        let clave = <string>$("#claveText").val();
        Login.Manejador.VerificarLogin(email, clave);
    });

    $("#btnRegistrar").off('click').click(function () {
        window.location.replace('./registro.html');
    });
});

namespace Login {
    export class Manejador {
        public static IniciarJson() {
            if (localStorage.getItem('usuarios') == null) {
                //#region
                /*let arrUsuarios = [{
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
                }];*/
                //#endregion 

                $.ajax({
                    method: "GET",
                    url: "./backend/Usuarios/TraerTodos",
                    success: function (xhr) {
                        console.log("Ajax exitoso (TraerTodos)");
                        //console.log(xhr);
                        localStorage.setItem('usuarios', JSON.stringify(xhr));
                        console.log(JSON.parse(<string>localStorage.getItem('usuarios')));
                    },
                    error: function (xhr) {
                        console.log("Error en Ajax (TraerTodos)");
                        console.log(xhr.responseText);
                    }
                });

            }
            else {
                console.log("Los usuarios están cargados");
                console.log(JSON.parse(<string>localStorage.getItem('usuarios')));
            }
        }

        public static VerificarLogin(email: string, clave: string) {
            let arrUsuarios: Array<any> = JSON.parse(<string>localStorage.getItem('usuarios'));
            let strError = "";
            let boolValido = false;
            let strCorreo = "";

            for (let user of arrUsuarios) {
                //console.log(user);

                if (user.correo === email) {
                    if (user.clave === clave) {
                        boolValido = true;
                        //localStorage.setItem('usuarioActual', JSON.stringify(user));
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
                    url: "./backend/Sesion/Login",
                    data: { "correo": strCorreo },
                    success: function (xhr) {
                        //console.log(xhr);
                        console.log("Ajax exitoso (Sesion/Login)");
                        if (xhr.token != null) {
                            localStorage.setItem('token', (<string>xhr.token));
                            window.location.replace('./principal.html');
                        }
                        else {
                            $('#alertText').html("Error en " + xhr.error + ". Reingrese.");
                            $('.alert').toggle();
                        }
                    },
                    error: function (xhr) {
                        console.log("Error en Ajax (Sesion/Login)");
                        console.log(xhr.responseText);
                    }
                });
            }
            else {
                $('#alertText').html("Error en " + strError + ". Reingrese.");
                $('.alert').toggle();
            }
        }
    }
}