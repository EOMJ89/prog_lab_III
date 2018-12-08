<?php
	echo "Ejercicio 06<br/>";
	
    $operador = '';
    $op1 = 10;
    $op2 = 2;
    $resultado = 0;

    switch($operador)
    {
        case '+':
        $resultado = $op1 + $op2; 
        break;
        case '-':
        $resultado = $op1 - $op2;
        break;
        case '*':
        $resultado = $op1 * $op2;
        break;
        case '/':
        $resultado = $op1 / $op2;
        break;
        default:
        break;
    }

    echo "El resultado es $resultado";
?>