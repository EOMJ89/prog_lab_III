<?php 
    require_once "./clases/ovni.php";

    $auxOvni = new Ovni();
    $arrOvni = $auxOvni->Traer();

    $lista = '<table border="1">
                <tr>
                    <td><h4>Tipo</h4></td>
                    <td><h4>Velocidad</h4></td>
                    <td><h4>Planeta</h4></td>
                    <td><h4>Foto</h4></td>
                </tr>';

    foreach($arrOvni as $ovniA) {
        $lista.="<tr><td>".$ovniA->tipo.'</td><td>'.$ovniA->velocidad.'</td><td>'.$ovniA->planetaOrigen.'</td><td>';
        
        if($ovniA->pathFoto != null) {
            //echo "Entré al if path diferente de ''";
            if(file_exists("img/".$ovniA->pathFoto)) {
                //echo "File exist";
                $lista.= '<img src="img/'.$ovniA->pathFoto.'" height="100px" width="100px">'; 
            }
            else {
                $lista.= 'There is no path '.$ovniA->pathFoto; 
            }
        }
        else {
            //echo "Entré al else del path diferente de ''";
            $lista.= 'No Photo';
        }

        $lista.= "</td></tr>";
    }
    
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
    <?php echo $lista; ?>
</body>
</html>