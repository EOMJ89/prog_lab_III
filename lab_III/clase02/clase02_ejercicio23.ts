function CalcularSalario(): void
{
    let nombre: string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    let apellido: string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
    let email: string = (<HTMLInputElement>document.getElementById("txtEmail")).value;
    let horas: string = (<HTMLInputElement>document.getElementById("txtNumero")).value;
    let auxHoras: number = parseInt(horas, 10);
    let salario: number=0;

    if(isNaN(auxHoras))
    {auxHoras=0;}

    salario = auxHoras * ObtenerCoeficiente();
    
    let txt=`Empleado: ${apellido},${nombre}<br>Email: ${email}<br>Salario por ${horas} horas trabajadas: ${salario}.`;
    (<HTMLElement>document.getElementById("auxCalculo")).innerHTML = txt;
}

function ObtenerCoeficiente(): number
{
    return 6.88;
}