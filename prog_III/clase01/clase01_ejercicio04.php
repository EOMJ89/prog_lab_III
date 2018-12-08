<?php

	echo "Ejercicio 04<br/>";
	
	$contador=0;
	$acumulador=0;
	$i = 0;
	
	do
	{
		$i=$i+1;
		$acumulador+=$i;
		$contador=$contador+1;
		echo "$i | ";
	}while($acumulador<1000);
		
	echo "<br/>La cantidad de numeros sumados es $contador<br/>";
?>