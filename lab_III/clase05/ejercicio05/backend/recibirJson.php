<?php
    if(isset($_POST["comando"])) {
        $auxSTD = new stdClass();
        $auxSTD->codigoBarra = "Cod01";
        $auxSTD->nombre = "Test1";
        $auxSTD->precio = 2;

        echo json_encode($auxSTD);
    }
?>