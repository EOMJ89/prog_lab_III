<?php
require_once "Databases.php";
require_once 'IApiMetodos.php';

class Pedido implements IApiMetodos
{
    public $id;
    public $codigo;
    public $idMesa;
    public $tiempoInicio;
    public $fotoMesa;
    public $cliente;
    public $comenzales;
    public $estado;

    public function CargarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('INSERT into pedidos (codigo, idMesa, tiempoInicio, fotoMesa, cliente, comenzales, estado) VALUES
        (:codigo, :idMesa, :tiempoInicio, :fotoMesa, :cliente, :comenzales, :estado)');

        $consulta->bindValue(':codigo', $this->codigo, PDO::PARAM_STR);
        $consulta->bindValue(':idMesa', $this->idMesa, PDO::PARAM_STR);
        $consulta->bindValue(':tiempoInicio', $this->tiempoInicio, PDO::PARAM_STR);
        $consulta->bindValue(':fotoMesa', $this->fotoMesa, PDO::PARAM_STR);
        $consulta->bindValue(':cliente', $this->cliente, PDO::PARAM_STR);
        $consulta->bindValue(':comenzales', $this->comenzales, PDO::PARAM_INT);
        $consulta->bindValue(':estado', "pendiente", PDO::PARAM_STR);
        $consulta->execute();
        return $objAccesoDatos->ReturnLastInserted();
    }
    
    public function BorrarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('DELETE from pedidos WHERE codigo=:codigo');

        $consulta->bindValue(':codigo', $this->codigo, PDO::PARAM_STR);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public function ModificarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE pedidos SET idMesa = :idMesa, tiempoInicio = :tiempoInicio, fotoMesa = :fotoMesa, cliente = :cliente, comenzales = :comenzales, estado = :estado WHERE codigo = :codigo');

        $consulta->bindValue(':idMesa', $this->idMesa, PDO::PARAM_STR);
        $consulta->bindValue(':tiempoInicio', $this->tiempoInicio, PDO::PARAM_STR);
        $consulta->bindValue(':fotoMesa', $this->fotoMesa, PDO::PARAM_STR);
        $consulta->bindValue(':cliente', $this->cliente, PDO::PARAM_STR);
        $consulta->bindValue(':comenzales', $this->comenzales, PDO::PARAM_INT);
        $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
        $consulta->bindValue(':codigo', $this->codigo, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados

    }

    public static function TraerTodos()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM pedidos");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Pedido");
    }

    public static function TraerUno($codigoPedido)
    {
        //echo $codigo;
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM pedidos WHERE codigo = :codigo");
        $consulta->bindValue(':codigo', $codigoPedido, PDO::PARAM_STR);
        
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, 'Pedido');
    }

    public static function CrearCodigoPedido()
    {
        $strCaracteres = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVXYZ";
        $auxReturn = "";

        for ($i=0;$i<5;$i++) {
            $auxReturn .= $strCaracteres[rand(0, strlen($strCaracteres)-1)];
        }

        return $auxReturn;
    }

    public static function CambiarEstado($codigoPedido, $estado)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE pedidos SET estado = :estado WHERE codigo=:codigo');

        $consulta->bindValue(':codigo', $codigoPedido, PDO::PARAM_STR);
        $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public static function PedidosCancelados()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT idPedido, producto, cantidad, estado from pedidoDetalle where estado='cancelado'");
        
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS);
    }

    public static function ObtenerCantidades()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT producto, SUM(pedidoDetalle.cantidad) AS cantidad FROM pedidoDetalle GROUP BY producto ORDER BY cantidad ASC");
        $consulta->execute();
        $pedidos= $consulta->fetchAll(PDO::FETCH_CLASS);
            
        return $pedidos;
    }
}
