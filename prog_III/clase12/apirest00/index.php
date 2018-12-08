<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT as JWT; //Permite el uso de Json Web Tokens
require_once './vendor/autoload.php';
require_once './funciones.php';


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/**¡La primera línea es la más importante! A su vez en el modo de desarrollo para obtener información sobre los
 * errores (sin él, Slim por lo menos registrar los errores por lo que si está utilizando el construido en PHP
 * webserver entonces usted verá en la salida de la consola que es útil).
 * La segunda línea permite al servidor web establecer el encabezado Content-Length,
 * lo que hace que Slim se comporte de manera más predecible.*/

$app = new \Slim\App(["settings" => $config]);

/*$app->get('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("API => ".$request->getMethod());
    return $response;
});

$app->post('[/]', function (Request $request, Response $response) {
    $response->getBody()->write("API => ".$request->getMethod());
    return $response;
});

$app->put('[/]', function (Request $request, Response $response) {
    $response->getBody()->write("API => ".$request->getMethod());    
    return $response;
});

$app->delete('[/]', function (Request $request, Response $response) {
    $response->getBody()->write("API => ".$request->getMethod());
    return $response;
});*/


$app->post('/jwt/CrearToken', \JWTApi::class . '::CrearToken');

$app->post('/jwt/VerificarToken', \JWTApi::class . '::VerificarToken');

$app->post('/jwt/ObtenerPayload', \JWTApi::class . '::ObtenerPayload');

$app->post('/jwt/ObtenerDatos', \JWTApi::class . '::ObtenerDatos');

$app->post('/jwt/CrearTokenMiddleWare', \JWTApi::class . '::CrearToken')->add(\MW::class . '::VerificarClave');

$app->run();