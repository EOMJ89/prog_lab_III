<?php
    include_once "clase02_ejercicio19.php";

    class Rectangulo extends FiguraGeometrica
    {
        protected $_ladoUno;
        protected $_ladoDos;

        public function __construct($l1, $l2)
        {
            parent::__construct();

            $this->_ladoUno=$l1;
            $this->_ladoDos=$l2;
            $this->CalcularDatos();
        }

        protected function CalcularDatos()
        {
            $this->_perimetro = (2*$this->_ladoUno + 2*$this->_ladoDos);
            $this->_superficie = ($this->_ladoUno * $this->_ladoDos);
            //Da error de Parse
            //parent::_perimetro = (2*$this->_ladoUno + 2*$this->_ladoDos);
            //parent::_superficie = ($this->_ladoUno * $this->_ladoDos);
        }

        public function Dibujar()
        {
            $retorno ='<p style="color:'.$this->_color.'">'; //Esto es un string

            for($i=0; $i<$this->_ladoUno;$i++)
            {   
                for($j=0;$j<$this->_ladoDos;$j++)
                {
                    $retorno.= "*";
                }
                $retorno.="<br>";
            }

            $retorno.="</p>";

            return $retorno;
        }

        public function ToString()
        {
            $retorno = parent::ToString()." - ".$this->_ladoUno." - ".$this->_ladoDos; 
            $retorno.= "<br>".$this->Dibujar();
            return $retorno;
        }
    }
?>