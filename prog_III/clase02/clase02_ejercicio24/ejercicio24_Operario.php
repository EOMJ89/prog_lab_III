<?php
    class Operario {
        private $_apellido;
        private $_legajo;
        private $_nombre;
        private $_salario;

        //Implementado
        public function __construct($apellido, $nombre, $legajo, $salario) {
            $this->_apellido = $apellido;
            $this->_nombre = $nombre;
            $this->_legajo = $legajo;
            $this->_salario = $salario;
        }

        //Implementado
        public function Equals($op1) {
            $auxReturn = false;

            if($this->Mostrar() == $op1->Mostrar()) {
                $auxReturn = true;
            }

            return $auxReturn;
        }

        //Implementado
        public function GetNombreApellido() {
            return "{$this->_nombre}-{$this->_apellido}";
        }

        //Implementado
        public function GetSalario() {
            return $this->_salario;
        }

        //Implementado
        public function Mostrar() {
            $auxReturn = "{$this->_legajo}-{$this->GetNombreApellido()}-{$this->GetSalario()}";
            return $auxReturn;
        }

        //Implementado
        public static function MostrarOperario($operario) {
            return $operario->Mostrar();
        }

        //Implementado
        public function SetAumentarSalario($aumento) {
            $auxAumento = ($this->GetSalario() * $aumento / 100);

            $this->_salario+= $auxAumento;
        }
    }
?>