/// <reference path="./Persona.ts" />

namespace LoadVentana {
        (<Window> window).onload = function() {
        PersonaAlumno.Alumno.TraerDeArchivo();
    };
}

namespace PersonaAlumno {
    export class Alumno extends Persona {
        private _legajo: number;

        public constructor(nombre: string, apellido: string, legajo: number) {
            super(nombre, apellido);
            this._legajo = legajo;
        }

        public get GetLegajo(): number {
            return this._legajo;
        }
         
        public set SetLegajo(value: number) {
            this._legajo = value;
        }

        public ToString() {
            return this.GetLegajo+"-"+super.ToString();
        }

        public static GuardarEnArchivo()  : void {
            let legajo: number = parseInt((<HTMLInputElement> document.getElementById("txtNumero")).value, 10);
            let nombre: string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
            let apellido: string = (<HTMLInputElement> document.getElementById("txtApellido")).value;
            let alumnoAux: PersonaAlumno.Alumno = new PersonaAlumno.Alumno(nombre, apellido, legajo);
            
            let auxPeticion = "alumno="+alumnoAux.ToString()+"&method=GuardarEnArchivo";

            let xhttp: XMLHttpRequest = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if(xhttp.responseText == "true") {
                        console.log("Guardado");
                        PersonaAlumno.Alumno.TraerDeArchivo();
                    }
                    else {
                        console.log("Error en Guardado");                     
                    }

                    console.log(xhttp.responseText);
                }
            };

            xhttp.open("POST", "./Backend/Gestor.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send(auxPeticion);

        }

        public static TraerDeArchivo() :void {
            let auxPeticion = "method=TraerDeArchivo";

            let xhttp: XMLHttpRequest = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    (<HTMLElement> document.getElementById("divListado")).innerHTML=xhttp.responseText;
                }
            }

            xhttp.open("POST", "./Backend/Gestor.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send(auxPeticion);
        }

        public static Eliminar() : void {
            let auxPeticion = "method=Eliminar";
            let xhttp: XMLHttpRequest = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if(xhttp.responseText == "true") {
                        console.log("Eliminado");
                        PersonaAlumno.Alumno.TraerDeArchivo();
                    }
                    else {
                        console.log("Error en Eliminar");                     
                    }

                    console.log(xhttp.responseText);
                }
            };

            xhttp.open("POST", "./Backend/Gestor.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send(auxPeticion);
        }
    }
}

//tsc -target "es5" --outFile ./PersonasGuardar.js ./Persona ./Alumno