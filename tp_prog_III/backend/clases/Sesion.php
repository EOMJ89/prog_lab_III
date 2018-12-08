<?php   
require_once "Databases.php";

require_once "Databases.php";

class Sesion
{
    public $id;
    public $idEmpleado;
    public $horaInicio;
    public $horaFinal;

    public function IniciarSesion() {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('INSERT into sesiones (idEmpleado, horaInicio) values (:idEmpleado, :horaInicio)');
        $consulta->bindValue(':idEmpleado', $this->idEmpleado, PDO::PARAM_INT);
        $consulta->bindValue(':horaInicio', $this->horaInicio, PDO::PARAM_STR);
        $consulta->execute();
        return $objAccesoDatos->ReturnLastInserted();
    }

    public function CerrarSesion($idEmp, $horaUnlog) {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE sesiones set horaFInal = :horaFinal where id = :id');
        $consulta->bindValue(':id', $idEmp, PDO::PARAM_INT);
        $consulta->bindValue(':horaFinal', $horaUnlog, PDO::PARAM_STR);

        $consulta->execute();
        
        $registrosAfectados = $consulta->rowCount();
    
        if($registrosAfectados > 0) {
            return true;
        }
        else {
            throw new Exception("No se pudo cerrar sesion!");
        }
    }
}?>