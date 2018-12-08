<?php
    require_once "./clases/Usuario.php";

    class Listado {
        public static function CrearListadoJson() {
            $auxReturn = "";
            $auxArray = Usuario::TraerTodos();

            foreach ($auxArray as $usuario) {
                $auxReturn.= $usuario->ToJson()."<br>";
            }

            return $auxReturn;
        }
    }

    echo Listado::CrearListadoJson();
?>