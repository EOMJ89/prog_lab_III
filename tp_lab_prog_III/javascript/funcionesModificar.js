function AdministrarModificar(dni) {
    document.getElementById("inHidden").value = dni;
    document.forms["formHidden"].submit();
}
//tsc -target "es5" --outFile ./javascript/funcionesModificar.js ./javascript/validacionesModificar.ts
