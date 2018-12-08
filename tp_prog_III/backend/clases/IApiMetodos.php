<?php

interface IApiMetodos
{
    public function CargarUno();
    public function BorrarUno();
    public function ModificarUno();
    public static function TraerTodos();
    public static function TraerUno($id);
}
