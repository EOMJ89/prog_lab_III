function CreateToolTip(txtMensaje: string, idEnPag:string)
{
    var spanSpecial: HTMLSpanElement = (<HTMLSpanElement> document.createElement("span"));
    (<HTMLSpanElement>spanSpecial).className = "tooltiptext";
    (<HTMLSpanElement>spanSpecial).innerHTML = txtMensaje;   
    
    var mouseX:number = (<MouseEvent>event).clientX;
    var mouseY:number = (<MouseEvent>event).clientY;
    console.log(mouseX+" "+mouseY);

    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(idEnPag))[0].appendChild((<HTMLSpanElement>spanSpecial));
}