<?php

    echo "Ejercicio 12<br/>";
    
    $lapicero = array();
    $lapicera1 = array("color"=> "Azul", "marca" => "Bic", "trazo" => 0.5, "precio" => 4);
    $lapicera2 = array("color"=> "Verde", "marca" => "Micro", "trazo" => 0.1, "precio" => 7);
    $lapicera3 = array("color"=> "Rojo", "marca" => "Faber", "trazo" => 0.2, "precio" => 5);

    array_push($lapicero, $lapicera1, $lapicera2, $lapicera3);
    
	foreach($lapicero as $value)
	{
        echo "Color: ".$value["color"]." | Marca: ". $value["marca"]." | Trazo: ". $value["trazo"]." | precio: ". $value["precio"];
        //var_dump($value);
        echo "<br/>";
	}
?>