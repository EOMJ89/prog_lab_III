<?php
require_once "Databases.php";
require_once "Usuario.php";
require_once 'AutenticadorJWT.php';


class MW {
    public function VerificarSeteo ($request, $response, $next) {
        $body = $request->getParsedBody();
        $auxBool = true;
        $returnResponse = $response;
        $respuesta = new stdClass();
        echo "Verifico que estan seteados";

        if(!(isset($body["correo"]))) {
            $respuesta->mensajeCorr = "Correo no encontrado";
            $auxBool = false;
        }

        if(!(isset($body["clave"]))) {
            $respuesta->mensajeClav = "Clave no encontrada";
            $auxBool = false;
        }
        
        if($auxBool == false) {
            return $response->withJson($respuesta,409);
        }
        else {
            $returnResponse = $next($request, $response);
        }
               
        return $returnResponse;
    }

    public static function VerificarVacio ($request, $response, $next) {
        $correo = $request->getParsedBody()["correo"];
        $clave = $request->getParsedBody()["clave"];
        $auxBool = true;
        $returnResponse = $response;
        $respuesta = new stdClass();
        
        echo "Verifico que estan vacios";

        if($correo === "") {
            $respuesta->mensajeCorr = "Correo vacio";
            $auxBool = false;
        }

        if($clave === "") {
            $respuesta->mensajeClav = "Clave vacia";
            $auxBool = false;
        }

        if($auxBool == false) {
            return $response->withJson($respuesta,409);
        }
        else {
            $returnResponse = $next($request, $response);
        }
               
        return $returnResponse;
    }

    public function VerificarPermisosEncargado($request, $response, $next) {
        $returnResponse = $response;
        $respuesta = new stdClass();
        $arrParams = $request->getHeaders()['HTTP_TOKEN'];
        $token = $arrParams[0];
        $user = AutenticadorJWT::ObtenerData($token)->correo;
        //var_dump($user);
        $usuario = Usuario::TraerCorreos($user)[0];
        
        if($usuario != false) {
            if(Usuario::VerificarPermiso($usuario, "encargado")) {
                $returnResponse = $next($request, $response);
            }
            else {
                $respuesta->mensaje = "No es encargado";
                return $response->withJson($respuesta,409);
            }
        }
        else {
            $respuesta->mensaje = "No se encuentra el usuario";
            return $response->withJson($respuesta,409);
        }

        return $returnResponse;
    }

    public static function VerificarPermisosPropietario ($request, $response, $next) {
        $returnResponse = $response;
        $respuesta = new stdClass();
        $arrParams = $request->getHeaders()['HTTP_TOKEN'];
        //var_dump($arrParams); die();
        $user = AutenticadorJWT::ObtenerData($arrParams[0])->correo;
        //var_dump($user);
        $usuario = Usuario::TraerCorreos($user)[0];

        if($usuario != false) {
            if(Usuario::VerificarPermiso($usuario, "propietario") || Usuario::VerificarPermiso($usuario, "encargado")) {
                $returnResponse = $next($request, $response);
            }
            else {
                $respuesta->mensaje = "No es propietario";
                return $response->withJson($respuesta,409);
            }
        }
        else {
            $respuesta->mensaje = "No se encuentra el usuario";
            return $response->withJson($respuesta,409);
        }

        return $returnResponse;
    }

    public function VerificarCorreoYClave($request, $response, $next) {
        $correo = $request->getParsedBody()["correo"];
        $clave = $request->getParsedBody()["clave"];
        $auxBool = true;
        $returnResponse = $response;
        $respuesta = new stdClass();

        $listaCorreo = Usuario::TraerCorreos($correo);
        $listaClaves = Usuario::TraerClaves($clave);
        echo "Verifico que no existan en DB";
        if(count($listaCorreo) <= 0) {
            $respuesta->mensajeCorr = "Correo inexistente";
            $auxBool = false;
        }

        if(count($listaClaves) <= 0) {
            $respuesta->mensajeClav = "Clave inexistente";
            $auxBool = false;
        }

        if($auxBool == false) {
            return $response->withJson($respuesta,409);
        }
        else {
            $returnResponse = $next($request, $response);
        }
               
        return $returnResponse;
    }

    public function VerificarToken($request, $response,$next) {
        $auxResponse = $response;
        $objResponse = new stdClass();
        $objResponse->resultado = "Sesion no cerrada: ";
        $statusResponse = 409;

        try {
            $arrParams = $request->getHeaders()['HTTP_TOKEN'];
            $token = $arrParams[0];
            AutenticadorJWT::VerificarToken($token);
            $auxResponse = $next($request, $response);
        }
        catch (Exception $e) {
            $auxResponse = $response->getBody()->Write($e->getMessage());
        }
    }
}
?>