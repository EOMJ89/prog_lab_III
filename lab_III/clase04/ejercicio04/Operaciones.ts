/// <reference path="../ajax.ts" />

function EjecutarOperacion() : void {
    let primerNumero : number = 0;
    if((<HTMLInputElement> document.getElementById("priOperando")).value !== "") {
        primerNumero = (parseInt((<HTMLInputElement> document.getElementById("priOperando")).value,10));
    }

    let segundoNumero : number = 0;
    if((<HTMLInputElement> document.getElementById("segOperando")).value !== "") {
        segundoNumero = (parseInt((<HTMLInputElement> document.getElementById("segOperando")).value,10));
    }

    let auxPeticion = "priOp=" + primerNumero + "&segOp=" + segundoNumero + "&operator=" + (<HTMLSelectElement> document.getElementById("slcOperacion")).value;
    let xhttp : Ajax = new Ajax();
    xhttp.Post("./php/Calcular.php", CambiarSpan,auxPeticion, CambiarSpanError);
}

function CambiarSpan(resultado : string) :void {
    if(resultado === "false/") {
        (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML= "Error, no se ha podido realizar la operacion porque el segundo operando es 0.";
    }
    else {
        let auxResultado = 0;

        if(resultado !== "") {
            auxResultado = parseInt(resultado,10);
        }

        (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML= "Resultado: "+ auxResultado;
    }
}

function CambiarSpanError(resultado : string) :void {
    (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML= "Error, el servidor ha regresado "+ resultado;
}

//tsc -target "es5" --outFile ./ejercicio04/Operaciones.js ./ejercicio04/Operaciones.ts ./ajax.ts