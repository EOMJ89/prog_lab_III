<?php
require_once "Databases.php";
require_once "DBMethods.php";

class Media implements DBMethods{
    public $id;
    public $color;
    public $marca;
    public $precio;
    public $talle;

    public function __construct($id = null, $color = null, $marca = null, $precio = null, $talle = null) {
        $this->id = $id;
        $this->color = $color;
        $this->marca = $marca;
        $this->precio = $precio;
        $this->talle = $talle;
    }

    public function __toString() {
        return "{$this->id}-{$this->color}-{$this->marca}-{$this->precio}-{$this->talle}";
    }

    public static function Insertar($obj) {
        $objDB = DB::GetDBObject();
        $consulta =$objDB->ReturnQuery('INSERT INTO medias (color, marca, precio, talle) VALUES(:color, :marca, :precio, :talle)');

        $consulta->bindValue(':color', $obj->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca', $obj->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $obj->precio, PDO::PARAM_INT);
        $consulta->bindValue(':talle', $obj->talle, PDO::PARAM_STR);
        return $consulta->execute();
    }
    
    public static function TraerTodos() {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT * FROM medias');
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_INTO, new Media);
        return $consulta;
    }
    
    public static function TraerUno($obj) {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT (id, color, marca, precio, talle) WHERE id:'.$obj->id.' FROM medias');
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);
        return $consulta;
    }
    public static function Modificar($obj) {
        $objDB = DB::GetDBObject();
        $consulta =$objDB->ReturnQuery('UPDATE medias SET color = :color, marca = :marca, precio = :precio, talle = :talle WHERE id = :id');

        $consulta->bindValue(':id', $obj->id, PDO::PARAM_INT);
        $consulta->bindValue(':color', $obj->color, PDO::PARAM_STR);
        $consulta->bindValue(':marca', $obj->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $obj->precio, PDO::PARAM_INT);
        $consulta->bindValue(':talle', $obj->talle, PDO::PARAM_STR);
        $consulta->execute();
        return $consulta;
    }

    public static function Borrar($obj) {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('DELETE FROM medias WHERE id = :id');
        
        $consulta->bindValue(':id', $obj->id, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta;
    }
}
?>