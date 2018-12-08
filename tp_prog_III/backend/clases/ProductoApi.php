<?php
require_once "Producto.php";

class ProductoApi {
    public static function TraerProducto($request, $response, $args)
    {
        $auxReponse = $response;

        //var_dump($args); die();
        $nombre=$args['nombre'];
        $producto = Producto::TraerUno($nombre);

        if ($producto == null) { //Aka $empleado != null
            $objResponse= new stdclass();
            $objResponse->error="No existe el producto";
            $auxReponse = $response->withJson($objResponse, 500);
        } else {
            $auxReponse = $response->withJson($producto, 200);
        }

        return $auxReponse;
    }
    
    public static function TraerTodosLosProductos($request, $response)
    {
        $listaProductos=Producto::TraerTodos();
    
        return $response->withJson($listaProductos, 200);
    }
}