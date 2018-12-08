function MostrarImpares() : void {
    let auxNumero: number = parseInt((<HTMLInputElement> document.getElementById("numberInput")).value,10);
        
    if(auxNumero>0) {
        let auxPeticion = "numero="+auxNumero;

        let xhttp: XMLHttpRequest = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                (<HTMLElement> document.getElementById("auxDiv")).innerHTML=xhttp.responseText;
            }
        }
    
        xhttp.open("POST", "./php/AdminNumero.php", true);
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhttp.send(auxPeticion);
    }
}

//tsc -target "es5" --outFile ./ejercicio01/Numeros.js ./ejercicio01/Numeros