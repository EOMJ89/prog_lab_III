$(document).ready(function () {
    console.log("Cargando validadores del form para Login");

    $('#loginForm').bootstrapValidator({
        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mail: {
                validators: {
                    notEmpty: {
                        message: 'El email es requerido.'
                    },
                    emailAddress: {
                        message: 'El email no tiene un formato valido'
                    }
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La clave es requerida.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe tener entre 4 y 8 caracteres'
                    }
                }
            }
        }
    });

    console.log("Termine de cargar los validadores para el form del Login");

    /*Manejador especial en caso de que el validator no funcione al presionar enviar la primera vez*/
    $("#btnEnviar").off('click').click(function () {
        $('#loginForm').bootstrapValidator('revalidateField', 'mail');
        $('#loginForm').bootstrapValidator('revalidateField', 'clave');
    });
});