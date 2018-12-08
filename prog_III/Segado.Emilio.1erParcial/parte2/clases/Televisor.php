<?php
    require_once "IParte2.php";
    require_once "AccesoDatos.php";

    class Televisor implements IParte2 {
        private $_tipo;
        private $_precio;
        private $_paisOrigen;
        private $_path;

        public function __construct($tipo = null, $precio = null, $paisOrigen = null, $path = null) {
            $this->_tipo = $tipo != null ? $tipo : "";
            $this->_precio = $precio != null ? $precio : "";
            $this->_paisOrigen = $paisOrigen != null ? $paisOrigen : "";
            $this->_path = $path != null ? $path : "";
        }

        public function ToJson() {
            $auxJson = new stdClass();
            $auxJson->tipo = $this->_tipo;
            $auxJson->precio = $this->_precio;
            $auxJson->paisOrigen = $this->_paisOrigen;
            $auxJson->path = $this->_path;

            return json_encode($auxJson);
        }

        public function Agregar() {
            $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();

            $consulta =$objetoDatos->RetornarConsulta("INSERT INTO televisores (tipo, precio, pais, foto)"
                                                        . "VALUES(:tipo, :precio, :pais, :foto)"); 
            
            $consulta->bindValue(':tipo', $this->_tipo, PDO::PARAM_INT);
            $consulta->bindValue(':precio', $this->_precio, PDO::PARAM_INT);
            $consulta->bindValue(':pais', $this->_paisOrigen, PDO::PARAM_INT);
            $consulta->bindValue(':foto', $this->_path, PDO::PARAM_STR);

            return $consulta->execute();
        }
        public function Traer() {
            $auxReturn = array();
            $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();
            $consulta = $objetoDatos->RetornarConsulta('SELECT * FROM televisores'); //Se prepara la consulta, aquí se podrían poner los alias
            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_LAZY);

            foreach ($consulta as $tele) {
                $auxTele = new Televisor($tele->tipo,$tele->precio,$tele->pais,$tele->foto);
                array_push($auxReturn, $auxTele);
            }
            return $auxReturn;
        }

        public function CalcularIva() {
            $auxIva = $this->_precio *21 /100;            
            return $this->_precio + $auxIva;
        }
    }
    ?>