<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ejercicio 34</title>
</head>
<body>
    <form method="POST" action="MostrarFecha.php">
        <table>
            <tr>
                <td>
                    <input type="checkbox" name="chbDia" value="1">Dia<br>
                    <input type="checkbox" name="chbMes" value="1">Mes<br>
                    <input type="checkbox" name="chbAnio" value="1">Año
                </td>
            </tr>
            <tr>
                <td><input type="submit" name="enviar" value="Mostrar"></td>
            </tr>
            <?php if(isset($mensaje)){
                    echo    "<tr>
                                <td><h4>{$mensaje}</h4></td>
                            </tr>";                            
                }
            ?>
        </table>
    </form>
</body>
</html>