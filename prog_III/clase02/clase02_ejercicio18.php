<?php

function EsPar($numero)
{
    $retorno = FALSE;
    
    if(!($numero%2))
    {
        $retorno = TRUE;
    }

    return boolVal($retorno);
}

function EsImpar($numero)
{
    return !boolVal((EsPar($numero)));
}
?>