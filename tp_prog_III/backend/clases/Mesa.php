<?php
require_once "Databases.php";
require_once 'IApiMetodos.php';
require_once 'Factura.php';

class Mesa implements IApiMetodos
{
    public $id;
    public $codigo;
    public $canUsos;
    public $estado;

    public function CargarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('INSERT into mesas (estado, canUsos, codigo) VALUES (:estado, :canUsos, :codigo)');

        $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
        $consulta->bindValue(':canUsos', $this->canUsos, PDO::PARAM_INT);
        $consulta->bindValue(':codigo', $this->codigo, PDO::PARAM_STR);

        $consulta->execute();
        return $objAccesoDatos->ReturnLastInserted();
    }

    public function ModificarUno()
    {
        //echo "{$this->estado}-{$this->canUsos}-{$this->codigo}"; die();
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE mesas SET estado=:estado, canUsos=:canUsos WHERE codigo=:codigo');
         
        $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
        $consulta->bindValue(':canUsos', $this->canUsos, PDO::PARAM_INT);
        $consulta->bindValue(':codigo', $this->codigo, PDO::PARAM_STR);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public function BorrarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('DELETE from mesas WHERE codigo=:codigo');

        $consulta->bindValue(':codigo', $this->codigo, PDO::PARAM_STR);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public static function TraerUno($codigoMesa)
    {
        //echo $codigoMesa."Dentro de funcion";
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM mesas WHERE codigo=:codigo");
        $consulta->bindValue(':codigo', $codigoMesa, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Mesa");
    }
    
    public static function TraerTodos()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM mesas");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Mesa");
    }

    public static function TraerMesaFiltrada($estadoMesa)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM mesas WHERE estado=:estado");
        $consulta->bindValue(':estado', $estadoMesa, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Mesa");
    }

    public function Facturar($cod)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT SUM(det.cantidad * prod.precio) AS total FROM pedidoDetalle AS det, productos AS prod WHERE prod.nombre = det.producto AND det.idPedido = :codigoPedido");
        $consulta->bindValue(':codigoPedido', $cod, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->fetch();
    }

    public static function MasUtilizada()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM mesas WHERE canUsos=(SELECT MAX(canUsos) FROM mesas WHERE 1) ");
        
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Mesa");
    }

    public static function NoSeUso()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * from mesas WHERE canUsos=0");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Mesa");
    }

    public static function MenosUtilizada()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM mesas WHERE canUsos=(SELECT MIN(canUsos) FROM mesas WHERE canUsos!=0) ");
        
        $consulta->execute();       
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Mesa");
    }
    

    public static function LaQueMasFacturo()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT f.codigoMesa, sum(f.importe) total FROM factura as f GROUP by f.codigoMesa ORDER BY total DESC");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS);
    }

    public static function LaQueMenosFacturo()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT f.codigoMesa, sum(f.importe) total FROM factura as f GROUP by f.codigoMesa ORDER BY total ASC");
        $consulta->execute();
        $mesa=$consulta->fetchAll(PDO::FETCH_CLASS);
    
        return $mesa;
    }

    public static function LaDeMenorImporte()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT f.codigoMesa, f.importe as total from factura as f where f.importe = (SELECT MIN(importe) from factura)");
        $consulta->execute();
        $mesa=$consulta->fetchAll(PDO::FETCH_CLASS);

        return $mesa;
    }

    public static function LaDeMayorImporte()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT f.codigoMesa, f.importe as total from factura as f where f.importe = (SELECT MAX(importe) from factura)");
        $consulta->execute();
        $mesa=$consulta->fetchAll(PDO::FETCH_CLASS);

        return $mesa;
    }

    public static function FacturadoDesdeHasta($mesa, $desde, $hasta)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT SUM(f.importe) as total FROM factura as f WHERE f.codigoMesa = :mesa AND f.fecha <= :hasta AND f.fecha >= :desde");
        $consulta->bindValue(':mesa', $mesa, PDO::PARAM_INT);
        $consulta->bindValue(':desde', $desde, PDO::PARAM_STR);
        $consulta->bindValue(':hasta', $hasta, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS);
    }
}
