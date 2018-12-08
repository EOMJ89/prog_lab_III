<?php
    $lado1 = 0; 
    $lado2 = 0;
    $radioOpcion = 0;
    $mensaje = "";
    $alta = isset($_POST["enviar"]) ? TRUE : FALSE;

    if($alta) {
        $lado1= $_POST ['lado1'];
        $lado2= $_POST ['lado2'];
        $radioOpcion = $_POST['radioOption'];
    }

    if($lado1 != 0 && $lado2 != 0 && $radioOpcion != 0) {
        $resultado = 0;
        
        switch ($radioOpcion) {
            case 1:
                $resultado = $lado1 * $lado2;
                $mensaje = "La superficie ";
                break;
            case 2:
                $resultado = $lado1 * 2 + $lado2 * 2;
                $mensaje = "El perimetro ";
                break;
        }
        
        $mensaje.= "del rectangulo es {$resultado}.";
    }

    //include("./PedirMedidas.php");
    include ("./MostrarSuperficie.php");
?>