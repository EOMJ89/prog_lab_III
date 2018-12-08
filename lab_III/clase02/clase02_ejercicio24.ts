function AddErrorAll():void
{
    let nombre: string= (<HTMLInputElement> document.getElementById("txtNombre")).value;
    let apellido: string= (<HTMLInputElement> document.getElementById("txtApellido")).value;
    let dni: string= (<HTMLInputElement> document.getElementById("txtDni")).value;
    let sexo: string= (<HTMLInputElement> document.getElementById("txtSexo")).value;

    //alert(`a${nombre}s\na${apellido}s\na${dni}s\na${sexo}s`)
    CheckError(nombre,"errorNombre","Nombre");
    CheckError(apellido,"errorApellido", "Apellido");
    CheckError(dni,"errorDni", "Dni");
    CheckErrorSexo(sexo,"errorSexo");
}

function CheckError(texto:string,idEnPagina: string,textoEnMensaje: string): void
{
    if(texto === "")
    {(<HTMLElement>document.getElementById(idEnPagina)).innerHTML = `${textoEnMensaje} está vacio.`;}
    else
    {(<HTMLElement>document.getElementById(idEnPagina)).innerHTML = "";}
}

function CheckErrorSexo(texto:string,idEnPagina: string): void
{
    texto = texto.toLowerCase();

    if(texto !== "m" && texto !== "f")
    {(<HTMLElement>document.getElementById(idEnPagina)).innerHTML = `Por favor, ingrese f o m.`;}
    else
    {(<HTMLElement>document.getElementById(idEnPagina)).innerHTML = "";}
}