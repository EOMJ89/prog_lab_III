$(document).ready(function () {
    console.log("Carga de validadores para Mesas");
    $('#mesasForm').bootstrapValidator({
        message: 'El valor no es válido',
        excluded: '',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mesa: {
                validators: {
                    stringLength: {
                        message: 'El codigo debe tener 5 letras',
                        max: 5,
                        min: 5
                    },
                    notEmpty: {
                        message: 'El codigo de mesa es requerido.'
                    }
                }
            },
            foto: {
                validators: {
                    file: {
                        extension: 'jpeg,png,jpg',
                        type: 'image/jpeg,image/png,image/jpg',
                        message: 'La imagen seleccionada no es valida.'
                    }
                }
            },
            cliente: {
                validators: {
                    notEmpty: {
                        message: 'El nombre del cliente es requerido.'
                    }
                }
            },
            comenzales: {
                validators: {
                    notEmpty: {
                        message: 'La cantidad de comenzales es requerida.'
                    },
                    greaterThan: {
                        value: 0,
                        inclusive: false,
                        message: 'La cantidad de comenzales debe ser mayor a 0.'
                    }
                }
            },
            pedido: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese un pedido.'
                    }
                }
            }
        }
    });
    console.log("Mesas: Validadores Cargados");

    $('#btnIngresarPedido').off('click').click(function (event) {
        $('#mesasForm').bootstrapValidator('revalidateField', 'mesa');
        $('#mesasForm').bootstrapValidator('revalidateField', 'foto');
        $('#mesasForm').bootstrapValidator('revalidateField', 'cliente');
        $('#mesasForm').bootstrapValidator('revalidateField', 'comenzales');
        $('#mesasForm').bootstrapValidator('revalidateField', 'pedido');

        $('#mesasForm').on('error.form.bv', function (event, data) {
            event.preventDefault();
        });
    });
});
