<?php
require_once 'Usuario.php';

class UsuarioApi {
    public static function CargarUsuario($request, $response) {
        /**
         * A nivel de ruta (/usuarios):
         * (POST) Alta de usuario (ID*, correo, clave, nombre, apellido, perfil** y foto).
         * * ID autoincremental.
         * ** propietario, encargado y empleado.
         * La foto guardarla en ./fotos
         * {
         * "id": 0,
         * "correo": "segado@gmail.com",
         * "clave": "segado123",
         * "nombre": "Emilio",
         * "apellido": "Segado",
         * "perfil": "encargado"
         * }*/
        $body = $request->getParsedBody();
        
        $jsonUsuario = json_decode($body['usuario']);
        //var_dump($jsonUsuario); die();
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

    public static function MostrarUsuarios($request, $response) {    
        /*A nivel de aplicación:
        (GET) Listado de usuarios (JSON - status 200)*/
        $retorno = Usuario::TraerTodos();
        $lista = Usuario::ArmarLista($retorno);
    
        return $response->withJson($lista,200);
    }

    
    public static function BorrarUsuario($request, $response) {
        $body = $request->getParsedBody();
        
        $correo =$body['correo'];

        $auxResponse = new stdClass();
        $usuario =new Usuario();
        $auxResponse->ok = $usuario->Borrar($correo);

        return $response->withJson($auxResponse, 200);
    }
}
?>