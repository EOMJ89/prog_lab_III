<?php
    if(isset($_POST["producto"])) {
        //Auxiliar de lectura
        $auxJson = json_decode($_POST["producto"]);
        var_dump($auxJson);
    }
?>