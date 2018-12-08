$(document).ready(function () {
    console.log("Carga de validadores para Login");
    $('#loginForm').bootstrapValidator({
        message: 'El valor no es válido',
        excluded: '',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            userLogin: {
                validators: {
                    notEmpty: {
                        message: 'El Usuario es requerido.'
                    }
                }
            },
            claveLogin: {
                validators: {
                    notEmpty: {
                        message: 'La clave es requerida.'
                    }
                }
            }
        }
    });
    console.log("Login: Validadores Cargados");

    $('#btnLogin').off('click').click(function () {
        $('#loginForm').bootstrapValidator('revalidateField', 'userLogin');
        $('#loginForm').bootstrapValidator('revalidateField', 'claveLogin');
    });
});
