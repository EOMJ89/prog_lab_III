/// <reference path="../ajax.ts" />

(<Window> window).onload = function() { CambiarNoticias(); };
var intervalID : number  = 0;
var noticiaActual : number = 0;

function CambiarNoticias() : void  {
    let stopAndResume = true;
    let changeMode: string = (<HTMLInputElement> document.getElementById("StopResume")).value;
    //console.log(changeMode);

    if(changeMode === "Seguir") {
        (<HTMLInputElement> document.getElementById("StopResume")).value = "Detener";
        stopAndResume = true; //Significa "Seguir"
        //console.log("Cambio a Detener");
    }
    else {
        (<HTMLInputElement> document.getElementById("StopResume")).value = "Seguir";
        stopAndResume = false; //Significa "Detener"
        //console.log("Cambio a Seguir");
    }

    AlternarNoticias(stopAndResume);
}


function AlternarNoticias(stopOrResume : boolean) : void {
    if(stopOrResume) {
        intervalID = setInterval(function (){
            console.log("Se llama a la funcion del Ajax");
            EnviarPeticion("seguir");
        },2000);
        console.log("Se inicia el intervalo");
    }
    else {
        clearInterval(intervalID);
        intervalID = 0;
        //console.log("Se para el intervalo");
    }
}

function EnviarPeticion(comando : string ) : void {
    console.log("Noticia actual "+ noticiaActual);
    let auxPeticion : string = "noticia="+noticiaActual+"&comando="+comando;
    let xhttp : Ajax = new Ajax();
    xhttp.Post("./php/AdminNoticias.php", MostrarNoticia, auxPeticion, Informar);
}

function IrAtrasOAdelante(direccion: string) : void {
    if(intervalID != 0) {
        (<HTMLInputElement> document.getElementById("StopResume")).value = "Seguir";
        //console.log("Cambio a Seguir");
        AlternarNoticias(false);
    }
    
    EnviarPeticion(direccion);
}

function Informar(resultado : string) : void {
    console.log("Error " + resultado);
}

function MostrarNoticia(resultado : string) :void {
    let auxDate : Date = new Date();
    console.log("La respuesta del servidor es: "+ resultado);
    let auxDateString: string = auxDate.toDateString() + " " + auxDate.getHours() + " " + auxDate.getMinutes() + " " + auxDate.getSeconds();

    if(resultado === "false") {
        (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML= "No se pueden mostrar las noticias." + auxDateString;
    }
    else {
        let arrayNoticia : Array<string> = resultado.split("-");
        
        if(arrayNoticia.length > 1) {
            noticiaActual = parseInt(arrayNoticia[0],10)+1;
            (<HTMLSpanElement> document.getElementById("auxSpan")).innerHTML= arrayNoticia[1]+ "<br>Hora: " + auxDateString;
        }
    }
}
//tsc -target "es5" --outFile ./ejercicio08/Funciones.js ./ejercicio08/Funciones.ts ./ajax.ts