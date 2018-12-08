<?php
    session_start();

    if(isset($_POST["salir"])){
        session_unset();
        setcookie("Usuario", "", time()-360);
    }
    else if(isset($_COOKIE["Usuario"])) {
        $_SESSION["usuario"] = $_COOKIE["Usuario"];
        header("location:listado.php");
    } 
    else if(isset($_POST["usuario"])) {
        $usuario = $_POST["usuario"];
        $esUsuario = false;

        $file = fopen("files/nombre_foto.txt","r");
        if($file != false) {
            while(!feof($file)) {
                $auxLinea = fgets($file);
                
                $array = explode("-",$auxLinea);

                if(count($array) > 1) {
                    for($i=0; $i<count($array); $i++) {
                        $array[$i] = trim($array[$i]);
                    }

                    if($array[0] == $usuario) {
                        $esUsuario = true;
                        break;
                    }
                }
            }
        }
        fclose($file);

        if($esUsuario) {
            if(isset($_POST["recuerda"])) {
                setcookie("Usuario", $usuario, time()+360);
            }
            
            $_SESSION["usuario"] = $usuario;
            
            //echo "Si es";
            header("location:listado.php");
        }
        else {
            session_unset();
            header("location:index.html");        
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
</head>
<body>
    <form method="POST" action="login.php">
        <table>
            <tr>
                <td><label>Usuario</label></td>
                <td>
                    <input type="text" name="usuario">
                </td>
            </tr>
            <tr>
                <td><label>Recuerdame</label></td>
                <td>
                    <input type="checkbox" value="true" name="recuerda">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="submit" value="Entrar">
                </td>
            </tr>
        </table>
    </form>
</body>
</html>