<?php
require_once "Databases.php";
require_once "DBMethods.php";

class Venta implements DBMethods{
    public $id;
    public $id_usuario;
    public $id_media;
    public $cantidad;

    public function __construct($id = null, $id_usuario = null, $id_media = null, $cantidad = null) {
        $this->id = $id;
        $this->id_usuario = $id_usuario;
        $this->id_media = $id_media;
        $this->cantidad = $cantidad;
    }

    public function __toString() {
        return "{$this->id}-{$this->id_usuario}-{$this->id_media}-{$this->cantidad}";
    }

    public static function Insertar($obj) {
        $objDB = DB::GetDBObject();
        $consulta =$objDB->ReturnQuery('INSERT INTO ventas_medias (id_usuario, id_media, cantidad) VALUES(:usuario, :media, :cant)');

        $consulta->bindValue(':usuario', $obj->id_usuario, PDO::PARAM_STR);
        $consulta->bindValue(':media', $obj->id_media, PDO::PARAM_STR);
        $consulta->bindValue(':cant', $obj->cantidad, PDO::PARAM_INT);
        return $consulta->execute();
    }
    
    public static function TraerTodos() {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT * FROM ventas_medias');
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_INTO, new Venta);
        return $consulta;
    }
    
    public static function TraerUno($obj) {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT (id, id_usuario, id_media, cantidad) WHERE id = '.$obj->id.' FROM ventas_medias');
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);
        return $consulta;
    }
    public static function Modificar($obj) {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('UPDATE ventas_medias SET cantidad = '.$obj->cantidad.' WHERE id = '.$obj->id);

        $consulta->execute();
        return $consulta;
    }

    public static function Borrar($obj) {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('DELETE FROM ventas_medias WHERE id_usuario = :id_usuario AND id_media = :id_media');
        
        $consulta->bindValue(':id_usuario', $obj->id_usuario, PDO::PARAM_INT);
        $consulta->bindValue(':id_media', $obj->id_media, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta;
    }
}
?>