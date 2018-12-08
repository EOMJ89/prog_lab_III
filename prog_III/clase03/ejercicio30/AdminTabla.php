<?php
    $filas = 0; 
    $columnas = 0; 
    $tableGenerated = "";
    $alta = isset($_POST["generar"]) ? TRUE : FALSE;

    if($alta) {
        $filas= $_POST ['filas'];
        $columnas= $_POST ['columnas'];
    }

    if($filas != 0 && $columnas != 0) {
        $tableGenerated.= '<table border="1">';

        for($i = 0; $i<$filas; $i++) {
            $tableGenerated.= "<tr>";

            for($j=0; $j<$columnas; $j++) {
                $tableGenerated.= "<td>Nice</td>";
            }

            $tableGenerated.= "</tr>";
        }
        
        $tableGenerated.= "</table>";
    }

    include("./GeneradorTabla.php");
?>