<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ejercicio 29</title>
</head>
<body <?php echo 'style="background-color:'. $color .';"';?> >
    <form method="post" action="AdminColores.php">
    <table border="1" align="center">
        <thead>
            <th>Seleccionar Colores</th>
        </thead>
        <tr>
            <td><select name="nameColor" required>
                    <option value="#DC143C">Red (Actually Crimson)</option>
                    <option value="#4169E1">Blue (Actually Royal Blue)</option>
                    <option value="#800080">Purple (Actually real Purple)</option>
                    <option value="#98FB98">Green (Actually Pale Green)</option>
                    <option value="#FF8C00">Orange (Actually Dark Orange)</option>
                    <option value="#FFFF00">Yellow (Actually just Yellow)</option>
                    <option value="#20B2AA">Green (Actually Light Sea Green)</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><input type="submit" name="guardar" value="Cambiar Color"></td>
        </tr>
    </table>
    </form>
</body>
</html>