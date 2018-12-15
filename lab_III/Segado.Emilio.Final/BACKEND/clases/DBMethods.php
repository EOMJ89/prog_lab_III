<?php
interface DBMethods{
    public function Insertar();
    public static function TraerTodos();
    public static function TraerUno($obj);
    public function Modificar();
    public function Borrar();
}
?>