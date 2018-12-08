/// <reference path="../../ajax.ts" />

namespace Ejercicio05 {
    export function RecibirJson() {
        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/recibirJson.php";
        let comando: string = "comando=recibirJson";
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    export function Mostrar(resultado : string) {
        let auxJson : any = JSON.parse(resultado);
        console.log(resultado);
        console.log(auxJson.codigoBarra + " - " + auxJson.nombre + " - " + auxJson.precio);
        alert(auxJson.codigoBarra + " - " + auxJson.nombre + " - " + auxJson.precio);
    }

    export function Fail(resultado : string) {
        console.log("Error: " + resultado);
    }
}

// tsc -target "es5" --outFile "./ejercicio05/text/javascript.js" "./ejercicio05/text/javascript.ts"