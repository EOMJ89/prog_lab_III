function VerificarFuncion(event: Event)
{
    var keyToCheck: string = (<KeyboardEvent> event).key;
    var stringSave = (<HTMLInputElement> event.target).value;
    console.log(stringSave);

    if(keyToCheck < '0' || keyToCheck > '9')
    {
        (<Event> event).preventDefault();
    }
    /*else
    {
        (<HTMLInputElement> event.target).value = stringSave+keyToCheck;
    }*/
}