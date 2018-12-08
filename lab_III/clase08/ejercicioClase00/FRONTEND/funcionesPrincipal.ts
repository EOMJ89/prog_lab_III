/// <reference path="../../libs/jquery/index.d.ts" />

$(document).ready(function() {
    //$("#[]span") //Comienza a buscar en un lugar especifico, como una table o un form
    //$("input[type=text]") //Trae todos los input de tipo text, puede combinarse con el anterior

    $("span").click(function() {
        $("body").attr("class", (<string> $(this).attr("class")));
    });

    $("#btnGuardar").click(function() {
        let className : string = <string> $("body").attr("class");
        let usuarios = JSON.parse((<string> localStorage.getItem("MisUsuarios")));
        let email = (<string> localStorage.getItem("UsuarioActual"));

        for(let usuarioA of usuarios) {
            if(usuarioA.email == email) {
                usuarioA.clase = className;
            }
        }

        localStorage.setItem("MisUsuarios", JSON.stringify(usuarios));
    });

    let usuarios = JSON.parse((<string> localStorage.getItem("MisUsuarios")));
    let userActual = JSON.parse((<string> localStorage.getItem("UsuarioActual")));
    for(let usuarioA of usuarios) {
        if(usuarioA.email == userActual.email) {
            $("body").attr("class", userActual.clase);
        }
    }
});
