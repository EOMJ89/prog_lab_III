<?php
require_once 'Usuario.php';
require_once 'AutenticadorJWT.php';

class LoginApi
{
    public static function Ingresar($request, $response)
    {
        $arrParams = $request->getParsedBody();
        $usuario = $arrParams['correo'];
        $clave = $arrParams['clave'];

        $objResponse = new stdClass();
        $objResponse->datos = null;
        $objResponse->token = null;

        try {
            $validacion = Usuario::UsuarioValido($usuario, $clave);
            
            if($validacion->resultado === 'valido'){
                $datos = array(
                    'correo' => $validacion->usuario->correo,
                    'clave' => $validacion->usuario->clave
                );

                //var_dump($datos); die();
                
                $token = AutenticadorJWT::CrearToken($datos);
                $objResponse->token = $token;
                $objResponse->datos = $datos;
            }
            else {
                $objResponse->error = "Error en usuario: {$validacion->resultado}.";
            }

        } catch (Exception $e) {
            echo($e->getMessage());
        }

        return $response->withJson($objResponse, 200);
    }

    public static function Verificar($request, $response, $args)
    {
        $objResponse = new stdClass();
        $objResponse->resultado = "Sesion no cerrada: ";
        $statusResponse = 409;

        try {
            $arrParams = $request->getHeaders()['HTTP_TOKEN'];
            $token = $arrParams[0];
            $payload = AutenticadorJWT::ObtenerData($token);
            $objResponse->resultado = "Token Valido";
            $statusResponse = 200;
        } catch (Exception $e) {
            $objResponse->resultado.= $e->getMessage();
        }

        return $response->withJson($objResponse, $statusResponse);
    }
}
