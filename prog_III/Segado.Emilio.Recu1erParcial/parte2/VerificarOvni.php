<?php
    require_once "./clases/ovni.php";

    class Verificar {
        public static function VerificarOvni() {
            $auxReturn = new stdClass();
            $auxReturn->Exito = true;
            $auxReturn->Mensaje = "No se ha verificado porque se ha ingreso un json incorrecto";

            $obj = isset($_POST["ovni"]) ? json_decode($_POST["ovni"]) : null;

            if($obj != null) {
                $auxOvni = new Ovni($obj->tipo,$obj->velocidad,$obj->planeta,$obj->foto);
                
                if($auxOvni->Existe($auxOvni)) {
                    $auxReturn->Mensaje = $auxOvni->ToJson();
                }
                else {
                    $auxArr = $this->Traer();
                    $boolPlaneta = false;
                    $boolTipo = false;

                    foreach($auxArr as $ovniA) {
                        if($ovniA->tipo == $auxOvniA->tipo) {
                            $boolTipo = true;
                        }
                        if($ovniA->planetaOrigen == $auxOvniA->planetaOrigen) {
                            $boolPlaneta = true;
                        }
                    }

                    $auxReturn->Mensaje="No se encuentra el Ovni ya que no coinciden ";

                    if($boolPlaneta && !$boolTipo) {
                        $auxReturn->Mensaje.= "Tipo";
                    }
                    else if (!$boolPlaneta && $boolTipo) {
                        $auxReturn->Mensaje.= "Planeta";
                    }
                    else if(!$boolPlaneta && !$boolTipo) {
                        $auxReturn->Mensaje.= "Ambos";
                    }
                }
            }

            return $auxReturn;
        }
    }

    echo json_encode(Verificar::VerificarOvni())."<br>";
?>