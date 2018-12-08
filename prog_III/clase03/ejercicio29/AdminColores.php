<?php $color = "white"; 
$alta = isset($_POST["guardar"]) ? TRUE : FALSE;

if($alta) {
    $color= $_POST ['nameColor'];
}

include("./Colores.php");
?>