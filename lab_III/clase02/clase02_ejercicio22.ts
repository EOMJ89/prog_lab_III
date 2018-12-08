function MostrarCambiar(): void
{
    let nombreBool: boolean = (<HTMLInputElement>document.getElementById("mostrarNombre")).checked;
    let numeroBool: boolean = (<HTMLInputElement>document.getElementById("mostrarNumero")).checked;
    let txt="";

    if(nombreBool && !(numeroBool))
    {
        txt+="Enero<br>Febrero<br>Marzo<br>Abril<br>Mayo<br>Junio<br>Julio<br>Agosto<br>Septiembre<br>Octubre<br>Noviembre<br>Diciembre<br>";
    }
    else if(!(nombreBool) && numeroBool)
    {
        txt+="1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>";
    }
    else if(nombreBool && numeroBool)
    {
        txt+="1.Enero<br>2.Febrero<br>3.Marzo<br>4.Abril<br>5.Mayo<br>6.Junio<br>7.Julio<br>8.Agosto<br>9.Septiembre<br>10.Octubre<br>11.Noviembre<br>12.Diciembre<br>";
    }

    (<HTMLElement>document.getElementById("meses")).innerHTML = txt;

}