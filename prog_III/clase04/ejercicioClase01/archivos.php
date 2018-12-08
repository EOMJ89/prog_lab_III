<?php

    $imagenesObtenidas = $_FILES["archivos"]["name"];
    $usuario = $_POST["usuario"];
    
    //var_dump(pathinfo($imagenesObtenidas, PATHINFO_FILENAME)); die();

    //Crea el nuevo nombre de archivo y la extensión
    //$ext = pathinfo($imagenesObtenidas, PATHINFO_EXTENSION); //Extensión
    $auxNameFoto = date('Y_m_d')."_{$imagenesObtenidas}"; //Nombre con extensión

    //Abre el archivo de texto para guardar la info de nombre_foto
    $file = fopen("files/nombre_foto.txt","a+");
    if($file != false) {
        fwrite($file, "{$usuario}-{$auxNameFoto}\r\n");
    }
    fclose($file);

    $nuevoDestino = "fotos/{$auxNameFoto}";
    if(move_uploaded_file($_FILES["archivos"]["tmp_name"],$nuevoDestino)) {
        echo "Yes";
        header("location:listado.php");
    }
    else {
        echo "No";
        header("location:index.html");        
    }

    /**
     * if(move_uploaded_file($_FILES["archivos"]["tmp_name"], $imagenesObtenidas)) {
     * echo "Subida exitosa";
     * }
     * else {
     * echo "Subida fallida";
     * }*/

?>