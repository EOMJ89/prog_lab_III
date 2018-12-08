<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Costo de Viaje</title>
</head>
<body>
    <table aling="center" border="1">
        <tr align="center"><td><h4>Costo del Viaje</h4></td></tr>
            <?php if(isset($mensaje)){
                    echo    "<tr>
                                <td>{$mensaje}</td>
                            </tr>";                            
                }
            ?>
            <tr align="center"><td><a class="button" href="./Lugares.html">Volver</a></td></tr>
    </table>        
</body>
</html>