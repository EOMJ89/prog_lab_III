<?php
    if(isset($_POST["comando"])) {
        $comandoAux = $_POST["comando"];
        $auxReturn = "Estoy recien declarada, deberia cambiar";

        switch ($comandoAux) {
            case 'traerRemeras': {
                //Auxiliar de lectura
                $auxLinea = "";

                //Lectura del archivo
                $file = fopen("../../JSONS/remeras.json", "r");
                while(!feof($file)) {
                    $auxLinea.= trim(fgets($file));
                }
                fclose($file);

                //Auxiliar de retorno
                $auxReturn = $auxLinea;
                break;
            }
            default: {
                $auxReturn = "Estoy en el default";
                break;
            }
        }
    }

    echo $auxReturn;
?>