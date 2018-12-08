<?php
echo "Admin de Database<br>"; 
//Se debe establecer la conexion con la database primero

$queHago = (isset($_POST["action"])) ? $_POST["action"] : "none"; 
echo $queHago."<br>";

$nombre = (isset($_POST["nombre"])) ? $_POST["nombre"] : "none";
$interprete = (isset($_POST["interprete"])) ? $_POST["interprete"] : "none";
$anio = (isset($_POST["anio"])) ? $_POST["anio"] : "none";
$id = (isset($_POST["id"])) ? $_POST["id"] : "none";

$auxDestino = null;
if(isset($_FILES["archivos"])) {
    $auxDestino = "fotos/cds/".date("Y-m-d"). $nombre.".".pathinfo($_FILES["archivos"]["name"], PATHINFO_EXTENSION);
}


switch ($queHago) {
    //Conectar y Desconectar
    case 'conectarme': {
        $server = ConnectSQL();
        
        if($server != false) {
            CerrarSQL($server);
        }
        break;
    }
    //Ejecutar un "SELECT ALL" y un var_dump de lo que regrese.
    case 'ejecutar': {
        $server = ConnectSQL();
        
        if($server != false) {
            /*Ejecuta la consulta, no hace falta enviar el recurso ya que se asume como vigente.
            Puede pasarse si se necesita otra base de datos en otro lugar al mismo lugar. */
            $consultaResult = mysql_db_query("cdcol","SELECT * FROM cds"); //"SELECT * FROM `cds`" <-- Tilte invertida, no usar
            if($consultaResult != false) {
                var_dump($consultaResult);
                echo "<br>";
            }
            else {
                echo "La consulta ha dado false. Revisar<br>";
            }
            CerrarSQL($server);
        }
        break;
    }
    case 'traertodos':  {
        $server = ConnectSQL();
        
        if($server != false) {
            echo "Me pude conectar<br>";

            $consultaResult = mysql_db_query("cdcol","SELECT * FROM cds"); //"SELECT * FROM `cds`" <-- Tilte invertida, no usar
            if($consultaResult != false) {
                //Para visualizar el resultado, se utliza el mysql_fetch_...
                while($objResultado = mysql_fetch_object($consultaResult)) {
                    //mysql_fetch_object($consultaResult) devuelve un objeto o FALSE si no quedan más filas para formar el objeto.
                    //Devuelve un stdClass (standartClass) con el atributo del objeto siendo el nombre del campo (o con alias)
                    var_dump($objResultado);
                    echo "<br>";
                };
            }
            CerrarSQL($server);
        }
        break;
    }
    case 'traeruno':  {
        $server = ConnectSQL();

        if($server != false) {
            $auxStdClass = ObtenerUnoOVarios($id);
            if($auxStdClass != false) {
                var_dump($auxStdClass);
                echo "<br>";
            }
            CerrarSQL($server);
        }
        break;
    }
    case 'agregar':  {
        $server = ConnectSQL();
                
        if($server != false) {
            echo AñadirRegistro($server, $nombre, $interprete, $anio, $auxDestino);
            CerrarSQL($server);
        }
        break;
    }
    case 'modificar':  {
        $server = ConnectSQL();
        
        if($server != false) {
            echo ModificarRegistro($server, $id, $nombre, $interprete, $anio, $auxDestino);
            CerrarSQL($server);
        }
        break;
    }
    case 'borrar':  {
        $server = ConnectSQL();

        if($server != false) {
            echo EliminarRegistro($server, $id);
            CerrarSQL($server);
        }
        break;
    }
    default: {
        echo "Estoy en el Default, algo salió muy mal";
        break;
    }
}

//TODO ESTO DEBE SER OPTIMIZADO PARA QUE NO SE REPITA CODIGO

function ConnectSQL() {
    $auxReturn = false;
    //los parametros son host (direción del server),usuario para el server,password por ahora es localhost, usuario seteado en Xammp (probar root) y "" (nada)        
    $mysqlServer = mysql_connect("localhost","root", "");
    //@mysql_connect(); //Evita mostrar los alerts y warnings

    if($mysqlServer != false) {
        $auxReturn = $mysqlServer;
        echo "Me pude conectar<br>";
    }
    else {
        echo "NO me pude conectar<br>";
    } 

    return $auxReturn;
}

function CerrarSQL($mySqlServer) {
    $auxReturn = false;

    if (mysql_close($mySqlServer)) {
        $auxReturn = true;
        echo "Cerré la conexción<br>";
    }
    else {
        echo "NO cerré la conexión<br>";
    }

    return $auxReturn;
}

function ObtenerUnoOVarios($id) {
    $auxReturn = false;

    $consultaResult = mysql_db_query("cdcol","SELECT titel AS 'Titulo', interpret As 'Interprete', jahr as 'Anio_Lanz', foto as 'Path' FROM cds WHERE id =".$id);
    if($consultaResult != false) {
        if($consultaResult > 0) {
            $objResultado = mysql_fetch_object($consultaResult);
            $auxReturn = $objResultado;
        }
        else {  
            echo "No encontré <br>";
        }
    }
    else {
        echo "Devolví false <br>";
    }

    return $auxReturn;
}

function AñadirRegistro($server, $nombre, $interprete, $anio, $auxDestino) {
    $auxReturn = false; 

    if(move_uploaded_file($_FILES["archivos"]["tmp_name"], $auxDestino)) {
        $consultaResult = mysql_db_query("cdcol","INSERT INTO cds (titel, interpret, jahr, foto) VALUES ('". $nombre ."','".$interprete."',".$anio.",'".$auxDestino."')");
        
        if($consultaResult != false) {
            echo mysql_insert_id($server)."<br>";
            $auxReturn = mysql_insert_id($server);
        }
        else {
            echo "Devolví false<br>";
        }
    }
    else {
        echo "No se pudo subir el archivo, no se agregará el registro.<br>";
    }

    return $auxReturn;
}

function ModificarRegistro($server, $id, $nombre, $interprete, $anio, $auxDestino) {
    $auxReturn = false;

    BorrarFoto($id);
    if(move_uploaded_file($_FILES["archivos"]["tmp_name"], $auxDestino)) {
        $consultaResult = mysql_db_query("cdcol","UPDATE cds SET titel='".$nombre."',interpret='".$interprete."', jahr =".$anio.", foto= '".$auxDestino."' WHERE id =".$id);
        if($consultaResult != false) {
            $auxReturn = mysql_affected_rows($server);
            echo "Modifiqué<br>";
        }
        else {
            echo "Devolví false<br>";
        }
    }

    return $auxReturn;
}

function BorrarFoto($id) {
    if($auxCancion = ObtenerUnoOVarios($id)) {
        if($auxCancion->Path != null) {
            unlink($auxCancion->Path);
        }
    }
}

function EliminarRegistro($server, $id) {
    $auxReturn = false; 

    BorrarFoto($id);
    $consultaResult = mysql_db_query("cdcol","DELETE FROM cds WHERE id =".$id);

    if($consultaResult != false) {
        echo "Borré<br>";
        $auxReturn = mysql_affected_rows($server);
    }
    else {
        echo "Devolví false<br>";
    }

    return $auxReturn;
}
?>