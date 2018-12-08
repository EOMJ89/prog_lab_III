<?php
    require_once './clase02_ejercicio21.php';
    require_once './clase02_ejercicio22.php';

    //Ejercicio 21
    $autoAux = new Auto("00FF00", "Audi");
    $autoAux2 = new Auto("FF0000", "Audi");
    
    $autoAux3 = new Auto("00FF00", "Audi", 10);
    $autoAux4 = new Auto("00FF00", "Audi", 20);
    
    $autoAux5 = new Auto("0000FF", "Ford", 50, date('c'));

    //$autoAux3->AgregarImpuestos(1500);
    //$autoAux4->AgregarImpuestos(1500);
    //$autoAux5->AgregarImpuestos(1500);

    /*echo Auto::Add($autoAux, $autoAux2)."<br>";

    if($autoAux->Equals($autoAux2))
    {
        echo "Los autos son iguales<br>";
    }
    else
    {
        echo "Los autos NO son iguales<br>";
    }

    if($autoAux->Equals($autoAux5))
    {
        echo "Los autos son iguales<br>";
    }
    else
    {
        echo "Los autos NO son iguales<br>";
    }

    Auto::MostrarAuto($autoAux);
    Auto::MostrarAuto($autoAux3);
    Auto::MostrarAuto($autoAux5);*/

    $garage1 = new Garage("GG", 11);
    $garage1->MostrarGarage();

    echo $garage1->Equals($autoAux)."<br>"; //Devolverá 0.
    $garage1->Add($autoAux);
    $garage1->Add($autoAux2);
    echo $garage1->Equals($autoAux)."<br>"; //Devolverá 0.
    $garage1->Remove($autoAux);
    $garage1->Remove($autoAux);
?>