<?php
    require_once "./clases/ovni.php";

    class AgregarSinFoto {
        public static function AgregarOvniSinFoto() {
            $auxReturn = new stdClass();
            $auxReturn->Exito = false;
            $auxReturn->Mensaje = "No se ha podido agregar";

            $tipo = isset($_POST["tipo"]) ? $_POST["tipo"] : null;
            $vel = isset($_POST["velocidad"]) ? $_POST["velocidad"] : null;
            $origen = isset($_POST["planeta"]) ? $_POST["planeta"] : null;

            $auxOvni = new Ovni($tipo, $vel, $origen);

            if($auxOvni->Agregar()) {
                $auxReturn->Exito = true;
                $auxReturn->Mensaje = "Se ha agregado";
            }

            return $auxReturn;
        }
    }

    echo json_encode(AgregarSinFoto::AgregarOvniSinFoto())."<br>";
?>