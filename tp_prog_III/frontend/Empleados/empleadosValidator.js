$(document).ready(function () {
    console.log("Carga de validadores para Empleados");

    $('#empleadosForm').bootstrapValidator({
        message: 'El valor no es válido',
        excluded: '',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            usuario: {
                validators: {
                    notEmpty: {
                        message: 'El nombre de Usuario es requerido.'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida.'
                    }
                }
            },
            sector: {
                validators: {
                    notEmpty: {
                        message: "El sector es requerido."
                    }
                }
            },
            perfil: {
                validators: {
                    notEmpty: {
                        message: "El perfil es requerido."
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        console.log("Hola?");
    });
    console.log("Empleados: Validadores Cargados");

    $('#btnGuardar').off('click').click(ValForm);

    $('#btnModificar').off('click').click(ValForm);
});

function ValForm () {
    $('#empleadosForm').bootstrapValidator('revalidateField', 'usuario');
    $('#empleadosForm').bootstrapValidator('revalidateField', 'password');
    $('#empleadosForm').bootstrapValidator('revalidateField', 'sector');
    $('#empleadosForm').bootstrapValidator('revalidateField', 'perfil');
}
