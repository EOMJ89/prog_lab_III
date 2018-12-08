<?php
require_once "Databases.php";

class Factura
{
    public $id;
    public $codigoPedido;
    public $fecha;
    public $mesa;
    public $importe;

    public function GuardarUno()
    {
        //var_dump($this); die();
        $objAccesoDatos = DB::GetDBObject();
        $consulta = $objAccesoDatos->ReturnQuery("INSERT into factura (codigoPedido, fecha, codigoMesa, importe) VALUES (:codigoPedido, :fecha, :mesa, :importe)");
        $consulta->bindValue(':codigoPedido', $this->codigoPedido, PDO::PARAM_STR);
        $consulta->bindValue(':fecha', $this->fecha, PDO::PARAM_STR);
        $consulta->bindValue(':mesa', $this->mesa, PDO::PARAM_STR);
        $consulta->bindValue(':importe', $this->importe, PDO::PARAM_INT);

        $consulta->execute();
        return $objAccesoDatos->ReturnLastInserted();
    }
}
?>