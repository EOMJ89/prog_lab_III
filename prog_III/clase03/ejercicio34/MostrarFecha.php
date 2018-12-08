<?php
    $dia = 0; 
    $mes = 0;
    $año = 0;
    $mensaje = "";
    $alta = isset($_POST["enviar"]) ? TRUE : FALSE;

    if($alta) {
        
        if(isset($_POST["chbAnio"])) {
            //echo $_POST["chbAnio"];
            $mensaje.= "Año ".date('y')."<br>";
        }
        if(isset($_POST["chbMes"])) {
            //echo $_POST["chbMes"];
            $mensaje.= "Mes ".date('m')."<br>";
        }
        if(isset($_POST["chbDia"])) {
            //echo $_POST["chbDia"];
            $mensaje.= "Día ".date('d')."<br>";
        }
    }

    include ("./Fecha.php");
?>