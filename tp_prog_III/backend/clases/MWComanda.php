<?php
require_once "AutenticadorJWT.php";

class MWComanda
{
    public static function VerificarSocio($request, $response, $next)
    {
        $auxResponse = $response;
        $objResponse= new stdclass();
        $objResponse->respuesta="";
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros['token'];

        $payload=AutenticadorJWT::ObtenerData($token);
        if ($payload->perfil=="socio") {
            $auxResponse = $next($request, $response);
        } else {
            $objResponse->respuesta ="no es socio";
            $auxResponse = $auxResponse->withJson($objResponse, 200);
        }
        return $auxResponse;
    }

    public static function VerificarMozo($request, $response, $next)
    {
        $auxResponse = $response;
        $objResponse= new stdclass();
        $objResponse->respuesta="";
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros['token'];

        $payload=AutenticadorJWT::ObtenerData($token);
        if ($payload->perfil=="mozo" || $payload->perfil=="socio") {
            $auxResponse = $next($request, $response);
        } else {
            $objResponse->respuesta ="no es mozo";
            $auxResponse = $auxResponse->withJson($objResponse, 200);
        }
        return $auxResponse;
    }

    public static function VerificarSuspendido($request, $response, $next)
    {
        $auxResponse = $response;
        $objResponse= new stdclass();
        $objResponse->respuesta="";
        $ArrayDeParametros = $request->getParsedBody();
        $token = $ArrayDeParametros['token'];
        //var_dump($ArrayDeParametros); die();

        $payload=AutenticadorJWT::ObtenerData($token);
        if ($payload->estado!="suspendido") {
            $auxResponse = $next($request, $response);
        } else {
            $objResponse->respuesta ="non-activo";
            $auxResponse = $auxResponse->withJson($objResponse, 200);
        }
        return $auxResponse;
    }
}
