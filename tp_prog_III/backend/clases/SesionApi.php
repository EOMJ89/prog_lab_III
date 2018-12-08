<?php
require_once "Sesion.php";
require_once "Empleado.php";
require_once "AutenticadorJWT.php";

class SesionApi
{
    public static function Login($request, $response, $args)
    {
        $objResponse = new stdClass();
        $ArrayParametros = $request->getParsedBody();
        $usuario = $ArrayParametros['user'];
        $clave = $ArrayParametros['clave'];
        //echo $usuario.'-'.$clave;

        try {
            $objValidEmpleado = Empleado::ValidarEmpleado($usuario, $clave);

            //var_dump($objValidEmpleado); die();
            if ($objValidEmpleado->resultado === "valido") {
                $empleado = $objValidEmpleado->empleado;

                $sesion = new Sesion();
                $sesion->idEmpleado = $empleado->id;
                $sesion->horaInicio = date('Y/m/d G:i,s');
                $idSesion = $sesion->IniciarSesion();

                if ($idSesion > 0) {
                    $datos = array('idEmpleado'=> $empleado->id, 'usuario' => $empleado->usuario, 'sector' => $empleado->sector, 'perfil' => $empleado->perfil, 'estado' => $empleado->estado, 'idSesion' => $idSesion);

                    $token = AutenticadorJWT::CrearToken($datos);
                    $objResponse->token = $token;
                    $objResponse->datos = $datos;
                }
            } else {
                $objResponse->datos = "error";
                $objResponse->mensaje = "Error en ". $objValidEmpleado->resultado.". Reingrese.";
            }
        } catch (Exception $e) {
            echo($e->getMessage());
        }

        return $response->withJson($objResponse, 200);
    }

    public static function Unlog($request, $response)
    {
        $objResponse = new stdClass();

        try {
            $ArrayParametros = $request->getParsedBody();
            $token = $ArrayParametros['token'];
            $payload = AutenticadorJWT::ObtenerData($token);

            $idSesion = $payload->idSesion;
            $fechaFinal = date('Y/m/d G:i,s');

            $resultado = Sesion::CerrarSesion($idSesion, $fechaFinal);

            if ($resultado) {
                $objResponse->resultado = "Sesion cerrada";
            }
        } catch (Exception $e) {
            $objResponse->resultado = $e->getMessage();
        }

        return $response->withJson($response, 200);
    }
}