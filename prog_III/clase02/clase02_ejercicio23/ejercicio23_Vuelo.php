<?php
    include_once "./ejercicio23_Pasajero.php";

    class Vuelo
    {
        private $_fecha;
        private $_empresa;
        private $_precio;
        private $_listaDePasajeros;
        private $_cantMaxima;

        public function __construct($empresa, $precio, $cantMaxima = null)
        {
            $this->_fecha = date('c');
            $this->_empresa = $empresa;
            $this->_precio = $precio;
            $this->_listaDePasajeros = array();
            if($cantMaxima != null)
            {
                $this->_cantMaxima = $cantMaxima;
            }
        }
        
        public function GetCantMaxima()
        { return $this->_cantMaxima; }

        public function GetVuelo()
        {
            $auxRetorno = "{$this->_fecha}-{$this->_empresa}-{$this->_precio}-{$this->GetCantMaxima()}-";

            foreach($this->_listaDePasajeros as $pasajero)
            {
                $auxRetorno.= "{$pasajero->GetInfoPasajero()}-";
            }

            return $auxRetorno;
        }

        public function HayPasajero($pasajeroComp)
        {
            $auxRetorno = false;

            foreach($this->_listaDePasajeros as $pasajero)
            {
                if($pasajero->Equals($pasajeroComp))
                {
                    $auxRetorno=true;
                    break;
                }
            }

            return $auxRetorno;
        }

        public function AgregarPasajero($pasajeroNuevo)
        {
            $auxRetorno = false;

            if(count($this->_listaDePasajeros) < $this->GetCantMaxima())
            {
                if(!($this->HayPasajero($pasajeroNuevo)))
                {
                    array_push($this->_listaDePasajeros, $pasajeroNuevo);
                    $auxRetorno = true;
                }
            }

            return $auxRetorno;
        }

        public function MostrarVuelo()
        {
            //echo "Entro a MostrarVuelo";
            echo $this->GetVuelo()."<br>";
        }

        public function EliminarPasajero($pasajeroNuevo)
        {
            $auxRetorno = false;

            if(($this->HayPasajero($pasajeroNuevo)))
            {
                $index = array_search($pasajeroNuevo, $this->_listaDePasajeros);
                array_splice($this->_listaDePasajeros, $index , 1);
                $auxRetorno = true;
            }
            else
            {
                echo "No se puede eliminar";
            }            

            return $auxRetorno;
        }

        public static function Add($vuelo1, $vuelo2)
        {
            $auxRetorno=0;
            $auxDescuento = ($vuelo1->_precio*20/100);

            foreach($vuelo1->_listaDePasajeros as $pasajeros)
            {
                if($pasajeros->GetPlusInfo())
                {
                    $auxRetorno+= ($vuelo1->_precio - $auxDescuento);
                }
                else
                {
                    $auxRetorno+= $vuelo1->_precio;
                }
            }

            $auxDescuento = ($vuelo2->_precio*20/100);

            foreach($vuelo2->_listaDePasajeros as $pasajeros)
            {
                if($pasajeros->GetPlusInfo())
                {
                    $auxRetorno+= ($vuelo2->_precio - $auxDescuento);
                }
                else
                {
                    $auxRetorno+= $vuelo2->_precio;
                }
            }

            return $auxRetorno;
        }

    }
?>