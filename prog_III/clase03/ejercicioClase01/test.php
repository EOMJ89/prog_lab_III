<?php
    include_once "./Producto.php";

    $producto = new Producto($_REQUEST["nombre"],$_REQUEST["codBarra"]);

    if(Producto::Guardar($producto)) {
        echo "Se ha guardado<br>";
    }
    else {
        echo "No se ha guardado<br>";
    }

    /*$producto->SetNombre("B");
    $producto->SetCodBarra("02");

    echo $producto->ToString()."<br>";
    if(Producto::Guardar($producto)) {
        echo "Se ha guardado<br>";
    }
    else {
        echo "No se ha guardado<br>";
    }*/

    //Crear tabla con HTML para ordenar los productos

    echo '<table border="1">
            <tr>
                <th>Codigo</th>
                <th>Producto</th>
            </tr>';
    $auxProductos = Producto::TraerTodos();

    foreach ($auxProductos as $productoA) {
        echo "  <tr>
                    <td>{$productoA->GetCodBarra()}</td>
                    <td>{$productoA->GetNombre()}</td>
                </tr>";
    }
    echo "</table>";
?>