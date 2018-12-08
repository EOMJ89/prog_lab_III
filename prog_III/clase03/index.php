<?php
    $file = fopen("./miArchivo.txt", "a+"); //Devuelve puntero al archivo
    $fecha = date("d/m/Y H:i:s");
    $nombres = $_REQUEST["nombre"];
    
    echo "<h3>Se escribe el archivo</h3>";
    if(fwrite($file, "{$nombres}-{$fecha}\n")) {
        echo "Se escribio exitosamente<br>";
    }

    //Metodo con rewind y modo append+ (tambien funciona con write+ o read+)
    rewind($file);
    echo "<h3>Se lee el archivo con rewind</h3>";
    while(!(feof($file))) {
        echo (fgets($file)."<br>");
    }
    fclose($file);

    //Metodo normal de cerrar y abrir
    /*$file2 = fopen("./miArchivo.txt", "r+");
    echo "<h3>Se lee el archivo abriendolo nuevamente con modo lectura</h3>";
    while(!(feof($file2))) {
        echo fgets($file2)."<br>";
    }
    fclose($file2);*/
?>