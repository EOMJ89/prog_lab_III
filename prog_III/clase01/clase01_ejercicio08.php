<?php
	echo "Ejercicio 08<br/>";
	
    function test($num){
    $numString = '';

    $decena = (int)($num/10);
    //echo $decena."<br/>";

    switch($decena)
    {
        case 2:
            $numString.= "Veint";
            break;
        case 3:
            $numString.= "Treina";
            break;
        case 4:
            $numString.= "Cuarenta";
            break;
        case 5:
            $numString.= "Cincuenta";
            break;
        case 6:
            $numString.= "Sesenta";
            break;
        case 7:
            $numString.= "Setenta";
            break;
        case 8:
            $numString.= "Ochenta";
            break;
        case 9:
            $numString.= "Noventa";
            break;
        default:
        break;
    }

    $unidad = $num - ($decena*10);
    //echo $unidad."<br/>";

    if($decena > 2 && $unidad > 0)
    {
        $numString.= " y ";
    }
    else if($decena === 2)
    {
        if($unidad >= 1)
        {
            $numString.= "i";
        }
        else
        {
            $numString.= "e";
        }
    }

    switch($unidad)
    {
        case 1:
            $numString.= "uno";
            break;
        case 2:
            $numString.= "dos";
            break;
        case 3:
            $numString.= "tres";
            break;
        case 4:
            $numString.= "cuatro";
            break;
        case 5:
            $numString.= "cinco";
            break;
        case 6:
            $numString.= "seis";
            break;
        case 7:
            $numString.= "siete";
            break;
        case 8:
            $numString.= "ocho";
            break;
        case 9:
            $numString.= "nueve";
            break;
        default:
        break;
    }

    echo "$numString<br/>";
}

$i=0;
for($i=20;$i<100;$i++)
{
    test($i);
}
?>