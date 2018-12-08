<?php
$mensaje = ""; 
$placeHold=0;
$alta = isset($_POST["enviar"]) ? TRUE : FALSE;

if($alta) {
    //Variables recibidas desde el formulario
    $numero = $_POST ['txtNumber'];

    if(isset($numero) && $numero!="") {
        //Cantidad de Cifras
        $cifras= strlen($numero);
        if($numero < 0) {
            $cifras--;
        }

        //Suma de cifras pares e impares del Numero
        $acumPares = 0;
        $acumImpares = 0;

        for($i=0; $i<strlen($numero); $i++) {
            if($numero<0 && $i==0) {
                continue;
            }
            else {
                if($numero[$i]%2 == 0){
                    $acumPares+=$numero[$i];
                }
                else {
                    $acumImpares+=$numero[$i];
                }
            }
        }

        //Suma total de las cifras del numero
        $acumTotal = $acumImpares + $acumPares;

        //Mantener el numero actual como placeholder para la proxima
        $placeHold = $numero;

        $mensaje=  "<tr><td>Cantidad de Cifras que posee:</td>
                    <td>{$cifras}</td></tr>
                    <tr><td>Suma de las cifras pares:</td>
                    <td>{$acumPares}</td></tr>
                    <tr><td>Suma de las cifras imapres:</td>
                    <td>{$acumImpares}</td></tr>
                    <tr><td>Suma total de las cifras:</td>
                    <td>{$acumTotal}</td></tr>
                    <tr><td>Divisores:</td>
                    <td>".getDivisores($numero)."</td></tr>";
       
    }
    include("./IngresoNum.php");
}

function GetDivisores($numero) {
    $auxReturn = "";
    $auxNumero = abs($numero);

    for($i=1;$i<=$auxNumero;$i++) {
        if(!($auxNumero % $i)) {
            $auxReturn .= "{$i}<br>";
        }
    }

    return $auxReturn;
}
?>