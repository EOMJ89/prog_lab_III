$(document).ready(function() {
    /*Cuando el formulario esté completamente cargado*/
    $("#loginForm").submit( function () {
        let auxReturn : boolean = true;
        let usuario : string = <string>$("#usuarioText").val();
        let password : string = <string>$("#passwordText").val();
        let auxMensaje = "Se ha encontrado un problema:\n";

        if(usuario === "") {
            auxReturn = false;
            auxMensaje+="El usuario está vacio\n";
        }
        if(password === "") {
            auxReturn = false;
            auxMensaje+="La contraseña está vacia\n";
        }

        if(!auxReturn) {
            console.log(auxMensaje);
        }

        return auxReturn;
    });
});