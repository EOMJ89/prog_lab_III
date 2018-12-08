/// <reference path="./ajax.ts" />
/// <reference path="./Alien.ts" />

(<Window> window).onload = function() {
    var auxManejadora = new RecuperatorioPrimerParcial.Manejadora();
    RecuperatorioPrimerParcial.Manejadora.MostrarAliens();
};

namespace RecuperatorioPrimerParcial {
    export interface IParte2 {
        EliminarAlien(cuadrante : string, raza : string) : void;
        ModificarAlien() : void;
    }

    export class Manejadora implements IParte2 {
        public static AgregarAlien(funcionExtra? : Function) : void {
            let cuadrante : string = (<HTMLInputElement> document.getElementById("cuadrante")).value;
            let edad : number = parseInt((<HTMLInputElement> document.getElementById("edad")).value,10);
            let altura : number = parseFloat((<HTMLInputElement> document.getElementById("altura")).value);
            let raza : string = (<HTMLInputElement> document.getElementById("raza")).value;
            let planeta : string = (<HTMLSelectElement> document.getElementById("cboPlaneta")).value; 

            let fotoInput : any =  (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];
        
            let auxAlien = new Entidades.Alien(cuadrante, edad, altura, raza, planeta, pathFoto);
            
            let ajax : Ajax = new Ajax();
            let form : FormData = new FormData();
            form.append("caso","agregar");
            form.append("cadenaJson", JSON.stringify(auxAlien.ToJson()));
            form.append("foto", fotoInput.files[0]);
            
            if(funcionExtra === undefined) {
                funcionExtra = Manejadora.Mostrar;
            }
            ajax.PostDataForm('./BACKEND/administrar.php', funcionExtra , form , Manejadora.Mostrar);
        }

        private static Mostrar(response : string) : void {
            console.log(response);
        }

        public static MostrarAliens() : void {
            let ajax : Ajax = new Ajax();
            let params : string = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.MostrarTabla, params, Manejadora.Mostrar);
        }

        private static MostrarTabla(response:string) {
            console.log(response);
            let jsonObj : any = (<any> JSON.parse(response));
            let auxTable : string = "<table border='1'><tr><th>Cuadrante</th><th>Edad</th><th>Altura</th><th>Raza</th><th>Planeta de Origen</th><th>Foto</th><th>Acciones</th></tr><th>";

            for(let alien of jsonObj) {
                auxTable+= "<tr><th>"+alien.cuadrante+"</th><th>"+alien.edad+"</th><th>"+alien.altura+"</th><th>"+alien.raza+"</th><th>"+alien.planetaOrigen+"</th><th><img src='./BACKEND/fotos/";
                
                if(alien.pathFoto !== "undefined") {
                    auxTable+= alien.pathFoto;
                }
                else {
                    auxTable+="alien_defecto.jpg";
                }

                auxTable+= "' height=100 width=100 ></img></th>";
                auxTable+= `<th><input type="button" value="Eliminar" class="btn btn-default" onclick="auxManejadora.EliminarAlien('`+alien.cuadrante+`','`+alien.raza+`')"/> <input type="button" value="Modificar" class="btn btn-default" onclick="auxManejadora.ModificarAlien('`+alien.cuadrante+`','`+alien.raza+`')"/></th></tr>`;
            }
            auxTable+= "</table>";
            
            (<HTMLDivElement> document.getElementById("divTabla")).innerHTML = auxTable;
        }

        public static GuardarEnLocalStorage()  : void {
            let ajax : Ajax = new Ajax();
            let params : string = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.Guardar, params, Manejadora.Guardar);
        }

        private static Guardar(response : string) {
            localStorage.setItem("aliens_local_storage", `${response};`);
            console.log("Se ha guardado en el Local Storage");
        }

        public static VerificarExistencia() : void {
            let auxLocalStorage : any = "";
            let cuadrante : string = (<HTMLInputElement> document.getElementById("cuadrante")).value ? (<HTMLInputElement> document.getElementById("cuadrante")).value : "";
            let raza : string = (<HTMLInputElement> document.getElementById("raza")).value ? (<HTMLInputElement> document.getElementById("raza")).value : "";

            if(localStorage.getItem("aliens_local_storage") !== "") {
                auxLocalStorage = (<string>localStorage.getItem("aliens_local_storage"));
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                console.log(auxLocalStorage);

                let auxJson : any = (<any> JSON.parse(auxLocalStorage));
                let puedeAgregar : boolean = true;

                for(let alien of auxJson) {
                    if(alien.cuadrante === cuadrante && alien.raza === raza) {
                        puedeAgregar = false;
                        break;
                    }
                }

                if(puedeAgregar) {
                    Manejadora.AgregarAlien(Manejadora.GuardarEnLocalStorage);
                }
                else {
                    let mensaje : string = "El alien del cuadrante "+cuadrante+" y raza "+raza+" ya existe.";
                    alert(mensaje);
                    console.log(mensaje);
                }
            }                   
        }

        public static ObtenerAliensPorCuadrante() : void {
            let auxContador : Array<number> = new Array<number>();
            let auxLocalStorage : any = "";

            if(localStorage.getItem("aliens_local_storage") !== "") {
                auxLocalStorage = (<string>localStorage.getItem("aliens_local_storage"));
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                //console.log(auxLocalStorage);

                let auxJson : any = (<any> JSON.parse(auxLocalStorage));
                
                for(let alien of auxJson) {
                    if(auxContador[alien.planetaOrigen] === undefined) {
                        auxContador[alien.planetaOrigen]=0;
                    }
                    auxContador[alien.planetaOrigen]++;
                }
                
                //console.log(auxContador);

                let auxMax : any = undefined;
                let auxMin : any = undefined;

                for (let planeta in auxContador) {
                    if(auxMax === undefined && auxMin === undefined) {
                        auxMax = auxContador[planeta];
                        auxMin = auxContador[planeta];
                    }

                    let cantAliens= auxContador[planeta];
                    //console.log(planeta, cantAliens);

                    if(auxMax < cantAliens) {
                        auxMax = cantAliens;
                        console.log("Cambio el maximo");
                    }
                    if(auxMin>cantAliens) {
                        auxMin = cantAliens;
                        console.log("Cambio el minimo");
                    }
                }

                let planetasMax = new Array<string>();
                let planetasMin = new Array<string>();

                for (let planeta in auxContador) {
                    if(auxContador[planeta] == auxMax) {
                        planetasMax.push(planeta);
                    }
                    else if (auxContador[planeta] == auxMin) {
                        planetasMin.push(planeta);
                    }
                }
                //console.log(planetasMax +"\nCambio a min\n"+ planetasMin);

                let mensaje : string = "El/Los planetas con mas aliens son ";
                if(planetasMax.length > 0) {
                    for(let planeta of planetasMax) {
                        mensaje+="\n-"+planeta;
                    }
                    mensaje+="\nCon "+auxMax;
                    console.log(mensaje);
                }

                if(planetasMin.length > 0) {
                    mensaje= "El/Los planetas con menos aliens son ";
                    for(let planeta of planetasMin) {
                        mensaje+="\n-"+planeta;
                    }
                    mensaje+="\nCon "+auxMin;
                    console.log(mensaje);
                }
            } 
        }

        public EliminarAlien(cuadrante : string, raza : string) : void {
            let auxAlien = new Entidades.Alien(cuadrante,0,0,raza,"","");
            
            let mensaje='Desea eliminar el alien del cuadrante '+cuadrante+' y raza '+raza+'?';

            if(confirm(mensaje)) {
                console.log("Confirmado");
                let ajax : Ajax = new Ajax();
                let form : FormData = new FormData();
                form.append("caso","eliminar");
                form.append("cadenaJson", JSON.stringify(auxAlien.ToJson()));
                
                ajax.PostDataForm('./BACKEND/administrar.php', Manejadora.Refrescar , form , Manejadora.Mostrar);
            }        
        }

        private static Refrescar(response : string) {
            console.log(response);

            Manejadora.GuardarEnLocalStorage();
            Manejadora.MostrarAliens();
        }

        public ModificarAlien(): void {
            throw new Error("Method not implemented.");
        }
    }
}