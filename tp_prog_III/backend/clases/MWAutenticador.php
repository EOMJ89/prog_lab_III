<?php
require_once "AutenticadorJWT.php";

class MWAutenticador
{
    public function VerificarUsuario($request, $response, $next)
    {
        $auxResponse = $response;
        $objResponse= new stdclass();
        $objResponse->respuesta="";
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros);die();
        $token=$ArrayDeParametros['token'];

        //$token = str_replace('"','',$token);
        //echo $token; die();
       
        if ($request->isGet()) {
            $auxResponse = $next($request, $response);
        } else {
            try {
                AutenticadorJWT::VerificarToken($token);
                $objResponse->valido=true;
            } catch (Exception $e) {
                $objResponse->excepcion = $e->getMessage();
                $objResponse->valido = false;
            }

            if ($objResponse->valido) {
                if ($request->isPost()) {
                    //Se usa para todos los logeados
                    $auxResponse = $next($request, $response);
                } else {
                    $payload=AutenticadorJWT::ObtenerData($token);

                    //Se usa para DELETE y PUT todos los logeados y admin
                    if ($payload->perfil=="admin") {
                        $auxResponse = $next($request, $response);
                    } else {
                        $objResponse->respuesta="Solo administradores";
                    }
                }
            } else {
                $objResponse->respuesta="Solo usuarios registrados";
                $objResponse->token=$token;
            }
        }

        if ($objResponse->respuesta!="") {
            $auxResponse=$auxResponse->withJson($objResponse, 401);
        }

        return $auxResponse;
    }
}
