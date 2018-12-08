<?php
    abstract class Persona {
        protected $_apellido;
        protected $_dni;
        protected $_nombre;
        protected $_sexo;

        //Constructor
        public function __construct($nombre, $apellido, $dni, $sexo) {
            $this->_nombre = $nombre;
            $this->_apellido = $apellido;
            $this->_dni = $dni;
            $this->_sexo = $sexo[0];
        }

        //Getter para el Apellido
        public function GetApellido() {
            return $this->_apellido;
        }

        //Getter para el DNI
        public function GetDni() {
            return $this->_dni;
        }

        //Getter para el Nombre
        public function GetNombre() {
            return $this->_nombre;
        }
        
        //Getter para el Sexo
        public function GetSexo() {
            return $this->_sexo;
        }

        //Deifinición para el método abstracto
        public abstract function Hablar($idioma);

        //Método ToString que muestra la persona serializada
        public function ToString() {
            return "{$this->_dni}-{$this->_nombre}-{$this->_apellido}-{$this->_sexo}";
        }
    }
?>