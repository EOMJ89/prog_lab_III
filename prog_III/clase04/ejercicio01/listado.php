<?php
    $lista = '<table border="0">
                <tr>
                    <td><h4>Nombre</h4></td>
                    <td><h4>Foto</h4></td>
                </tr>';

    $file = fopen("files/nombre_foto.txt","r");
    if($file != false) {
        while(!feof($file)) {
            $auxLinea = fgets($file);

            $lista.="<tr>
                        <td>".$auxLinea.'</td>
                        <td><a href="zoom.php?img=fotos/'.$auxLinea.'"><img src="fotos/'.$auxLinea.'" alt="'.$auxLinea.'" height="100px" width="100px"></a></td>
                    </tr>';   
        }
    }
    fclose($file);

    $lista.='<tr><td colspan="2"><a href="index.html">Volver al Index</a></td></tr>';
    $lista.="</table>";
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
        echo $lista;
    ?>
</body>
</html>