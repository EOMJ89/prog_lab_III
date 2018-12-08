<?php
require_once "Databases.php";
require_once "Usuario.php";

class MW {
    public function VerificarSeteo ($request, $response, $next) {
        $body = $request->getParsedBody();
        $auxBool = true;
        $returnResponse = $response;
        $respuesta = new stdClass();
        
        //echo "Verifico que estén seteados";

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
        
        //echo "Verifico que estén vacios";

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

    public static function VerificarPermisosEncargado ($request, $response, $next) {
        $returnResponse = $response;
        $respuesta = new stdClass();
        $jsonUsuario = json_decode($request->getParsedBody()['usuario']);
        $usuario =new Usuario($jsonUsuario->id, $jsonUsuario->correo, $jsonUsuario->clave, $jsonUsuario->nombre, $jsonUsuario->apellido, $jsonUsuario->perfil);
        $usuario = Usuario::TraerUsuario($usuario);

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

    public static function VerificarPermisosEmpleado ($request, $response, $next) {
        $returnResponse = $response;
        $respuesta = new stdClass();
        $jsonUsuario = json_decode($request->getParsedBody()['usuario']);
        $usuario =new Usuario($jsonUsuario->id, $jsonUsuario->correo, $jsonUsuario->clave, $jsonUsuario->nombre, $jsonUsuario->apellido, $jsonUsuario->perfil);
        $usuario = Usuario::TraerUsuario($usuario);

        if($usuario != false) {
            if(Usuario::VerificarPermiso($usuario, "empleado")) {
                $returnResponse = $next($request, $response);
            }
            else {
                $respuesta->mensaje = "No es empleado";
                return $response->withJson($respuesta,409);
            }
        }
        else {
            $respuesta->mensaje = "No se encuentra el usuario";
            return $response->withJson($respuesta,409);
        }

        return $returnResponse;
    }

    public function VerificarPermisosEncargadoOPropietario($request, $response, $next) {
        $returnResponse = $response;
        $respuesta = new stdClass();
        $jsonUsuario = json_decode($request->getParsedBody()['usuario']);
        $usuario =new Usuario($jsonUsuario->id, $jsonUsuario->correo, $jsonUsuario->clave, $jsonUsuario->nombre, $jsonUsuario->apellido, $jsonUsuario->perfil);
        $usuario = Usuario::TraerUsuario($usuario);

        if($usuario != false) {
            if(Usuario::VerificarPermiso($usuario, "encargado") || Usuario::VerificarPermiso($usuario, "propietario")) {
                $returnResponse = $next($request, $response);
            }
            else {
                $respuesta->mensaje = "No es encargado ni propietario";
                return $response->withJson($respuesta,409);
            }
        }
        else {
            $respuesta->mensaje = "No se encuentra el usuario";
            return $response->withJson($respuesta,409);
        }

        return $returnResponse;
    }
}
?>