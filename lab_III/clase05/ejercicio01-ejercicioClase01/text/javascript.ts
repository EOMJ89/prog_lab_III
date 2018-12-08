/// <reference path="../../ajax.ts" />

namespace Ejercicio01 {
    export function CrearJson() : void {
        let producto: any = {"codigoBarra" : "Cod01", "nombre" : "Test1", "precio" : 2}; 

        console.log(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio );
        alert(producto.codigoBarra + " - " + producto.nombre + " - " + producto.precio );
    }

    export function CrearJsonArray() : void {
        let producto : any[] =  [
                                    {"codigoBarra" : "Cod01", "nombre" : "Test1", "precio" : 2},
                                    {"codigoBarra" : "Cod02", "nombre" : "Test2", "precio" : 34},
                                    {"codigoBarra" : "Cod03", "nombre" : "Test3", "precio" : 43},
                                    {"codigoBarra" : "Cod04", "nombre" : "Test4", "precio" : 98},
                                ];

        producto.forEach(productoA => {
            console.log(productoA.codigoBarra + " - " + productoA.nombre + " - " + productoA.precio );
            alert(productoA.codigoBarra + " - " + productoA.nombre + " - " + productoA.precio );
        });
    }

    export function EnviarJson() {
        let producto: any = {"codigoBarra" : "Cod01", "nombre" : "Test1", "precio" : 2}; 

        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/adminJson.php";
        let comando: string = "producto=" + JSON.stringify(producto);
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    export function EnviarJsonArray() {
        let producto : any[] =  [
                                    {"codigoBarra" : "Cod01", "nombre" : "Test1", "precio" : 2},
                                    {"codigoBarra" : "Cod02", "nombre" : "Test2", "precio" : 34},
                                    {"codigoBarra" : "Cod03", "nombre" : "Test3", "precio" : 43},
                                    {"codigoBarra" : "Cod04", "nombre" : "Test4", "precio" : 98},
                                ];

        let xhttps: Ajax = new Ajax();
        let backend: string = "backend/adminJson.php";
        let comando: string = "producto=" + JSON.stringify(producto);
        
        xhttps.Post(backend, Mostrar, comando, Fail);
    }

    export function Mostrar(resultado : string) {
        console.log(resultado);
    }

    export function Fail(resultado : string) {
        console.log("Error: " + resultado);
    }
}

// tsc -target "es5" --outFile "./ejercicio01-ejercicioClase01/text/javascript.js" "./ejercicio01-ejercicioClase01/text/javascript.ts"