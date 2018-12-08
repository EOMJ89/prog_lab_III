<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './clases/Usuario.php';
require_once './clases/UsuarioApi.php';
require_once './clases/Media.php';
require_once './clases/MediaApi.php';
require_once './clases/Middleware.php';
require_once './clases/LoginApi.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

/*Alta de Medias*/
$app->post('[/]', \MediaApi::class . '::CargarMedia');

/*Listado de Medias*/
$app->get('/medias', \MediaApi::class .'::MostrarMedias');

/*Alta de usuarios*/
$app->post('/usuarios',\UsuarioApi::class . '::CargarUsuario');

/*Listado de Usuarios*/
$app->get('[/]', \UsuarioApi::class . '::MostrarUsuarios');

$app->group('/login', function() {
    $this->post('/',\LoginApi::class . '::Ingresar')->add(\MW::class . '::VerificarCorreoYClave')->add(\MW::class . '::VerificarVacio')->add(\MW::class . ':VerificarSeteo');
    $this->get('/',\LoginApi::class . '::Verificar');
});

/*Modificacion de Medias*/
$app->put('[/]', \MediaApi::class.'::ModificarMedia')->add(\MW::class.":VerificarPermisosEncargado");

/*Baja de Medias*/
$app->delete('[/]', \MediaApi::class.'::BorrarMedia')->add(\MW::class."::VerificarPermisosPropietario");

$app->run();