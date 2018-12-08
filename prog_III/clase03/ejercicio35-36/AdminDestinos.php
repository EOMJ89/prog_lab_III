<?php
$mensaje = ""; 
$alta = isset($_POST["enviar"]) ? TRUE : FALSE;

if($alta) {
    //Variables recibidas desde el formulario
    $opcion = $_POST ['selectLugar'];
    $cantPasajes = $_POST ['cantPasajes'];
    $modoPago = $_POST ['pagoOpcion'];

    //Variables auxiliares
    $destino="";

    //Variables para calcular precio
    $precioPasaje=0;
    $descuentoPorMetodoPago=0;
    $descuentoPorCantPasajes=0;
    $precioTotal=0;

    switch ($opcion) {
        case 'RJ': {
            $destino= "R&iacute; de Janeiro.";
            $precioPasaje = 900;
            break;
        }
        case 'PE': {
            $destino= "Punta del Este.";
            $precioPasaje = 550;
            break;
        }
        case 'LH': {
            $destino= "La Habana.";
            $precioPasaje = 1000;
            break;
        }
        case 'MM': {
            $destino= "Miami.";
            $precioPasaje = 1250;
            break;
        }
        default: {
            $destino= "Ibiza.";
            $precioPasaje = 1500;
            break;
        }
    }

    switch ($modoPago) {
        case 1: {
            $descuentoPorMetodoPago = $precioPasaje*12/100;
            break;
        }
        default: {
            $descuentoPorMetodoPago = $precioPasaje*7/100;
            break;
        }
    }
    
    $descuentoPorMetodoPago = $descuentoPorMetodoPago * 2;

    if($cantPasajes > 2) {
        $descuentoPorCantPasajes = ($precioPasaje*35/100) * ($cantPasajes-2);
    }

    $precioTotal = ($precioPasaje * $cantPasajes) - $descuentoPorMetodoPago - $descuentoPorCantPasajes;

    $mensaje="Destino: {$destino}<br>Precio del pasaje: {$precioTotal} Euros.";
}

include("./MensajeDestino.php");
?>