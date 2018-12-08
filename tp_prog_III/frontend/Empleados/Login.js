"use strict";
var Login;
(function (Login) {
    var ManejadorLogin = /** @class */ (function () {
        function ManejadorLogin() {
        }
        ManejadorLogin.Logear = function () {
            var user = $('#idUserLogin').val();
            var clave = $('#idClaveLogin').val();
            var formData = new FormData();
            formData.append('user', user);
            formData.append('clave', clave);
            $.ajax({
                url: './backend/Sesion/',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    if (xhr.datos != 'error') {
                        var token = (xhr.token).replace(/"/g, '');
                        localStorage.setItem('token', token);
                        localStorage.setItem('datos', JSON.stringify(xhr.datos));
                        $('#loginDiv').prop('hidden', true);
                        $('#errorLogin').html('');
                        $('#userSpan').html(xhr.datos.usuario);
                        $('#idCerrarSesion').prop('hidden', false);
                        $('#idTablasAcciones').prop('hidden', false);
                        /*Manejador para el logout*/
                        $('#btnCerrar').off('click').click(function () {
                            Login.ManejadorLogin.Cerrar();
                        });
                    }
                    else {
                        $('#errorLogin').html('<span class="label label-danger">' + xhr.mensaje + '</span>');
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorLogin.Cerrar = function () {
            var token = Otras.ManejadoraOtros.GetToken();
            var datos = { "token": token };
            $.ajax({
                url: './backend/Sesion/Salir',
                method: 'PUT',
                data: datos,
                success: function (xhr) {
                    if (xhr.datos != 'Sesion cerrada') {
                        localStorage.removeItem('token');
                        localStorage.removeItem('datos');
                        $('#idTablasAcciones').prop('hidden', true);
                        $('#idCerrarSesion').prop('hidden', true);
                        $('#errorLogin').html('');
                        $('#loginDiv').prop('hidden', false);
                    }
                    else {
                        $('#errorLogin').html('<span class="label label-danger">' + xhr.mensaje + '</span>');
                    }
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        };
        ManejadorLogin.VerificarLogin = function () {
            if (localStorage.getItem('token') != null) {
                $('#loginDiv').prop('hidden', true);
                console.log();
                $('#userSpan').html((JSON.parse(localStorage.getItem('datos'))).usuario);
                $('#idCerrarSesion').prop('hidden', false);
                $('#idTablasAcciones').prop('hidden', false);
                /*Manejador para el logout*/
                $('#btnCerrar').off('click').click(function () {
                    Login.ManejadorLogin.Cerrar();
                });
            }
        };
        return ManejadorLogin;
    }());
    Login.ManejadorLogin = ManejadorLogin;
})(Login || (Login = {}));
//# sourceMappingURL=Login.js.map