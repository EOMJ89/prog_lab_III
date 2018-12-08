<?php
    require_once "./clases/Usuario.php";
    require_once "./UsuarioAlta.php";
    require_once "./VerificarUsuario.php";

    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $clave = isset($_POST["clave"]) ? $_POST["clave"] : "";
    $auxUsuario = new Usuario($email, $clave);

    echo $auxUsuario->ToJson()."<br>";

    //echo json_encode($auxUsuario->GuardarEnArchivo())."<br>";

    /*$auxArray = Usuario::TraerTodos();
    foreach ($auxArray as $usuario) {
        echo $usuario->ToJson();
    }*/

    if(Usuario::VerificarExistencia($auxUsuario)) {
        echo "Existe Usuario<br>";  
    }

    //echo "Alta";
    //echo json_encode(ManejadorAlta::AltaUsuario())."<br>";
    //echo "Fin de alta, se verifica";
    echo json_encode(ManejadorUsuario::VerificarUsuario())."<br>";
?>