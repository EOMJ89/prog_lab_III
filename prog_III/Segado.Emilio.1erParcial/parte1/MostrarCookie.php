<?php
    require_once "./clases/Usuario.php";

    class ManejadorCookie {
        public static function VerificarCookie() {
            $auxReturn = new stdClass();
            $auxReturn->Exito = false;
            $auxReturn->Mensaje = "No hay cookie con ese email";

            $email = isset($_GET["email"]) ? $_GET["email"] : "";
            $buscar = $email != "" ? true : false;
            
            if($buscar) {
                $auxEmail = str_replace(".", "_", $email);

                if(isset($_COOKIE[$auxEmail])) {
                    $auxReturn->Exito = true;
                    $auxReturn->Mensaje = $_COOKIE[$auxEmail];
                }
            }
            else {
                echo "No se busca nada";
            }

            return $auxReturn;
        }
    }

    echo ManejadorCookie::VerificarCookie()->Mensaje;
?>