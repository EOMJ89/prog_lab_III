function MostrarContenido() : void {
    let auxPath: string = (<HTMLInputElement> document.getElementById("pathInput")).value;
    let auxWord: string = (<HTMLInputElement> document.getElementById("searchWord")).value;
    console.log(auxPath);
        
    if(auxPath !== "") {
        let auxPeticion = "path="+auxPath+"&word="+auxWord;

        let xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);

                let auxResponse: number = parseInt(xhttp.responseText,10);

                switch (auxResponse) {
                    case 10: {
                        (<HTMLElement> document.getElementById("auxDiv")).innerHTML="El archivo NO ha sido encontrado<br>";
                        break;
                    }
                    case 21:  {
                        (<HTMLElement> document.getElementById("auxDiv")).innerHTML="El archivo SÍ ha sido encontrado, pero la palabra NO existe dentro del archivo<br>";
                        break;
                    }
                    case 22: {
                        (<HTMLElement> document.getElementById("auxDiv")).innerHTML="El archivo SÍ ha sido encontrado y la palabra SÍ existe dentro del archivo<br>";
                        break;
                    }
                    default:
                        alert("Valor invalido");
                        break;
                }
            }
        }
    
        xhttp.open("POST", "./php/AdminPaths.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(auxPeticion);
    }
}

//tsc -target "es5" --outFile ./ejercicio02-03/Links.js ./ejercicio02-03/Links