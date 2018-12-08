<?php
    $path = $_POST["path"];
    $wordToFind = $_POST["word"];

    if(file_exists($path)) {
        $file = fopen($path, "r");
        $auxResponse = fread($file, filesize($path));
        
        if(strpos($auxResponse, $wordToFind) !== false) {
            echo "22";
        }
        else {
            echo "21";
        }
    }
    else {
        echo "10";
    }
?>