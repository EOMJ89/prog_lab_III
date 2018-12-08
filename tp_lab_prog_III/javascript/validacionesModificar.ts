function AdministrarModificar(dni : string) : void {
    (<HTMLInputElement> document.getElementById("inHidden")).value = dni;
    (<HTMLFormElement> document.forms["formHidden"]).submit();
}

//tsc -target "es5" --outFile ./javascript/funcionesModificar.js ./javascript/validacionesModificar.ts