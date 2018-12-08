$(document).ready(function () {
    console.log("Cargando validadores del form para el Registro");

    $('#registroForm').bootstrapValidator({
        message: 'El valor no es válido',
        excluded: '',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es requerido.'
                    },
                    stringLength: {
                        inclusive: true,
                        max: 10,
                        message: 'El nombre no debe exceder los 10 caracteres'
                    }
                }
            },
            apellido: {
                validators: {
                    notEmpty: {
                        message: 'El apellido es requerido.'
                    },
                    stringLength: {
                        inclusive: true,
                        max: 15,
                        message: 'El apellido no debe exceder los 15 caracteres'
                    }
                }
            },
            mail: {
                validators: {
                    notEmpty: {
                        message: 'El email es requerido.'
                    },
                    emailAddress: {
                        message: 'El email no tiene un formato valido'
                    },
                    callback: {
                        message: 'Correo ya en uso',
                        callback: function (valor) {
                            var arrUsuarios = JSON.parse(localStorage.getItem('usuarios'));
                            var auxReturn = true;
                        
                            for (var user of arrUsuarios) {
                                //console.log(user);
                                if (user['correo'] === valor) {
                                    auxReturn = false;
                                    break;
                                }
                            }
                            return auxReturn;
                        }
                    }
                }
            },
            legajo: {
                validators: {
                    notEmpty: {
                        message: 'El legajo es requerido.'
                    },
                    between: {
                        inclusive: true,
                        min: 100,
                        max: 999999,
                        message: 'El legajo debe tener entre 3 y 6 cifras'
                    }
                }
            },
            foto: {
                validators: {
                    notEmpty: {
                        message: 'La foto es requerida.'
                    },
                    file: {
                        extension: 'jpeg,png,jpg',
                        type: 'image/jpeg,image/png,image/jpg',
                        message: 'El archivo seleccionado debe ser jpeg o png'
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
                    },
                    identical: {
                        field: 'claveDuplicada',
                        message: 'La clave debe coincidir'
                    }
                }
            },
            claveDuplicada: {
                validators: {
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe tener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'clave',
                        message: 'La clave debe coincidir'
                    }
                }
            }
        }
    });

    console.log("Termine de cargar los validadores para el form del Registro");

    /*Manejador especial en caso de que el validator no funcione al presionar enviar la primera vez*/
    $("#btnEnviar").off('click').click(function () {
        $('#registroForm').bootstrapValidator('revalidateField', 'nombre');
        $('#registroForm').bootstrapValidator('revalidateField', 'apellido');
        $('#registroForm').bootstrapValidator('revalidateField', 'mail');
        $('#registroForm').bootstrapValidator('revalidateField', 'legajo');
        $('#registroForm').bootstrapValidator('revalidateField', 'foto');
        $('#registroForm').bootstrapValidator('revalidateField', 'clave');
        $('#registroForm').bootstrapValidator('revalidateField', 'claveDuplicada');
    });
});