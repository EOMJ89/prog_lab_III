<?php
$id = isset($_POST["id"]) ? $_POST["id"] : 0;

try {
    $conStr = "mysql:host=localhost;dbname=cdcol"; //NO USAR ESPACIOS
    $user = "root";
    $pass = "";
    $pdo = new PDO($conStr, $user, $pass); //Establece la conexión

    //Traer todos
    /** $sp = $pdo->prepare('SELECT * FROM cds'); //Prepara consulta
     * $sp->Execute(); //Ejecuta consulta n veces*/
    
    //Traer filtrado
    /** $sp = $pdo->prepare('SELECT * FROM cds WHERE id > :id'); //Prepara consulta con parametro, el :id indica que se reemplazará con un valor
     * $sp->Execute(array("id" => $id));
     * 
     * while($fila = $sp->fetch()) {
     *   var_dump($fila);
     * }*/


    //Fetch Lazy
    $sql = $pdo->query('SELECT * FROM cds');
    
    //Manual
    /** $auxJson = "[";
     * while($fila = $sql->fetch(PDO::FETCH_LAZY)) {
     *     $auxJson.= json_encode($fila).",";
     * }
     * $auxJson = substr($auxJson,0,(strlen($auxJson)-1));
     * $auxJson.= "]";
     * 
     * echo $auxJson;*/

    //Con Array
    /** $auxJson = array();
     * 
     * while($fila = $sql->fetch(PDO::FETCH_LAZY)) {
     *     $auxObj = new STDClass();
     *     $auxObj->id = $fila->id;
     *     $auxObj->interpret = $fila->interpret;
     *     $auxObj->titel = $fila->titel;
     *     $auxObj->jahr = $fila->jahr;
     *     array_push($auxJson,$auxObj); //$auxJson[] = $auxObj;
     * }
     * $jsonReturn = json_encode($auxJson);
     * 
     * echo $jsonReturn;*/

    //Fetch into
    require_once "cd.php";
    $sql->setFetchMode(PDO::FETCH_INTO, new cd);
    foreach ($sql as $cd) {
        echo $cd->Mostrar()."<br>";
    }
}
catch (PDOException $e) {
    echo "Exception Error: ". $e->getMessage();
}

?>