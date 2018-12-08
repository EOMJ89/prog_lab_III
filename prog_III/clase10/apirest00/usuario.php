<?php
require_once "./AccesoDatos.php";

class Usuario {
    public function Verificar($request, $response, $next) {
        $auxreturn = null;
        $response->getBody()->write("<br>Realizo el verificar");

        if ($request->isGet()) {
            $auxreturn = $next($request, $response);
        }
        else {
            /*El usuario string es {"usuario":"Rosa","clave":"91011","administrador":"false"}*/
            $array= $request->getParsedBody();
            $usuarioObj = json_decode($array["usuario"]);
    
            /*if(!($usuarioObj->administrador === "true")) {
                $response->getBody()->write("<h2>Usuario ".$usuarioObj->usuario." no valido</h2>");
                $auxreturn = $response;
            }
            else {
                $response->getBody()->write("<h3>Bienvenido, ".$usuarioObj->usuario."</h3>");
                $auxreturn = $next($request, $response);
            }*/
           
            if(!(Usuario::ExisteUsuario($usuarioObj))) {
                $response->getBody()->write("<h2>Usuario ".$usuarioObj->usuario." no valido</h2>");
                $auxreturn = $response;
            }   
            else {
                $response->getBody()->write("<h3>Bienvenido, ".$usuarioObj->usuario."</h3>");
                $auxreturn = $next($request, $response);
            }
        }
        return $auxreturn;
    }

    public static function ExisteUsuario($user) {
        $auxreturn = false;

        $file = fopen("./Usuarios.txt","r");

        if($file != false) {
            while(!feof($file)) {
                $auxLinea = trim(fgets($file));
                $auxArr = explode("-", $auxLinea);

                if($auxArr[0] == $user->usuario) {
                    if($auxArr[1] == $user->clave) {
                        $auxreturn = true;
                    }
                }
            }
        }
        fclose($file);

        return $auxreturn;
    }

    public function VerificarPDO($request, $response, $next) {
        $auxreturn = null;
        $response->getBody()->write("<br>Realizo el verificar con PDO");

        if ($request->isGet()) {
            $auxreturn = $next($request, $response);
        }
        else {
            /*El usuario string es {"usuario":"Rosa","clave":"91011","administrador":"false"}*/
            $array = $request->getParsedBody();

            $usuarioObj = json_decode($array["usuario"]);
            //var_dump($usuarioObj); die();
            if(!(Usuario::ExisteUsuario($usuarioObj))) {
                $response->getBody()->write("<h2>Usuario ".$usuarioObj->usuario." no valido</h2>");
                $auxreturn = $response;
            }   
            else {
                if($request->isDelete()) {
                    if(Usuario::VerificarPermisos($usuarioObj)) {
                        $response->getBody()->write("<br>Usuario super_admin");
                        $auxreturn = $next($request, $response);
                    }
                    else {
                        $response->getBody()->write("<br>NO Usuario super_admin");
                        $auxreturn = $response;
                    }
                }
                else {
                    $auxreturn = $next($request, $response);
                }
            }
        }

        return $auxreturn;
    }

    public static function Traer() {
        $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();
        $consulta = $objetoDatos->RetornarConsulta('SELECT * FROM usuarios'); //Se prepara la consulta, aquí se podrían poner los alias
        $consulta->execute();

        $consulta->setFetchMode(PDO::FETCH_LAZY);
        return $consulta;
    }

    public static function TraerTabla() {
        $auxRetorno = "";
        $consulta = Usuario::Traer();

        foreach ($consulta as $usuarioA) {
            $auxRetorno.= $usuarioA->id."-".$usuarioA->usuario."-".$usuarioA->clave."-".$usuarioA->perfil."<br>";
        }

        return $auxRetorno;
    }

    private static function VerificarPermisos($usuario) {
        $auxRetorno = false;
        $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();
        $consulta = $objetoDatos->RetornarConsulta('SELECT * FROM usuarios WHERE usuario="'.$usuario->usuario.'" AND clave="'.$usuario->clave.'"'); //Se prepara la consulta, aquí se podrían poner los alias
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);

        if($consulta->rowCount() > 0) {
            foreach($consulta as $usuarioA) {
                if($usuarioA->perfil === "super_admin") {
                    $auxRetorno = true;
                }
            }
        }

        return $auxRetorno;
    }

    public static function EliminarUsuario($id) {
        $auxRetorno = false;
        $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();
        $consulta = $objetoDatos->RetornarConsulta('DELETE FROM usuarios WHERE id='.$id); //Se prepara la consulta, aquí se podrían poner los alias
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);

        if($consulta->rowCount() > 0) {
            $auxRetorno = true;
        }

        return $auxRetorno;
    }

    
    public static function ModificarUsuario($userMod) {
        $auxRetorno = false;
        $objetoDatos = AccesoDatos::ObtenerObjetoAcceso();
        $consulta = $objetoDatos->RetornarConsulta('UPDATE usuarios SET usuario="'.$userMod->usuario.'", clave="'.$userMod->clave.'", perfil="'.$userMod->perfil.'" WHERE id="'.$userMod->id.'"'); //Se prepara la consulta, aquí se podrían poner los alias
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_LAZY);

        if($consulta->rowCount() > 0) {
            $auxRetorno = true;
        }

        return $auxRetorno;
    }
}
?>