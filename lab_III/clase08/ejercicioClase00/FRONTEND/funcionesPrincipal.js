/// <reference path="../../libs/jquery/index.d.ts" />
$(document).ready(function () {
    //$("#[]span") //Comienza a buscar en un lugar especifico, como una table o un form
    //$("input[type=text]") //Trae todos los input de tipo text, puede combinarse con el anterior
    $("span").click(function () {
        $("body").attr("class", $(this).attr("class"));
    });
    $("#btnGuardar").click(function () {
        var className = $("body").attr("class");
        var usuarios = JSON.parse(localStorage.getItem("MisUsuarios"));
        var email = localStorage.getItem("UsuarioActual");
        for (var _i = 0, usuarios_1 = usuarios; _i < usuarios_1.length; _i++) {
            var usuarioA = usuarios_1[_i];
            if (usuarioA.email == email) {
                usuarioA.clase = className;
            }
        }
        localStorage.setItem("MisUsuarios", JSON.stringify(usuarios));
    });
    var usuarios = JSON.parse(localStorage.getItem("MisUsuarios"));
    var userActual = JSON.parse(localStorage.getItem("UsuarioActual"));
    for (var _i = 0, usuarios_2 = usuarios; _i < usuarios_2.length; _i++) {
        var usuarioA = usuarios_2[_i];
        if (usuarioA.email == userActual.email) {
            $("body").attr("class", userActual.clase);
        }
    }
});
//# sourceMappingURL=funcionesPrincipal.js.map