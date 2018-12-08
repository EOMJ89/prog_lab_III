<?php
require_once 'Empleado.php';
require_once 'IApiMetodos.php';

class EmpleadoApi
{
    public static function CargarEmpleado($request, $response)
    {
        $ArrayParametros = $request->getParsedBody();
        $jsonEmpleado = json_decode($ArrayParametros['datos']);
        //var_dump($jsonEmpleado); die();

        $nuevoEmpleado = new Empleado();
        $nuevoEmpleado->usuario=$jsonEmpleado->usuario;
        $nuevoEmpleado->clave=$jsonEmpleado->clave;
        $nuevoEmpleado->sector=$jsonEmpleado->sector;
        $nuevoEmpleado->perfil=$jsonEmpleado->perfil;
        $nuevoEmpleado->estado="activo";

        $id = $nuevoEmpleado->CargarUno();
        
        $objResponse = new stdclass();
        if ($id != 0) {
            $objResponse->respuesta="Se guardo el Empleado.";
        } else {
            $objResponse->respuesta="NO se guardo el Empleado.";
        }
        $objResponse->ultimoIDInsertado=$id;

        return $response->withJson($objResponse, 200);
    }

    public static function BorrarEmpleado($request, $response)
    {
        $ArrayParametros = $request->getParsedBody();
        $id=$ArrayParametros['id'];

        $empleado = new Empleado();
        $empleado->id = $id;
        $cantBorrados = $empleado->BorrarUno();

        $objResponse= new stdclass();
        $objResponse->cantidad=$cantBorrados;

        if ($cantidadDeBorrados>0) {
            $objResponse->resultado="Se han borrado elementos.";
        } else {
            $objResponse->resultado="No se han borrado elementos.";
        }

        return $response->withJson($objResponse, 200);
    }
    
    public static function ModificarEmpleado($request, $response)
    {
        $ArrayParametros = $request->getParsedBody();
        $jsonEmpleado = json_decode($ArrayParametros['datos']);
        
        $empleado = new Empleado();
        $empleado->usuario=$jsonEmpleado->usuario;
        $empleado->clave=$jsonEmpleado->clave;
        $empleado->sector=$jsonEmpleado->sector;
        $empleado->perfil=$jsonEmpleado->perfil;
        $empleado->id=$jsonEmpleado->id;

        $cantidadDeModificados = $empleado->ModificarUno();
        
        $objResponse= new stdclass();
        if ($cantidadDeModificados>0) {
            $objResponse->resultado="Se ha modificado el Empleado.";
        } else {
            $objResponse->resultado="No se ha modificado el Empleado.";
        }

        return $response->withJson($objResponse, 200);
    }
    
    public static function TraerEmpleado($request, $response, $args)
    {
        $auxReponse = $response;
        $id=$args['id'];
        $empleado = Empleado::TraerUno($id);

        if (!$empleado) { //Aka $empleado != null
            $objResponse= new stdclass();
            $objResponse->error="No existe el usuario";
            $auxReponse = $response->withJson($objResponse, 500);
        } else {
            $auxReponse = $response->withJson($empleado, 200);
        }

        return $auxReponse;
    }

    public static function TraerTodosLosEmpleados($request, $response)
    {
        $listadoEmpleados=Empleado::TraerTodos();

        foreach ($listadoEmpleados as $empleado) {
            unset($empleado->clave);
        }
        
        return $response->withJson($listadoEmpleados, 200);
    }

    public static function Suspender($request, $response)
    {
        $ArrayParametros = $request->getParsedBody();
        $id=$ArrayParametros['id'];
        $estado=$ArrayParametros['estado'];
 
        $nuevoEstado = Empleado::SuspenderEmpleado($id, $estado);
        
        $objResponse= new stdclass();
        $objResponse->resultado = $nuevoEstado;
        $objResponse->tarea="Suspender";
        return $response->withJson($objResponse, 200);
    }

    public static function CantidadDeOperaciones($request, $response, $args)
    {
        $id=$args['id'];
        $operaciones = "No existe empleado";

        if ($id != 0) {
            $operaciones=Empleado::CantidadDeOperacionesEmpleado($id); 
        }
        return $response->withJson($operaciones, 200);
    }

    public static function IngresosAlSistema($request, $response, $args)
    {
        $objResponse= new stdclass();
        $objResponse=Empleado::FechasDeLogueo();

        return $response->withJson($objResponse, 200);
    }

    public static function OperacionesTodosEmpleados($request, $response, $args)
    {
        $objResponse= new stdclass();
        $objResponse=Empleado::OperacionesTodosLosEmpleados();
        return $response->withJson($objResponse, 200);
    }

    public static function OperacionesSectores($request, $response, $args)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $objResponse= new stdclass();
        $objResponse=Empleado::CantidadOperacionesTodosSectores();
        return $response->withJson($objResponse, 200);
    }

    public static function OperacionesEmpleadosSector($request, $response, $args)
    {
        $sector=$args['sector'];
        
        $objResponse= new stdclass();
        $objResponse=Empleado::CantidadOperacionesEmpleadoPorSector($sector);
        return $response->withJson($objResponse, 200);
    }
}
