<?php
require_once "Databases.php";
require_once 'IApiMetodos.php';

class Detalle implements IApiMetodos
{
    public $id;
    public $idPedido;
    public $producto;
    public $cantidad;
    public $idEmpleado;
    public $tiempoPreparacion;
    public $tiempoServido;
    public $sector;
    public $estado;

    public function CargarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('INSERT into pedidoDetalle (idPedido, producto, cantidad, sector, estado) VALUES (:idPedido, :producto, :cantidad, :sector, :estado)');

        $consulta->bindValue(':idPedido', $this->idPedido, PDO::PARAM_STR);
        $consulta->bindValue(':producto', $this->producto, PDO::PARAM_STR);
        $consulta->bindValue(':cantidad', $this->cantidad, PDO::PARAM_INT);
        $consulta->bindValue(':sector', $this->sector, PDO::PARAM_STR);
        $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
        
        $consulta->execute();
        return $objAccesoDatos->ReturnLastInserted();
    }

    public function BorrarUno()
    {
        throw new Exception("No implementado");
    }

    public function ModificarUno()
    {
        throw new Exception("No implementado");
    }

    public static function TraerTodos()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('SELECT * FROM pedidoDetalle');
        $consulta->execute();
     
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Detalle");
    }

    public static function TraerUno($id)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('SELECT * FROM pedidoDetalle WHERE id = :id');
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
     
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Detalle");
    }

    public static function TraerPendientes($sector)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('SELECT * FROM pedidoDetalle WHERE sector=:sector AND (estado = "pendiente" OR estado = "en preparacion")');
        $consulta->bindValue(':sector', $sector, PDO::PARAM_STR);
        $consulta->execute();
     
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Detalle");
    }

    public function PrepararDetalle()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("UPDATE pedidoDetalle SET idEmpleado = :idEmpleado, tiempoPreparacion = :tiempoPreparacion, estado = :estado WHERE id=:id");
        
        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
        $consulta->bindValue(':idEmpleado', $this->idEmpleado, PDO::PARAM_INT);
        $consulta->bindValue(':tiempoPreparacion', $this->tiempoPreparacion, PDO::PARAM_STR);
        $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public function ServirDetalle()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("UPDATE pedidoDetalle SET tiempoServido = :tiempoServido, estado = :estado WHERE id=:id");

        $consulta->bindValue(':tiempoServido', $this->tiempoServido, PDO::PARAM_STR);
        $consulta->bindValue(':estado', "listo para servir", PDO::PARAM_STR);
        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }
    
    public static function TraerDetallesPedido($codigoPedido)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('SELECT * FROM pedidoDetalle WHERE idPedido=:codigo');
        $consulta->bindValue(':codigo', $codigoPedido, PDO::PARAM_STR);
        $consulta->execute();
     
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Detalle");
    }
    
    public static function CancelarDetalles($codigoPedido)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE pedidoDetalle SET estado = "cancelado" WHERE idPedido=:idPedido');

        $consulta->bindValue(':idPedido', $codigoPedido, PDO::PARAM_INT);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }
}
