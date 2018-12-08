<?php
    include_once "ejercicio20_Punto.php";

    class Rectangulo
    {
        protected $_vertice1;
        protected $_vertice2;
        protected $_vertice3;
        protected $_vertice4;
        public $area;
        public $ladoUno;
        public $ladoDos;
        public $perimetro;

        public function __construct($verticeN1, $verticeN3)
        {
            $this->_vertice1 = new Punto($verticeN1->GetX(), $verticeN1->GetY());
            $this->_vertice2 = new Punto($verticeN1->GetX(), $verticeN3->GetY());
            $this->_vertice3 = new Punto($verticeN3->GetX(), $verticeN3->GetY());
            $this->_vertice4 = new Punto($verticeN3->GetX(), $verticeN1->GetY());

            $this->ObtenerLadoUno();
            $this->ObtenerLadoDos();
            $this->ObtenerArea();
            $this->ObtenerPerimetro();
        }

        public function ObtenerLadoUno()
        {
            $auxInt = abs($this->_vertice1->GetX() - $this->_vertice3->GetX());
            $this->ladoUno = $auxInt;
        }

        public function ObtenerLadoDos()
        {
            $auxInt = abs($this->_vertice1->GetY() - $this->_vertice3->GetY());
            $this->ladoDos = $auxInt;
        }

        public function ObtenerArea()
        {
            $this->area = ($this->ladoUno * $this->ladoDos);
        }
        
        public function ObtenerPerimetro()
        {
            $this->perimetro = (($this->ladoUno * 2) + ($this->ladoDos* 2));
        }

        public function Dibujar()
        {
            $retorno =""; //Esto es un string

            for($i=0; $i<($this->ladoUno); $i++)
            {   
                for($j=0;$j<($this->ladoDos);$j++)
                {
                    $retorno.= "*";
                }
                $retorno.="<br>";
            }

            return $retorno;
        }

        public function Mostrar()
        {
            echo "Lado Uno ".$this->ladoUno."<br>Lado Dos ".$this->ladoDos."<br>Area ".$this->area."<br>Perimetro ".$this->perimetro."<br>".$this->Dibujar();
        }
    }
?>