<?php
    class Enigma {
        /*Aplicación Nº 28 (Encriptar / Desencriptar archivos)
        Crear una página web que permita encriptar mensajes y que se guarden en un archivo de texto
        y que sólo si se lee el archivo desde la página se podrá acceder a su texto claro, es decir se
        desencriptará.
        Crear la clase Enigma, la cual tendrá la funcionalidad de encriptar/desencriptar los mensajes.
        Su método estático Encriptar, recibirá un mensaje y a cada número del código ASCII de cada
        carácter del string le sumará 200. Una vez que cambie todos los caracteres, lo guardará en un
        archivo de texto (el path también se recibirá por parámetro). Retornará TRUE si pudo guardar
        correctamente el archivo encriptado, FALSE, caso contrario.
        El método estático Desencriptar, recibirá sólo el path de dónde se leerá el archivo. Realizar el
        proceso inverso para restarle a cada número del código ASCII de cada carácter leído 200, para
        poder retornar el mensaje y ser mostrado desesncriptado.*/

        public static function Encriptar($texto){
            $auxReturn = false;
            $file = fopen("./archivos/mensajeEncript.txt", "w+");

            for($i=0; $i<strlen($texto);$i++){
                fwrite($file, (ord($texto[$i])+200)." ");
                $auxReturn = true;
            }

            fclose($file);
            return $auxReturn;
        }

        public static function MostrarEncriptado($path) {
            $file = fopen($path, "r+");
            $auxReturn = fread($file, filesize($path));
            fclose($file);
            return $auxReturn;
        }

        public static function Desencriptar($path) {
            $auxReturn = ""; //Variable de retorno
            $file = fopen($path, "r+"); //Apertura del archivo
            $arrayAcsii = array(); //Variable auxiliar
            $auxLinea = fread($file, filesize($path)); //Variable auxiliar con el contenido del archivo
            $arrayLetras = explode(" ",$auxLinea); //Variable auxiliar con el contenido dividido en un array para manejar los codigos acsii con mejor precisión

            foreach ($arrayLetras as $numLetra) {
                //Recorre el array para eliminar los caracteres no convencionales
                $numLetra = trim($numLetra);

                //Y si el trim no es vacio...
                if($numLetra != "") {
                    array_push($arrayAcsii, ((int)$numLetra)); //Lo convierte en un acsii para agregarlo a la lista de acsii del mensaje
                }
            }

            foreach ($arrayAcsii as $numeroAcsii) {
                //Recorre el array de acsiis para convertir cada codigo en un caracter y eliminar la enfritacion, luego agregandolo al mensaje de retorno
                $auxReturn.=chr($numeroAcsii-200);
            }

            fclose($file);
            return $auxReturn;
        }
    }
?>