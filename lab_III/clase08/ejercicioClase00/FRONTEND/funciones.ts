/// <reference path="../../libs/jquery/index.d.ts" />

$(document).ready(function() {
    //Cuando el formulario esté completamente cargado, verifica si no hay un item en Local Storage
    if((localStorage.getItem("MisUsuarios")) == null) {
        //Si no hay item, creo un array de jsons.
        let usuarios : any[] =  [
            {"email": "usuario1@gmail.com", "clave" : 11, "clase" : "default"},
            {"email": "usuario2@yahoo.com", "clave" : 22, "clase" : "default"},
            {"email": "user3@hotmail.com.ar", "clave" : 33, "clase" : "default"},
            {"email": "usr_4@gmail.com", "clave" : 44, "clase" : "default"},
            {"email": "u55er@yahoo.com", "clave" : 55, "clase" : "default"}
        ];

        //Y lo cargo
        //console.log(JSON.stringify(usuarios));
        localStorage.setItem("MisUsuarios", JSON.stringify(usuarios));
    }
});

function Verificar() {
    let encontro : boolean = false;
    let mensaje : string = "El usuario";
    let email : string = (<string> $("#txtEmail").val());
    //let password : number = parseInt((<string> $("#txtPassword").val()),10);

    let usuarios = JSON.parse((<string> localStorage.getItem("MisUsuarios")));

    for(let usuarioA of usuarios) {
        if(usuarioA.email == email) {
            encontro=true;
            localStorage.setItem("UsuarioActual", usuarioA);
        }
        //console.log(usuarioA);
    }

    if(encontro) {
        $("#auxDiv").addClass("exito");
        window.location.replace("./principal.html");
    }
    else {
        mensaje+=" NO";
        $("#auxDiv").addClass("error");
    }

    mensaje+=" es valido";
    $("#auxDiv").html(mensaje);
}