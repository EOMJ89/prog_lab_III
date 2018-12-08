function MostrarInformación(texto:string):void
{
    var msj: string;   
    var cont: number = 0;
    
    for(let i:number = 0; i<texto.length;i++)
    {
        if((texto[i].toUpperCase()) == texto[i])        
        {cont++};
    }

    switch (cont) {
        case texto.length:
        {
            msj = "Mayusculas";
            break;
        }
        case  0:
        {
            msj = "Minusculas"; 
            break;
        } 
        default:
        {
            msj = "Ambas"
            break;
        }
    }

    console.log(msj);
}

MostrarInformación("AbC");
MostrarInformación("ABC");
MostrarInformación("abc");
