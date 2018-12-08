<?php
    require_once "/iparte2.php";
    require_once "/iparte3.php";
    require_once "AccesoDatos.php";
    
    class Ovni implements iparte2, iparte3 {
        public $tipo;
        public $velocidad;
        public $planetaOrigen;
        public $pathFoto;

        public function __construct($tipo = null, $vel = null, $planeta = null, $path = null) {
            $this->tipo = $tipo;
            $this->velocidad = $vel;
            $this->planetaOrigen = $planeta;
            $this->pathFoto = $path;
        }

        public function ToJson() {
            $auxJson = new stdClass();
            $auxJson->tipo = $this->tipo;
            $auxJson->velocidad = $this->velocidad;
            $auxJson->planeta = $this->planetaOrigen;
            $auxJson->foto = $this->pathFoto;
            return json_encode($auxJson);
        }

        public function Agregar() {
            $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();

            $consulta =$objetoDatos->RetornarConsulta("INSERT INTO ovnis (tipo, velocidad, planeta, foto)"
                                                        . "VALUES(:tipo, :velocidad, :planeta, :foto)"); 
            
            $consulta->bindValue(':tipo', $this->tipo, PDO::PARAM_STR);
            $consulta->bindValue(':velocidad', $this->velocidad, PDO::PARAM_INT);
            $consulta->bindValue(':planeta', $this->planetaOrigen, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $this->pathFoto, PDO::PARAM_STR);

            return $consulta->execute();
        }

        public function Traer() {
            $auxReturn = array();
            $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();
            $consulta = $objetoDatos->RetornarConsulta('SELECT * FROM ovnis'); //Se prepara la consulta, aquí se podrían poner los alias
            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_LAZY);

            foreach ($consulta as $ovniA) {
                $auxOvni = new Ovni($ovniA->tipo,$ovniA->velocidad,$ovniA->planeta,$ovniA->foto);
                array_push($auxReturn, $auxOvni);
            }
            return $auxReturn;
        }

        public function ActivarVelocidadWarp() {           
            return $this->velocidad * 10.45;
        }

        public function Existe($ovniParam) {
            $auxArr = $this->Traer();
            $auxReturn = false;
            
            foreach($auxArr as $ovniA) {
                if($ovniA->ToJson() == $ovniParam->ToJson()) {
                    $auxReturn = true;
                }
            }

            return $auxReturn;
        }

        public function Modificar($tipo, $vel, $planeta, $path) {
            $auxReturn = false;
            
            if($this->Existe($this)) {
                $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();
                $consulta = $objetoDatos->RetornarConsulta('UPDATE ovnis SET tipo = :tipo, velocidad = :velocidad, planeta = :planeta, foto = :foto WHERE tipo = :tipoAct AND velocidad = :velocidadAct AND planeta = :planetaAct AND foto = :fotoAct');

                $consulta->bindValue(':tipo', $tipo, PDO::PARAM_STR);
                $consulta->bindValue(':velocidad', $vel, PDO::PARAM_INT);
                $consulta->bindValue(':planeta', $planeta, PDO::PARAM_STR);
                $consulta->bindValue(':foto', $path, PDO::PARAM_STR);

                $consulta->bindValue(':tipoAct', $this->tipo, PDO::PARAM_STR);
                $consulta->bindValue(':velocidadAct', $this->velocidad, PDO::PARAM_INT);
                $consulta->bindValue(':planetaAct', $this->planetaOrigen, PDO::PARAM_STR);
                $consulta->bindValue(':fotoAct', $this->pathFoto, PDO::PARAM_STR);

                $consulta->execute();
                if($consulta->rowCount() > 0) {
                    $auxReturn = true;
                    //echo "Deberia modificar<br>";
                }/*
                else {
                    //echo "No encuentro<br>";
                }
            }
            else {
                echo "el ovni no existe";*/
            }
            
            
            //var_dump($consulta);
            return $auxReturn;
        }
    }
?>