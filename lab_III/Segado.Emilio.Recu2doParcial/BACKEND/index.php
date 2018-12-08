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

$app->group('/JWT', function() {
    $this->post('/Crear',\LoginApi::class . '::Ingresar');
    $this->get('/Verificar',\LoginApi::class . '::Verificar');
});

$app->group('/Usuarios', function () {
    $this->post('/',\UsuarioApi::class . '::CargarUsuario');
    $this->get('/', \UsuarioApi::class . '::MostrarUsuarios');
    $this->Delete('/Borrar', \UsuarioApi::class . '::BorrarUsuario');
});

$app->run();