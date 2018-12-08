<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*
¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);


$app->get('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("GET => Bienvenido!!! a SlimFramework");
    return $response;

});
$app->post('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("POST => Bienvenido!!! a SlimFramework");
    return $response;

});
$app->put('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("PUT => Bienvenido!!! a SlimFramework");
    return $response;

});
$app->delete('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("DELETE => Bienvenido!!! a SlimFramework");
    return $response;

});


/*
COMPLETAR POST, PUT Y DELETE
*/


$app->get('/saludar[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("Hola mundo SlimFramework!!!");
    return $response;

});
//ruteo para los verbos
//este entra solo si ingreso a /todos
$app->any('/todos', function (Request $request, Response $response ) {  
    var_dump($request->getMethod());  
    $response->getBody()->write("Hola muestro en todos los verbos!!! " );
    return $response;

});

//este entra solo si accedo a /todos/
$app->any('/todos/[{id}]', function (Request $request, Response $response , $args) {  
    if(isset($args["id"]))
    { 
        $nombre=$args["id"];
        $response->getBody()->write("Hola muestro en todos los verbos!!! ". $nombre );
    }
    else
    {
        $response->getBody()->write("no se setio el paramatro ");
    }
    var_dump($request->getMethod());  
    return $response;

});

$app->group('/usuarios', function(){ 
    $this->get('/',function(Request $request, Response $response ) {
        $array[0] = array("nombre"=>"jose","apellido"=>"martinez","id"=>1);
        $array[1] = array("nombre"=>"nicolas","apellido"=>"pepe","id"=>2);
        $array[2] = array("nombre"=>"holanda","apellido"=>"mafalda","id"=>3);
        //el whiJson devuelve la respuesta en formato JSON y lleva 2 param , uno el array o el objeto y el otro el status de la respuesta(200) todo esta OK//
       // $response->withJson($array,200);
        return $response->withJson($array,200);
    });

    $this->get('/{id}',function(Request $request, Response $response, $args) {
        $rtn="";
        if($args["id"]==0)
        {
            $valor = array("mensaje"=>"error");
            $rtn= $response->withJson($valor,404);
        }
        else
        {
            $array[0] = array("nombre"=>"jose","apellido"=>"martinez","id"=>$args["id"]);
            $rtn= $response->withJson($array[0],200);
        }
        return $rtn;
                   
    });

    $this->put('/',function(Request $request, Response $response) {
        //devuelve un array asociativo con los valores que tenga en el cuerpo de la peticion(getparsedBdoy)//
        $array= $request->getParsedBody();
        $objStandar = json_decode($array["cadenaJson"]);
        var_dump($objStandar);
        return $objStandar;
    });
});

/*
MAS CODIGO AQUI...
*/
$app->run();