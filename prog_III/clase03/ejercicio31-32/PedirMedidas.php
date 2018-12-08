<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ejercicio 31 y 32</title>
</head>
<body>
    <form method="POST" action="CalcularMedidas.php">
        <table>
            <tr>
                <td><input type="number" name="lado1"></td>
                <td><input type="number" name="lado2"></td>
            </tr>
            <tr>
                <td>
                    <input type="radio" name="radioOption" value="1">Superficie<br>
                    <input type="radio" name="radioOption" value="2">Perimetro
                </td>
            </tr>
            <tr>
                <td><input type="submit" name="enviar" value="Calcular"></td>
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