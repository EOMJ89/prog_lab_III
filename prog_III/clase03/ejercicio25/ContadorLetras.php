<?php
    class Contador {
        public static function ContarLetras() {
            $file = fopen("../misArchivos/palabras.txt", "a+");
            $arrayContadores = array("Uno" => 0,"Dos" => 0,"Tres" => 0,"Cuatro" => 0,"+Cuatro" => 0,);

            $texto = fread($file,filesize("../misArchivos/palabras.txt"));
            $array = $array = explode(" ",$texto);

            for($i=0; $i<count($array); $i++) {
                $array[$i] = trim($array[$i]);
            }

            foreach ($array as $palabra) {
                switch (strlen($palabra)) {
                    case 1: {
                        $arrayContadores["Uno"]++;
                        break;
                    }
                    case 2: {
                        $arrayContadores["Dos"]++;
                        break;
                    }
                    case 3: {
                        $arrayContadores["Tres"]++;
                        break;
                    }
                    case 4: {
                        $arrayContadores["Cuatro"]++;
                        break;
                    }
                    default: {
                        $arrayContadores["+Cuatro"]++;
                        break;
                    }
                }
            }

            fclose($file);
            return $arrayContadores;
        }

        public static function ArmarTabla($arrayContadores) {
            $auxReturn= '<table border="1">
                            <tr>
                                <th>Codigo</th>
                                <th>Producto</th>
                            </tr>';

            foreach ($arrayContadores as $cant => $contador) {
                $auxReturn.= "<tr>
                                <td>{$cant}</td>
                                <td>{$contador}</td>
                            </tr>";
            }
            $auxReturn.= "</table>";

            return $auxReturn;
        }
    }
?>