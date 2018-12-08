function MostrarPrimos():void
{
    let cantPrimos: number = 0;
    let i: number = 0;

    while(cantPrimos < 20)
    {
        let cont: number = 0;

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
            console.log(i);
            cantPrimos++;
        }

        i++;
    }    
}

MostrarPrimos();