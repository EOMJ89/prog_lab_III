<?php
    class Auto
    {
        private $_color; //String
        private $_precio; //Double
        private $_marca; //String
        private $_fecha; //DateTime

        public function __construct($color, $marca, $precio = null, $fecha = null)
        {
            $this->_color=$color;
            $this->_marca=$marca;

            if($precio!=null)
            { $this->_precio=$precio; }

            if($fecha!=null)
            { $this->_fecha=$fecha; }
        }

        public function AgregarImpuestos($impuesto) //el parametro impuesto es un double
        {
            $this->_precio+=$impuesto;
            echo $this->_precio.'<br>';
        }

        public static function MostrarAuto($autoObj)
        {
            $retorno = $autoObj->_color.' - '.$autoObj->_precio.' - '.$autoObj->_marca.' - '.$autoObj->_fecha;
            echo $retorno.'<br>';
        }

        public function Equals($autoObj)
        {
            $retorno = false;

            if(($autoObj->_marca == $this->_marca) && ($autoObj->_color == $this->_color))
            { $retorno = true; }

            return $retorno;
        }

        public static function Add($autoUno, $autoDos)
        {
            $retorno = 0; 
            
            if($autoUno->Equals($autoDos))
            {
                $retorno = $autoUno->_precio + $autoDos->_precio;
            }
            else
            {
                echo "Los Autos son diferentes<br>";
            }

            return $retorno;
        }
    }
?>