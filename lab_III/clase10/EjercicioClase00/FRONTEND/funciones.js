/// <reference path="../../libs/jquery/index.d.ts" />
$(document).ready(function () {
    //Cuando el formulario esté completamente cargado
    $("#buttonTest").click(EjemploBootstrap);
});
function EjemploBootstrap() {
    /*let claseEntrante: string = (<string> $("#buttonTest").attr("class")).split(" ")[1].split("-")[1];
    console.log("La clase actual es: "+claseEntrante);
    
    let claseSalida : string = "";

    switch (claseEntrante) {
        case "default": {
            claseSalida="info";
            break;
        }
        case "info": {
            claseSalida="success";
            break;
        }
        case "success": {
            claseSalida="warning";
            break;
        }
        case "warning": {
            claseSalida="danger";
            break;
        }
        case "danger": {
            claseSalida="default";
            break;
        }
        default:{
            claseSalida="default";
            break;
        }
    }

    $("#buttonTest").attr("class", "btn btn-" + claseSalida);
    console.log("La clase nueva es: " + claseSalida);*/
    var claseSalida = "btn-";
    console.log($(this).attr("class"));
    if ($(this).hasClass("btn-default")) {
        console.log("Tengo estilo default");
        $(this).removeClass("btn-default");
        console.log($(this).attr("class"));
        claseSalida += "info";
    }
    else if ($(this).hasClass("btn-info")) {
        console.log("Tengo estilo info");
        $(this).removeClass("btn-info");
        console.log($(this).attr("class"));
        claseSalida += "success";
    }
    else if ($(this).hasClass("btn-success")) {
        console.log("Tengo estilo success");
        $(this).removeClass("btn-success");
        console.log($(this).attr("class"));
        claseSalida += "warning";
    }
    else if ($(this).hasClass("btn-warning")) {
        console.log("Tengo estilo warning");
        $(this).removeClass("btn-warning");
        console.log($(this).attr("class"));
        claseSalida += "danger";
    }
    else if ($(this).hasClass("btn-danger")) {
        console.log("Tengo estilo danger");
        $(this).removeClass("btn-danger");
        console.log($(this).attr("class"));
        claseSalida += "default";
    }
    $(this).addClass(claseSalida);
}
//# sourceMappingURL=funciones.js.map