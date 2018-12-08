<?php
    require_once "persona.php";

    class Empleado extends Persona {
        private $_legajo;
        private $_sueldo;
        private $_turno;
        private $_pathFoto;

        //Constructor que utiliza el constructor de la clase padre
        public function __construct($nombre, $apellido, $dni, $sexo,$legajo, $sueldo, $turno) {
            parent::__construct($nombre, $apellido, $dni, $sexo, $legajo, $sueldo, $turno);

            $this->_legajo = $legajo;
            $this->_sueldo = $sueldo;
            $this->_turno = $turno;
            $this->_pathFoto = "";
        }

        //Getter para el Legajo
        public function GetLegajo() {
            return $this->_legajo;
        }

        //Getter para el Sueldo
        public function GetSueldo() {
            return $this->_sueldo;
        }

        //Getter para el Turno
        public function GetTurno() {
            return $this->_turno;
        }

        //Implementación del Método abstracto definido en la clase padre
        public function Hablar($idioma) {
            $auxReturn = "El empleado habla";
            $cantIdiomas = count($idioma);
            
            //Recorrerá todo el array para mostrar los idiomas que habla
            foreach ($idioma as $idiomaActual) {
                $auxReturn.= " {$idiomaActual}";

                /**En caso de que hable más de 1 idioma, se le agregará una coma para mantener la gramática
                 * (aunque de todas formas seguirá el problema de no tener una "y" antes del ultimo idioma).*/
                if($cantIdiomas > 1) {
                    $auxReturn.=",";
                }
            }

            /**Si habla más de un idioma, con el foreach anterior resultara en el ultimo idioma teniendo una coma
             * al final, la cual no se requiere. Por lo que este if eliminará esa coma sobrante*/
            if($cantIdiomas > 1) {
                $auxReturn = substr($auxReturn, 0, (strlen($auxReturn)-1));
            }

            return "{$auxReturn}.";
        }

        //Getter para el Path de la foto
        public function GetPathFoto() {
            return $this->_pathFoto;
        }

        //Setter para el Path de la foto
        public function SetPathFoto($pathFoto) {
            $this->_pathFoto = $pathFoto;
        }

        //Método ToString que hace uso del método ToString de la clase padre
        public function ToString() {
            $auxEmpleado = parent::ToString();
            return "{$auxEmpleado}-{$this->GetLegajo()}-{$this->GetSueldo()}-{$this->GetTurno()}";
        }

        //Método equals que compara el objeto de instancia actual con otro enviado como parametro mediante sus métodos ToString.
        public function Equals($emp) {
            $auxReturn = false;
            
            if($this->ToString() == $emp->ToString()) {
                $auxReturn = true;
            }

            return $auxReturn;
        }

        //Método __toString re-implementado Object para poder realizar una validación en la clase Fabrica debido a la utilización del array_unique.
        public function __toString() {
            return $this->ToString();
        }
    }
?>