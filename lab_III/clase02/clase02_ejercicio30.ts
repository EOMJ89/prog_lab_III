function MostrarPosicion()
{
    var cursorX: number = (<MouseEvent>event).clientX;
    var cursorY: number = (<MouseEvent>event).clientY;

    var cursorXNav: number = (<MouseEvent> event).offsetX;
    var cursorYNav: number = (<MouseEvent> event).offsetY;
    
    (<HTMLElement>document.getElementById('test')).innerHTML = "Respecto de la pagina x: " + cursorXNav + ", y: " + cursorYNav;
    (<HTMLElement>document.getElementById('test')).innerHTML+= "<br>Respecto del navegador x: " + cursorX + ", y: " + cursorY;
}

document.addEventListener("mousemove", MostrarPosicion);