<?php

function ValidarPalabra($texto, $max)
{
    $retorno = 1;
    
    if(strlen($texto)>$max)
    {
        $retorno = 0;
    }

    switch ($texto) {
        case 'Recuperatorio':
        case 'Parcial':
        case 'Programacion':
            //No hagas nada
            break;
        default:
            $retorno = 0;
            break;
    }

    return $retorno;
}
?>