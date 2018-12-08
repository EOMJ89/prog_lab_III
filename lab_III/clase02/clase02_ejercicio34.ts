function CheckNumero(fromTextBox: string, actualTextBox:HTMLElement, toTextBox: string, minimo: number)
{
    var keyToCheck: string = (<KeyboardEvent> event).key;
    var TramiteValido: boolean = false;
    var auxNumero: number = parseInt((<HTMLInputElement>actualTextBox).value,10);

    if(auxNumero > minimo)
    {
        TramiteValido = true;
    }

    if(keyToCheck === "Enter" && TramiteValido == true)
    {
        CheckPressedKey(fromTextBox, actualTextBox, toTextBox, keyToCheck);
    }
    else if(keyToCheck === "Escape")
    {
        CheckPressedKey(fromTextBox, actualTextBox, toTextBox, keyToCheck);
    }    
}

function CheckPressedKey(fromTextBox: string, actualTextBox:HTMLElement, toTextBox: string, keyToCheck: string)
{
    if(keyToCheck === "Enter")
    {
        PressedEnter(actualTextBox, toTextBox);
    }
    if(keyToCheck ==="Escape")
    {
        PressedEscape(actualTextBox, fromTextBox);
    }
}
function PressedEscape(actualTextBox:HTMLElement, fromTextBox: string)
{
    if(fromTextBox !=="")
    {
        console.log("Ha presionado Escape");
        (<HTMLInputElement>document.getElementById(fromTextBox)).disabled = false;
        (<HTMLInputElement>document.getElementById(fromTextBox)).focus();
        (<HTMLInputElement>actualTextBox).disabled = true;
    }
}

function PressedEnter(actualTextBox:HTMLElement, toTextBox: string)
{
    if(toTextBox!=="")
    {
        console.log("Ha presionado Enter");
        (<HTMLInputElement>document.getElementById(toTextBox)).disabled = false;
        (<HTMLInputElement>document.getElementById(toTextBox)).focus();
        (<HTMLInputElement>actualTextBox).disabled = true;
    }
}
