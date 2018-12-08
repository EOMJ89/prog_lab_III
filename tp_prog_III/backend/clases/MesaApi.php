<?php
require_once 'Factura.php';
require_once 'Mesa.php';

class MesaAPi
{
    public static function CargarMesa($request, $response)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $codigoMesa=$ArrayDeParametros['codigo'];

        $mesa=new Mesa();
        $mesa->codigo=$codigo;
        $mesa->estado="vacia";
        $mesa->canUsos=0;
        $id=$mesa->CargarUno();
   
        $objResponse = new stdClass();
        if ($id != 0) {
            $objResponse->respuesta = "Se guardo la Mesa.";
        } else {
            $objResponse->respuesta = "NO se guardo la Mesa.";
        }
        $objResponse->ultimoIDInsertado = $id;

        return $response->withJson($objResponse, 200);
    }

    public static function ServirMesa($request, $response)
    {
        $auxResponse = $response;
        $ArrayDeParametros = $request->getParsedBody();
        $codigoMesa=$ArrayDeParametros['codigo'];
        $mesa = Mesa::TraerUno($codigoMesa);

        $objResponse = new stdClass();

        if (!$mesa) {
            $objResponse->error = "No existe mesa";
            $auxResponse = $response->withJson($objResponse, 500);
        } else {
            $mesa->estado="con clientes comiendo";
            $cantModificados = $mesa->ModificarUno();

            if ($cantModificados>0) {
                $objResponse->resultado="La mesa esta comiendo.";
            } else {
                $objResponse->resultado="La mesa NO esta comiendo.";
            }
            $auxResponse = $response->withJson($objResponse, 200);
        }
   
        return $response->withJson($auxResponse, 200);
    }

    public static function CerrarMesa($request, $response)
    {
        $auxResponse = $response;
        $ArrayDeParametros = $request->getParsedBody();
        $codigoMesa=$ArrayDeParametros['codigoMesa'];
        $lMesa = Mesa::TraerUno($codigoMesa);

        $objResponse = new stdClass();
        if (count($lMesa) >0) {
            $mesa = $lMesa[0];
            $mesa->estado="cerrada";
            $cantModificados = $mesa->ModificarUno();

            if ($cantModificados>0) {
                $objResponse->resultado="Se ha cerrado la Mesa.";
            } else {
                $objResponse->resultado="NO se ha cerrado la Mesa.";
            }
            $auxResponse = $response->withJson($objResponse, 200);
        }
        else {
            $objResponse->error = "No existe mesa";
            $auxResponse = $response->withJson($objResponse, 500);
        }
   
        return $response->withJson($auxResponse, 200);
    }

    
    public static function Abrir($request, $response)
    {
        $auxResponse = $response;
        $ArrayDeParametros = $request->getParsedBody();
        $codigoMesa=$ArrayDeParametros['codigoMesa'];
        $lMesa = Mesa::TraerUno($codigoMesa);

        $objResponse = new stdClass();
        if (count($lMesa) >0) {
            $mesa = $lMesa[0];
            $mesa->estado="vacia";
            $cantModificados = $mesa->ModificarUno();

            if ($cantModificados>0) {
                $objResponse->resultado="Se ha abierto la Mesa.";
            } else {
                $objResponse->resultado="NO se ha abierto la Mesa.";
            }
            $auxResponse = $response->withJson($objResponse, 200);
        }
        else {
            $objResponse->error = "No existe mesa";
            $auxResponse = $response->withJson($objResponse, 500);
        }
   
        return $response->withJson($auxResponse, 200);
    }

    public static function CobrarMesa($request, $response)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $codigoMesa=$ArrayDeParametros['codigoMesa'];
        $codigPed=$ArrayDeParametros['codigoPedido'];
        $lMesa = Mesa::TraerUno($codigoMesa);
        
        $objResponse = new stdClass();
        $objResponse->exito = false;

        if (count($lMesa) >0) {
            $mesa = $lMesa[0];
            //var_dump($mesa);
            $pago= (int)($mesa->Facturar($codigPed)['total']);
            //var_dump($pago); die();
            $mesa->estado="con clientes pagando";
            
            if ($mesa->ModificarUno()) {
                $factura= new Factura();
                $factura->importe=$pago;
                $factura->mesa=$mesa->codigo;
                $factura->fecha=date('Y-m-d');
                $factura->codigoPedido = $codigPed;
                $factura->id = $factura->GuardarUno();
                //var_dump($factura); die();
                //Detalle::Cerrar($codigoMesa);

                $lPedido = Pedido::TraerUno($codigPed);
                if (count($lPedido) > 0) {
                    $pedido = $lPedido[0];
                    //var_dump($pedido); die();
                    $pedido->estado = "completado";
                    if ($pedido->ModificarUno()) {
                        $objResponse->factura=$factura;
                        $objResponse->exito = true;
                    } else {
                        $objResponse->resultado="NO se ha modificado el Pedido.";
                    }
                } else {
                    $objResponse->resultado="Se ha modificado la Mesa, el Pedido y enviado la factura.";
                }
            } else {
                $objResponse->resultado="NO se ha modificado la Mesa.";
            }
        } else {
            $objResponse->resultado = "No existe mesa";
        }
  
        return $response->withJson($objResponse, 200);
    }

    public static function TraerMesaVacia($request, $response)
    {
        $lista = Mesa::TraerMesaFiltrada("vacia");
        $objResponse = new stdClass();
        $objResponse->mesa = null;
        
        foreach ($lista as $mesaA) {
            $objResponse->mesa = $mesaA;
            break;
        }
        //var_dump($lista);
        return $response->withJson($objResponse, 200);
    }

    public static function TraerMesas($request, $response)
    {
        $lista = Mesa::TraerTodos();
        $objResponse = new stdClass();
        $objResponse->lista = $lista;
        
        //var_dump($lista);
        return $response->withJson($objResponse, 200);
    }

    public static function MasUtilizada($request, $response, $args)
    {
        $respuesta= Mesa::MasUtilizada();
        return $response->withJson($respuesta, 200);
    }

    public static function MenosUtilizada($request, $response, $args)
    {
        $respuesta= Mesa::MenosUtilizada();
        return $response->withJson($respuesta, 200);
    }
    
    public static function NoSeUso($request, $response, $args)
    {
        $respuesta= Mesa::NoSeUso();
        return $response->withJson($respuesta, 200);
    }
    
    public static function MasFacturo($request, $response, $args)
    {
        $respuesta=new stdclass();
        $lista= Mesa::LaQueMasFacturo();
        $masFacturo = 0;
        $bool = true;
        $listMasFacturo = array();

        //var_dump($lista); die();
        foreach ($lista as $mesa) {

            if((int)$mesa->total != $masFacturo && $bool == false) {
                break;
            }
            else {
                array_push($listMasFacturo, $mesa);
            }

            if ($bool == true) {
                $masFacturo = (int)$mesa->total;
            }
            $bool = false;
        }

        return $response->withJson($listMasFacturo, 200);
    }

    public static function MenosFacturo($request, $response, $args)
    {
        $respuesta=new stdclass();
        $lista= Mesa::LaQueMenosFacturo();
        $menosFacturo = 0;
        $bool = true;
        $listMenosFacturo = array();

        foreach ($lista as $mesa) {

            if((int)$mesa->total != $menosFacturo && $bool == false) {
                break;
            }
            else {
                array_push($listMenosFacturo, $mesa);
            }

            if ($bool == true) {
                $menosFacturo = (int)$mesa->total;
            }
            $bool = false;
        }

        return $response->withJson($listMenosFacturo, 200);
    }

    public static function MenorFactura($request, $response, $args)
    {
        $respuesta=new stdclass();
        $respuesta= Mesa::LaDeMenorImporte();

        return $response->withJson($respuesta, 200);
    }

    public static function MayorFactura($request, $response, $args)
    {
        $respuesta=new stdclass();
        $respuesta= Mesa::LaDeMayorImporte();
   
        return $response->withJson($respuesta, 200);
    }

    public static function FacturadoEntreFechas($request, $response)
    {
        $parametros = $request->getParsedBody();

        //var_dump($parametros); die();
        $mesa = str_replace('/', '-', $parametros['mesa']);
        $desde=str_replace('/', '-', $parametros['desde']);
        $hasta=str_replace('/', '-', $parametros['hasta']);
        $respuesta=new stdclass();

        //echo "{$mesa}\n{$desde}\n{$hasta}\n"; die();
        $respuesta= Mesa::FacturadoDesdeHasta($mesa, $desde, $hasta);
        return $response->withJson($respuesta, 200);
    }
}
