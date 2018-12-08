<?php
$alta = isset($_POST["generar"]) ? TRUE : FALSE;

if($alta) {
    $passFirst= $_POST ['passFirst'];
    $passSecond= $_POST ['passSecond'];

    if($passFirst == $passSecond) {
        include("./Welcome.php");
    }
    else {
        include("./IngresoPass.html");
    }
}
else {
    include("./IngresoPass.html");
}
?>