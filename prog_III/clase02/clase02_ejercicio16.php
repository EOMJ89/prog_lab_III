<?php

function InvertirPalabra($textoArray)
{
    $auxTexto="";
    //echo strlen($textoArray);
    
    for($i=(strlen($textoArray)-1); $i>=0;$i--)
    { $auxTexto.=$textoArray[$i]; }

    return $auxTexto;
}
?>