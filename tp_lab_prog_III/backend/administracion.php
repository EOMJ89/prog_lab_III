<?php
    require_once "clases-interfaces/fabrica.php";
    require_once "funciones.php";

    //Valida que se haya enviado información
    $alta = isset($_POST["enviar"]) ? true : false;

    if($alta) {
        //Variable auxiliar para Mensaje y Titulo en la página
        $tituloPag = "Formulario en Proceso";
        $mensajePag='<table align="center" border="0">';

        //Variables de datos para la creación del empleado
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $dni = $_POST["dni"];
        $sexo = $_POST["sexo"];
        $legajo = $_POST["legajo"];
        $sueldo = $_POST["sueldo"];
        $turno = $_POST["turno"];
        $pathFoto = VerificarImagen($dni, $apellido);
        
        $modoForm = $_POST["hdnModificar"];
        //echo $modoForm."<br>";/* die();*/

        //Variable auxiliar del empleado
        $auxEmpleado = new Empleado($nombre, $apellido, $dni, $sexo, $legajo, $sueldo, $turno);

        //Variable auxiliar de Fabrica
        $auxFabrica = new Fabrica("FabricaDeAdministracion", 7);
        $auxFabrica->TraerDeArchivo("../archivos/empleados.txt");

        if($modoForm == "agregar") {
            //echo "Estoy en agregar<br>";

            //Reviso que no haya otro empleado con los mismos DNI y Legajo
            $puedeEntrar = true;
            foreach ($auxFabrica->GetEmpleados() as $empleadoA) {
                if($auxEmpleado->GetDni() == $empleadoA->GetDni() || $empleadoA->GetLegajo() == $auxEmpleado->GetLegajo()) {
                    $puedeEntrar = false;
                    break;
                }
            }

            if($puedeEntrar && $pathFoto != false) {
                $auxEmpleado->SetPathFoto($pathFoto);

                if($auxFabrica->AgregarEmpleado($auxEmpleado)) {
                    //echo "Empleado añadido";
                    $auxFabrica->GuardarEnArchivo("../archivos/empleados.txt");
                    $mensajePag.= '<tr><td align="center"><h2>El empleado HA sido agregado y escrito exitosamente</h2><hr><a href="mostrar.php">Mostrar Empleados</a></td></tr>';
                }
                else {
                    $mensajePag.= '<tr><td align="center"><h2>El empleado NO ha sido añadido</h2><hr><a href="index.php">Regresar al Formulario</a></td></tr>';
                }  
            }
            else {
                $mensajePag.= '<tr><td align="center"><h2>El empleado NO ha sido añadido por';
                
                if(!$puedeEntrar) {
                    $mensajePag.= 'que el empleado ya existe';
                }
                else if($pathFoto == false) {
                    $mensajePag.=' error en la foto';
                }
                
                $mensajePag.='</h2><hr><a href="index.php">Regresar al Formulario</a></td></tr>'; 
            }
        }
        else {
            //echo "Estoy en modificar<br";

            foreach ($auxFabrica->GetEmpleados() as $empleadoA) {
                if($auxEmpleado->GetDni() == $empleadoA->GetDni()) {
                    $auxFabrica->EliminarEmpleado($empleadoA);
                    break;
                }
            }

            if($pathFoto != false) {
                $auxEmpleado->SetPathFoto($pathFoto);

                if($auxFabrica->AgregarEmpleado($auxEmpleado)) {
                    //echo "Empleado modificado y reañadido";
                    $auxFabrica->GuardarEnArchivo("../archivos/empleados.txt");
                    $mensajePag.= '<tr><td align="center"><h2>El empleado HA sido modificado y escrito exitosamente</h2><hr><a href="mostrar.php">Mostrar Empleados</a></td></tr>';
                }
                else {
                    $mensajePag.= '<tr><td align="center"><h2>El empleado NO ha sido modificado</h2><hr><a href="index.php">Regresar al Formulario</a></td></tr>';
                }  
            }
            else {
                $mensajePag.= '<tr><td align="center"><h2>El empleado NO ha sido modificado por error en la foto</h2><hr><a href="index.php">Regresar al Formulario</a></td></tr>';

            }
        }

        $mensajePag.= "</table>";
        include("templateHTML.php");
    }

    function VerificarImagen($dni, $apellido) {
        $auxReturn = false;
        $destinoFoto = $_FILES["archivos"]["name"];
        $auxTamanio = $_FILES["archivos"]["size"];
        $auxExtension = pathinfo($destinoFoto, PATHINFO_EXTENSION);

        $puedeCargar = true;

        //echo $destinoFoto;
        if($destinoFoto == "") {
            $puedeCargar = false;
            echo "No hay ruta de foto";
        }
        
        //Verificación de extensión y tamaño
        if($auxTamanio != false) {
            if($auxExtension != "jpg" || $auxExtension != "jpeg" || $auxExtension != "gif" || $auxExtension != "bmp" || $auxExtension != "png") {
                if ($auxTamanio > 1048576) {
                    $razon = 0;
                    $puedeCargar = false;
                    break;
                }
            }
        }

        //Verificacion para la existencia de archivo
        $auxDestino = "../fotos/{$dni}-{$apellido}.{$auxExtension}";
        if (file_exists($auxDestino)) {
            unlink($auxDestino);
        }
        
        if($puedeCargar) {
            if(move_uploaded_file($_FILES["archivos"]["tmp_name"],$auxDestino)) {
                $auxReturn = $auxDestino;
            }
        }

        return $auxReturn;
    }
?>