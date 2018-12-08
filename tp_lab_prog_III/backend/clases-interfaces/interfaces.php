<?php
    interface IArchivo {
        function GuardarEnArchivo($nombreArchivo);
        
        function TraerDeArchivo($nombreArchivo);
    }
?>