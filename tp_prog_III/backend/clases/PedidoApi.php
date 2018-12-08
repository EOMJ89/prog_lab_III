<?php
require_once "Pedido.php";
require_once "Mesa.php";
require_once "Detalle.php";
require_once "AutenticadorJWT.php";

class PedidoApi
{
    public static function IngresarPedido($request, $response)
    {
        $datos = $request->getParsedBody(); //Obtengo "codigo","comenzales","cliente","foto" y "pedido"
        
        $tiempoInicio = date('Y/m/d G:i,s');
        $mesa = Mesa::TraerUno($datos['codigo'])[0];
       
        $mesa->estado="con clientes esperando pedido";
        $mesa->canUsos=(int)($mesa->canUsos)+1;
        $mesa->ModificarUno();

        $codigoPedido = Pedido::CrearCodigoPedido();

        $archivos = $request->getUploadedFiles();
        $nombreFinal = "";
        $hayFoto = true;
        if (count($archivos) > 0) {
            $destino = "./fotos/";
            $nombreAnterior = $archivos['foto']->getClientFilename();
            $extension = array_reverse(explode(".", $nombreAnterior))[0];

            $nombreFinal = $datos['codigo']."-{$codigoPedido}.{$extension}";
            $destinoFinal = $destino.$nombreFinal;
            if (file_exists($destinoFinal)) {
                copy($destinoFinal, "./backup/".date("Ymd").$nombreFinal.$extension);
            }

            $archivos['foto']->moveTo($destinoFinal);
        }
        //var_dump($nombreFinal);

        $pedido = new Pedido();
        $pedido->codigo = $codigoPedido;
        $pedido->idMesa = $datos['codigo'];
        $pedido->tiempoInicio = $tiempoInicio;
        $pedido->fotoMesa = $nombreFinal;
        $pedido->cliente = $datos['cliente'];
        $pedido->comenzales = $datos['comenzales'];
        $id = $pedido->CargarUno();
        //var_dump($pedido);
        //var_dump($id);

        $detNombreCantidad = explode(',', $datos['pedido']);
        //var_dump($detNombreCantidad);
        
        foreach ($detNombreCantidad as $detalle) {
            //echo $detalle.'<br>';
            if ($detalle != "") {
                $detDatos = explode(':', $detalle);
                //echo var_dump($detDatos).'<br>';

                $detallePedido = new Detalle();
                $producto = Producto::TraerUno($detDatos[0])[0];
                $detallePedido->idPedido = $codigoPedido;
                $detallePedido->producto = $producto->nombre;
                $detallePedido->cantidad = $detDatos[1];
                $detallePedido->estado = 'pendiente';

                switch ($producto->tipo) {
                    case 'trago':{
                        $detallePedido->sector = 'barra';
                        break;
                    }
                    case 'cerveza':{
                        $detallePedido->sector = 'chopera';
                        break;
                    }
                    case 'postre':{
                        $detallePedido->sector = 'candybar';
                        break;
                    }
                    default:{
                        $detallePedido->sector = 'cocina';
                        break;
                    }
                }
            
                $detallePedido->CargarUno();
            }
        }

        $objResponse = new stdClass();
        $objResponse->idPedido = $id;
        $objResponse->codigoPedido = $codigoPedido;
        $objResponse->respuesta = "pedido_valido";

        return $response->withJson($objResponse, 200);
    }

    public static function TraerPendientesEmpleado($request, $response)
    {
        $objResponse = new stdClass();
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros); die();
        $token = $ArrayDeParametros['token'];

        $payload = AutenticadorJWT::ObtenerData($token);
        //var_dump($payload); die();

        if ($payload->perfil == "socio") {
            $objResponse->lista = Detalle::TraerTodos();
        } else {
            $objResponse->lista = Detalle::TraerPendientes($payload->sector);
        }
        //var_dump($objResponse); die();
        return $response->withJson($objResponse, 200);
    }

    public static function PrepararPedido($request, $response)
    {
        $objResponse = new stdClass();
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros); die();

        $token = $ArrayDeParametros['token'];
        $payload = AutenticadorJWT::ObtenerData($token);
        //var_dump($payload); die();

        $idEmpleado = $payload->idEmpleado;
        $idDetalle = $ArrayDeParametros['idDetalle'];
        $tiempoPreparacion = $ArrayDeParametros['tiempoPreparacion'];
        //echo var_dump($idEmpleado)."<br>";
        //echo var_dump($idDetalle)."<br>";
        //echo var_dump($tiempoPreparacion)."<br>";
        $tiempoInicio = date('Y/m/d G:i');
        //var_dump($tiempoInicio);
        $tiempo = strtotime($tiempoInicio.'+'.$tiempoPreparacion.'minutes');
        //var_dump(date('Y/m/d G:i',$tiempo));

        $detalle = new Detalle();
        $detalle->id = $idDetalle;
        $detalle->idEmpleado = $idEmpleado;
        $detalle->tiempoPreparacion = date('Y/m/d G:i', $tiempo);
        $detalle->estado="en preparacion";
        $objResponse->resultado = $detalle->PrepararDetalle();

        return $response->withJson($objResponse, 200);
    }

    public static function ServirPedido($request, $response)
    {
        $objResponse = new stdClass();
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros); die();
        
        $idDetalle = $ArrayDeParametros['idDetalle'];
        $tiempoServido=date('Y/m/d G:i');
        //var_dump($idDetalle); die();
        $detalle= new Detalle();
        $detalle->id=(int)$idDetalle;
        $detalle->tiempoServido=$tiempoServido;
        //var_dump($detalle); die();
        $resultado =$detalle->ServirDetalle();
        
        if ($resultado) {
            //var_dump($idDetalle); die();
            $lDetalles = Detalle::TraerUno((int)$idDetalle);
            if (count($lDetalles) > 0) {
                $detalle = $lDetalles[0];
                $lPedidos =Pedido::TraerUno($detalle->idPedido);
                
                if (count($lDetalles) > 0) {
                    $pedido = $lPedidos[0];
                    //var_dump($pedido); die();
                    $codigoMesa = $pedido->idMesa;
                    //echo $codigoMesa;

                    $lMesa =Mesa::TraerUno($codigoMesa);
                    if (count($lMesa) >0) {
                        $mesa = $lMesa[0];
                        //var_dump($mesa); die();
                        $mesa->estado = "con clientes comiendo";

                        $objResponse->resultado = $mesa->ModificarUno();
                        $objResponse->mensaje = "Se ha modificado la mesa y el detalle";
                    } else {
                        $objResponse->mensaje = "No se pudo traer Mesa para modificar";
                    }
                } else {
                    $objResponse->mensaje = "No se pudo traer Pedido para modificar mesa";
                }
            } else {
                $objResponse->mensaje = "No se pudo traer Detalle para modificar mesa";
            }
        } else {
            $objResponse->resultado = false;
            $objResponse->mensaje = "No se pudo modificar Detalle";
        }
        return $response->withJson($objResponse, 200);
        //Hacer que la mesa se actualice a comiendo
    }

    public static function TiempoRestante($request, $response)
    {
        $objResponse = new stdClass();
        $ArrayDeParametros = $request->getParsedBody();
        //var_dump($ArrayDeParametros); die();

        $codigoMesa = $ArrayDeParametros['mesa'];
        $codigoPedido = $ArrayDeParametros['pedido'];
        //echo $codigoMesa.'-'.$codigoPedido; die();

        $detalles=Detalle::TraerDetallesPedido($codigoPedido);
        //var_dump($detalles); die();
        $ahora=date('Y/m/d G:i');

        $arrRespuesta = array();

        foreach ($detalles as $detA) {
            //var_dump($detA);
            $detalleRepuesta = new stdClass();

            $detalleRepuesta->idDetalle = $detA->id;
            $detalleRepuesta->producto = $detA->producto;
            if ($detA->estado == 'en preparacion') {
                $tPreparacion = strtotime($detA->tiempoPreparacion);
                $tAhora = strtotime($ahora);
                $tRestante = $tPreparacion-$tAhora;
                $detalleRepuesta->tiempoRestante = date('i:s', $tRestante);
            } elseif ($detA->estado == 'pendiente') {
                $detalleRepuesta->tiempoRestante = "No iniciado";
            } else {
                $detalleRepuesta->tiempoRestante = "Completado";
            }
            
            array_push($arrRespuesta, $detalleRepuesta);
        }

        $objResponse->pedido = $codigoPedido;
        $objResponse->detalles = $arrRespuesta;

        return $response->withJson($objResponse, 200);
    }

    public static function CancelarPedido($request, $response)
    {
        $objResponse=new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        $codigoPedido=$ArrayDeParametros['codigoPedido'];
        $objResponse->resultadoPedido = Pedido::CambiarEstado($codigoPedido, "cancelado");
        $objResponse->resultadoDetalles = Detalle::CancelarDetalles($codigoPedido);
   
        return $response->withJson($objResponse, 200);
    }

    public static function TraerPedidos($request, $response)
    {
        $objResponse = new stdClass();
        $objResponse->lista = Pedido::TraerTodos();

        return $response->withJson($objResponse, 200);
    }

    public static function TraerCancelados($request, $response, $args)
    {
        $respuesta=new stdclass();
        $respuesta= Pedido::PedidosCancelados();
   
        return $response->withJson($respuesta, 200);
    }

    public static function NoEntregadosATiempo($request, $response, $args)
    {
        $respuesta=array();
        $detalles= Detalle::TraerTodos();
        foreach ($detalles as $d) {
            if ($d->estado == 'listo para servir') {
                if (strtotime($d->tiempoServido) > strtotime($d->tiempoPreparacion)) {
                    array_push($respuesta, $d);
                }
            }
        }

        return $response->withJson($respuesta, 200);
    }

    public static function TraerMasVendido($request, $response, $args)
    {
        $lista= Pedido::ObtenerCantidades();
        $masVendido = 0;
        $bool = true;

        foreach ($lista as $pedido) {
            if ($masVendido < $pedido->cantidad || $bool == true) {
                $masVendido = $pedido->cantidad;
            }
            $bool = false;
        }

        $listMasVentido = array();
        foreach ($lista as $pedido) {
            if ($pedido->cantidad == $masVendido) {
                array_push($listMasVentido, $pedido);
            }
        }
        
        return $response->withJson($listMasVentido, 200);
    }

    public static function TraerMenosVendido($request, $response, $args)
    {
        $lista= Pedido::ObtenerCantidades();
        $masVendido = 0;
        $bool = true;

        foreach ($lista as $pedido) {
            if ($masVendido > $pedido->cantidad || $bool == true) {
                $masVendido = $pedido->cantidad;
            }
            $bool = false;
        }

        $listMasVentido = array();
        foreach ($lista as $pedido) {
            if ($pedido->cantidad == $masVendido) {
                array_push($listMasVentido, $pedido);
            }
        }
        
        return $response->withJson($listMasVentido, 200);
    }
}
