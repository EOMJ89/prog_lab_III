<?php
    require_once "adminSesion/validarSesion.php";
    include_once "clases-interfaces/fabrica.php";
    include_once "funciones.php";

    $scriptPag = '<script src="../javascript/funcionesModificar.js"></script>';
    $tituloPag = "Mostrar Empleados";
    $mensajePag='<h2>Listado de Empleados</h2><table align="center" border="0"><tr><td colspan="4"><h4>Info</h4><hr></td></tr>';
    $auxEmpleados = array_unique(TraerTodos()); //Evita la repetición de empleados, error que ocure al recargar la página de "Administración.php"

    foreach ($auxEmpleados as $empleadoA) {
        $mensajePag.= '<tr><td>'.$empleadoA->ToString().'</td><td><img src="'.$empleadoA->GetPathFoto().'" height="100" width="100"></td><td><a href="./eliminar.php?legajo='.$empleadoA->GetLegajo().'">Eliminar</a></td><td><input type="button" value="Modificar" onclick='.'"AdministrarModificar('."'".$empleadoA->GetDni()."'".')"'.'></td></tr>';
    }

    $mensajePag.= '<tr><td align="center" colspan="4"><hr><a href="index.php">Regresar al Formulario</a></td></tr>';
    $mensajePag.= '<tr><td align="center" colspan="4"><a href="adminSesion/cerrarSesion.php">Cerrar Sesion</a></td></tr></table><form name="formHidden" action="index.php" method="POST"><input type="hidden" name="dniHidden" id="inHidden"></form>';
    include("templateHTML.php");
?>