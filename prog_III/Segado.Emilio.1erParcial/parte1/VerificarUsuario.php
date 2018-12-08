<?php
    require_once "./clases/Usuario.php";
    
    class ManejadorUsuario {
        public static function VerificarUsuario() {
            echo "Entro a VerificarUsuario";
            $auxReturn = new stdClass();
            $auxReturn->Exito = false;
            $auxReturn->Mensaje = "No hay email ni clave.";

            $email = isset($_POST["email"]) ? $_POST["email"] : "";
            $clave = isset($_POST["clave"]) ? $_POST["clave"] : "";

            $alta = ($email != "" && $clave != "") ? true : false;
            
            if($alta) {
                $auxUsuario = new Usuario($email, $clave);

                if(Usuario::VerificarExistencia($auxUsuario)) {
                    $auxJson = json_decode($auxUsuario->ToJson());
                    $auxEmail = str_replace(".", "_", $auxJson->email);
                    setcookie($auxEmail, date("YmdGis") , time()+360);

                    $auxReturn->Exito = true;
                    $auxReturn->Mensaje = "Existe usuario, se crea la cookie.";
                    header("location:ListadoUsuarios.php");
                }
                else {
                    $auxReturn->Mensaje = "El email no existe.";
                }
            }

            return $auxReturn;
        }
    }
?>