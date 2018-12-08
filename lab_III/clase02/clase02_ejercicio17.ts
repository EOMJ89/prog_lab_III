function ShowSelected():void
{
    var op1: boolean = (<HTMLInputElement> document.getElementById("Op1")).checked;
    var op2: boolean = (<HTMLInputElement> document.getElementById("Op2")).checked;
    var op3: boolean = (<HTMLInputElement> document.getElementById("Op3")).checked;

    var msj: string = "No hay elementos seleccionados";

    if(op1 === true || op2 === true || op3 === true)
    {msj=`Elementos seleecionados:\n`;}

    if(op1)
    {
        msj=msj+`Kamen Rider Heisei Generations FINAL\n`;
    }
    if(op2)
    {
        msj=msj+`Goseiger vs Gokaiger 199 Hero Great Battle\n`;
    }
    if(op3)
    {
        msj=msj+`Uchu Sentai Kyuranger vs. Space Squad\n`;
    }

    alert(msj);
}