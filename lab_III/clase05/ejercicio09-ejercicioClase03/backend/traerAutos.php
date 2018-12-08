<?php
    if(isset($_POST["comando"])) {
        //Auxiliar de lectura
        $auxLinea = "";

        //Lectura del archivo
        $file = fopen("../../JSONS/autos.json", "r");
        while(!feof($file)) {
            $auxLinea.= trim(fgets($file));
        }
        fclose($file);

        //Auxiliar de retorno
        $auxReturn = $auxLinea;
        echo $auxReturn;
    }
?>