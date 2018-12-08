<?php
require_once "clases-interfaces/empleado.php";

function Guardar($empleado) {
    $auxReturn = false;
    $file = fopen("../archivos/empleados.txt", "a+");

    if($empleado instanceof Empleado && $empleado != null && $file != false) {
        if(fwrite($file, "{$empleado->ToString()}\r\n") > 0) {
            $auxReturn = true;
        }
    }

    fclose($file);
    return $auxReturn;
}

function TraerTodos() {
    $auxReturn = array();
    if(file_exists("../archivos/empleados.txt")){
        $file = fopen("../archivos/empleados.txt", "r");

        while(!feof($file)) {
            $auxLinea = fgets($file);
            $array = explode("-",$auxLinea);

            if(count($array) > 1) {
                foreach ($array as $part) {
                    $part = trim($part);
                }

                $auxEmpleado = new Empleado($array[1], $array[2], $array[0], $array[3], $array[4], $array[5], $array[6]);
                $auxEmpleado->SetPathFoto($array[7]."-".$array[8]);
                array_push($auxReturn,$auxEmpleado);
            }
        }

        fclose($file);
    }
    return $auxReturn;
}
    
function EliminarEmpleado($legajo) {    
    $auxReturn = 0;
    $file = fopen("../archivos/empleados.txt", "r");

    while(!feof($file)) {
        $auxLinea = fgets($file);
        $array = explode("-",$auxLinea);
        //$array[4] es el legajo

        if(count($array) > 1) {
            foreach ($array as $part) {
                $part = trim($part);
            }

            if($array[4] == $legajo) {
                $auxReturn = 1;
                $auxEmpleado = new Empleado($array[1], $array[2], $array[0], $array[3], $array[4], $array[5], $array[6]);
                $auxEmpleado->SetPathFoto(trim($array[7]."-".$array[8]));
                //echo "Auxiliar de Empleado".$auxEmpleado->ToString()."<br>";
                
                $auxFabrica = new Fabrica("FabricaDeAdministracion", 7);
                $auxFabrica->TraerDeArchivo("../archivos/empleados.txt");
                //echo $auxFabrica->ToString()."<br>";
                
                foreach ($auxFabrica->GetEmpleados() as $empleadoA) {
                    if($empleadoA->GetLegajo() == $legajo) {
                        //echo $empleadoA." tiene el mismo legajo: ". $legajo ."<br>";
                        if($auxFabrica->EliminarEmpleado($empleadoA)) {
                            //echo "Llama a Eliminar<br>";

                            //echo $auxFabrica->ToString()."<br><br>";
                            if (file_exists($auxEmpleado->GetPathFoto())) {
                                unlink($auxEmpleado->GetPathFoto());
                            }
                            $auxReturn = 2;
                        }
                    }
                }
                break;
            }
        }
    }
    fclose($file);

    if($auxReturn == 2) {
        //echo "Llama a GuardarEnArchivo de Fabrica";
        $auxFabrica->GuardarEnArchivo("../archivos/empleados.txt");
    }
    return $auxReturn;
}
?>