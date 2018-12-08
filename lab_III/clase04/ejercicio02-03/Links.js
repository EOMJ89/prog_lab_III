function MostrarContenido() {
    var auxPath = document.getElementById("pathInput").value;
    var auxWord = document.getElementById("searchWord").value;
    console.log(auxPath);
    if (auxPath !== "") {
        var auxPeticion = "path=" + auxPath + "&word=" + auxWord;
        var xhttp_1 = new XMLHttpRequest();
        xhttp_1.onreadystatechange = function () {
            if (xhttp_1.readyState == 4 && xhttp_1.status == 200) {
                console.log(xhttp_1.responseText);
                var auxResponse = parseInt(xhttp_1.responseText, 10);
                switch (auxResponse) {
                    case 10: {
                        document.getElementById("auxDiv").innerHTML = "El archivo NO ha sido encontrado<br>";
                        break;
                    }
                    case 21: {
                        document.getElementById("auxDiv").innerHTML = "El archivo SÍ ha sido encontrado, pero la palabra NO existe dentro del archivo<br>";
                        break;
                    }
                    case 22: {
                        document.getElementById("auxDiv").innerHTML = "El archivo SÍ ha sido encontrado y la palabra SÍ existe dentro del archivo<br>";
                        break;
                    }
                    default:
                        alert("Valor invalido");
                        break;
                }
            }
        };
        xhttp_1.open("POST", "./php/AdminPaths.php", true);
        xhttp_1.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp_1.send(auxPeticion);
    }
}
//tsc -target "es5" --outFile ./ejercicio02-03/Links.js ./ejercicio02-03/Links
