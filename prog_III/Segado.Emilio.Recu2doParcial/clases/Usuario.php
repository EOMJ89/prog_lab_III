<?php
require_once "Databases.php";
require_once "DBMethods.php";

class Usuario implements DBMethods {
    public $id;
    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $perfil;
    public $foto;

    public function __construct($id = null, $correo = null, $clave = null, $nombre = null, $apellido = null, $perfil = null, $foto = null) {
        $this->id = $id;
        $this->correo = $correo;
        $this->clave = $clave;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->perfil = $perfil;
        $this->foto = $foto;
    }

    public function __toString() {
        return "{$this->id}-{$this->correo}-{$this->clave}-{$this->nombre}-{$this->apellido}-{$this->perfil}-{$this->foto}";
    }

    public static function Insertar($obj) {
        $objDB = DB::GetDBObject();
        $consulta =$objDB->ReturnQuery('INSERT INTO usuarios (correo, clave, nombre, apellido, perfil, foto) VALUES (:correo, :clave, :nombre, :apellido, :perfil, :foto)');

        $consulta->bindValue(':correo', $obj->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $obj->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $obj->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $obj->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $obj->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $obj->foto, PDO::PARAM_STR);
        $consulta->execute();
        return $objDB->ReturnLastInserted();
    }
    
    public static function TraerTodos() {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT * FROM usuarios');
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);
        return $consulta;
    }
    
    public static function TraerUno($obj) {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT id, correo, clave, nombre, apellido, perfil, foto FROM usuarios WHERE id ='.$obj->id);
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_INTO, new Usuario);
        
        return $consulta;
    }

    public static function TraerUsuario($obj) {
        $auxRetorno = null;
        $objDB = DB::GetDBObject();

        $consulta = $objDB->ReturnQuery('SELECT * FROM usuarios WHERE id ='.$obj->id);
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);

        if($consulta->rowCount() > 0) {
            $usuario = null;
            foreach ($consulta as $data) {
                $usuario = new Usuario($data->id, $data->correo, $data->clave, $data->nombre, $data->apellido, $data->perfil, $data->foto);
            }

            $auxRetorno = $usuario;
        }
        else {
            $auxRetorno = false;
        }

        return $usuario;
    }

    public static function Modificar($obj) {}
    public static function Borrar($obj) {}

    public static function VerificarPermiso($user, $tipoPermiso) {
        $auxRetorno = false;

        if($user->perfil === $tipoPermiso) {
            $auxRetorno= true; 
        }
        return $auxRetorno;
    }

    public static function UsuarioValido($correoA, $claveA)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM usuarios WHERE correo=:correo");
        $consulta->bindValue(':correo', $correoA, PDO::PARAM_STR);
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);
        
        $lista = Usuario::ArmarLista($consulta);
        $auxRetorno = new stdClass();
        $auxRetorno->resultado = "no_existe";

        $usuario = null;
        if(count($lista)>0) {
            $usuario = $lista[0];
        }
        //echo $clave;
        if ($usuario!= null) {
            
            if ($usuario->clave == $claveA) {
                $auxRetorno->resultado = "valido";
                $auxRetorno->usuario = $usuario;
            } else {
                $auxRetorno->resultado = "clave_erronea";
            }
        }

        return $auxRetorno;
    } 

    public static function ArmarLista($consulta) {
        $retorno = $consulta;
        $lista = array();
    
        foreach ($retorno as $data) {
            $usuario =new Usuario($data->id, $data->correo, $data->clave, $data->nombre, $data->apellido, $data->perfil, $data->foto);
            array_push($lista,$usuario);
        }

        return $lista;
    }

    public static function TraerCorreos($correoA) {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM usuarios WHERE correo=:correo");
        $consulta->bindValue(':correo', $correoA, PDO::PARAM_STR);
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);
        
        return Usuario::ArmarLista($consulta);
    }
     public static function TraerClaves($claveA) {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM usuarios WHERE clave=:clave");
        $consulta->bindValue(':clave', $claveA, PDO::PARAM_STR);
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);

        return Usuario::ArmarLista($consulta);
     }
}
?>