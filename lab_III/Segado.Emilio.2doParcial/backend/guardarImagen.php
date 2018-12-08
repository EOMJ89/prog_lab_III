<?php

if(isset($_FILES["foto"])) {
    $objRetorno = new stdClass();
    $objRetorno->ok = false;

    $nombre = $_FILES["foto"]['name'];
    $destino = "./fotos/" . $nombre;
    
    if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino))
    { $objRetorno->ok = true; }
    else { $objRetorno->error = "No se pudo subir la foto"; }

    echo json_encode($objRetorno);
}

?>