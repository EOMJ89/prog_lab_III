function MostrarImpares() {
    var auxNumero = parseInt(document.getElementById("numberInput").value, 10);
    if (auxNumero > 0) {
        var auxPeticion = "numero=" + auxNumero;
        var xhttp_1 = new XMLHttpRequest();
        xhttp_1.onreadystatechange = function () {
            if (xhttp_1.readyState == 4 && xhttp_1.status == 200) {
                console.log(xhttp_1.responseText);
                document.getElementById("auxDiv").innerHTML = xhttp_1.responseText;
            }
        };
        xhttp_1.open("POST", "./php/AdminNumero.php", true);
        xhttp_1.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp_1.send(auxPeticion);
    }
}
//tsc -target "es5" --outFile ./ejercicio01/Numeros.js ./ejercicio01/Numeros
