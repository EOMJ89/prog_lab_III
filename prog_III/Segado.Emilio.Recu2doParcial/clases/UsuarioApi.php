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
    
        $archivos = $request->getUploadedFiles();
        $path='';

        if(isset($archivos['fotos'])) {
            $destino="fotos/";
            $path = $archivos['fotos']->getClientFilename();
        
            $archivos['fotos']->moveTo($destino.$path);
        }

        $usuario =new Usuario(null, $jsonUsuario->correo, $jsonUsuario->clave, $jsonUsuario->nombre, $jsonUsuario->apellido, $jsonUsuario->perfil, $path);
        $id = Usuario::Insertar($usuario);
        $response->getBody()->write("Se ha insertado el usuario con el id {$id}.");
        return $response;
    }

    public static function MostrarUsuarios($request, $response) {    
        /*A nivel de aplicación:
        (GET) Listado de usuarios (JSON - status 200)*/
        $retorno = Usuario::TraerTodos();
        $lista = Usuario::ArmarLista($retorno);
    
        return $response->withJson($lista,200);
    }
}
?>