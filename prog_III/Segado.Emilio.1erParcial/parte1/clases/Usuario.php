<?php
    class Usuario {
        private $_email;
        private $_clave;

        public function __construct($email, $clave) {
            $this->_email = $email;
            $this->_clave = $clave;
        }

        public function ToJson() {
            $auxJson = new stdClass();
            $auxJson->email = $this->_email;
            $auxJson->clave = $this->_clave;
            return json_encode($auxJson);
        }

        public function GuardarEnArchivo() {
            $auxReturn = new stdClass();
            $file = fopen('./archivos/usuarios.json', "a+");

            if($file != false) {
                if(fwrite($file, $this->ToJson()."\r\n")) {
                    $auxReturn->Exito = true;
                    $auxReturn->Mensaje = "Se ha guardado en el archivo desde el metodo.";
                }
                
                fclose($file);
            }

            return $auxReturn;
        }

        public static function TraerTodos() {
            $auxReturn = array();

            if(file_exists("./archivos/usuarios.json")) {
                $file = fopen("./archivos/usuarios.json", "r");

                if($file != false) {
                    while(!feof($file)) {
                        $auxlinea = trim(fgets($file));
                        if($auxlinea != "") {
                            $auxJson = json_decode($auxlinea);
                            $auxUsuario = new Usuario($auxJson->email, $auxJson->clave);

                            array_push($auxReturn, $auxUsuario);
                        }
                    }
                    fclose($file);
                }
            }

            return $auxReturn;
        }

        public static function VerificarExistencia($usuario) {
            $auxReturn = false;
            $arrUsuarios = Usuario::TraerTodos(); 

            foreach ($arrUsuarios as $usuarioA) {
                if($usuarioA->ToJson() === $usuario->ToJson()) {
                    $auxReturn = true;
                    break;
                }
            }

            return $auxReturn;
        }
    }
?>