<?php
    include_once "./ejercicio24_Operario.php";

    class Fabrica{
        private $_cantMaxOperarios;
        private $_operarios;
        private $_razonSocial;

        //Implementado
        public function __construct($razon) {
            $this->_cantMaxOperarios = 5;
            $this->_operarios = array();
            $this->_razonSocial = $razon;
        }

        //Implementado
        public function Add($operario) {
            $auxReturn = false;

            if(count($this->_operarios) < $this->_cantMaxOperarios) {
                if(!(Fabrica::Equals($this, $operario))) {
                    array_push($this->_operarios, $operario);
                    $auxReturn = true;
                }
            }

            return $auxReturn;
        }

        //Implementado
        public static function Equals($fabrica, $operario) {
            $auxReturn = false;

            foreach ($fabrica->_operarios as $empleadoComp) {
                if($empleadoComp->Equals($operario)) {
                    $auxReturn = true;
                }
            }

            return $auxReturn;
        }

        //Implementado
        public function Mostrar() {
            return "{$this->_razonSocial}-{$this->_cantMaxOperarios}-{$this->MostrarOperarios()}";
        }

        //Implementado
        public static function MostrarCosto($fabrica) {
            return ($fabrica->RetornarCostos());
        }

        //Implementado
        private function MostrarOperarios() {
            $auxReturn = "";

            foreach ($this->_operarios as $empleado) {
                $auxReturn.= "{$empleado->Mostrar()}-";
            }

            return $auxReturn;
        }

        //Implementado
        public function Remove($operario) {
            $auxReturn = false;

            if(Fabrica::Equals($this, $operario))
            {
                $index = array_search($operario, $this->_operarios);
                array_splice($this->_operarios, $index , 1);
                $auxReturn = true;
            }

            return $auxReturn;
        }

        //Implementado
        private function RetornarCostos() {
            $auxReturn = 0;

            foreach ($this->_operarios as $empleado) {
                $auxReturn+= $empleado->GetSalario();
            }

            return $auxReturn;
        }
    }
?>