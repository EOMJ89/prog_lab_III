<?php
    sleep(rand(0,6));

    $number = rand(0,1);

    if($number) {
        echo "SI";
    }
    else {
        $retorno = 'NO-<ul>';

        $file = fopen("nombres.txt", "r");
        if($file != false) {
            while(!feof($file)) {
            $auxLinea = trim(fgets($file));

            $retorno.='<li><a onclick="CambiarNombre('.$auxLinea.')">'.$auxLinea.'</a></li>';
            }
        }
        fclose($file);
        $retorno.='</ul>';
        
        echo $retorno;
    }
?>