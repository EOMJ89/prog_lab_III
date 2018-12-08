/// <reference path="./Fabrica.ts"/>

    function AgregarEmpleado() : boolean {
        let auxReturn = false;

        let legajo: number = parseInt((<HTMLInputElement> document.getElementById("txtLegajo")).value, 10);
        let nombre: string = (<HTMLInputElement> document.getElementById("txtNombre")).value;
        let apellido: string = (<HTMLInputElement> document.getElementById("txtApellido")).value;
        let dni: number = parseInt((<HTMLInputElement> document.getElementById("txtDni")).value, 10);
        let sueldo: number = parseInt((<HTMLInputElement> document.getElementById("txtSueldo")).value, 10);
        let sexo : string = (<HTMLSelectElement> document.getElementById("slcSexo")).value;
        
        let auxPeticion = "legajo="+legajo+"&nombre="+nombre+"&apellido="+apellido+"&dni="+dni+"&sueldo="+sueldo;

        let xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if(xhttp.responseText == "true") {
                    console.log("Guardado");
                    let empleadoAux: EmpleadosEnFabrica.Empleado = new EmpleadosEnFabrica.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);
                    
                    auxReturn=true;
                    (<HTMLDivElement> document.getElementById("auxDiv")).innerHTML= empleadoAux.ToString();
                }
                else {
                    console.log("Error en Guardado");                     
                }

                console.log(xhttp.responseText);
            }
        };

        xhttp.open("POST", "./administracion.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(auxPeticion);

        console.log(auxReturn);
        return auxReturn;
    }