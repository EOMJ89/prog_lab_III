<?php
    class Punto
    {
        protected $_x;
        protected $_y;

        public function GetX() { return $this->_x; }
        
        public function GetY() { return $this->_y; }

        public function __construct($x, $y) {
            $this->_x = $x;
            $this->_y = $y;
        }
    }
?>