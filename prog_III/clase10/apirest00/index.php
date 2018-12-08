<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once './usuario.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/**¡La primera línea es la más importante! A su vez en el modo de desarrollo para obtener información sobre los
 * errores (sin él, Slim por lo menos registrar los errores por lo que si está utilizando el construido en PHP
 * webserver entonces usted verá en la salida de la consola que es útil).
 * La segunda línea permite al servidor web establecer el encabezado Content-Length,
 * lo que hace que Slim se comporte de manera más predecible.*/

$app = new \Slim\App(["settings" => $config]);

$app->get('[/]', function (Request $request, Response $response) {    
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
});

/**Middleware
 * Usando una variable*/
$mwUno = function ($request, $response, $next) {
    $response->getBody()->write("1.- Me ejecuto ANTES de la app<br>");
    $response = $next($request, $response);
    $response->getBody()->write("<br>Y 1.- me ejecuto DESPUES de la app");
    return $response;
};
//$app->add($mwUno);

$mwDos = function ($request, $response, $next) {
    $response->getBody()->write("2.- Me ejecuto ANTES del verbo de Ruta<br>");
    $response = $next($request, $response);
    $response->getBody()->write("<br>Y 2.- me ejecuto DESPUES del verbo de Ruta");
    return $response;
};

$mwTres = function ($request, $response, $next) {
    $response->getBody()->write("3.- Me ejecuto ANTES del verbo de Grupo<br>");
    $response = $next($request, $response);
    $response->getBody()->write("<br>Y 3.- me ejecuto DESPUES del verbo de Grupo");
    return $response;
};

/**Añadiendo directamente a la variable de la aplicación
 * $app->add(function ($request, $response, $next) {
 * $response->getBody()->write("Me ejecuto ANTES del verbo");
 * $response = $next($request, $response);
 * $response->getBody()->write("Me ejecuto DESPUES del verbo");
 * return $response;
 *});*/

/**Se ejecutan de acuerdo a su cercania a la definicion del verbo, regularmente el mas alejado es el que esta a nivel
 * de aplicacion*/

$app->get('/ruta', function (Request $request, Response $response) {    
    $response->getBody()->write("Grupo => ".$request->getMethod());
    return $response;
})->add($mwDos);

$app->delete('/ruta', function (Request $request, Response $response) {    
    $response->getBody()->write("Grupo => Ruta => ".$request->getMethod());
    return $response;
})->add($mwDos);

$app->group('/grupo', function(){
    /**Al ser parte de otro scope, la funcion requiere estar dentro del grupo para poder ser visible por los miembros
     * de este*/
    $mwCuatro = function ($request, $response, $next) {
        $response->getBody()->write("4.- Me ejecuto ANTES del verbo de Grupo en Ruta<br>");
        $response = $next($request, $response);
        $response->getBody()->write("<br>Y 4.- me ejecuto DESPUES del verbo de Grupo Ruta");
        return $response;
    };

    $this->get('/', function (Request $request, Response $response) {    
        $response->getBody()->write("Grupo => ".$request->getMethod());
        return $response;
    });
    
    $this->post('/', function (Request $request, Response $response) {    
        $response->getBody()->write("Grupo => ".$request->getMethod());
        return $response;
    });

    $this->get('/ruta', function (Request $request, Response $response) {    
        $response->getBody()->write("Grupo => Ruta => ".$request->getMethod());
        return $response;
    })->add($mwCuatro)->add(function ($request, $response, $next) {
        $response->getBody()->write("5.- Me ejecuto ANTES del Grupo en Ruta pero antes del 4<br>");
        $response = $next($request, $response);
        $response->getBody()->write("<br>Y 5.- Me ejecuto DESPUES del Grupo en Ruta pero despues del 4");
        return $response;
    });
})->add($mwTres);


$app->group('/credenciales', function(){
    $this->get('/', function (Request $request, Response $response) {    
        $response->getBody()->write("Credenciales => ".$request->getMethod());
        return $response;
    });
    
    $this->post('/', function (Request $request, Response $response) {    
        $response->getBody()->write("Credenciales => ".$request->getMethod());
        return $response;
    });
})->add(function ($request, $response, $next) {
        if ($request->isGet()) {
            $response = $next($request, $response);
        }
        else if($request->isPost()) {
            /*El usuario string es {"nombre":"jose","apellido":"martinez","administrador":"true"}*/
            $array= $request->getParsedBody();
            $usuarioObj = json_decode($array["usuario"]);

            if(!($usuarioObj->administrador === "true")) {
                $response->getBody()->write("<h2>Usuario ".$usuarioObj->usuario." no valido</h2>");
            }
            else {
                $response->getBody()->write("<h3>Bienvenido, ".$usuarioObj->usuario."</h3>");
                $response = $next($request, $response);
            }
        }
        
        return $response;
});

$app->group('/credenciales/POO', function(){
    $this->get('/', function (Request $request, Response $response) {    
        $response->getBody()->write("Credenciales => ".$request->getMethod());
        return $response;
    });
    
    $this->post('/', function (Request $request, Response $response) {    
        $response->getBody()->write("Credenciales => ".$request->getMethod());
        return $response;
    });
})->add(\Usuario::class.":Verificar");


$app->group('/credenciales/POO/PDO', function(){
    $this->get('/', function (Request $request, Response $response) {    
        $auxLista = Usuario::TraerTabla();
        $response->getBody()->write("<h2>Listado</h2><br>".$auxLista);
        return $response;
    });
    
    $this->post('/', function (Request $request, Response $response) {    
        $auxLista = Usuario::TraerTabla();
        $response->getBody()->write("<h2>Listado</h2><br>".$auxLista);
        return $response;
    });

    $this->delete('/', function (Request $request, Response $response) {    
        $auxID = $request->getParsedBody()["id"];

        if(Usuario::EliminarUsuario($auxID)){
            $mensaje = "<br>Se ha eliminado al usuario con id ".$auxID;
        }
        else {
            $mensaje = "<br>No se ha eliminado al usuario con id ".$auxID;
        }
        $response->getBody()->write($mensaje."<br>");

        $auxLista = Usuario::TraerTabla();
        $response->getBody()->write("<h2>Listado</h2><br>".$auxLista);
        return $response;
    });

    $this->put('/', function (Request $request, Response $response) {
        $userMod = json_decode($request->getParsedBody()["usuarioMod"]);

        if(Usuario::ModificarUsuario($userMod)){
            $mensaje = "<br>Se ha modificado al usuario con id ".$userMod->id;
        }
        else {
            $mensaje = "<br>No se ha modificado al usuario con id ".$userMod->id;
        }
        $response->getBody()->write($mensaje."<br>");

        $auxLista = Usuario::TraerTabla();
        $response->getBody()->write("<h2>Listado</h2><br>".$auxLista);

        return $response;
    });

})->add(\Usuario::class.":VerificarPDO");
$app->run();