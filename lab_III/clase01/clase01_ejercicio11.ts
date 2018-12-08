function EsPalindromo(texto:string):void
{
    var auxText: string = "";

    for(let i:number = texto.length-1;i>=0;i--)
    {
        auxText+= texto[i];
    }

    var msj= auxText == texto ? "Si" : "No";

    console.log(msj);
}

EsPalindromo("anana");
EsPalindromo("banana");