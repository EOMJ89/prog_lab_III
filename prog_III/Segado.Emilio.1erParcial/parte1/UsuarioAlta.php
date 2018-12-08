<?php
    require_once "./clases/Usuario.php";
    
    class ManejadorAlta {
        public static function AltaUsuario() {
            $auxReturn = new stdClass();
            $auxReturn->Exito = false;
            $auxReturn->Mensaje = "No hay alta";

            $email = isset($_POST["email"]) ? $_POST["email"] : "";
            $clave = isset($_POST["clave"]) ? $_POST["clave"] : "";
            $alta = ($email != "" && $clave != "") ? true : false;

            
            if($alta) {
                $auxUsuario = new Usuario($email, $clave);

                $auxGuardado = $auxUsuario->GuardarEnArchivo();
                $auxReturn->Exito = true;
                $auxReturn->Mensaje = "Se ha guardado en el archivo desde UsuarioAlta";
            }
            return $auxReturn;
        }
    }
?>