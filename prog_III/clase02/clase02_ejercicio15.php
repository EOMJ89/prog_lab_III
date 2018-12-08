<?php

function CalcularPotencias()
{
    for($i=1; $i<=4;$i++)
    {
        echo "<br>El numero es ".$i."<br>";
        
        for($j=1;$j<=4;$j++)
        {
            echo pow($i,$j);
            echo "<br>";
        }
    }
}
?>