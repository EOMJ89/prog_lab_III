<?php

	echo "Ejercicio 10<br/>";
    
    $numeros = array(1,3,5,7,9,11,13,15,17,19);

    //echo $i;
    echo "Con for<br/>";
    for($i=0; $i<10;$i++)
    {
        echo $numeros[$i]."<br/>";
    }
    
    echo "Con while<br/>";
    $i=0;
    while($i<10)
    {
        echo $numeros[$i]."<br/>";
        $i++;
    }

    echo "Con foreach<br/>";
    foreach($numeros as $impares)
    {
        echo $impares."<br/>";
    }
?>