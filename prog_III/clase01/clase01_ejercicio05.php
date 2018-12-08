<?php
	echo "Ejercicio 05<br/>";
	
	$a = 5;
	$b = 1;
	$c = 5;
	
	if(($a<$b && $b<$c) || ($c<$b && $b<$a))
	{
		echo "El numero del medio es $b<br/>";
	}
	else if(($b<$a && $a<$c) || ($c<$a && $a<$b))
	{
		echo "El numero del medio es $a<br/>";
	}
	else if(($a<$c && $c<$b) || ($b<$c && $c<$a))
	{
		echo "El numero del medio es $c<br/>";
	}	
	else /*($a===$b || $a===$c || $b===$c)*/
	{
		echo "No hay numero del medio";
	}
?>