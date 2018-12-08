<?php
    include_once "./clase02_ejercicio21.php";
    class Garage
    {
        private $_razonSocial;
        private $_precioPorHora;
        private $_autos;

        public function __construct($razonSocial, $precioHora = 10)
        {
            $this->_autos=array(); //Inicializa el array SIEMPRE.
            $this->_razonSocial = $razonSocial;
            $this->_precioPorHora = $precioHora;
        }
        
        private function MostrarAutos()
        {
            //Por cada elemento en el array (se asume que todos son de clase Auto), se los muestra mediante
            //el metodo de clase.
            foreach($this->_autos as $autoA)
            {
                Auto::MostrarAuto($autoA);
            }
        }

        public function MostrarGarage()
        {
            //Muestra los datos del Garage completo, pero utiliza una funcion especial para mostrar los autos dentro del array.
            echo "Razón Social: ".$this->_razonSocial."<br>PrecioPorHora: ".$this->_precioPorHora."<br>".$this->MostrarAutos();
        }

        public function Equals($autoComparado)
        {
            $retorno = 0;

            //Por cada auto en el array...
            foreach($this->_autos as $autoA)
            {
                //... comparalo con el auto obtenido por parametro, y sí son iguales...
                if($autoA->Equals($autoComparado))
                {
                    //... cambia el resultado y sal del foreach.
                    $retorno = 1;
                    break;
                }
            }

            return $retorno;
        }

        public function Add($autoAgregado)
        {
            //Sí el auto que se busca agregar NO está dentro del garage...
            if(!($this->Equals($autoAgregado)))
            {
                //... agregalo al array de autos e informalo.
                array_push($this->_autos, $autoAgregado);
                echo "El auto se ha agregado<br>";
            }
            else
            {
                //... no lo agregues, solo informalo.
                echo "El auto NO se ha agregado<br>";
            }
        }

        public function Remove($autoEliminado)
        {
            $retorno = 0; //Variable especial para informar que no se ha eliminado

            //Si el auto se encuentra dentro del garage...
            if($this->Equals($autoEliminado))
            {
                //... recorre todo el array mediante un index...
                for($i=0;$i<count($this->_autos);$i++)
                {
                    //... y comparalo con el auto que se busca eliminar, y si es el mismo auto...
                    if($this->Equals($autoEliminado))
                    {
                        //... eliminalo del array, utilizando el index actual del for, e informa.
                        unset($this->_autos[$i]);
                        echo "El auto se ha eliminado<br>";
                        $retorno = 1; //Se cambia el retorno para que no entre al if inferior...
                    }
                }
            }
            else //Si no se encuentra, se informa y se cambia el retorno para que no entre al if inferior.
            {
                echo "El auto NO se encuentra<br>";
                $retorno=-1;
            }

            if(!($retorno)) //Si el retorno no es cambiado, se informa debido a que no se ha podido eliminar
            {
                echo "El auto NO se ha eliminado<br>";
            }
        }
    }
?>