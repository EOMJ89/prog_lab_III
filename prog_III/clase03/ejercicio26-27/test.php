<?php
    require_once "./CopiadorDeArchivos.php";

    if(Copiador::CopiarArchivos($_REQUEST["pathArchivo"])) {
        echo "Copiado Correctamente";
    }
    else {
        echo "Error en copiado";
    }

    if(Copiador::CopiarArchivoInvertido($_REQUEST["pathArchivo"])) {
        echo "Copiado Correctamente";
    }
    else {
        echo "Error en copiado";
    }
?>