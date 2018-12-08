<?php
require_once 'Encuesta.php';
require_once 'Pedido.php';

class EncuestaApi
{
    public static function CargarEncuesta($request, $response)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $datos=$ArrayDeParametros;

        $encuesta = new Encuesta();
        $encuesta->codigoPedido = $datos["codigo"];
        $encuesta->mesaPunt = $datos["mesaPunt"];
        $encuesta->restaurantePunt = $datos["restaurantePunt"];
        $encuesta->mozoPunt = $datos["mozoPunt"];
        $encuesta->cocineroPunt = $datos["cocineroPunt"];
        $encuesta->review = $datos["review"];
        
        $encuesta->id = $encuesta->GuardarUno();
        $objResponse = new stdClass();
        $objResponse->resultado = false;

        if ($encuesta->id != 0) {
            $objResponse->idInsertado = $encuesta->id;
            $objResponse->resultado = true;
        }
            
        return $response->withJson($objResponse, 200);
    }

    public static function TraerEncuesta($request, $response)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $codigoPedido=$ArrayDeParametros['codigoPedido'];
        $lEncuesta = Encuesta::TraerUno($codigoPedido);
        $objResponse = new stdClass();

        $objResponse->ok = false;
        $objResponse->encuesta = null;
        $lPedido = Pedido::TraerUno($codigoPedido);
        if (count($lPedido) > 0) {
            $pedido = $lPedido[0];
                
            if ($pedido->estado == "completado") {
                if (count($lEncuesta) > 0) {
                    $objResponse->encuesta = $lEncuesta[0];
                    $objResponse->ok = true;
                } else {
                    $objResponse->error = "sin-encuesta";
                }
            } else {
                $objResponse->error = "pedido-pendiente";
            }
        } else {
            $objResponse->error = "sin-pedido-coincidente";
        }
   
        return $response->withJson($objResponse, 200);
    }

    public static function MejorEncuesta($request, $response, $args) {
        $respuesta=new stdclass();
        $respuesta= Encuesta::Mejor();
   
        return $response->withJson($respuesta, 200);
    }

    public static function PeorEncuesta($request, $response, $args) {
        $respuesta=new stdclass();
        $respuesta= Encuesta::Peor();
   
        return $response->withJson($respuesta, 200);
    }
}
