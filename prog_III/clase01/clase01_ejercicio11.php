<?php

    echo "Ejercicio 11<br/>";
    
    $v[1]=90; $v[30]=7; $v['e']=99; $v['hola']= 'mundo';
    
    //echo "Con foreach<br/>";
    foreach($v as $clave => $valor)
    {
        echo "$clave - $valor<br/>";
    }
?>