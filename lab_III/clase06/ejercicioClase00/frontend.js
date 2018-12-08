"use strict";
/// <reference path="../libs/jquery/index.d.ts" />
function SubirFoto() {
    var auxInput = RecuperarFoto("foto");
    /**let xhr: XMLHttpRequest = new XMLHttpRequest;
     * xhr.open('POST','BACKEND/nexo.php');
     * xhr.setRequestHeader('enctype', 'multipart/form-data'); */
    /** Al cambiar el enctype, enviar un string con parametros normales ya no aplica y
     *  * se requiere un FormData, que recolecta la información del formlulario*/
    //let param = 'op=subirFoto&foto=' + auxInput;
    var form = new FormData();
    form.append("op", "subirFoto"); //Agrega un par clave = valor
    form.append("foto", auxInput[0].files[0]); //Al devolver un selector de jquery, devuelve un array, por lo que se debe ir al index indicado (si no hay ningun otro elemento del mismo id, solo tendrá index 0)
    /**form.append("foto", auxInput.files[0]); //Si se quieren mandar todas simplemente se elimina el index
     * xhr.send(form);
     * xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                MostrarFoto(xhr.responseText);
            }
            else {
                ErrorFunc(xhr.status.toString());
            }
        }
    };*/
    var pagina = "BACKEND/nexo.php";
    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        async: true
    })
        .done(MostrarFoto)
        .fail(ErrorFunc);
}
function ErrorFunc(jsonAux) {
    console.log("Error: " + jsonAux);
}
function MostrarFoto(jsonAux) {
    //console.log(resultado);
    //let jsonAux : any = JSON.parse(resultado);
    if (jsonAux.Ok) {
        console.log("El JSON devolvió TRUE en Ok");
        document.getElementById("imgFoto").src = "BACKEND/" + jsonAux.Path;
    }
    else {
        console.log("El JSON no devolvió TRUE en Ok");
    }
}
function RecuperarFoto(inputID) {
    /**let auxReturn : HTMLInputElement =  (<HTMLInputElement> document.getElementById(inputID));
     * //console.log((<HTMLInputElement> document.getElementById(inputID)).value); //no devuelve el archivo real sino una dirección falsa, por lo que tendremos que devolver todo
     * return auxReturn;
     *
     * Todo esto devolvía un HTMLInputElement*/
    var auxParam = "#" + inputID;
    return $(auxParam);
}
//tsc -target "es5" --outFile ./ejercicioClase00/ejemplo.js ./ejercicioClase00/frontend.ts 
//# sourceMappingURL=frontend.js.map