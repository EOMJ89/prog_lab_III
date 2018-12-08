<?php
    if(isset($_POST["comando"])) {
        $auxComando = $_POST["comando"];
        $auxReturn = "Deberia de cambiar, me acaban de declarar";

        switch ($auxComando) {
            case 'traerCiudades':
                 //Auxiliar de lectura
                $auxLinea = "[";

                //Lectura del archivo
                $file = fopen("../../JSONS/city.list.min.json", "r");
                if($file != false) {
                    while(!feof($file)) {
                        $auxLinea.= trim(fgets($file)).",";
                    }
                    fclose($file);
                }

                $auxLinea = substr($auxLinea,0,(strlen($auxLinea)-2));
                $auxLinea.="]";
                //Auxiliar de retorno
                $auxReturn = $auxLinea;
                break;
            
            default:
                $auxReturn = "Estoy en el default, algo salió muy mal";
                break;
        }
       
        echo $auxReturn;
    }
?>