/// <reference path="../../ajax.ts"/>

namespace Ejercicio07 {
    export function ObtenerJson() : void {
        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/traerAuto.php";
        let comando: string = "comando=traer";
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    function Mostrar(resultado : string) {
        let jsonObj : any = JSON.parse(resultado);
        //console.log(jsonObj);

        alert(jsonObj.Id + " - " + jsonObj.Marca + " - " + jsonObj.Precio + " - " + jsonObj.Color + " - " + jsonObj.Modelo);
        console.log(jsonObj.Id + " - " + jsonObj.Marca + " - " + jsonObj.Precio + " - " + jsonObj.Color + " - " + jsonObj.Modelo);
        
        ArmarInputs(jsonObj);
    }

    function Fail(resultado : string) {
        console.log("Error: " + resultado);
    }

    function ArmarInputs(jsonObj : any) {
        let auxReturn : string = "<table>";
        auxReturn+='<tr><td><input type="text" value="'+jsonObj.Id+'"</td></tr>';
        auxReturn+='<tr><td><input type="text" value="'+jsonObj.Marca+'"</td></tr>';
        auxReturn+='<tr><td><input type="text" value="'+jsonObj.Precio+'"</td></tr>';
        auxReturn+='<tr><td><input type="text" value="'+jsonObj.Color+'"</td></tr>';
        auxReturn+='<tr><td><input type="text" value="'+jsonObj.Modelo+'"</td></tr>';
        auxReturn+= "</table>";

        (<HTMLDivElement> document.getElementById("auxDiv")).innerHTML = auxReturn;
    }
}

// tsc -target "es5" --outFile "./ejercicio07-ejercicioClase02/text/javascript.js" "./ejercicio07-ejercicioClase02/text/javascript.ts"