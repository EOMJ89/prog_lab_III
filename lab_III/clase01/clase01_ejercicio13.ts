/*Un número de Smith es un número entero tal que la suma de sus dígitos es
igual a la suma de los dígitos de los números restantes tras la factorización en primos
sin exponentes, repitiendo los números todas las veces necesarias.
Por definición, se deben contar los dígitos de los factores.
Por ejemplo, 22 en base 10 es 2 × 11, y se deben contar los tres dígitos: 2, 1, 1.
Por lo tanto 22 es un número de Smith porque 2 + 2 = 2 + 1 + 1.

1.- Factorizar en primos.
2.- Hacer la suma de los digitos del numero original.
3.- Hacer la suma de los digitos de los numeros luego de factorizar.
4.- Comparar*/

function BuscarNuevoDivisor(numeroMaximo:number, primoDivisor:number):number
{
    var auxRetorno:number=primoDivisor+1;

    let cont: number = 0;
    var i:number = auxRetorno;

    while(i <numeroMaximo)
    {
        for(let j: number = 0; j<=i; j++)
        {            
            if(cont>2)
            {break;}

            if(i%j === 0)
            {
                cont++;
            }
        }

        if(cont===2)
        {
            auxRetorno=i;
            break;
        }

        i++;
    }

    return auxRetorno;
}

function FactorizarNumero(numero:number):Array<number>
{
    var auxRetorno: Array<number>=[];
    var primoDivisor: number= 2;
    var auxNumero:number= numero;

    while(auxNumero>1 && primoDivisor<numero)
    {
        if(auxNumero%primoDivisor==0)
        {
            auxNumero/=primoDivisor;
            auxRetorno.push(primoDivisor);
            primoDivisor=2;
        }
        else
        {primoDivisor = BuscarNuevoDivisor(numero,primoDivisor);}
    }
    
    return auxRetorno;
}

/*var auxArray: Array<number> = FactorizarNumero(378);
var lengthDeArray: number = auxArray.length;

for(let i:number = 0; i<lengthDeArray;i++)
{
    console.log(auxArray.pop());
}*/

function SumarDigitosNumeroOriginal(numeros:string):number
{
    var retorno:number = 0;
    var auxNumero:string= numeros;

    for(let i:number = 0; i<auxNumero.length;i++)
    { retorno+= +auxNumero[i]; }

    return retorno;
}

//console.log("La suma de 22 es " + SumarDigitosNumeroOriginal("22"));

function SumarDigitosFactorizados(arrayPrimos:Array<number>):number
{
    var retorno : number = 0;

    for(let i:number = 0; i<arrayPrimos.length;i++)
    {
        retorno+= SumarDigitosNumeroOriginal(arrayPrimos[i].toString());
    }
    return retorno;
}

//console.log("La suma de 22 ya factorizado es " + SumarDigitosFactorizados(FactorizarNumero(22)));

function ComprobarNumeroSmith(numero:number):void
{
    var msj:string = `El numero ${numero} `;
    var sumaDigitos:number = SumarDigitosNumeroOriginal(numero.toString());
    var sumaDigitosFac:number = SumarDigitosFactorizados(FactorizarNumero(numero));

    if(sumaDigitos == sumaDigitosFac)
    {msj+= `ES`;}
    else
    {msj+=`NO ES`;}

    msj += ` un numero de Smith ya que las sumas dan ${sumaDigitos} y ${sumaDigitosFac}`; 
    console.log(msj);
}

//ComprobarNumeroSmith(22);

ComprobarNumeroSmith(23);

//ComprobarNumeroSmith(378);