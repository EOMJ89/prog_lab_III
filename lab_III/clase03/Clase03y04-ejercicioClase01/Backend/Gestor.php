<?php
    //var_dump($_POST);
    $alumno = isset($_POST["alumno"]) ? $_POST["alumno"] : "";
    $metodo = $_POST["method"];

    switch ($metodo) {
        case 'GuardarEnArchivo': {
            echo GuardarEnArchivo($alumno);
            break;
        }
        case 'TraerDeArchivo': {
            echo TraerDeArchivo();
            break;
        }
        case 'Eliminar' : {
            echo Eliminar($alumno);
            break;
        }
        default: {
            echo "Default";
            break;
        }
    }

    function GuardarEnArchivo($alumno2) {
        $auxReturn = "false";
        $file = fopen("./alumnos.txt", "a+");

        if($file != null) {
            if(fwrite($file, "{$alumno2}\r\n") > 0) {
                $auxReturn = "true";
            }
        }
        fclose($file);
        return $auxReturn;
    }

    function TraerDeArchivo()
    {
        $auxReturn = "<table><tr><th>Legajo</th><th>Nombre</th><th>Apellido</th><th>Acci&oacute;n</th></tr>";

        //Abre el archivo para leer los alumnos
        $file = fopen("./alumnos.txt", "r");
        while(!feof($file)) {
            $auxLinea = fgets($file);
            $array = explode("-",$auxLinea);

            if(count($array) >1) {
                //Aplica trim a todos los indices del array como medida extra
                for($i=0; $i<count($array); $i++) {
                    $array[$i] = trim($array[$i]);
                }

                $auxReturn.="<tr>";

                for($j=0; $j<count($array);$j++) {
                    $auxReturn.= "<td>".$array[$j]."</td>";
                }

                //Aquí podría aplicarse como metodo el legajo para el metodo de eliminar
                $auxReturn.="<td><input type='button' value='Eliminar' onclick='PersonaAlumno.Alumno.Eliminar()'></a></td></tr>\n";
            }
        }
        fclose($file);

        return ($auxReturn.="</table>");
    }

    //Función sin terminar hasta el 21/9
    function Eliminar($alumno2) {
        $auxReturn = "false";
        $auxDiferentes = array();

        //Abre el archivo para poder leer todos los alumnos
        $file = fopen("./alumnos.txt", "r");
        while(!feof($file)) {
            $auxLinea = trim(fgets($file));

            /** Codigo que permita determinar si el alumno recibido y los que no son enviados de regreso al archivo mediante el array con
             * array_push($auxDiferentes,$auxLinea); */
        }
        fclose($file);
        
        //Recorre el array de alumnos para guardarlos en el archivo, reutilizando codigo
        foreach ($auxDiferentes as $valueAlum) {
            GuardarEnArchivo($valueAlum) == "false";
        }

        return $auxReturn;
    }
?>