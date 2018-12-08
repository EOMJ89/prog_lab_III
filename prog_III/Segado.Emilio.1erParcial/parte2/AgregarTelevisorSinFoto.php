<?php
    require_once "./clases/Televisor.php";

    class AgregarSinFoto {
        public static function AgregarTelevisorSinFoto() {
            $auxReturn = new stdClass();
            $auxReturn->Exito = false;
            $auxReturn->Mensaje = "No se ha podido agregar";

            $tipo = isset($_POST["tipo"]) ? $_POST["tipo"] : "";
            $precio = isset($_POST["precio"]) ? $_POST["precio"] : "";
            $paisOrigen = isset($_POST["paisOrigen"]) ? $_POST["paisOrigen"] : "";

            $auxTelevisor = new Televisor($tipo, $precio, $paisOrigen);

            if($auxTelevisor->Agregar()) {
                $auxReturn->Exito = true;
                $auxReturn->Mensaje = "Se ha agregado";
            }

            return $auxReturn;
        }
    }

    echo json_encode(AgregarSinFoto::AgregarTelevisorSinFoto())."<br>";
?>