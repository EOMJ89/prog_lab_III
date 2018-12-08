<?php

	echo "Ejercicio 09<br/>";
	$numeros;
	$acumulado = 0;
    $promedio = 0;
    $i = 0;

    while($i < 5)
    {
        $numeros[$i] = rand(1,10);
        $i=$i+1;
    }   

	foreach($numeros as $value)
	{
		echo $value." | ";
		$acumulado+= $value;
	}

	$promedio = $acumulado/5;
	echo "<br/>El acumulado es $acumulado <br/>";
	echo "El promedio es ".(int)$promedio."<br/>";
	
	$salida = "El promedio es ";

	if((int)$promedio < 6)
	{ $salida.="menor"; }
	else if((int)$promedio > 6)
	{ $salida.="mayor"; }
	else
	{ $salida.="igual"; }

	echo $salida. " a 6.";
?>