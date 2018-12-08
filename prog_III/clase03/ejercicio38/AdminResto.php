<?php
$mensaje = ""; 
$alta = isset($_POST["enviar"]) ? TRUE : FALSE;

if($alta) {
    //Variables recibidas desde el formulario
    $consumo = $_POST ['txtConsumo'];
    $descuento = 0;
    $precioFinal = 0;

    if(550 <= $consumo) {
        $descuento = $consumo*20/100;
    }
    else if(300 <= $consumo) {
        $descuento = $consumo*10/100;
    }

    $precioFinal = $consumo-$descuento;
    
    $mensaje=  "<tr>
                    <td>El costo total de consumo es</td>
                    <td>{$consumo}</td>
                <tr>
                <tr>
                    <td>El consumo con descuento es</td>
                    <td>{$precioFinal}</td>
                <tr>";

    include("./Consumo.php");
}
?>