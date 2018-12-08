/// <reference path="../../ajax.ts" />

namespace Ejercicio10 {
    export function ObtenerJsonArray() : void {
        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/administrarCiudades.php";
        let comando: string = "comando=traerCiudades";
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    function Mostrar(resultado : string) {
        console.log(resultado);
        let jsonObj : any = JSON.parse(resultado);

        let i=1;
        jsonObj.forEach(ciudad => {
            console.log(i);
            console.log(ciudad);
            i++;
        });

        CrearTabla(jsonObj);
    }

    function Fail(resultado : string) {
        console.log("Error: " + resultado);
    }

    function CrearTabla(jsonObj : any) {
        let auxTable : string = "<table border='1'><tr><th>ID</th><th>Name</th><th>Country</th><th>Coord Lon</th><th>Coord Lat</th></tr>";

        for(let ciudad of jsonObj) {
            auxTable+= "<tr><td>"+ciudad._id + "</td><td>" + ciudad.name + "</td><td>" + ciudad.country + "</td><td>" + ciudad.coord.lon + "</td><td>" + ciudad.coord.lat + "</td></tr>";
        }

        auxTable+= "</table>";
        (<HTMLDivElement> document.getElementById("auxDiv")).innerHTML = auxTable;
    }
}

// tsc -target "es5" --outFile "./ejercicio10/text/javascript.js" "./ejercicio10/text/javascript.ts"