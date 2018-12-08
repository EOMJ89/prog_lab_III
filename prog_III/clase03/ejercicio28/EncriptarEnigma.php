<?php
require_once ("Enigma.php");

$alta = isset($_POST["guardar"]) ? TRUE : FALSE;

if($alta) {
	
	
	if(!Enigma::Encriptar($_POST["txtEnigma"])){
		$mensaje = "Lamentablemente ocurrio un error y no se pudo escribir en el archivo.";
		include("Mensaje.php");
	}
	else{
		$mensaje = "El archivo fue escrito correctamente. El mensaje ha sido encriptado.";
		include("Mensaje.php");
	}
}//if $alta
?>