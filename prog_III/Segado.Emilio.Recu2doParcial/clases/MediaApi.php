<?php
class MediaApi {
    public static function CargarMedia($request,  $response) {
        /*A nivel de aplicación:
        (POST) Alta de Medias (ID*, color, marca, precio y talle). * ID auto-incremental*/
        //{"color":"verde","marca":"nike","precio":"14.5","talle":"XL"}
        $jsonMedia = json_decode($request->getParsedBody()["media"]);
        //var_dump($jsonMedia);
        $media =new Media(null,$jsonMedia->color, $jsonMedia->marca, $jsonMedia->precio, $jsonMedia->talle);
        $id = Media::Insertar($media);
        
        $response->getBody()->write("Se ha insertado la media con el id {$id}.");
        return $response;
    }

    public static function MostrarMedias($request, $response) {    
        /*A nivel de ruta (/medias):
        (GET) Listado de todas las medias (JSON - status 200).*/
        $retorno = Media::TraerTodos();
        $lista = array();
        
        foreach ($retorno as $data) {
            $media =new Media($data->id, $data->color, $data->marca, $data->precio, $data->talle);
            array_push($lista,$media);
        }
    
        return $response->withJson($lista,200);
    }

    public static function ModificarMedia($request, $response) {
        //{"id":5,"color":"rojo","marca":"adidas","precio":"100","talle":"L"}
        $jsonMedia = json_decode($request->getParsedBody()['media']);
        //var_dump($jsonMedia); die();
        $media =new Media($jsonMedia->id, $jsonMedia->color, $jsonMedia->marca, $jsonMedia->precio, $jsonMedia->talle);
        
        if(Media::Modificar($media)->rowCount() > 0) {
            $response->getBody()->write("Se ha modificado la media");   
        }
        else {
            $response->getBody()->write("NO se ha modificado la media.");  
        } 
    
        //Nota: Va a devolver false si se intenta actualizar con los mismo datos que ya se tenian
        return $response;
    }

    public static function BorrarMedia($request, $response) {
        $idMedia = json_decode($request->getParsedBody());
        var_dump($idMedia);
        $media =new Media($idMedia);
    
        if(Media::Borrar($media)->rowCount() > 0) {
            $response->getBody()->write("Se ha borrado la media");   
        }
        else {
            $response->getBody()->write("NO se ha borrado la media");  
        }
        
        return $response;
    }
}?>