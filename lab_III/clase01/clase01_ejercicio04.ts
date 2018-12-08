/**
 * Realizar una función que reciba un número y que muestre (por consola) un mensaje como el siguiente:
El número 5 es impar, siendo 5 el número recibido como parámetro. */

function MostrarNumero(numero:number): void
{
    var retorno: String = "El número " + numero + " es ";

    retorno += numero%2==0 ? "par" : "impar"; //Operador Ternario, preferible para usar en if/else no anidados.

    console.log(retorno);
}

MostrarNumero(5);
MostrarNumero(10);