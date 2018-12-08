<?php
    require_once "interfaces.php";
    require_once "empleado.php";

    class Fabrica implements IArchivo {
        private $_cantMaxima;
        private $_empleados;
        private $_razonSocial;

        //Constructor 
        public function __construct($razon = "Sin razon", $cantMax = 5) {
            $this->_razonSocial = $razon;
            $this->_cantMaxima = $cantMax;
            $this->_empleados = array();
        }

        //Getter para los Empleados
        public function GetEmpleados() {
            return $this->_empleados;
        }

        //Método que agrega el empleado enviado por parametro teniendo en cuenta la cantidad maxima de empleados.
        public function AgregarEmpleado($emp) {
            $auxReturn = false;

            if(count($this->_empleados) < $this->_cantMaxima) {
                array_push($this->_empleados, $emp);
                $auxReturn = true;
            }

            //Eliminar los empleados repetidos
            $this->EliminarEmpleadoRepetido();
            return $auxReturn;
        }

        //Método que calcula el total numerico de los sueldos de todos los empleados.
        public function CalcularSueldos() {
            $auxReturn = 0;

            foreach ($this->_empleados as $empleado) {
                $auxReturn+= $empleado->GetSueldo();
            }
            
            return $auxReturn;
        }
        
        //Método que verifica que un empleado forme parte de la fabrica, pero solo se usa al eliminar para evitar procesos extra
        private function HayEmpleado($emp) {
            $auxReturn = false;
            
            foreach ($this->_empleados as $empleado) {
                if($empleado->Equals($emp)) {
                    $auxReturn = true;
                    break;
                }
            }

            return $auxReturn;
        }

        //Método que elimina un empleado de la fabrica, buscando su index en el array y eliminandolo de estar en él, evitando el error del index.
        public function EliminarEmpleado($emp) {
            $auxReturn = false;

            if($this->HayEmpleado($emp)) {
                $index = array_search($emp, $this->_empleados);
                unset($this->_empleados[$index]);
                $auxReturn = true;
            }

            return $auxReturn;
        }

        //Método que elimina los empleados duplicados
        private function EliminarEmpleadoRepetido() {
            $this->_empleados = array_unique($this->_empleados);
        }

        //Método ToString que muestra todos los atributos y empleados de la fabrica.
        public function ToString() {
            $auxReturn = "{$this->_razonSocial}-{$this->_cantMaxima}";

            foreach ($this->_empleados as $empleado) {
                $auxReturn.= $empleado->ToString()."-";
            }

            return $auxReturn;
        }

        //Método que guarda todos los empleados en un archivo, implementando la interface IArchivo
        function GuardarEnArchivo($nombreArchivo) {
            $auxReturn = false;

            $file = fopen($nombreArchivo, "w");

            foreach ($this->_empleados as $empleadoA) {
                //echo $empleadoA->ToString()." Ha sido escrito <br>";
                fwrite($file, "{$empleadoA->ToString()}-{$empleadoA->GetPathFoto()}\r\n");
            }

            fclose($file);
            return $auxReturn;
        }
        

        //Método que guarda todos los empleados en un archivo, implementando la interface IArchivo
        function TraerDeArchivo($nombreArchivo) {
            $auxReturn = array();

            if (file_exists($nombreArchivo)) {
                $file = fopen($nombreArchivo, "r");
            
                while(!feof($file)) {
                    $auxLinea = fgets($file);
                    $array = explode("-",$auxLinea);
                    //array_splice($array,8,1);
            
                    if(count($array) > 1) {
                        foreach ($array as $part) {
                            $part = trim($part);
                        }
                        
                        $auxEmpleado = new Empleado($array[1], $array[2], $array[0], $array[3], $array[4], $array[5], $array[6]);
                        $auxEmpleado->SetPathFoto($array[7]."-".$array[8]);
                        $this->AgregarEmpleado($auxEmpleado);
                    }
                }
            
                fclose($file);
            }
            
            return $auxReturn;
        }
    }
?>