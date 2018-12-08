<?php
    $nombresObt= $_FILES["archivos"]["name"]; //Obtengo nombres
    $tamaniosObt=$_FILES["archivos"]["size"]; //Obtengo tamaños

    $destinos= array(); //Indica los destinos de los archivos
    $tiposArchivo = array();

    foreach($nombresObt as $nombreA) {
        $auxNameFoto = date('Y_m_d')."_{$nombreA}";
        $destinoA = "fotos/{$auxNameFoto}"; //Asigno los destinos de cada archivo con su nombre en un auxiliar
        array_push($destinos, $destinoA); //Añado el auxiliar al array de destinos
        array_push($tiposArchivo, pathinfo($destinoA, PATHINFO_EXTENSION)); //Añado cada tipo de archivo al array de tipos
        //Ambos arrays están correlacionados, por lo que cada indice comparte info del mismo archivo
    }

    $puedeCargar = true; //Boolean auxiliar que indica si se puede cargar o no

    //Verificación de tamaños permitidos
    foreach($tamaniosObt as $sizeA){
        if ($sizeA > 1048576) {
            echo "Archivo demasiado grande. Verifique!!!";
            $puedeCargar = FALSE;
            break;
        }
    }

    $tmpNames = $_FILES["archivos"]["tmp_name"]; //Obtiene los nombres con los que se guardaría en el server
    $i=0;
    foreach($tmpNames as $tmpName) {
        $isPic = getimagesize($tmpName); //Si devuelve 0, no es una imagen
        
        if($isPic === false) {
            echo "Solo se permiten Imagenes.";
            $puedeCargar = FALSE;
            break;
        }
        else {
            //Filtro los tipos de imagenes
            if($tiposArchivo[$i] != "jpg" && $tiposArchivo[$i] != "jpeg") {
                echo "Solo son permitidas imagenes con extension JPG o JPEG.";
                $puedeCargar = FALSE;
                break;
            }
        }
        $i++;
    }
    
    if(!$puedeCargar) {
        echo "No se pueden cargar los archivos";
    }
    else {
        $ir = true;

        //Abre el archivo de texto para guardar la info de fecha_foto
        $file = fopen("files/nombre_foto.txt","a+");
        if($file != false) {
            for($i=0;$i<count($tmpNames);$i++) {
                $auxNameFoto = date('Y_m_d')."_".$nombresObt[$i];
                if(fwrite($file, $auxNameFoto."\r\n") === false) {
                    $ir = false;
                    echo "Hubo un error con el archivo ". basename($tmpNames[$i]).".";
                    break;
                }
            }
        }
        fclose($file);

        if(!$ir) {
            for($i=0;$i<count($tmpNames);$i++){
                if (move_uploaded_file($tmpNames[$i], $destinos[$i])) {
                    echo "El archivo ". basename($tmpNames[$i]). "se ha sido subido.";
                } else {
                    echo "Hubo un error con el archivo ". basename($tmpNames[$i]).".";
                    $ir = false;
                }
            }
        }

        if($ir) {
            echo "Yes";
            header("location:listado.php");
        }
        else {
            //header("location:index.html");        
        }
    }

?>