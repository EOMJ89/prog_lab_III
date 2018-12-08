<?php
class DB {
    private static $_dbObject;
    private $_PDOObject;
 
    private function __construct() {
        $dbHost = "localhost";
        //$dbUser = "root";
        $dbUser = "id8098129_segado98";
        //$dbPass = "";
        $dbPass = "segado98";
        //$dbName = "lacomanda";
        $dbName = "id8098129_prog_lab_iii";

        try {
            $mysql_connect_str = 'mysql:host=' . $dbHost . ';dbname=' . $dbName;
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

    public static function GetDBObject() {
        if (!isset(self::$_dbObject)) {
            self::$_dbObject = new db();
        }

        return self::$_dbObject;
    }

    public function ReturnLastInserted()
    {
        return $this->_PDOObject->lastInsertId();
    }
    
    public function __clone() {
        trigger_error('No se permite clonar este objeto.', E_USER_ERROR);
    }
}
