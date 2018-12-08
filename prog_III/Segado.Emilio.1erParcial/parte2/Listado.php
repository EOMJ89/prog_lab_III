<?php 
    require_once "./clases/Televisor.php";

    $auxTelevisor = new Televisor();
    $auxTeles = $auxTelevisor->Traer();

    $lista = '<table border="1">
                <tr>
                    <td><h4>Tipo</h4></td>
                    <td><h4>Precio</h4></td>
                    <td><h4>Pais</h4></td>
                    <td><h4>Precio con IVA</h4></td>
                    <td><h4>Foto</h4></td>
                </tr>';

    foreach($auxTeles as $tele) {
        $auxTele = json_decode($tele->ToJson());

        /*var_dump($auxTele);
        echo "<br>";*/

        $lista.="<tr><td>".$auxTele->tipo.'</td><td>'.$auxTele->precio.'</td><td>'.$auxTele->paisOrigen.'</td><td>'.$tele->CalcularIva().'</td><td>';
        
        if($auxTele->path != "") {
            //echo "Entré al if path diferente de ''";
            if(file_exists("img/".$auxTele->path)) {
                //echo "File exist";
                $lista.= '<img src="img/'.$auxTele->path.'" alt="'.$auxTele->path.'" height="100px" width="100px">'; 
            }
            else {
                $lista.= 'There is no path '.$auxTele->path; 
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