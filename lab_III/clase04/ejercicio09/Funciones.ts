/// <reference path="../ajax.ts" />

(<Window> window).onload = function() { CargarNoticias(); };

function CargarNoticias() : void  {
    let auxPeticion = "comando=cargar";
    EnviarPeticion(auxPeticion);
}

function EnviarPeticion(peticion : string ) : void {
    let xhttp : Ajax = new Ajax();
    xhttp.Post("./php/AdminProvincias.php", MostrarNoticia, peticion, InformarR);
}

function InformarR(resultado : string) : void {
    console.log("Error " + resultado);
}

function MostrarNoticia(resultado : string) :void {
    console.log(resultado);
    if(resultado === "false") {
        console.log("No se pueden mostrar las provincias.");
    }
    else {
        let arrayResultado = resultado.split("-");

        if(arrayResultado.length > 1) {
            (<HTMLSpanElement> document.getElementById("listaCiu")).innerHTML= arrayResultado[1];
        }
        else {
            (<HTMLSpanElement> document.getElementById("listaProv")).innerHTML= resultado;
        }
        
        console.log("Petición aceptada y retornada correctamente");
    }
}

function CambiarCiudades(codProvincia : string) : void {
    console.log(codProvincia);
    let auxPeticion = "comando=cambiar&codigo="+codProvincia;
    EnviarPeticion(auxPeticion);    
}
//tsc -target "es5" --outFile ./ejercicio09/Funciones.js ./ejercicio09/Funciones.ts ./ajax.ts