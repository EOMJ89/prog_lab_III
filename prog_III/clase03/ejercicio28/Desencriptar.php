<?php
	require_once('Enigma.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Decencriptar</title>
</head>
<body>
<?php
	echo "<table class='table'>
			<thead>
			<tr>
				<th>Mensaje Desencriptado</th>
				<th>Mensaje Encriptado</th>
			</tr> 
			</thead>";
	echo ' 	<tr>
				<td>'.Enigma::Desencriptar("./archivos/mensajeEncript.txt").'</td>
				<td>'.Enigma::MostrarEncriptado("./archivos/mensajeEncript.txt").'</td>
			</tr>
		</table>';		
?>
</body>
</html>