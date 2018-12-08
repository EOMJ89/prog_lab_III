/// <reference path="../../ajax.ts" />

namespace Ejercicio14 {
    export function ObtenerJsonArray() : void {
        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/administrarRemeras.php";
        let comando: string = "comando=traerRemeras";
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    function Mostrar(resultado : string) {
        let jsonObj : any = JSON.parse(resultado);

        for(let remera of jsonObj) {
            console.log(remera.id + " - " + remera.slogan + " - " + remera.size + " - " + remera.price + " - " + remera.color + " - " + remera.manofacturer.name + " - " + remera.manofacturer.logo + " - " + remera.manofacturer.location.country + " - " + remera.manofacturer.location.city);
        }

        CrearTabla(jsonObj);
    }

    function Fail(resultado : string) {
        console.log("Error: " + resultado);
    }

    function CrearTabla(jsonObj : any) {
        let auxTable : string = "<table border='1'><tr><th>ID</th><th>Slogan</th><th>Size</th><th>Price</th><th>Color</th><th>Manufacturer</th><th>Logo</img></th><th>Country</th><th>City</th></tr>";


        for(let remera of jsonObj) {
            //console.log("<td>"+remera.id + "</td><td>" + remera.slogan + "</td><td>" + remera.size + "</td><td>" + remera.price + "</td><td>" + remera.color + "</td><td>" + remera.manofacturer.name + '</td><td><img src="' + remera.manofacturer.logo + '"></img></td><td>' + remera.manofacturer.location.country + "</td><td>" + remera.manofacturer.location.city + "</td>");
            auxTable+= "<tr><td>"+remera.id + "</td><td>" + remera.slogan + "</td><td>" + remera.size + "</td><td>" + remera.price + "</td><td>" + remera.color + "</td><td>" + remera.manofacturer.name + '</td><td><img src="' + remera.manofacturer.logo + '"></img></td><td>' + remera.manofacturer.location.country + "</td><td>" + remera.manofacturer.location.city + "</td></tr>";
        }

        auxTable+= "</table>";
        (<HTMLDivElement> document.getElementById("auxDiv")).innerHTML = auxTable;
    }
}

// tsc -target "es5" --outFile "./ejercicio14-ejercicioClase04/text/javascript.js" "./ejercicio14-ejercicioClase04/text/javascript.ts"