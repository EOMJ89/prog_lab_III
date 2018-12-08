<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Crear Enigmas</title>
</head>
<body>
    <?php
    require_once("./Enigma.php");
    ?>
    <form method="post" action="EncriptarEnigma.php">
        <form>
            <tr>
                <td><input type="text" name="txtEnigma" placeholder="Ingrese el texto..."></td>
            </tr>
            <tr>
                <td><input type="submit" value="Guardar" name="guardar"></td>
            </tr>
        </form>
    </form>
</body>
</html>