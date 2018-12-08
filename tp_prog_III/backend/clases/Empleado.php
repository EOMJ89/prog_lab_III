<?php
require_once "Databases.php";
require_once 'IApiMetodos.php';

class Empleado implements IApiMetodos
{
    public $id;
    public $usuario;
    public $clave;
    public $sector;
    public $perfil;
    public $estado;

    public function CargarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('INSERT into empleados (usuario, clave, sector, perfil, estado) VALUES (:usuario, :clave, :sector, :perfil, :estado)');

        $consulta->bindValue(':usuario', $this->usuario, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':sector', $this->sector, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_STR);
        $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);

        $consulta->execute();
        return $objAccesoDatos->ReturnLastInserted();
    }

    public function BorrarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('DELETE from empleados WHERE id=:id');

        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public function ModificarUno()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE empleados SET usuario=:usuario, clave=:clave, sector=:sector, perfil=:perfil WHERE id=:id');
                
        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
        $consulta->bindValue(':usuario', $this->usuario, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':sector', $this->sector, PDO::PARAM_STR);
        $consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_STR);

        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }
    
    public static function TraerTodos()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM empleados");
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Empleado");
    }

    public static function TraerUno($id)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM empleados WHERE id=:id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->fetchAll(PDO::FETCH_CLASS, "Empleado");
    }
    
    public static function SuspenderEmpleado($id, $estado)
    {
        if ($estado == 'activo') {
            $estado = 'suspendido';
        } else {
            $estado = 'activo';
        }
        
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery('UPDATE empleados SET estado="'.$estado.'" WHERE id=:id');
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        return $estado;
    }

    public static function ValidarEmpleado($user, $clave)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM empleados WHERE usuario=:usuario");
        $consulta->bindValue(':usuario', $user, PDO::PARAM_INT);
        $consulta->execute();
        $lista = $consulta->fetchAll(PDO::FETCH_CLASS, "Empleado");

        $auxRetorno = new stdClass();
        $auxRetorno->resultado = "usuario";
        $empleado = null;
        foreach ($lista as $empA) {
            $empleado = $empA;
        }

        if ($empleado!= null) {
            if ($empleado->clave === $clave) {
                $auxRetorno->resultado = "valido";
                $auxRetorno->empleado = $empleado;
            } else {
                $auxRetorno->resultado = "clave";
            }
        }

        return $auxRetorno;
    }    

    public static function CantidadDeOperacionesEmpleado($id)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT * FROM pedidoDetalle WHERE idEmpleado=:id");
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        return $consulta->rowCount(); //Cantidad de elementos afectados
    }

    public static function FechasDeLogueo()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT e.usuario, s.horaInicio from empleados as e, sesiones as s where s.idEmpleado=e.id ORDER by e.usuario");
        $consulta->execute();
        $fechas = $consulta->fetchAll(PDO::FETCH_CLASS);
        return $fechas;
    }

    public static function OperacionesTodosLosEmpleados()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT e.usuario as empleado, COUNT(*) as operaciones FROM empleados as e, pedidoDetalle as pd WHERE pd.idEmpleado= e.id GROUP by e.usuario");
        $consulta->execute();
        $operaciones = $consulta->fetchAll(PDO::FETCH_CLASS);
        return $operaciones;
    }

    public static function CantidadOperacionesTodosSectores()
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT sector as sector, COUNT(*) as operaciones from pedidoDetalle GROUP by sector");
        $consulta->execute();
        $operaciones= $consulta->fetchAll(PDO::FETCH_CLASS);
        return $operaciones;
    }

    public static function CantidadOperacionesEmpleadoSeparado($idEmpleado)
    {
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT e.usuario, COUNT(*) as operaciones from empleados as e, pedidoDetalle as pd where pd.idEmpleado in (SELECT e.id from empleados WHERE e.id= :idEmpleado)");
        $consulta->bindValue(':idEmpleado', $idEmpleado, PDO::PARAM_INT);
        
        $consulta->execute();
        $operaciones= $consulta->fetchAll(PDO::FETCH_CLASS);
        return $operaciones;
    }

    public static function CantidadOperacionesEmpleadoPorSector($sector)
    {
        //var_dump($sector);
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("SELECT e.usuario, COUNT(*) as operaciones FROM empleados as e, pedidoDetalle as pd WHERE pd.idEmpleado= e.id and pd.sector=:sector GROUP by e.usuario");
        $consulta->bindValue(':sector', $sector, PDO::PARAM_STR);
        
        $consulta->execute();
        $operaciones= $consulta->fetchAll(PDO::FETCH_CLASS);
        return $operaciones;
    }
}
