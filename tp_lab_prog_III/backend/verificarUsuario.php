<?php
    session_start();
    require_once "clases-interfaces/empleado.php";

    if (file_exists("../archivos/empleados.txt")) {
        $auxDNI = $_POST["dni"];
        $auxApellido = $_POST["apellido"];
        $auxEsEmpleado = false;
        
        $file = fopen("../archivos/empleados.txt", "r");
    
        if($file != false) {
            if(filesize("../archivos/empleados.txt") == 0) {
                //echo "El archivo está vacio";
                header("Location: index.php");
            }
            else if(trim(fread($file, filesize("../archivos/empleados.txt"))) == "")
            {
                //echo "No empleados en el archivo";
                header("Location: index.php");
            }
            else {
                while(!feof($file)) {
                    $auxLinea = fgets($file);
                    $array = explode("-",$auxLinea);
            
                    if(count($array) > 1) {
                        foreach ($array as $part) {
                            $part = trim($part);
                        }
            
                        $auxEmpleado = new Empleado($array[1], $array[2], $array[0], $array[3], $array[4], $array[5], $array[6]);
                        $auxEmpleado->SetPathFoto($array[7]."-".$array[8]);

                        if($auxEmpleado->GetDni() == $auxDNI && $auxEmpleado->GetApellido() == $auxApellido) {
                            $auxEsEmpleado = true;
                            break;
                        }
                    }
                }
            }
        
            fclose($file);
        }

        if($auxEsEmpleado) {
            $_SESSION["DNIEmpleado"] = $auxDNI;
            header("Location: mostrar.php");
        }
        else {
            //Remover variables de sesion
            session_unset();
            //Destuir Variables de sesion
            session_destroy();
            $tituloPag = "Error en Login";
            $mensajePag='<h2>Error en Login</h2>
                            <table align="center" border="0">
                                <tr>
                                    <td align="center">
                                        <a href="../login.html">Regresar al Login</a>
                                    </td>
                                </tr>
                            </table>';
            include("templateHTML.php");
        }
    }
    else {
        //echo "No hay archivo";
        header("Location: index.php");
    }
?>