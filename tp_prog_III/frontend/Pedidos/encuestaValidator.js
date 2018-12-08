$(document).ready(function () {
    console.log("Carga de validadores para Buscar");
    $('#encuestaForm').bootstrapValidator({
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
                    between: {
                        inclusive: true,
                        message: 'Puntaje debe ser de 1 a 10',
                        max: 10,
                        min: 1
                    },
                    notEmpty: {
                        message: 'El puntaje de mesa es requerido.'
                    }
                }
            },
            restaurante: {
                validators: {
                    between: {
                        inclusive: true,
                        message: 'Puntaje debe ser de 1 a 10',
                        max: 10,
                        min: 1
                    },
                    notEmpty: {
                        message: 'El puntaje del restaurante es requerido.'
                    }
                }
            },
            mozo: {
                validators: {
                    between: {
                        inclusive: true,
                        message: 'Puntaje debe ser de 1 a 10',
                        max: 10,
                        min: 1
                    },
                    notEmpty: {
                        message: 'El puntaje del mozo es requerido.'
                    }
                }
            },
            cocinero: {
                validators: {
                    between: {
                        inclusive: true,
                        message: 'Puntaje debe ser de 1 a 10',
                        max: 10,
                        min: 1
                    },
                    notEmpty: {
                        message: 'El puntaje del cocinero es requerido.'
                    }
                }
            },
            review: {
                validators: {
                    stringLength: {
                        inclusive: true,
                        message: 'La reseña debe ser menor a 66 caracteres',
                        max: 66,
                        min: 1
                    },
                    notEmpty: {
                        message: 'La reseña es requerida.'
                    }
                }
            }
        }
    });
    console.log("Buscar: Validadores Cargados");

    $('#btnBuscar').off('click').click(function () {
        $('#encuestaForm').bootstrapValidator('revalidateField', 'mesa');
        $('#encuestaForm').bootstrapValidator('revalidateField', 'restaurante');
        $('#encuestaForm').bootstrapValidator('revalidateField', 'mozo');
        $('#encuestaForm').bootstrapValidator('revalidateField', 'cocinero');
        $('#encuestaForm').bootstrapValidator('revalidateField', 'review');
    });
});
