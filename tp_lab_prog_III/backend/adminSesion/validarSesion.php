<?php
    session_start();
    
    if(file_exists("../archivos/empleados.txt")) {
        $file = fopen("../archivos/empleados.txt", "r");
        
        if(filesize("../archivos/empleados.txt") == 0) {
            fclose($file);
            
            if(!isset($_SESSION["DNIEmpleado"])) {
                //echo ($_SESSION["DNIEmpleado"]);

                header("Location: ../login.html");
            }
        }
    }
?>