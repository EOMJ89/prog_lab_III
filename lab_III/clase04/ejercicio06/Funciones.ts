/// <reference path="../ajax.ts" />

function VerificarNombre() : void  {
    let auxPeticion = "nombre="+(<HTMLInputElement> document.getElementById("txtNombre")).value;
    let xhttp : Ajax = new Ajax();
    xhttp.Post("./php/comprobarDisponibilidad.php", Informar ,auxPeticion);
}

function Informar(resultado : string) :void {
    if(resultado === "SI") {
        (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML= "El nombre de usuario SI está disponible." + (new Date()).getSeconds();
    }
    else {
        let arrayNombres = resultado.split("-");
        
        if(arrayNombres.length > 1) {
            
            (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML= "El nombre de usuario NO está disponible." + (new Date()).getSeconds() + "<br>" + arrayNombres[1];
        }
    }
}

function CambiarNombre(nombre :string) :void {
    (<HTMLInputElement> document.getElementById("txtNombre")).value = nombre;
    (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML = "";
}
//tsc -target "es5" --outFile ./ejercicio06/Funciones.js ./ejercicio06/Funciones.ts ./ajax.ts