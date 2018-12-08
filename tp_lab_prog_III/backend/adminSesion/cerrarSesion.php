<?php
    session_start();
    //Remover variables de sesion
    session_unset();
    //Destuir Variables de sesion
    session_destroy();
    
    header("Location: ../../login.html");    
?>