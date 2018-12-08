<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ejercicio 39</title>
</head>
<body>
    <form method="post" action="AdminNum.php">
        <table align="center" border="1">
            <tr align="center"><th colspan="2"><h3>Numeros y sus car&aacute;cteristicas</h3></th></tr>
            <tr align="center">
                <td>Numero</td>
                <td><input type="number" name="txtNumber" placeholder=<?php if(isset($placeHold) && $placeHold != "") {echo $placeHold;} ?> ></td></tr>
            <?php if(isset($mensaje) && $mensaje!=""){
                echo    "<tr align='center'>
                            $mensaje
                        </tr>";      
            }
            ?>
            <tr><td align="center" colspan="2"><input type="submit" name="enviar" value="Mostrar Car&aacute;cteristicas"></td></tr>
        </table>
    </form>
</body>
</html>