<?php

    echo "Ejercicio 14<br/>";
    

    $animales = array();
    $anios = array();
    $lenguajes = array();
    array_push($animales,"Perro", "Gato", "Ratón", "Araña", "Mosca");
    array_push($anios, "1986", "1996", "2015", "78", "86");
    array_push($lenguajes, "php", "mysql", "html5", "typescript", "ajax");

    echo "Array Asociativo<br/>";
    $asociativoArray = array();
    $asociativoArray["Animales"] = $animales;
    $asociativoArray["Anios"] = $anios;
    $asociativoArray["Lenguajes"] = $lenguajes;

    foreach($asociativoArray as $clave => $valor)
    {
        foreach($valor as $subClave)
        {
            echo "———$subClave<br/>";
        }
    }

    echo "<br/>Array Indexado<br/>";
    $indexedArray = array();
    array_push($indexedArray, $animales,$anios, $lenguajes);

    foreach($indexedArray as $valor)
    {   
        foreach($valor as $subClave)
        {
            echo "———$subClave<br/>";
        }
    }
?>