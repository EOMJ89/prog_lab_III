<?php

	echo "Ejercicio 01<br/><br/>";
	$nombre = "Emilio";
	$apellido = "Segado";

	//printf ("%s, %s<br/>", $apellido, $nombre);
	echo $apellido.", ".$nombre;
	
	//El operador . funciona como operador de concatenacion
	echo "<br/>Su nombre es ".$nombre; 
	echo '<br/>Su nombre es '.$nombre;
	
	//Las comillas funcionan diferente entre sí al usarlas sin el operador .
	echo "<br/>Su nombre es $nombre"; //Muestra contenido de la variable
	echo '<br/>Su nombre es $nombre'; //Comillas simples muestran caracteres de escape
	
	//También aplica así
	echo "<br/>Su nombre es {$nombre}";
	echo '<br/>Su nombre es {$nombre}'; 
	
	echo "<br/>Se pueden \"escapar\" las comillas"; //Para mostrarlas de ser necesario
?>