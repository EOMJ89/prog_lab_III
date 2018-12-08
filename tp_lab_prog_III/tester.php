<?php
    require_once "php/clases-interfaces/fabrica.php";

    $emp1 = new Empleado("TestA", "A", 100, "m", 1000, 50000, "mañana");
    $emp2 = new Empleado("TestB", "B", 101, "F", 1001, 60000, "tarde");
    $emp3 = new Empleado("TestC", "C", 102, "F", 1002, 40000, "mañana");
    $emp4 = new Empleado("TestD", "D", 103, "m", 1003, 70000, "noche");

    echo "Se muestran los Empleados<br>";
    echo $emp1->ToString()."<br>";
    echo $emp2->ToString()."<br>";
    echo $emp3->ToString()."<br>";
    echo $emp4->ToString()."<br>";

    echo $emp1->Hablar(array("Español", "Ingles", "Frances"))."<br>";

    echo "Se instancia la fabrica<br>";
    $fabrica1 = new Fabrica("Fabrica1", 2);
    echo $fabrica1->ToString()."<br>";

    echo "Se agregan empleados a la fabrica<br>";
    if($fabrica1->AgregarEmpleado($emp1)) {
        echo "Se agregó el Operario 1<br>";
    }
    if($fabrica1->AgregarEmpleado($emp2)) {
        echo "Se agregó el Operario 2<br>";
    }
    if($fabrica1->AgregarEmpleado($emp3)) {
        echo "Se agregó el Operario 3<br>";
    }
    if($fabrica1->AgregarEmpleado($emp4)) {
        echo "Se agregó el Operario 4<br>";
    }

    echo "Se muestra la fabrica con Operarios<br>";
    echo $fabrica1->ToString()."<br>";
    echo "Gastos de la fabrica: ". $fabrica1->CalcularSueldos()."<br>";

    echo "Se agregan empleados repetidos <br>";
    if($fabrica1->AgregarEmpleado($emp1)) {
        echo "Se agregó el Operario 1 (repetido)<br>";
    }
    if($fabrica1->AgregarEmpleado($emp2)) {
        echo "Se agregó el Operario 2 (repetido)<br>";
    }

    echo "Se muestra la fabrica con Operarios repetidos (el string resultande debe ser igual al anterior)<br>";
    echo $fabrica1->ToString()."<br>";    

    if($fabrica1->EliminarEmpleado($emp4)) {
        echo "Se eliminó el Operario 1<br>";
    }

    echo "Se muestra la fabrica al eliminar Empleado 4<br>";
    echo $fabrica1->ToString()."<br>"; 

    if($fabrica1->EliminarEmpleado($emp3)) {
        echo "Se eliminó el Operario 2<br>";
    }

    echo "Se muestra la fabrica al eliminar Empleado 3<br>";
    echo $fabrica1->ToString()."<br>"; 

    $fabrica1->GuardarEnArchivo("Test Guardar");
    $fabrica1->TraerDeArchivo("Test Traer");
?>