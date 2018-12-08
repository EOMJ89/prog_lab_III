<?php
    $lista = '<table border="1">
                <tr>
                    <td><h4>Nombre Archivo</h4></td>
                    <td><h4>Extensión</h4></td>
                    <td><h4>Tamaño</h4></td>
                    <td><h4>Foto</h4></td>
                </tr>';

    $file = fopen("files/nombre_foto.txt","r");
    if($file != false) {
        while(!feof($file)) {
            $auxLinea = trim(fgets($file));

            if($auxLinea != "") {
                $lista.="<tr>
                            <td>".$auxLinea.'</td>
                            <td>'.pathinfo("uploads/{$auxLinea}", PATHINFO_EXTENSION).'</td>
                            <td>'.filesize("uploads/{$auxLinea}").'</td>
                            <td><img src="uploads/'.$auxLinea.'" alt="'.$auxLinea.'" height="100px" width="100px"></td>
                        </tr>';   
            }
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