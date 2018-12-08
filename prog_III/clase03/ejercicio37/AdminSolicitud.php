<?php
$mensaje = ""; 
$alta = isset($_POST["enviar"]) ? TRUE : FALSE;

if($alta) {
    //Variables recibidas desde el formulario
    $nombre = $_POST ['txtNombre'];
    $apellido = $_POST ['txtApellido'];
    $edad = $_POST ['txtEdad'];
    $direccion = $_POST ['txtDireccion'];
    $mail = $_POST ['txtEmail'];
    $curriculum = $_POST ['txtCurriculum'];

    $mensaje=  "Nombre: {$nombre}<br>
                Apellido: {$apellido}<br>
                Edad: {$edad}<br>
                Direcci&oacute;n: {$direccion}<br>
                Email: {$mail}<br>
                Curriculum: {$curriculum}<br>";

    include("./CurriculumCompleto.php");
}
?>