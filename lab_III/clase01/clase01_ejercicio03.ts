function MostrarTexto(veces:number, texto?:string):void
{
    if(texto)
    {
        for(let i:number = 0;i<veces ; i++)
        {console.log(texto);}
    }
    else
    {console.log(veces*-1);}
}

MostrarTexto(3);
MostrarTexto(3, "Texto");