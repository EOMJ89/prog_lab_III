<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './clases/AutenticadorJWT.php';
require_once './clases/Usuario.php';
require_once './clases/LoginApi.php';
require_once './clases/UsuarioApi.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->group('/Sesion', function() {
    $this->post('/Login', \LoginApi::class . '::Iniciar');
    $this->get('/Verificar', \LoginApi::class . '::Verificar');
});

$app->group('/Usuarios', function () {
    $this->post('/', \UsuarioApi::class . '::Agregar');
    $this->get('/TraerTodos', \UsuarioApi::class . '::TraerTodos');
    $this->get('/TraerUno/{id}', \UsuarioApi::class . '::TraerUno');
    $this->post('/Modificar', \UsuarioApi::class . '::Modificar');
    $this->delete('/Eliminar', \UsuarioApi::class . '::Eliminar');
});

$app->run();