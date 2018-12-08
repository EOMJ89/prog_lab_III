<?php

abstract class FiguraGeometrica
{
    protected $_color;
    protected $_perimetro;
    protected $_superficie;

    public function __construct($color = "0000FF",$perimetro = 0 ,$superficie = 0 ) {
        $this->SetColor($color);
        $this->_perimetro=$perimetro;
        $this->_superficie=$superficie;
    }

    public function GetColor()
    { return $color; }

    public function SetColor($colorNuevo)
    { $this->_color=$colorNuevo; }

    public function ToString()
    {
        $retorno = $this->_color." - ".$this->_perimetro." - ".$this->_superficie; 
        
        return $retorno;
    }

    public abstract function Dibujar();

    protected abstract function CalcularDatos();
}
?>