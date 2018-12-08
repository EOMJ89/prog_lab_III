$(document).ready(function () {
    console.log("Carga de validadores para Buscar");
    $('#pedidoForm').bootstrapValidator({
        message: 'El valor no es válido',
        excluded: '',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mesaBuscar: {
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
            pedidoBuscar: {
                validators: {
                    stringLength: {
                        message: 'El codigo debe tener 5 letras',
                        max: 5,
                        min: 5
                    },
                    notEmpty: {
                        message: 'El codigo de pedido es requerido.'
                    }
                }
            }
        }
    });
    console.log("Buscar: Validadores Cargados");

    $('#btnBuscar').off('click').click(function () {
        $('#pedidoForm').bootstrapValidator('revalidateField', 'mesaBuscar');
        $('#pedidoForm').bootstrapValidator('revalidateField', 'pedidoBuscar');
    });
});
