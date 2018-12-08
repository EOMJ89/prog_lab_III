function MostrarFactorialOCubo(numero:number):void
{
    var resultado: number = numero>0 ? CalcularFactorial(numero) : CalcularCubo(numero);

    console.log(`${numero} - ${resultado}`);
}

function CalcularCubo(numero: number):number
{
    return Math.pow(numero,3);
}

function CalcularFactorial(numero: number):number
{
    if(numero!=0)
    { return numero*CalcularFactorial(numero-1); }
    else
    { return 1;}
}

MostrarFactorialOCubo(5);
MostrarFactorialOCubo(-4);