function MostrarOpcion(): void
{
    var validación: HTMLFormElement = (<HTMLFormElement>document.forms[0]);
    var nombre: string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
    var txt = `Nombre: ${nombre}\nValoración: `;

    var i;
    for (i = 0; i < validación.length; i++) {
        /*if (validación[i].checked) {
            txt = txt + validación[i].value;
            break;
        }*/ 
    }

    alert(txt);
}