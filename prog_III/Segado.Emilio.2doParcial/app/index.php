<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './clases/Usuario.php';
require_once './clases/Media.php';
require_once './clases/Ventas.php';
require_once './clases/Middleware.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

/*Alta de Medias*/
$app->post('[/]', function (Request $request, Response $response) {
    /*A nivel de aplicación:
    (POST) Alta de Medias (ID*, color, marca, precio y talle). * ID auto-incremental*/
    $jsonMedia = json_decode($request->getParsedBody()["media"]);
    $media =new Media($jsonMedia->id, $jsonMedia->color, $jsonMedia->marca, $jsonMedia->precio, $jsonMedia->talle);
    Media::Insertar($media);
    
    $response->getBody()->write("Se ha insertado la media.");
    return $response;
});

/*Listado de Medias*/
$app->get('/medias', function (Request $request, Response $response) {    
    /*A nivel de ruta (/medias):
    (GET) Listado de todas las medias (JSON - status 200).*/
    $retorno = Media::TraerTodos();
    $lista = array();
    
    foreach ($retorno as $data) {
        $media =new Media($data->id, $data->color, $data->marca, $data->precio, $data->talle);
        array_push($lista,$media);
    }

    return $response->withJson($lista,200);
});

/*Alta de usuarios*/
$app->post('/usuarios', function (Request $request, Response $response) {
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
    $destino="fotos/";
    $path = $archivos['fotos']->getClientFilename();
    
    $archivos['fotos']->moveTo($destino.$path);
    
    $usuario =new Usuario($jsonUsuario->id, $jsonUsuario->correo, $jsonUsuario->clave, $jsonUsuario->nombre, $jsonUsuario->apellido, $jsonUsuario->perfil, $path);
    Usuario::Insertar($usuario);
    $response->getBody()->write("Se ha insertado el usuario.");
    return $response;
});

/*Listado de Usuarios*/
$app->get('[/]', function (Request $request, Response $response) {    
    /*A nivel de aplicación:
    (GET) Listado de usuarios (JSON - status 200)*/
    $retorno = Usuario::TraerTodos();
    $lista = array();

    foreach ($retorno as $data) {
        $usuario =new Usuario($data->id, $data->correo, $data->clave, $data->nombre, $data->apellido, $data->perfil, $data->foto);
        array_push($lista,$usuario);
    }

    return $response->withJson($lista,200);
});

/*Alta de ventas*/
$app->post('/ventas', function (Request $request, Response $response) {
    /*A nivel de ruta (/ventas):
    (POST) Alta de ventas (ID*, id_usuario, id_media y cantidad). * ID auto-incremental.
    Se ingresa un ID de usuario, un ID de media y la cantidad vendida. (retorna un JSON (con
    mensaje) - status 200, si se pudo insertar o 504 si no se pudo.
    /*{
	"id": 0,
    "id_usuario": 4,
    "id_media":2,
    "cantidad": 5
    }*/
    $body = $request->getParsedBody();
    $jsonVenta = json_decode($body['venta']);
    $jsonReturn = new stdClass();
    $jsonReturn->mensaje="Se ha insertado en la base";
    $statusReturn = 200;

    $venta =new Venta($jsonVenta->id, $jsonVenta->id_usuario, $jsonVenta->id_media, $jsonVenta->cantidad);
    if(!Venta::Insertar($venta)){
        $jsonReturn->mensaje="No se ha posido insertar la venta en la base debido a un error al intentar subirlo";
        $statusReturn = 504;
    }
    return $response->withJson($jsonReturn, $statusReturn);
});

/*Listado de Ventas*/
$app->get('/ventas', function (Request $request, Response $response) {    
    /*A nivel de aplicación:
    (GET) Listado de usuarios (JSON - status 200)*/
    $retorno = Venta::TraerTodos();
    $lista = array();

    foreach ($retorno as $data) {
        $venta =new Venta($data->id, $data->id_usuario, $data->id_media, $data->cantidad);
        array_push($lista,$venta);
    }

    return $response->withJson($lista,200);
});

/*Modificacion de Medias*/
$app->put('[/]', function (Request $request, Response $response) {
    $jsonMedia = json_decode($request->getParsedBody()["mediaMod"]);
    $media =new Media($jsonMedia->id, $jsonMedia->color, $jsonMedia->marca, $jsonMedia->precio, $jsonMedia->talle);
    
    if(Media::Modificar($media)->rowCount() > 0) {
        $response->getBody()->write("Se ha modificado la media");   
    }
    else {
        $response->getBody()->write("NO se ha modificado la media");  
    } 

    //Nota: Va a devolver false si se intenta actualizar con los mismo datos que ya se tenian
    return $response;
})->add(\MW::class."::VerificarPermisosEncargado");

/*Baja de Medias*/
$app->delete('[/]', function (Request $request, Response $response) {
    $idMedia = json_decode($request->getParsedBody()["id_media"]);
    $media =new Media($jsonMedia->idMedia);

    if(Media::Borrar($media)->rowCount() > 0) {
        $response->getBody()->write("Se ha borrado la media");   
    }
    else {
        $response->getBody()->write("NO se ha borrado la media");  
    }
    
    return $response;
})->add(\MW::class.":VerificarPermisosEncargadoOPropietario");

/*Modificacion de Ventas*/
$app->put('/ventas', function (Request $request, Response $response) {
    $id_venta = $request->getParsedBody()["id_venta"];
    $cantidad = $request->getParsedBody()["cantidad"];
    $venta = new Venta($id_venta, null, null, $cantidad);
    if(Venta::Modificar($venta)) {
        $response->getBody()->write("Se ha modificado la venta");   
    }
    else {
        $response->getBody()->write("NO se ha modificado la venta");  
    } 

    //Nota: Va a devolver false si se intenta actualizar con los mismo datos que ya se tenian
    return $response;
})->add(\MW::class."::VerificarPermisosEmpleado");

/*Baja de ventas*/
$app->delete('/ventas', function (Request $request, Response $response) {
    $id_usuario = $request->getParsedBody()["id_usuario"];
    $id_media = $request->getParsedBody()["id_media"];
    $venta = new Venta(null, $id_usuario, $id_media, null);

    if(Venta::Borrar($venta)->rowCount()) {
        $response->getBody()->write("Se ha borrado la venta");   
    }
    else {
        $response->getBody()->write("NO se ha borrado la venta");  
    }

    return $response;
})->add(\MW::class.":VerificarPermisosEmpleado");



$app->run();    