<?php
class DB {
    private static $_dbObject;
    private $_PDOObject;
 
    private function __construct() {
        $dbHost = 'localhost';
        $dbUser = 'root';
        $dbPass = '';
        $dbName = 'usuariosDB';

        try {
            $mysql_connect_str = 'mysql:host=' . $dbHost . ';dbname=' . $dbName.";charset=utf8";
            $this->_PDOObject = new PDO($mysql_connect_str, $dbUser, $dbPass);
        }
        catch (PDOException $e) {
            print "Error:<br/>" . $e->getMessage();
            die();
        }
    }

    public function ReturnQuery($sql) {
        return $this->_PDOObject->prepare($sql);
    }
    
    public function ReturnLastInserted()
    {
        return $this->_PDOObject->lastInsertId();
    }

    public static function GetDBObject() {
        if (!isset(self::$_dbObject)) {
            self::$_dbObject = new DB();
        }

        return self::$_dbObject;
    }
    
    public function __clone() {
        trigger_error('No se permite clonar este objeto.', E_USER_ERROR);
    }
}
