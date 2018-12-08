<?php
interface DBMethods{
    public static function Insertar($obj);
    public static function TraerTodos();
    public static function TraerUno($obj);
    public static function Modificar($obj);
    public static function Borrar($obj);
}
?>