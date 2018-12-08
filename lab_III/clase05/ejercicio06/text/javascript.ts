/// <reference path="../../ajax.ts" />

namespace Ejercicio06 {
    export function RecibirJsonArray() {
        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/recibirColeccion.php";
        let comando: string = "comando=recibirJson";
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    export function Mostrar(resultado : string) {
        let auxJson : any = JSON.parse(resultado);
        console.log(resultado);

        for(let producto of auxJson) {
            console.log(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio);
            //alert(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio);
        }
    }

    export function Fail(resultado : string) {
        console.log("Error: " + resultado);
    }
}

// tsc -target "es5" --outFile "./ejercicio06/text/javascript.js" "./ejercicio06/text/javascript.ts"