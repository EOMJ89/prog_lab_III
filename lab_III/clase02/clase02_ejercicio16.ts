function EnviarAlerta():void
{
    var nombre:string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
    var mail:string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
    var dni:string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
    var cv:string = (<HTMLTextAreaElement> document.getElementById("txtAreaCV")).value;

    var msj:string=`Nombre:${nombre}\nMail:${mail}\nDNI:${dni}\nCV:\n${cv}`;
    alert(msj);
}