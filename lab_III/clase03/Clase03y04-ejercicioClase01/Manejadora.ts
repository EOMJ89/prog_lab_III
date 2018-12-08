/// <reference path="./Alumno.ts" />

namespace PersonaAlumno
{
    export class Manejadora 
    {
        //Al dar click al aceptar, toma los textboxt y genera el alumno, lo muestra con un alert    
        public static AceptarClick(legajoId: string, nombreID: string, apellidoID: string, divID: string) : void {
            let legajo: number = parseInt((<HTMLInputElement> document.getElementById(legajoId)).value, 10);
            let nombre: string = (<HTMLInputElement> document.getElementById(nombreID)).value;
            let apellido: string = (<HTMLInputElement> document.getElementById(apellidoID)).value;

            let alumnoAux: PersonaAlumno.Alumno = new PersonaAlumno.Alumno(nombre, apellido, legajo);

            (<HTMLDivElement> document.getElementById(divID)).innerHTML += `${alumnoAux.ToString()}<br>`;
            
            //Porcion de memoria del navegador, solo guarda strings.
            if(localStorage.getItem("Alumnos") != null)
            {
                localStorage.setItem("Alumnos", `${localStorage.getItem("Alumnos")}${alumnoAux.ToString()};`);
            }
            else
            {
                localStorage.setItem("Alumnos", `${alumnoAux.ToString()};`);
            }
        }
    }
}

//tsc -target "es5" --outFile ./ejercicioClase01/ManejadoraAll.js ./ejercicioClase01/Persona ./ejercicioClase01/Alumno ./ejercicioClase01/Manejadora