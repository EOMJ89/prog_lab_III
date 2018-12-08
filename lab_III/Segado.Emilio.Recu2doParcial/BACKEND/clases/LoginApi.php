<?php
require_once 'AutenticadorJWT.php';
require_once 'Usuario.php';

class LoginApi
{
    public static function Ingresar($request, $response)
    {
        //echo "Estoy en ingresar";
        
        $arrParams = $request->getParsedBody();
        //var_dump($arrParams); die();        
        $usuario = $arrParams['correo'];
        //var_dump($usuario); die();
        $objResponse = new stdClass();
        $objResponse->datos = null;
        $objResponse->token = null;

        try {
            $usuario = Usuario::TraerUno($usuario)[0];
            
            $datos = array(
                'correo' => $usuario->correo,
                'nombre' => $usuario->nombre,
                'apellido' => $usuario->apellido,
                'perfil' => $usuario->perfil
            );
               
            //var_dump($datos); die();
            
            $token = AutenticadorJWT::CrearToken($datos);
            $objResponse->token = $token;
            $objResponse->datos = $datos;

            //var_dump($objResponse); die();
        }
        catch (Exception $e) {
            echo $e->getMessage();
        }
        
        return $response->withJson($objResponse, 200);
    }

    public static function Verificar($request, $response, $args)
    {
        $objResponse = new stdClass();
        $objResponse->ok = false;

        try {
            $arrParams = $request->getHeaders()['HTTP_TOKEN'];
            $token = $arrParams[0];
            $payload = AutenticadorJWT::ObtenerData($token);
            $objResponse->ok = true;
            $statusResponse = 200;
        } catch (Exception $e) {
            $objResponse->resultado= $e->getMessage();
        }

        return $response->withJson($objResponse, 200);
    }
}
