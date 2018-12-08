<?php
    require_once "adminSesion/validarSesion.php";
    include_once "clases-interfaces/fabrica.php";

    $headerPag = "Alta de Empleados";
    $tituloPag = "Formulario Alta Empleado";
    $modoFormulario = 'agregar';
    $buttonValue="Enviar";

    $formDNI = "";
    $formApellido = "";
    $formNombre = "";
    $formLegajo = "";
    $formSueldo = "";
    //Sexo
    $selMasculino = "";
    $selFemenino = "";
    //Turno
    $formTurnoM = "checked";
    $formTurnoT = "";
    $formTurnoN = "";

    if(isset($_POST["dniHidden"])) {
        //echo $_POST["dniHidden"];
        $auxDNI = $_POST["dniHidden"];
        //echo "Estoy en el index para modificar un empleado<br>";
        $auxFabrica = new Fabrica("FabricaDeAdministracion", 7);
        $auxFabrica->TraerDeArchivo("../archivos/empleados.txt");

        foreach($auxFabrica->GetEmpleados() as $empleadoA) {
            if($empleadoA->GetDni() == $auxDNI) {
                //Aquí se colocan los items dentro del Formulario
                //echo $empleadoA;
                $headerPag="Modificar Empleado";
                $tituloPag="Formulario Mofidicar Empleado";
                $modoFormulario = 'modificar';

                $formDNI = 'value="'.$empleadoA->GetDni().'" readonly';
                $formApellido = $empleadoA->GetApellido();
                $formNombre = $empleadoA->GetNombre();
                $formLegajo = 'value="'.$empleadoA->GetLegajo().'" readonly';
                $formSueldo = $empleadoA->GetSueldo();

                switch ($empleadoA->GetSexo()) {
                    case 'M': {
                        $selMasculino = "selected";
                        break;
                    }
                    case 'F': {
                        $selFemenino = "selected";
                        break;
                    }
                    default: {
                        echo "Estoy en el default del sexo, algo salió muy mal";
                        break;
                    }
                }

                switch ($empleadoA->GetTurno()) {
                    case 'M': {
                        $formTurnoM = "checked";
                        break;
                    }
                    case 'T': {
                        $formTurnoM = "";
                        $formTurnoT = "checked";
                        break;
                    }
                    case 'N': {
                        $formTurnoM = "";
                        $formTurnoN = "checked";
                        break;
                    }
                    default: {
                        echo "Estoy en el default del turno, algo salió muy mal";
                        break;
                    }
                }

                $buttonValue="Modificar";
                
                break;
            }
        }

    }/*
    else {
        echo "Estoy para añadir un empleado<br>";
    }*/
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 – <?php echo $tituloPag; ?></title>
    <script src="../javascript/funciones.js"></script>
</head>
<body>
    <h2><?php echo $headerPag; ?></h2>

    <form method="POST" action="administracion.php" enctype="multipart/form-data">
    <input type="hidden" name="hdnModificar"  value="<?php echo $modoFormulario?>">
        <table border="0" align="center">
            <tr>
                <td colspan="2">
                    <h4>Datos Personales</h4>
                    <hr>
                </td>
            </tr>
            <tr>
                <td>DNI:</td>
                <td>
                    <input type="number" id="txtDni" name="dni" min="1000000" max="55000000" <?php echo $formDNI; ?>>
                    <span id="spanDNI" style="display:none">*</span>
                </td>
            </tr>
            <tr>
                <td>Apellido:</td>
                <td>
                    <input type="text" id="txtApellido" name="apellido" value="<?php echo $formApellido; ?>">
                    <span id="spanApellido" style="display:none">*</span>
                </td>
            </tr>
            <tr>
                <td>Nombre:</td>
                <td>
                    <input type="text" id="txtNombre" name="nombre" value="<?php echo $formNombre; ?>">
                    <span id="spanNombre" style="display:none">*</span>
                </td>
            </tr>
            <tr>
                <td>Sexo</td>
                <td>
                    <select id="selectSexo" name="sexo">
                        <option value="---">Seleccione</option>
                        <option value="M" <?php echo $selMasculino; ?>>Masculino</option>
                        <option value="F" <?php echo $selFemenino; ?>>Femenino</option>
                    </select>
                    <span id="spanSexo" style="display:none">*</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <h4>Datos Laborales</h4>
                    <hr>
                </td>
            </tr>
            <tr>
                <td>Legajo</td>
                <td>
                    <input type="number" id="txtLegajo" name="legajo" min="100" max="550" <?php echo $formLegajo; ?>>
                    <span id="spanLegajo" style="display:none">*</span>
                </td>
            </tr>
            <tr>
                <td>Sueldo</td>
                <td>
                    <input type="number" id="txtSueldo" name="sueldo" min="8000" step="500" max="25000" value="<?php echo $formSueldo; ?>">
                    <span id="spanSueldo" style="display:none">*</span>
                </td>
            </tr>
            <tr>
                <td>Turno</td>
                <td>
                    <input type="radio" name="turno" value="M" onclick="CambiarSueldoMaximo()" <?php echo $formTurnoM; ?>> Mañana<br>
                    <input type="radio" name="turno" value="T" onclick="CambiarSueldoMaximo()" <?php echo $formTurnoT; ?>> Tarde<br>
                    <input type="radio" name="turno" value="N" onclick="CambiarSueldoMaximo()" <?php echo $formTurnoN; ?>> Noche<br>
                </td>
            </tr>
            <tr>
                <td>Foto</td>
                <td>
                    <input type="file" id="txtFoto" name="archivos">
                    <span id="spanFoto" style="display:none">*</span>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    <input type="reset" value="Limpiar">
                </td>
            </tr>
            <tr>
                <td colspan="2" align="right">
                    <input type="submit" value="<?php echo $buttonValue; ?>" name="enviar" onclick="return AdministrarValidaciones()">
                </td>
            </tr>
            <tr>
                <td align="center" colspan="2">
                    <a href="adminSesion/cerrarSesion.php">Cerrar Sesion</a>
                </td>
            </tr>
        </table>
    </form>
</body>
</html>