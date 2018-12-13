<?php
require_once "Databases.php";
require_once "DBMethods.php";

class Usuario implements DBMethods {
    public $id;
    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $legajo;
    public $perfil;
    public $foto;

    public function __construct($id = null, $correo = null, $clave = null, $nombre = null, $apellido = null, $perfil = null, $legajo = null, $foto = null) {
        $this->id = $id;
        $this->correo = $correo;
        $this->clave = $clave;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->legajo = $legajo;
        $this->perfil = $perfil;
        $this->foto = $foto;
    }

    public function Insertar() {
        $objDB = DB::GetDBObject();
        $consulta =$objDB->ReturnQuery('INSERT INTO usuarios (correo,  clave, nombre, apellido, legajo, perfil, foto) VALUES (:correo,:clave,:nombre,:apellido,:legajo,:perfil,:foto)');

        $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':legajo', $this->legajo, PDO::PARAM_INT);
        $consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $this->foto, PDO::PARAM_STR);

        $consulta->execute();
        return $objDB->ReturnLastInserted();
    }
    
    public static function TraerTodos() {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT * FROM usuarios');
        
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);

        return Usuario::ArmarLista($consulta);
    }
    
    public static function TraerUno($correoA) {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('SELECT * FROM usuarios WHERE correo = :correo');

        $consulta->bindValue(':correo', $correoA, PDO::PARAM_STR);

        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);

        return Usuario::ArmarLista($consulta);
    }

    public function Borrar() {
        $objDB = DB::GetDBObject();
        $consulta = $objDB->ReturnQuery('DELETE from usuarios WHERE correo = :correo');

        $consulta->bindValue(':correo', $this->correo);
        
        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public  function Modificar() {
        $objDB = DB::GetDBObject();
        $consulta =$objDB->ReturnQuery('UPDATE usuarios SET clave = :clave , nombre = :nombre, apellido = :apellido, legajo= :legajo, perfil= :perfil, foto = :foto WHERE correo = :correo');

        $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':apellido', $this->apellido, PDO::PARAM_STR);
        $consulta->bindValue(':legajo', $this->legajo, PDO::PARAM_INT);
        $consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':foto', $this->foto, PDO::PARAM_STR);

        $consulta->execute();
        return $consulta->rowCount();
    }

    public static function VerificarPermiso($user, $tipoPermiso) {
        $auxRetorno = false;

        if($user->perfil === $tipoPermiso) {
            $auxRetorno= true; 
        }
        return $auxRetorno;
    }

    public static function UsuarioValido($correoA, $claveA)
    {
        $lista = Uuario::TraerUno($correoA);

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
            $usuario =new Usuario($data->id, $data->correo, $data->clave, $data->nombre, $data->apellido, $data->perfil, $data->legajo, $data->foto);
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