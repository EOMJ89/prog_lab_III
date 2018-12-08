<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ejercicio 30</title>
</head>
<body>
    <form method="post" action="AdminTabla.php">
        <table>
            <tr>
                <select name="filas">
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <select name="columnas">
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <input type="submit" name="generar" value="GenerarTabla">
            </tr>
        </table>
    </form>

    <?php if($tableGenerated != "") {
        echo $tableGenerated;
    }?>
</body>
</html>