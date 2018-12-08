function AddSpan(txtMensaje: string, idEnPag:string)
{
    var spanSpecial: HTMLSpanElement = (<HTMLSpanElement> document.createElement("SPAN"));
    (<HTMLSpanElement> spanSpecial).innerHTML+= "<br>";
    
    var messageText: Text = (<Text> document.createTextNode(txtMensaje));
    spanSpecial.appendChild(messageText);

    (<HTMLDivElement>document.getElementById(idEnPag)).appendChild(spanSpecial);
}

function CheckEnter(inputText: HTMLInputElement, keyToCheck: string)
{
    //console.log(keyToCheck);
    if(keyToCheck === "Enter")
    {
        CheckPalindromo(inputText);
    }
}

function CheckPalindromo(inputToCheck: HTMLInputElement)
{
    let textToCheck = (<HTMLInputElement> inputToCheck).value;
    let auxTring: string = "";

    for(let i=textToCheck.length-1;i>=0;i--)
    {
        auxTring+=textToCheck[i];
    }

    console.log(textToCheck+ " "+ auxTring);

    if(auxTring === textToCheck)
    {
        console.log("YES!");
        AddSpan("Es un palindromo!", "tooltip");
    }
    else
    {
        console.log("NOPE!");
        alert("No es un palindromo!");
    }
}
