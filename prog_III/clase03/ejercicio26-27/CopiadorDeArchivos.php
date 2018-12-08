<?php
    class Copiador {
        public static function CopiarArchivos($sourcePath) {
            $auxReturn = false;
            $destPath = "../misArchivos/".date('Y_m_d_H_i_s').".txt";
            $file = fopen($sourcePath, "r");

            if(copy($sourcePath,$destPath)) {
                $auxReturn = true;
            }

            fclose($file);
            return $auxReturn;
        }

        public static function CopiarArchivoInvertido($sourcePath) {
            $auxReturn = false;
            $destPath = "../misArchivos/".date('Y_m_d_H_i_s')."_invertido.txt";

            $file = fopen($sourcePath, "r");
            $fileDest = fopen($destPath, "a+");

            $auxLinea = "";
            $auxContenidoInvertido = "";

            while(!(feof($file))) {
                $auxLinea = fgets($file);
                $auxLinea = trim($auxLinea);

                for($i=(strlen($auxLinea)-1); $i>=0; $i--) {
                    $auxContenidoInvertido.= $auxLinea[$i];
                }

                fwrite($fileDest, $auxContenidoInvertido)."\r\n";
                $auxReturn = true;
            }

            fclose($file);
            fclose($fileDest);

            return $auxReturn;
        }
    }
?>