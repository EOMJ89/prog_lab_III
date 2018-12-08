<?php
    class Producto {
        protected $_nombre;
        protected $_codBarra;

        public function GetNombre() {
            return $this->_nombre;
        }

        public function SetNombre( $value) {
            $this->_nombre = $value;
        }

        public function GetCodBarra() {
            return $this->_codBarra;
        }

        public function SetCodBarra( $value) {
            $this->_codBarra = $value;
        }

        public function __construct($codBarra = null,$nombre = null) {
            $this->_nombre = $nombre;
            $this->_codBarra = $codBarra;
        }

        public function ToString() {
            return "{$this->GetCodBarra()}-{$this->GetNombre()}\r\n";
        }

        public static function Guardar($obj) {
            $auxReturn = false;
            $file = fopen("./productos.txt", "a+");

            if($obj instanceof Producto && $obj != null && $file != null) {
                if(fwrite($file, "{$obj->ToString()}") > 0) {
                    $auxReturn = true;
                }
            }

            fclose($file);
            return $auxReturn;
        }

        public static function TraerTodos()
        {
            $auxReturn = array();
            $file = fopen("./productos.txt", "r+");

            while(!feof($file)) {
                $auxLinea = fgets($file);
                $array = explode("-",$auxLinea);
                array_splice($array,2,1);

                

                if($array[0] != "" && $array[1] != "") {
                    $auxProduct = new Producto($array[0],$array[1]);
                    array_push($auxReturn,$auxProduct);
                }
            }

            fclose($file);
            return $auxReturn;
        }
    }
?>