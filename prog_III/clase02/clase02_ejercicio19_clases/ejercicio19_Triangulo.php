<?php
    include_once "clase02_ejercicio19.php";

    class Triangulo extends FiguraGeometrica
    {
        protected $_altura;
        protected $_base;

        public function __construct($b, $a)
        {
            parent::__construct();

            $this->_altura=$a;
            $this->_base=$b;
            $this->CalcularDatos();
        }

        protected function CalcularDatos()
        {
            $this->_perimetro = (3*$this->_base);
            $this->_superficie = (($this->_altura * $this->_base) /2);
        }

        public function Dibujar()
        {
            $retorno ='<p style="color:'.$this->_color.'">'; //Esto es un string

            for($k=1;$k<=$this->_altura;$k++)
            {
                //echo $k;

                for($j=($this->_base-$k);$j>=1;$j--)
                {
                    //$retorno.="&nbsp;";
                    $retorno.="_";
                }
                for($i=1;$i<=(($k*2)-1);$i++)
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
            $retorno = parent::ToString()." - ".$this->_altura." - ".$this->_base; 
            $retorno.= "<br>".$this->Dibujar();
            return $retorno;
        }
    }
?>