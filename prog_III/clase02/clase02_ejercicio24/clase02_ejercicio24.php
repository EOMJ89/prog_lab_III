<?php
    include_once "./ejercicio24_Fabrica.php";
    include_once "./ejercicio24_Operario.php";

    $operario1 = new Operario("a", "A", 100, 10);
    $operario2 = new Operario("b", "B", 101, 20);
    $operario3 = new Operario("c", "C", 102, 30);
    $operario4 = new Operario("d", "D", 103, 40);
    $operario5 = new Operario("e", "E", 104, 50);
    $operario6 = new Operario("f", "F", 105, 60);

    echo "Se muestran los Operarios <br>";
    echo Operario::MostrarOperario($operario1)."<br>";
    echo Operario::MostrarOperario($operario2)."<br>";
    echo Operario::MostrarOperario($operario3)."<br>";
    echo Operario::MostrarOperario($operario4)."<br>";
    echo Operario::MostrarOperario($operario5)."<br>";
    echo Operario::MostrarOperario($operario6)."<br>";

    echo "Se aumenta el sueldo del Operario A-a en un 20%<br>";
    $operario1->SetAumentarSalario(20);
    echo Operario::MostrarOperario($operario1)."<br>";

    echo "Se instancia la fabrica<br>";
    $fabrica1 = new Fabrica("Fabrica1");
    echo $fabrica1->Mostrar()."<br>";

    echo "Se agregan empleados a la fabrica<br>";
    if($fabrica1->Add($operario1)) {
        echo "Se agregó el Operario 1<br>";
    }
    if($fabrica1->Add($operario2)) {
        echo "Se agregó el Operario 2<br>";
    }
    if($fabrica1->Add($operario3)) {
        echo "Se agregó el Operario 3<br>";
    }
    if($fabrica1->Add($operario4)) {
        echo "Se agregó el Operario 4<br>";
    }
    if($fabrica1->Add($operario5)) {
        echo "Se agregó el Operario 5<br>";
    }
    if($fabrica1->Add($operario6)) {
        echo "Se agregó el Operario 6<br>";
    }
    else {
        echo "NO se agregó al Operario 6<br>";
    }

    echo "Se muestra la fabrica con Operarios<br>";
    echo $fabrica1->Mostrar()."<br>";
    echo "Gastos de la fabrica: ".Fabrica::MostrarCosto($fabrica1)."<br>";

    if($fabrica1->Remove($operario1)) {
        echo "Se eliminó el Operario 1<br>";
    }
    if($fabrica1->Remove($operario2)) {
        echo "Se eliminó el Operario 2<br>";
    }
?>