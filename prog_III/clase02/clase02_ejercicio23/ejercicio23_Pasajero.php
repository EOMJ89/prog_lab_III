<?php
    class Pasajero
    {
        private $_apelldo;
        private $_nombre;
        private $_dni;
        private $_esPlus;
    
        public function __construct($apellido, $nombre, $dni, $esPlus = false) {
            $this->_apellido = $apellido;
            $this->_nombre = $nombre;
            $this->_dni = $dni;
            $this->_esPlus = $esPlus;
        }

        public function Equals($pasajero1)
        {
            $auxRetorno = false;

            if($this->_dni == $pasajero1->_dni)
            { $auxRetorno = true; }

            return $auxRetorno;
        }

        public function GetInfoPasajero()
        {
            return "{$this->_nombre}-{$this->_apellido}-{$this->_dni}-{$this->_esPlus}";
        }

        public function GetPlusInfo()
        {
            return $this->_esPlus;
        }

        public function MostrarPasajero()
        {
            echo $this->GetInfoPasajero()+"<br>";
        }
    }
?>