<?php
    session_start();
    
    if(isset($_SESSION["usuario"])) {
        $usuario = $_SESSION["usuario"];
        
        $lista = '<table border="0">
                    <tr>
                        <td><h4>Usuario</h4></td>
                        <td><h4>Foto</h4></td>
                    </tr>';

        $file = fopen("files/nombre_foto.txt","r");
        if($file != false) {
            while(!feof($file)) {
            $auxLinea = fgets($file);
            $array = explode("-",$auxLinea);

            if(count($array) > 1) {
                for($i=0; $i<count($array); $i++) {
                    $array[$i] = trim($array[$i]);
                }

                $lista.="<tr>
                            <td>".$array[0].'</td>
                            <td><img src="fotos/'.$array[1].'" alt="'.$array[1].'" height="100px" width="100px"></td>
                        </tr>';   
            }
        }
        }
        fclose($file);

        $lista.='<tr><td colspan="2"><a href="index.html">Volver al Index</a></td></tr>';
        $lista.='<tr><td colspan="2"><form method="POST" action="login.php"><input type="submit" name="salir" value="Cerrar Sesion"></form></td></tr>';
        $lista.="</table>";
    }
    else {
        echo "No está seteado";
        header("location:login.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Listado</title>
</head>
<body>
    <?php
        echo '<p align="right">Usuario: '.$usuario.'</p>'.$lista;
    ?>
</body>
</html>