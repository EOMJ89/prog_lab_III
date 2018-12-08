<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT as JWT; //Permite el uso de Json Web Tokens

class JWTApi {
    public static function CrearToken(Request $request, Response $response) {
        $arrParametros = $request->getParsedBody();
        $datos = json_decode($arrParametros['datos']);
        //var_dump(json_decode($datos));

        $payload = array(
            'data' => $datos,
            'app' => "API REST Clase 12"
        );
    
        $token = JWT::encode($payload, "0mb4ussb");
        
        return $response->withJson($token, 200);
    }

    public static function VerificarToken(Request $request, Response $response) {
        $arrParametros = $request->getParsedBody();
        $token = $arrParametros['token'];
        
        $reponseJson = new stdClass();
        $reponseJson->ok = false;
        $responseStatus = 500;
    
        if(empty($token) || $token === "") {
            //throw new Exception("Token vacio");
            $reponseJson->mensaje = "Token Vacio";
        }
        else {
            try {
                $decifrado = JWT::decode($token, "0mb4ussb", ['HS256']);    
                $reponseJson->mensaje="Token Valido";
                $reponseJson->ok = true;
                $responseStatus = 200;        
            }
            catch (Exception $e) {
                //throw new Exception("Error: ".$e->getMessage());
                $reponseJson->mensaje = $e->getMessage();
            }
        }
    
        return $response->withJson($reponseJson, $responseStatus);
    }

    public static function ObtenerPayload(Request $request, Response $response) {
        $arrParametros = $request->getParsedBody();
        $token = $arrParametros['token'];
        $reponseJson = new stdClass();
        $reponseJson->ok = false;
        $responseStatus = 500;
    
        if(empty($token) || $token === "") {
            //throw new Exception("Token vacio");
            $reponseJson->mensaje = "Token Vacio";
        }
        else {
            try {
                $decifrado = JWT::decode($token, "0mb4ussb", ['HS256']);
                $reponseJson->mensaje=$decifrado;
                $reponseJson->ok = true;
                $responseStatus = 200;        
            }
            catch (Exception $e) {
                //throw new Exception("Error: ".$e->getMessage());
                $reponseJson->mensaje = $e->getMessage();
            }
        }
    
        return $response->withJson($reponseJson, $responseStatus);
    }

    public static function ObtenerDatos(Request $request, Response $response) {
        $arrParametros = $request->getParsedBody();
        $token = $arrParametros['token'];
        $reponseJson = new stdClass();
        $reponseJson->ok = false;
        $responseStatus = 500;
    
        if(empty($token) || $token === "") {
            //throw new Exception("Token vacio");
            $reponseJson->mensaje = "Token Vacio";
        }
        else {
            try {
                $decifrado = JWT::decode($token, "0mb4ussb", ['HS256']);
                $reponseJson->mensaje=$decifrado->data;
                $reponseJson->ok = true;
                $responseStatus = 200;        
            }
            catch (Exception $e) {
                //throw new Exception("Error: ".$e->getMessage());
                $reponseJson->mensaje = $e->getMessage();
            }
        }
    
        return $response->withJson($reponseJson, $responseStatus);
    }
}

class MW {
    public static function VerificarClave(Request $request, Response $response, $next) {
        $auxReponse = $response;
        $arrParametros = $request->getParsedBody();

        if($datos = json_decode($arrParametros['datos'])) {
            if(!(isset($datos->user)) || !(isset($datos->role)) || !(isset($datos->state))) {
                $auxReponse->getBody()->write("Error: Ingrese user, role y state");                
            }
            else {
                $auxReponse = $next($request, $response);
            }
        }
        else {
            $auxReponse->getBody()->write("Error: Ingrese un json con user, role y state");
        }

        return $auxReponse;
    }
}

?>