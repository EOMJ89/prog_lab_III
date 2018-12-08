namespace Login {
    export class ManejadorLogin {
        public static Logear() {
            let user: string = <string>$('#idUserLogin').val();
            let clave: string = <string>$('#idClaveLogin').val();

            let formData = new FormData();
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
                        let token = (xhr.token).replace(/"/g, '');
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
        }

        public static Cerrar() {
            let token = Otras.ManejadoraOtros.GetToken();
            let datos = { "token": token };

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
        }

        public static VerificarLogin() {
            if (localStorage.getItem('token') != null) {
                $('#loginDiv').prop('hidden', true);
                console.log()
                $('#userSpan').html((JSON.parse(<string>localStorage.getItem('datos'))).usuario);
                $('#idCerrarSesion').prop('hidden', false);
                $('#idTablasAcciones').prop('hidden', false);

                /*Manejador para el logout*/
                $('#btnCerrar').off('click').click(function () {
                    Login.ManejadorLogin.Cerrar();
                });
            }
        }
    }
}