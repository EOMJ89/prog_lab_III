<?php
    require_once "./clases/Ovni.php";

    $tipo = isset($_POST["tipo"]) ? $_POST["tipo"] : null;
    $vel = isset($_POST["velocidad"]) ? $_POST["velocidad"] : null;
    $origen = isset($_POST["planeta"]) ? $_POST["planeta"] : null;

    $path  = isset($_FILES["archivo"]["name"]) ? $_FILES["archivo"]["name"] : null;
    $destino = "img/".$path;

    /*if($path != "") {
        move_uploaded_file($_FILES["archivo"]["tmp_name"], $destino);
    }*/

    $auxOvni = new Ovni($tipo, $vel, $origen, $path);

    echo $auxOvni->ToJson()."<br>";
    
    /*echo "Velocidad Warp ".$auxOvni->ActivarVelocidadWarp()."<br>";
    /*
    if($auxOvni->Agregar()) {
        echo "Se ha agregado.<br>";
    }
    else {
        echo "No se ha agregado.<br>";
    }

    foreach($auxOvni->Traer() as $ovniA) {
        echo $ovniA->ToJson()."<br>";
    }*/

    /*if($auxOvni->Existe($auxOvni)) {
        echo "Existe<br>";
    }
    else {
        echo "No existe<br>";
    }*/

    //Para modificar
    $tipoNuevo = isset($_POST["tipoNuevo"]) ? $_POST["tipoNuevo"] : null;
    $velNuevo = isset($_POST["velNuevo"]) ? $_POST["velNuevo"] : null;
    $origenNuevo = isset($_POST["planetaNuevo"]) ? $_POST["planetaNuevo"] : null;

    $pathNuevo = isset($_FILES["archivoNuevo"]["name"]) ? $_FILES["archivoNuevo"]["name"] : null;
    $destinoNuevo = "img/".$pathNuevo;

    if($auxOvni->Modificar($tipoNuevo, $velNuevo, $origenNuevo, $pathNuevo)) {
        echo "Se modifica<br>";
    }
    else {
        echo "No se modifica<br>";
    }

    foreach($auxOvni->Traer() as $ovniA) {
        echo $ovniA->ToJson()."<br>";
    }
?>