<?php
    $numero = $_POST["numero"];
    $auxImpares = array();

    for($i=0; $i<=$numero; $i++) {
        if($i%2) {
            array_push($auxImpares, $i);
        }
    }

    $auxResponse = "<table><tr><th>Impares</th></tr>";
    foreach ($auxImpares as $numeroA) {
        $auxResponse.="<tr><td>$numeroA</td></tr>";
    }
    $auxResponse.="</table>";

    echo $auxResponse;
?>