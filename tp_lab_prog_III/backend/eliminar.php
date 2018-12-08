<?php
    require_once "clases-interfaces/fabrica.php";
    require_once "funciones.php";

    $auxLegajo = isset($_GET["legajo"]) ? $_GET["legajo"] : 0;
    $tituloPag = "Eliminar Empleado";
    $mensajePag = '<table align="center">';
    
    switch (EliminarEmpleado($auxLegajo)) {
        case 0: {
            $mensajePag.= '<tr><td>NO EXISTE empleado con Legajo '.$auxLegajo.'.</td></tr>';
            break;
        }
        case 1: {
            $mensajePag.= '<tr><td>NO se ha ELIMINADO el empleado con Legajo '.$auxLegajo.'.</td></tr>';
            break;
        }
        case 2: {
            $mensajePag.= '<tr><td>SE ha ELIMINADO el empleado con Legajo '.$auxLegajo.'.</td></tr>';
            break;
        }
        default: {
            $mensajePag.= '<tr><td>Estoy en el default, algo salió muy mal</td></tr>';
            break;
        }
    }

    $mensajePag.='<tr><td align="center"><a href="mostrar.php">Mostrar Empleados</a></td></tr>';
    $mensajePag.='<tr><td align="center"><a href="index.php">Regresar al Formulario</a></td></tr></table>';
    include("templateHTML.php");
?>