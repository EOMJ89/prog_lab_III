<?php
require_once "Databases.php";

class Encuesta
{
    public $id;
    public $codigoPedido;
    public $mesaPunt;
    public $restaurantePunt;
    public $mozoPunt;
    public $cocineroPunt;
    public $review;
    
    public function GuardarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("INSERT into encuestas (codigoPedido, mesaPunt, restaurantePunt, mozoPunt, cocineroPunt, review) VALUES (:codigoPedido, :mesaPunt, :restaurantePunt, :mozoPunt, :cocineroPunt, :review)");

        $consulta->bindValue(':codigoPedido', $this->codigoPedido, PDO::PARAM_STR);
        $consulta->bindValue(':mesaPunt', $this->mesaPunt, PDO::PARAM_INT);
        $consulta->bindValue(':restaurantePunt', $this->restaurantePunt, PDO::PARAM_INT);
        $consulta->bindValue(':mozoPunt', $this->mozoPunt, PDO::PARAM_INT);
        $consulta->bindValue(':cocineroPunt', $this->cocineroPunt, PDO::PARAM_INT);
        $consulta->bindValue(':review', $this->review, PDO::PARAM_INT);
        $consulta->execute();
        return $objAccesoDatos->ReturnLastInserted();
    }
    
    public static function TraerUno($codigo)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM encuestas WHERE codigoPedido = :codigoPedido");

        $consulta->bindValue(':codigoPedido', $codigo, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, 'Encuesta');
    }

    public static function TraerTodos()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM encuestas");

        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, 'Encuesta');
    }

    public static function Mejor()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * from encuestas where restaurantePunt = (SELECT MAX(restaurantePunt) from encuestas)");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, 'Encuesta');
    }

    public static function Peor() {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * from encuestas where restaurantePunt = (SELECT MIN(restaurantePunt) from encuestas)");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, 'Encuesta');
    }
}
