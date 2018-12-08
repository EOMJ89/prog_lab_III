<?php
    $numNoticia = $_POST["noticia"];
    //echo "{$numNoticia}";
    $auxNoticias = GetNoticias();
    $countAuxNoticias = count($auxNoticias);
    //var_dump($auxNoticias);
    $comandoNoticias = $_POST["comando"];
    $auxReturn = "";
    
    if($countAuxNoticias >= 1) {
        switch ($comandoNoticias) {
            case 'adelante':
            case 'seguir':  {
                if($numNoticia < $countAuxNoticias) {
                    $auxReturn.= "{$numNoticia}-".$auxNoticias[$numNoticia];
                }
                else {
                    $auxReturn.= "0-".$auxNoticias[0];    
                }
                break;
            }
            case 'atras': {
                if($numNoticia == 1) {
                    $auxReturn.=  ($countAuxNoticias-1)."-".$auxNoticias[($countAuxNoticias-1)];
                }
                else {
                    $auxReturn.= ($numNoticia-2)."-".$auxNoticias[($numNoticia)-2];
                }
                break;
            }
            default: {
                $auxReturn="false";
                break;
            }
        }
        
    }

    //$auxNoticiasNumReturn = $numNoticia+1;
    //$auxReturn.= "{$auxNoticiasNumReturn}-{$numNoticia}";
    echo $auxReturn;

    //Simula el registro de noticias del día
    function GetNoticias() {
        $auxNoticiasArray = array();
        $file = fopen("noticias.txt", "r");

        if($file != false) {
            while(!feof($file)) {
            $auxLinea = trim(fgets($file));

            array_push($auxNoticiasArray,$auxLinea);
            }
        }
        fclose($file);
        
        return $auxNoticiasArray;
    }
?>