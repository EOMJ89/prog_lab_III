<?php
    $nombresObt  = $_FILES["archivos"]["name"]; //Obtengo los nombres de los archivos
    $tamaniosObt = $_FILES["archivos"]["size"]; //Obtengo los tamaños de los archivos

    $destinos= array(); //Indicará los destinos de los archivos en la carpeta "Uploads"
    $tiposArchivo = array();

    foreach($nombresObt as $nombreA) {
        //Por cada nombreA dentro del array de nombresObt
        $destinoA = "uploads/{$nombreA}"; //Asigno el destino de ese archivo a la carpeta "Uploads" bajo el mismo nombre

        array_push($destinos, $destinoA); //Añado el nuevo destino al array de destinos
        array_push($tiposArchivo, pathinfo($destinoA, PATHINFO_EXTENSION)); //Añado el tipo de archivo del archivo actual al array de tipos
        //Ambos arrays están correlacionados, por lo que cada indice comparte info del mismo archivo
    }

    //Boolean auxiliar que indica si se puede cargar o no
    $puedeCargar = true;

    //Verificacion para la existencia de archivo
    foreach($destinos as $destinoA){
        if (file_exists($destinoA)) {
            echo "El archivo {$destinoA} ya existe. No se subiran archivos";
            $puedeCargar = FALSE;
            break;
        }
    }

    //Validación de Tipos y Tamaños
    $tmpNames = $_FILES["archivos"]["tmp_name"]; //Obtiene los nombres de los archivos en la carpeta temporal
    $i=0;

    foreach($tmpNames as $tmpName) {
        //Por cada archivo temporal tmpName en el array tmpNames
        $isPic = getimagesize($tmpName); //Devuelve 0 si no es una imagen, pudiendose tomar como un false
        
        if($isPic === false) {
            //No es una imagen
            if($tiposArchivo[$i] == "doc" || $tiposArchivo[$i] == "docx") {
                //Pero es un tipo de archivo especificado
                if ($tamaniosObt[$i] > (61440*2)) {
                    echo "El archivo ".$nombresObt[$i]." es demasiado grande.";
                    $puedeCargar = FALSE;
                    break;
                }
            }
            else {
                //Y tampoco es de un tipo especificado
                if ($tamaniosObt[$i] > 512000) {
                    echo "El archivo ".$nombresObt[$i]." es demasiado grande.";
                    $puedeCargar = FALSE;
                    break;
                }
            }
        }
        else {
            //Es un archivo de imagen
            if($tiposArchivo[$i] == "jpg" || $tiposArchivo[$i] == "jpeg" || $tiposArchivo[$i] == "gif") {
                //Dentro de los tipos especificados
                if ($tamaniosObt[$i] > 307200) {
                    echo "El archivo ".$nombresObt[$i]." es demasiado grande.";
                    $puedeCargar = FALSE;
                    break;
                }
            }
            else {
                //De otro tipo
                if ($tamaniosObt[$i] > 512000) {
                    echo "El archivo ".$nombresObt[$i]." es demasiado grande.";
                    $puedeCargar = FALSE;
                    break;
                }
            }
        }
        $i++;
    }
    
    //Auxiliar para determinar si se íra al listado o de regreso al index
    $ir = true;
    
    if(!$puedeCargar) {
        //Si no se pueden cargar los archivos
        echo "<br>No se pueden cargar los archivos";
    }
    else {
        //Si se pueden cargar los archivos
        
        //Abre el archivo de texto para guardar la info de fecha_foto
        $file = fopen("files/nombre_foto.txt","a+");
        if($file != false) {
            for($i=0; $i<count($tmpNames); $i++) {
                if(fwrite($file, $nombresObt[$i]."\r\n") === false) {
                    $ir = false;
                    echo "<br>Hubo un error con el archivo ". basename($tmpNames[$i]).".";
                    break;
                }
            }
        }
        fclose($file);

        if($ir) {
            for($i=0; $i<count($tmpNames); $i++){
                if(move_uploaded_file($tmpNames[$i], $destinos[$i])) {
                    echo "<br>El archivo ". basename($tmpNames[$i]). "se ha sido subido.";
                } else {
                    echo "<br>Hubo un error con el archivo ". basename($tmpNames[$i]).".";
                    $ir = false;
                }
            }
        }

        if($ir) {
            echo "<br>Yes";
            header("location:listado.php");
        }
        else {
            //header("location:index.html");        
        }
    }

?>