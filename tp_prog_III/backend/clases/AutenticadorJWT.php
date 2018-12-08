<?php
require_once './composer/vendor/autoload.php';
use Firebase\JWT\JWT;

class AutenticadorJWT
{
    private static $miClaveSecreta = '0mb4ussb';
    private static $tipoEncriptacion = ['HS256'];
    private static $aud = null;
      
    public static function CrearToken($datos)
    {
        $ahora = time(); //Variable de tiempo para poder expirar el token
        //El token espirará en 10 minutos
        $payload = array(
              'iat'=>$ahora,
              'exp' => $ahora + (60*1000),
              //'aud' => self::Aud(),
              'data' => $datos,
              'app'=> "API REST PARA COMANDA 2018"
          );
       
        return JWT::encode($payload, self::$miClaveSecreta);
    }
      
    public static function VerificarToken($token)
    {
        if (empty($token)|| $token=="") {
            throw new Exception("El token esta vacio.");
        }
        try {
            //var_dump($token); die();
            $decodificado = JWT::decode($token, self::$miClaveSecreta, self::$tipoEncriptacion);
        } catch (ExpiredException $e) { //En caso de token invalido o fuera de tiempo (regularmente solo la segunda)
            throw new Exception("Clave fuera de tiempo\n".($e->getMessage()));
        }
          
        /*//Si no da error anteriormente, se verifica el origen.
        if ($decodificado->aud !== self::Aud()) {
            throw new Exception("No es el usuario valido");
        }*/
    }

    public static function ObtenerPayLoad($token)
    {
        return JWT::decode($token, self::$miClaveSecreta, self::$tipoEncriptacion);
    }

    public static function ObtenerData($token)
    {
        $payload = AutenticadorJWT::ObtenerPayLoad($token);
        return $payload->data;
    }
  
    private static function Aud()
    {
        $aud = '';
          
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }
          
        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();
          
        return sha1($aud);
    }
}
