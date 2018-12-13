<?php
require_once 'Usuario.php';

class UsuarioApi {
    public static function Agregar($request, $response) {
        $body = $request->getParsedBody();
        $jsonUsuario = json_decode($body['usuario']);
        $archivos = $request->getUploadedFiles();

        $path='';
        if(isset($archivos['foto'])) {
            $destino="fotos/";
            $path = $archivos['foto']->getClientFilename();
            $archivos['foto']->moveTo($destino.$path);
        }

        $auxResponse = new stdClass();
        $usuario =new Usuario(null, $jsonUsuario->correo, $jsonUsuario->clave, $jsonUsuario->nombre, $jsonUsuario->apellido, $jsonUsuario->perfil,$jsonUsuario->legajo, $jsonUsuario->foto);
        $auxResponse->id = $usuario->Insertar();

        return $response->withJson($auxResponse, 200);
    }

    public static function TraerTodos($request, $response) {
        $retorno = Usuario::TraerTodos();
        return $response->withJson($retorno,200);
    }

    public static function TraerUno($request, $response, $args) {
        $body = $request->getParsedBody();
        $correo = $body['correo'];
        $retorno = Usuario::TraerUno($correo);
        return $response->withJson($retorno,200);
    }

    public static function Eliminar($request, $response) {
        $body = $request->getParsedBody();
        $correo = $body['correo'];
        $usuario = new Usuario(null, $correo);

        $auxResponse = new stdClass();
        $auxResponse->ok = $usuario->Borrar();
        return $response->withJson($auxResponse, 200);
    }

    public static function Modificar($request, $response) {
        $body = $request->getParsedBody();
        $jsonUsuario = json_decode($body['usuario']);
        $archivos = $request->getUploadedFiles();

        $path='';
        if(isset($archivos['foto'])) {
            $destino="fotos/";
            $path = $archivos['foto']->getClientFilename();
            $archivos['foto']->moveTo($destino.$path);
        }

        $auxResponse = new stdClass();
        $usuario =new Usuario(null, $jsonUsuario->correo, $jsonUsuario->clave, $jsonUsuario->nombre, $jsonUsuario->apellido, $jsonUsuario->perfil,$jsonUsuario->legajo, $jsonUsuario->foto);
        $userAux = Usuario::TraerUno($jsonUsuario->correo)[0];
        $usuario->id = $userAux->id;
        $auxResponse->modificados = $usuario->Modificar();

        return $response->withJson($auxResponse, 200);
    }
}
?>