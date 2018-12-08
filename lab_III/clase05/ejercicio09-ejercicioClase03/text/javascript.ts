/// <reference path="../../ajax.ts" />

namespace Ejercicio09 {
    export function ObtenerJsonArray() : void {
        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/traerAutos.php";
        let comando: string = "comando=traer";
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    function Mostrar(resultado : string) {
        let jsonObj : any = JSON.parse(resultado);

        let i=1;
        jsonObj.forEach(autos => {
            console.log(i);
            console.log(autos);
            i++;
        });

        CrearTabla(jsonObj);
    }

    function Fail(resultado : string) {
        console.log("Error: " + resultado);
    }

    function CrearTabla(jsonObj : any) {
        let auxTable : string = "<table border='1'><tr><th>ID</th><th>Marca</th><th>Precio</th><th>Color</th><th>Modelo</th></tr>";

        for(let auto of jsonObj) {
            auxTable+= "<tr><td>"+auto.Id + "</td><td>" + auto.Marca + "</td><td>" + auto.Precio + "</td><td>" + auto.Color + "</td><td>" + auto.Modelo + "</td></tr>";
        }

        auxTable+= "</table>";
        (<HTMLDivElement> document.getElementById("auxDiv")).innerHTML = auxTable;
    }
}

// tsc -target "es5" --outFile "./ejercicio09-ejercicioClase03/text/javascript.js" "./ejercicio09-ejercicioClase03/text/javascript.ts"