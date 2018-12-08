<?php
    /**/
    $strComando = $_POST["comando"];
    $auxReturn="";

    switch ($strComando) {
        case 'cargar': {
            $auxReturn = CargarProvincias();
            break;
        }
        case 'cambiar': {
            $boolProvincia = isset($_POST["codigo"]) ? true : false;

            if($boolProvincia) {
                $auxReturn = "Ciu-".CargarCiudades($_POST["codigo"]);
                //echo $_POST["codigo"];
            }
            else {
                $auxReturn = "false en cambiar";
            }
            break;
        }
        default:
            $auxReturn = "false por default";
            break;
    }
    
    echo $auxReturn;

    function CargarProvincias() {
        $auxProvincias = array("BA" => "Buenos Aires",
        "CA" => "Catamarca",
        "CH" => "Chaco",
        "CT" => "Chubut",
        "CB" => "C&oacute;rdoba",
        "CR" => "Corrientes",
        "ER" => "Entre R&iacute;os",
        "FO" => "Formosa",
        "JY" => "Jujuy",
        "LP" => "La Pampa",
        "LR" => "La Rioja",
        "MZ" => "Mendoza",
        "MI" => "Misiones",
        "NQ" => "Neuqu&eacute;n",
        "RN" => "R&iacute;o Negro",
        "SA" => "Salta",
        "SJ" => "San Juan",
        "SL" => "San Luis",
        "SC" => "Santa Cruz",
        "SF" => "Santa Fe",
        "SE" => "Santiago del Estero",
        "TF" => "Tierra del Fuego, Ant&aacute;rtida e Islas del Atl&aacute;ntico Sur",
        "TUC" => "Tucum&aacute;n");
        $auxReturn = "";

        foreach ($auxProvincias as $codigoProv => $provincia) {
            
            $auxReturn.='<li><a onclick="CambiarCiudades('."'{$codigoProv}'".')">'.$provincia.'</a></li>';
        }
        
        return $auxReturn;
    }

    function CargarCiudades($codigoProv) {
        $auxCiudades = array();
        $auxReturn = "";

        switch ($codigoProv) {
            case 'BA': {
                array_push($auxCiudades,"La Plata", "Bahia Blanca", "Mar del Plata", "Pergamino", "San Nicolas", "Necochea", "Carmen de Patagones", "Olavarr&iacute;a", "Azul", "Villa Gesell");
                break;
            }
            case 'CA': {
                array_push($auxCiudades,"San Fernando del Valle de Catamarca", "Valle Viejo", "Andalgal&aacute;", "Fiambal&aacute;", "Bel&iecute;n", "San Isidro", "Santa Mar&iacute;a", "Tinogasta", "Recreo", "San Jos&eacute; (Fray Mamerto Esqui&uacute;)", "San Isidro", "Santa Rosa", "San Antonio", "La Falda de San Antonio");
                break;
            }
            case 'CH': {
                array_push($auxCiudades,"Resistencia", "Presidencia Roque Saenz Peña", "Villa &Aacute;ngela y Barranqueras");
                break;
            }
            case 'CT': {
                array_push($auxCiudades,"Comodoro Rivadavia", "Trelew", "Puerto Madryn", "Esquel", "Rawson");
                break;
            }
            case 'CB': {
                array_push($auxCiudades,"C&oacute;rdoba", "R&iacute;o Cuarto", "Villa Carlos Paz","Villa Mar&iacute;a", "San Francisco", "Jes&uacute;s Mar&iacute;a", "Cosqu&iacute;n", "Alta Gracia", "R&iacute;o Tercero", "Villa Nueva", "Bell-Ville", "Marcos J&uacute;arez", "Arroyito");
                break;
            }
            case 'CR': {
                array_push($auxCiudades,"Corrientes", "Goya", "Santo Tom&acute;", "Paso de los Libres", "Curuz&uacute; Cuati&aacute;", "Gobernador Virasoro", "Mercedes", "Monte Caseros", "Esquina", "Ituzaingo", "Bella Vista");
                break;
            }
            case 'ER': {
                array_push($auxCiudades,"Paran&aacute;", "Concordia", "Gualeguaych&uacute;", "Concepci&oacute;n del Uruguay", "Gualeguay", "Villaguay", "Chajar&iacute;", "Victoria", "La Paz", "Nogoy&acute", "Col&oacute;n", "Diamante");
                break;
            }
            case 'FO': {
                array_push($auxCiudades,"Formosa", "Clorinda", "Comandante Fontana", "Ingeniero Ju&aacute;rez", "Piran&acute;", "El Espinillo");
                break;
            }
            case 'JY': {
                array_push($auxCiudades,"San Salvador de Jujuy", "San Pedro", "La Quiaca", "Ciudad Perico", "Libertador General San Mart&iacute;n", "Ledesma", "Palpal&aacute;", "Alto Comedero", "Fraile Pintado", "Caimancito", "Calilegua", "Tilcara", "Humahuaca");
                break;
            }
            case 'LP': {
                array_push($auxCiudades,"Santa Rosa", "General Pico", "Toay", "Realic&oacute;", "Macach&iacute;n", "Victorica", "Colonia 25 de Mayo", "Intendente Alvear", "Eduardo Castex", "General Acha");
                break;
            }
            case 'LR': {
                array_push($auxCiudades,"La Rioja", "Chilecito", "Aimogasta", "Chamical", "Chepes", "Villa Uni&oacute;n", "Nonogasta", "Famatina");
                break;
            }
            case 'MZ': {
                array_push($auxCiudades,"Mendoza", "Guaymall&eacute;n", "Maip&uacute;", "Lujan de Cuyo", "Godoy Cruz", "Las Heras", "Rivadavia", "San Rafael", "San Mart&iacute;n", "Tunuy&aacute;n", "Rivadavia", "Malarg&uuml;e", "General Alvear");
                break;
            }
            case 'MI': {
                array_push($auxCiudades,"Posadas", "Ober&aacute;", "Eldorado", "San Vicente", "Puerto Iguaz&uacute;", "Ap&oacute;stoles", "Leandro N. Alem", "Jard&iacute;n Am&eacute;rica", "San Pedro", "Montecarlo", "Arist&oacute;bulo del Valle", "El Soberbio");
                break;
            }
            case 'NQ': {
                array_push($auxCiudades,"Neuqu&eacute;n", "Jun&iacute;n de los Andes", "San Mart&iacute;n de los Andes", "Zapala", "Chos Malal", "Centenario", "Plottier", "Rinc&oacute;n de los Sauces", "Villa La Angostura", "Cutral Co", "Plaza Huincul", "San Patricio del Chañar", "Senillosa", "Alumine", "Loncopue", "Andacollo", "Las Lajas", "Huinganco", "Villa Pehuenia");
                break;
            }
            case 'RN': {
                array_push($auxCiudades,"Viedma", "San Carlos de Bariloche", "General Roca", "Cipolletti", "Villa Regina", "Allen", "San Antonio Oeste", "R&iaucte;o Colorado");
                break;
            }
            case 'SA': {
                array_push($auxCiudades,"Salta", "Tartagal", "Cafayate", "San Ram&oacute;n de la Nueva Or&aacute;n", "Rosario de Lerma", "General G&uuml;emes", "San Jos&eacute; de Met&aacute;n");
                break;
            }
            case 'SJ': {
                array_push($auxCiudades,"San Juan", "Caucete", "San Jos&eacute; de J&aacute;chal", "Villa General San Mart&iacute;n", "Chimbas", "Santa Luc&iacute;a");
                break;
            }
            case 'SL': {
                array_push($auxCiudades,"San Luis capital", "Villa Mercedes", "Merlo", "Concar&aacute;n", "Santa Rosa de Conlara", "Juana Koslay", "La Toma");
                break;
            }
            case 'SC': {
                array_push($auxCiudades,"R&iacute;o Gallegos", "Puerto Deseado", "Puerto Santa Cruz", "Caleta Olivia", "Yacimientos Río Turbio", "28 de noviembre", "El Calafate", "Puerto San Juli&aacute;n", "Pico Truncado", "Las Heras", "Perito Moreno");
                break;
            }
            case 'SF': {
                array_push($auxCiudades,"Rosario", "Santa Fe", "Esperanza", "Sunchales", "Villa Constituci&oacute;n", "Rafaela", "Santo Tom&eacute;", "Venado Tuerto", "Rufino", "Firmat", "Casilda", "Arroyo Seco", "Carcaraña", "Cañada de G&oacute;mez", "P&eacute;rez", "Granadero Baigorria", "Fray Luis Beltr&aacute;n", "San Lorenzo", "Villa Gobernador G&aacute;lvez", "San Jorge", "G&aacute;lvez", "San Justo", "Reconquista");
                break;
            }
            case 'SE': {
                array_push($auxCiudades,"Santiago del Estero", "La Banda", "Fr&iacute;as", "Añatuya", "Termas de R&iacute;o Hondo", "Quimil&iacute;", "Clodomira", "Suncho Corral");
                break;
            }
            case 'TF': {
                array_push($auxCiudades,"Ushuaia", "R&iacute;o Grande", "Tolhuin");
                break;
            }
            case 'TUC': {
                array_push($auxCiudades,"San Miguel de Tucum&aacute;n", "Banda del R&iacute;o Sal&iacute;", "Taf&iacute; Viejo", "Aguilares", "Concepci&oacute;n", "Monteros", "Simoca", "El Siamb&oacute;n", "San Javier", "San Pedro de Colalao", "Yerba Buena", "Taf&iacute; del Valle");
                break;
            }
            default: {
                $auxReturn = "false";
                break;
            }
        }

        if(count($auxCiudades) > 0) {
            foreach ($auxCiudades as $ciudad) {
                $auxReturn.= '<li>'.$ciudad.'</li>';
            }
        }

        return $auxReturn;
    }
?>