function AdministrarValidaciones() : boolean {
    //Auxiliar de retorno
    let auxReturn: boolean = false;

    //Auxiliares de datos
    let auxDni: number = parseInt((<HTMLInputElement> document.getElementById("txtDni")).value,10);
    let auxLegajo: number = parseInt((<HTMLInputElement> document.getElementById("txtLegajo")).value,10);
    let auxSueldo: number = parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).value,10);

    //Auxiliares de Validacion con Booleans
    let dniValido : boolean = ValidarRangoNumerico(auxDni,1000000,55000000);
    let apellidoValido : boolean = ValidarCamposVacios("txtApellido");
    let nombreValido : boolean = ValidarCamposVacios("txtNombre");
    let sexoValido : boolean = ValidarCombo("selectSexo", "---");
    let legajoValido : boolean = ValidarRangoNumerico(auxLegajo,100,550);
    let sueldoValido : boolean = ValidarRangoNumerico(auxSueldo,8000,ObtenerSueldoMaximo(ObtenerTurnoSeleccionado()));
    let fotoValida : boolean = ValidarCamposVacios("txtFoto");

    //Administracion de los estados de los Span
    AdministrarSpanError("spanDNI",dniValido);
    AdministrarSpanError("spanApellido",apellidoValido);
    AdministrarSpanError("spanNombre",nombreValido);
    AdministrarSpanError("spanSexo",sexoValido);
    AdministrarSpanError("spanLegajo",legajoValido);
    AdministrarSpanError("spanSueldo",sueldoValido);
    AdministrarSpanError("spanFoto",sueldoValido);

    return VerificarValidacionesIndex();
}

/**VerificarValidacionesIndex(): boolean. Deberá determinar si todos los campos del
 * formulario están validados. Retornará true, si ningún <span> posee display:block
 * como valor del atributo style, false caso contrario.*/
function VerificarValidacionesIndex() : boolean {
    let auxReturn = false;
    let displayDni = (<HTMLSpanElement> document.getElementById("spanDNI")).style.display; 
    let displayApellido = (<HTMLSpanElement> document.getElementById("spanApellido")).style.display; 
    let displayNombre = (<HTMLSpanElement> document.getElementById("spanNombre")).style.display; 
    let displaySexo = (<HTMLSpanElement> document.getElementById("spanSexo")).style.display; 
    let displayLegajo = (<HTMLSpanElement> document.getElementById("spanLegajo")).style.display; 
    let displaySueldo = (<HTMLSpanElement> document.getElementById("spanSueldo")).style.display; 

    if(displayDni === "none" && displayApellido === "none" && displayNombre === "none" && displaySexo === "none" && displayLegajo === "none" && displaySueldo === "none") {
        auxReturn = true;
    }

    return auxReturn;
}

/**ValidarCamposVacios(string): boolean. Recibe como parámetro el valor del atributo id del campo a ser validado.
 * Retorna true si no está vacío o false caso contrario.*/
function ValidarCamposVacios(idEnPag: string) :boolean {
    let auxReturn : boolean = false;
    let stringAComparar : string = (<HTMLInputElement> document.getElementById(idEnPag)).value;

    if(stringAComparar !== "") {
        auxReturn = true;
    }

    return auxReturn;
}

/**ValidarRangoNumerico(number, number, number): boolean. Recibe como parámetro el valor a ser validado y los valores mínimos y máximos del rango.
 * Retorna true si el valor pertenece al rango o false caso contrario.*/
function ValidarRangoNumerico(numAValidar : number, min : number, max : number) : boolean {
    let auxReturn = false;
    
    if(numAValidar>=min && numAValidar<=max) {
        auxReturn = true;
    }

    return auxReturn;
}

/**ValidarCombo(string, string): boolean. Recibe como parámetro el valor del atributo id del combo a ser validado y
 * el valor que no debe de tener. Retorna true si no coincide o false caso contrario.*/
function ValidarCombo(idComboBox: string, opcionNoValida: string) : boolean {
    let auxReturn : boolean = true;
    let opcionAValidar : string = (<HTMLSelectElement> document.getElementById(idComboBox)).value; 
    //console.log(opcionAValidar);

    if(opcionAValidar === opcionNoValida) {
        auxReturn = false;
        //console.log("Opcion no valida seleccionada");
    }

    return auxReturn;
}

/**ObtenerTurnoSeleccionado(): string. Retorna el valor del elemento (type=radio) seleccionado por el usuario.
 * Verificar atributo checked.*/
function ObtenerTurnoSeleccionado() : string {
    let auxOpcion = "";
    let radios: NodeListOf<HTMLInputElement> = (<NodeListOf<HTMLInputElement>> document.getElementsByName("turno"));

    radios.forEach(opcion => {
        if(opcion.checked) {
            auxOpcion = opcion.value;
        }
    });

    return auxOpcion;
}

/**ObtenerSueldoMaximo(string): number. Recibe como parámetro el valor del turno elegido y retornará el valor del sueldo máximo.*/
function ObtenerSueldoMaximo(opcionTurno: string) : number {
    let auxReturn : number = 0;

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

function CambiarSueldoMaximo() : void {
    let auxSueldoMax : number = ObtenerSueldoMaximo(ObtenerTurnoSeleccionado());
    let auxSueldoActual : number = parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).value,10);
    (<HTMLInputElement> document.getElementById("txtSueldo")).max = auxSueldoMax.toString();

    if(auxSueldoActual > auxSueldoMax) {
        (<HTMLInputElement> document.getElementById("txtSueldo")).value = auxSueldoMax.toString();
    }
}

function AdministrarValidacionesLogin() : boolean {
    //Auxiliares de datos
    let auxDni: number = parseInt((<HTMLInputElement> document.getElementById("txtDni")).value,10);

    //Auxiliares de Validacion con Booleans
    let dniValido : boolean = ValidarRangoNumerico(auxDni,1000000,55000000);
    let apellidoValido : boolean = ValidarCamposVacios("txtApellido");

    //Administracion de los estados de los Span
    AdministrarSpanError("spanDNI",dniValido);
    AdministrarSpanError("spanApellido",apellidoValido);

    return VerificarValidacionesLogin();
}

/**AdministrarSpanError(string, boolean): void. Es la encargada de, según el parámetro 
 * booleano, ocultar o no al elemento cuyo id coincida con el parámetro de tipo string.*/
function AdministrarSpanError(idSpan : string, boolHide : boolean) : void {
    if(boolHide) {
        (<HTMLSpanElement> document.getElementById(idSpan)).style.display="none";
    }
    else {
        (<HTMLSpanElement> document.getElementById(idSpan)).style.display="block";
    }
}

/**VerificarValidacionesLogin(): boolean. Deberá determinar si todos los campos del
 * formulario están validados. Retornará true, si ningún <span> posee display:block
 * como valor del atributo style, false caso contrario.*/
function VerificarValidacionesLogin() : boolean {
    let auxReturn = false;
    let displayDni = (<HTMLSpanElement> document.getElementById("spanDNI")).style.display; 
    let displayApellido = (<HTMLSpanElement> document.getElementById("spanApellido")).style.display; 

    if(displayDni === "none" && displayApellido === "none") {
        auxReturn = true;
    }

    return auxReturn;
}

//tsc -target "es5" --outFile ./javascript/funciones.js ./javascript/validaciones.ts