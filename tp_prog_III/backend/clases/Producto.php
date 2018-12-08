<?php
require_once "Databases.php";
require_once 'IApiMetodos.php';

class Producto implements IApiMetodos
{
    public $precio;
    public $nombre;
    public $tipo;

    public function CargarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('INSERT into productos (nombre, precio, tipo) values (:nombre, :precio, :tipo)');

        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $this->precio, PDO::PARAM_INT);
        $consulta->bindValue(':tipo', $this->tipo, PDO::PARAM_STR);

        $consulta->execute();

        return $objAccesoDatos->ReturnLastInserted();
    }
    
    public function BorrarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('DELETE FROM productos WHERE nombre = :nombre');
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);

        $consulta->excute();
        return $consulta->rowCount();
    }

    public function ModificarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE productos SET precio = :precio WHERE nombre = :nombre');

        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $this->precio, PDO::PARAM_INT);

        $consulta->execute();
        return $objAccesoDatos->rowCount();
    }

    public static function TraerTodos()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM productos");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Producto");
    }

    public static function TraerUno($nombre)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM productos WHERE nombre=:nombre");
        $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
        
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Producto");
    }
}
