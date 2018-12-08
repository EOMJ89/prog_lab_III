<?php
class AccesoDatos
{
    private static $_objAccesoDatos; //Una variable que devuelve un objeto AccesoDatos
    private $_objetoPDO; //PHP Data Object
 
    private function __construct() {
        //Intento inicializar el objeto PHP Data Object
        try {
            $usuario='root'; //Nombre de usuario
            $clave=''; //Contraseña del usuario del servidor
            $strConnection = 'mysql:host=localhost;dbname=productos_bd'; //Aquí va la base de datos

            $this->_objetoPDO = new PDO($strConnection, $usuario, $clave);
        }
        catch (PDOException $e) {
            /**Si encuentro algún error: imprimo el mensaje y luego mato el programa*/
            print "Error:<br/>" . $e->getMessage();
            die();
        }
    }

    public function RetornarConsulta($sql) { //Prepara una consulta de SQL
        return $this->_objetoPDO->prepare($sql);
    }

    public static function ObtenerObjetoAcceso() { //Singleton
        if (!isset(self::$_objAccesoDatos)) { //Sí mi objeto AccesoDatos no está inicializado, se inicializa
            self::$_objAccesoDatos = new AccesoDatos();
        }
 
        return self::$_objAccesoDatos; //Retorno mi propio objeto dentro del atributo estatico   
    }

    //Evita que el objeto se pueda clonar
    public function __clone() {
        trigger_error('No se permite clonar este objeto.', E_USER_ERROR);
    }
}
