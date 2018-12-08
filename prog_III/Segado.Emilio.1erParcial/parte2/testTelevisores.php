<?php
    require_once "./clases/Televisor.php";

    $tipo = isset($_POST["tipo"]) ? $_POST["tipo"] : "";
    $precio = isset($_POST["precio"]) ? $_POST["precio"] : "";
    $paisOrigen = isset($_POST["paisOrigen"]) ? $_POST["paisOrigen"] : "";

    $path  = isset($_FILES["archivo"]["name"]) ? $_FILES["archivo"]["name"] : "";
    $destino = "img/".$path;

    if($path != "") {
        move_uploaded_file($_FILES["archivo"]["tmp_name"], $destino);
    }

    $auxTelevisor = new Televisor($tipo, $precio, $paisOrigen, $path);

    //echo $auxTelevisor->ToJson()."<br>";
    echo $auxTelevisor->CalcularIva()."<br>";
    
    if($auxTelevisor->Agregar()) {
        echo "Se ha agregado.<br>";
    }
    else {
        echo "No se ha agregado.<br>";
    }

    foreach($auxTelevisor->Traer() as $tele) {
        echo $tele->ToJson()."<br>";
    }
?>