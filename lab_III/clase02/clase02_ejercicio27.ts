function CrearOpciones(opciones:string):void {
    var auxString:string = (<HTMLInputElement> document.getElementById("txtOpciones")).value;
    var splitString: Array<string> = auxString.split("\n");

    var selectNode: HTMLSelectElement = (<HTMLSelectElement> document.createElement("select"));
    splitString.forEach(elementAux => { 
        var auxOption: HTMLOptionElement= (<HTMLOptionElement>document.createElement("option"));
        (<HTMLOptionElement>auxOption).text = elementAux;
        (<HTMLSelectElement>selectNode).add(auxOption)
    });
    var nodeSpecialNode: HTMLElement = (<HTMLElement> document.getElementById("auxDiv"));
    nodeSpecialNode.appendChild(selectNode);

    console.log((<HTMLInputElement> document.getElementById("txtOpciones")).value);
}