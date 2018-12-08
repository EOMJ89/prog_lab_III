<?php
    if(isset($_POST["comando"])) {
        $auxSTD1 = new stdClass();
        $auxSTD1->codigoBarra = "Cod01";
        $auxSTD1->nombre = "Test1";
        $auxSTD1->precio = 2;
        
        $auxSTD2 = new stdClass();
        $auxSTD2->codigoBarra = "Cod02";
        $auxSTD2->nombre = "Test2";
        $auxSTD2->precio = 32;
        
        $auxSTD3 = new stdClass();
        $auxSTD3->codigoBarra = "Cod03";
        $auxSTD3->nombre = "Test3";
        $auxSTD3->precio = 93;
        
        $auxSTD4 = new stdClass();
        $auxSTD4->codigoBarra = "Cod04";
        $auxSTD4->nombre = "Test4";
        $auxSTD4->precio = 235;

        $auxArray = array($auxSTD1,$auxSTD2, $auxSTD3, $auxSTD4);
        echo json_encode($auxArray);
    }
?>