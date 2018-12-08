<?php
$alta = isset($_POST["enviar"]) ? true : false;


if($alta) {
    $legajo = $_POST["legajo"];
    $nombre = $_POST["nombre"];
    $apellido =$_POST["apellido"];
    $dni= $_POST["dni"];
    $sueldo=$_POST["sueldo"];
    $sexo=$_POST["sexo"];
    $mensaje = "";

    if($legajo != "" && $nombre != "" && $apellido != "" && $dni != "" && $sueldo != "") {
        $mensaje = "El empleado es {$legajo}-{$nombre}-{$apellido}-{$dni}-{$sexo}-{$sueldo}";
    }
    else {
        $mensaje = "El empleado no ha sido agregado";
    }

    include ("Mensaje.php");
}
?>