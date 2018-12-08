function AdministrarValidaciones() {
    //Auxiliar de retorno
    var auxReturn = false;
    //Auxiliares de datos
    var auxDni = parseInt(document.getElementById("txtDni").value, 10);
    var auxLegajo = parseInt(document.getElementById("txtLegajo").value, 10);
    var auxSueldo = parseInt(document.getElementById("txtSueldo").value, 10);
    //Auxiliares de Validacion con Booleans
    var dniValido = ValidarRangoNumerico(auxDni, 1000000, 55000000);
    var apellidoValido = ValidarCamposVacios("txtApellido");
    var nombreValido = ValidarCamposVacios("txtNombre");
    var sexoValido = ValidarCombo("selectSexo", "---");
    var legajoValido = ValidarRangoNumerico(auxLegajo, 100, 550);
    var sueldoValido = ValidarRangoNumerico(auxSueldo, 8000, ObtenerSueldoMaximo(ObtenerTurnoSeleccionado()));
    var fotoValida = ValidarCamposVacios("txtFoto");
    //Administracion de los estados de los Span
    AdministrarSpanError("spanDNI", dniValido);
    AdministrarSpanError("spanApellido", apellidoValido);
    AdministrarSpanError("spanNombre", nombreValido);
    AdministrarSpanError("spanSexo", sexoValido);
    AdministrarSpanError("spanLegajo", legajoValido);
    AdministrarSpanError("spanSueldo", sueldoValido);
    AdministrarSpanError("spanFoto", sueldoValido);
    return VerificarValidacionesIndex();
}
/**VerificarValidacionesIndex(): boolean. Deberá determinar si todos los campos del
 * formulario están validados. Retornará true, si ningún <span> posee display:block
 * como valor del atributo style, false caso contrario.*/
function VerificarValidacionesIndex() {
    var auxReturn = false;
    var displayDni = document.getElementById("spanDNI").style.display;
    var displayApellido = document.getElementById("spanApellido").style.display;
    var displayNombre = document.getElementById("spanNombre").style.display;
    var displaySexo = document.getElementById("spanSexo").style.display;
    var displayLegajo = document.getElementById("spanLegajo").style.display;
    var displaySueldo = document.getElementById("spanSueldo").style.display;
    if (displayDni === "none" && displayApellido === "none" && displayNombre === "none" && displaySexo === "none" && displayLegajo === "none" && displaySueldo === "none") {
        auxReturn = true;
    }
    return auxReturn;
}
/**ValidarCamposVacios(string): boolean. Recibe como parámetro el valor del atributo id del campo a ser validado.
 * Retorna true si no está vacío o false caso contrario.*/
function ValidarCamposVacios(idEnPag) {
    var auxReturn = false;
    var stringAComparar = document.getElementById(idEnPag).value;
    if (stringAComparar !== "") {
        auxReturn = true;
    }
    return auxReturn;
}
/**ValidarRangoNumerico(number, number, number): boolean. Recibe como parámetro el valor a ser validado y los valores mínimos y máximos del rango.
 * Retorna true si el valor pertenece al rango o false caso contrario.*/
function ValidarRangoNumerico(numAValidar, min, max) {
    var auxReturn = false;
    if (numAValidar >= min && numAValidar <= max) {
        auxReturn = true;
    }
    return auxReturn;
}
/**ValidarCombo(string, string): boolean. Recibe como parámetro el valor del atributo id del combo a ser validado y
 * el valor que no debe de tener. Retorna true si no coincide o false caso contrario.*/
function ValidarCombo(idComboBox, opcionNoValida) {
    var auxReturn = true;
    var opcionAValidar = document.getElementById(idComboBox).value;
    //console.log(opcionAValidar);
    if (opcionAValidar === opcionNoValida) {
        auxReturn = false;
        //console.log("Opcion no valida seleccionada");
    }
    return auxReturn;
}
/**ObtenerTurnoSeleccionado(): string. Retorna el valor del elemento (type=radio) seleccionado por el usuario.
 * Verificar atributo checked.*/
function ObtenerTurnoSeleccionado() {
    var auxOpcion = "";
    var radios = document.getElementsByName("turno");
    radios.forEach(function (opcion) {
        if (opcion.checked) {
            auxOpcion = opcion.value;
        }
    });
    return auxOpcion;
}
/**ObtenerSueldoMaximo(string): number. Recibe como parámetro el valor del turno elegido y retornará el valor del sueldo máximo.*/
function ObtenerSueldoMaximo(opcionTurno) {
    var auxReturn = 0;
    switch (opcionTurno) {
        case "N": {
            auxReturn = 25000;
            break;
        }
        case "T": {
            auxReturn = 18500;
            break;
        }
        default: {
            auxReturn = 20000;
            break;
        }
    }
    return auxReturn;
}
function CambiarSueldoMaximo() {
    var auxSueldoMax = ObtenerSueldoMaximo(ObtenerTurnoSeleccionado());
    var auxSueldoActual = parseInt(document.getElementById("txtSueldo").value, 10);
    document.getElementById("txtSueldo").max = auxSueldoMax.toString();
    if (auxSueldoActual > auxSueldoMax) {
        document.getElementById("txtSueldo").value = auxSueldoMax.toString();
    }
}
function AdministrarValidacionesLogin() {
    //Auxiliares de datos
    var auxDni = parseInt(document.getElementById("txtDni").value, 10);
    //Auxiliares de Validacion con Booleans
    var dniValido = ValidarRangoNumerico(auxDni, 1000000, 55000000);
    var apellidoValido = ValidarCamposVacios("txtApellido");
    //Administracion de los estados de los Span
    AdministrarSpanError("spanDNI", dniValido);
    AdministrarSpanError("spanApellido", apellidoValido);
    return VerificarValidacionesLogin();
}
/**AdministrarSpanError(string, boolean): void. Es la encargada de, según el parámetro
 * booleano, ocultar o no al elemento cuyo id coincida con el parámetro de tipo string.*/
function AdministrarSpanError(idSpan, boolHide) {
    if (boolHide) {
        document.getElementById(idSpan).style.display = "none";
    }
    else {
        document.getElementById(idSpan).style.display = "block";
    }
}
/**VerificarValidacionesLogin(): boolean. Deberá determinar si todos los campos del
 * formulario están validados. Retornará true, si ningún <span> posee display:block
 * como valor del atributo style, false caso contrario.*/
function VerificarValidacionesLogin() {
    var auxReturn = false;
    var displayDni = document.getElementById("spanDNI").style.display;
    var displayApellido = document.getElementById("spanApellido").style.display;
    if (displayDni === "none" && displayApellido === "none") {
        auxReturn = true;
    }
    return auxReturn;
}
//tsc -target "es5" --outFile ./javascript/funciones.js ./javascript/validaciones.ts
