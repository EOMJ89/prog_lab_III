<?php
    include_once "./ejercicio23_Pasajero.php";
    include_once "./ejercicio23_Vuelo.php";


    $pasajero1 = new Pasajero("A", "B", 1);
    $pasajero2 = new Pasajero("C", "D", 2, true);
    $pasajero3 = new Pasajero("E", "F", 3, true);

    $vuelo1 = new Vuelo("Empresa1", 10, 2);
    $vuelo2 = new Vuelo("Empresa2", 20, 1);

    if($vuelo1->AgregarPasajero($pasajero1))
    {
        echo "Se pudo agregar Pasajero 1<br>";
    }
    else
    {
        echo "NO se pudo agregar Pasajero 1<br>";
    }
    
    if($vuelo1->AgregarPasajero($pasajero2))
    {
        echo "Se pudo agregar Pasajero 2<br>";
    }
    else
    {
        echo "NO se pudo agregar Pasajero 2<br>";
    }

    if($vuelo1->AgregarPasajero($pasajero3))
    {
        echo "Se pudo agregar Pasajero 3<br>";
    }
    else
    {
        echo "NO se pudo agregar Pasajero 3<br>";
    }

    echo "Vuelo 2<br>";
    
    if($vuelo2->AgregarPasajero($pasajero3))
    {
        echo "Se pudo agregar Pasajero 3<br>";
    }
    else
    {
        echo "NO se pudo agregar Pasajero 3<br>";
    }

    echo $vuelo1->MostrarVuelo();

    echo Vuelo::Add($vuelo1, $vuelo2)."<br>";

    if($vuelo2->EliminarPasajero($pasajero3))
    {
        echo "Se pudo remover Pasajero 3<br>";
    }
    else
    {
        echo "NO se pudo remover Pasajero 3<br>";
    }
    echo $vuelo2->MostrarVuelo();
?>