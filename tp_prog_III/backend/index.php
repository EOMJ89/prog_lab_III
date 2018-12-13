<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

date_default_timezone_set('America/Argentina/Buenos_Aires');


require_once './composer/vendor/autoload.php';
//require_once './clases/Databases.php'; //Permitir el acceso a base de datos.
require_once './clases/AutenticadorJWT.php';
require_once './clases/MWAutenticador.php';
require_once './clases/MWComanda.php';
//require_once './clases/Sesion.php';
require_once './clases/SesionApi.php';
//require_once './clases/Empleado.php';
require_once './clases/EmpleadoApi.php';
//require_once './clases/Mesa.php';
require_once './clases/MesaApi.php';
//require_once './clases/Producto.php';
require_once './clases/ProductoApi.php';
//require_once './clases/Pedido.php';
require_once './clases/PedidoApi.php';
//require_once './clases/Encuesta.php';
require_once './clases/EncuestaApi.php';

$config['displayErrorDetails'] = true; //Mostrar información de errores: Desactivar al terminar.
$config['addContentLengthHeader'] = false; //Establecer el encabezado en Content-Lengh.

$app = new \Slim\App(["settings" => $config]);

$app->options('/{ruta:.+}', function ($request, $response, $args) {
    //Permite obtener los metodos permitidos dentro de cualquier ruta.
    return $response;
});

// $app->add(function ($req, $res, $next) {
//     $response = $next($req, $res);
//     return $response
//         ->withHeader('Access-Control-Allow-Origin', '*')
//         ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
//         ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

//     /**"Access-Control-Allow-Origin" indica si el contenido es accesible desde cierto dominio.
//      * "Access-Control-Allow-Headers" determina cuales encabezados pueden ser usados durante una solicitud.
//      * "Acess-Control-Allow-Methods" determina los metodos que van a ser aceptados en las peticiones.*/
// });

$app->group('/Empleado', function () {
    $this->post('/', \EmpleadoApi::class . '::CargarEmpleado'); //Cargar -> Funciona
    $this->delete('/', \EmpleadoApi::class . '::BorrarEmpleado'); //Borrar -> Funciona
    $this->update('/Modificar', \EmpleadoApi::class . '::ModificarEmpleado'); //Modificacion -> Funciona
    $this->post('/Suspender', \EmpleadoApi::class . '::Suspender')->add(\MWComanda::class . '::VerificarSocio'); //Suspension ->Funciona
    $this->post('/ListaEmpleados', \EmpleadoApi::class . '::TraerTodosLosEmpleados')->add(\MWComanda::class . '::VerificarSocio'); //Listado de todos los empleados, deberia pedir permisos de admin
    $this->get('/TraerUno/{id}', \EmpleadoApi::class . '::TraerEmpleado'); //Traer un empleado según id    
    $this->get('/Operaciones/{id}', \EmpleadoApi::class . '::CantidadDeOperaciones');
    $this->get('/Logueos', \EmpleadoApi::class . '::IngresosAlSistema');
    $this->get('/OperacionesEmpleados', \EmpleadoApi::class . '::OperacionesTodosEmpleados');
    $this->get('/OperacionesSector', \EmpleadoApi::class . '::OperacionesSectores'); //Operaciones por sector
    $this->get('/OperacionesEmpleadoSector/{sector}', \EmpleadoApi::class . '::OperacionesEmpleadosSector');
});

$app->group('/Pedidos', function () {
    $this->post('/', \PedidoApi::class . '::IngresarPedido'); //Ingresa un pedido
    $this->post('/PendientesEmpleado', \PedidoApi::class . '::TraerPendientesEmpleado')->add(\MWComanda::class . '::VerificarSuspendido'); //Traer Pendientes del empleado ingresado
    $this->post('/PrepararPedido', \PedidoApi::class . '::PrepararPedido')->add(\MWComanda::class . '::VerificarSuspendido'); //Prepara un pedido pendiente
    $this->post('/ServirPedido', \PedidoApi::class . '::ServirPedido')->add(\MWComanda::class . '::VerificarSuspendido'); //Sirve un pedido listo
    $this->post('/TiempoRestante', \PedidoApi::class . '::TiempoRestante'); //Calcula el tiempo restante de un pedido
    $this->post('/TraerPedidos', \PedidoApi::class .'::TraerPedidos')->add(\MWComanda::class . '::VerificarSuspendido');
    $this->post('/Cancelar', \PedidoApi::class . '::CancelarPedido')->add(\MWComanda::class . '::VerificarSuspendido');
    $this->get('/Cancelados', \PedidoApi::class . '::TraerCancelados');
    $this->get('/EntregasTardias', \PedidoApi::class . '::NoEntregadosATiempo');
    $this->get('/MasVendido', \PedidoApi::class . '::TraerMasVendido');
    $this->get('/MenosVendido', \PedidoApi::class . '::TraerMenosVendido');
});

$app->group('/Encuestas', function () {
    $this->post('/VerificarEncuesta', \EncuestaApi::class . '::TraerEncuesta');
    $this->post('/CargarEncuesta', \EncuestaApi::class . '::CargarEncuesta');
    $this->get('/Mejor', \EncuestaApi::class . '::MejorEncuesta');
    $this->get('/Peor', \EncuestaApi::class . '::PeorEncuesta');
});

$app->group('/Productos', function () {
    $this->get('/',\ProductoApi::class . '::TraerTodosLosProductos');
    $this->get('/{nombre}',\ProductoApi::class . '::TraerProducto');
});

$app->group('/Mesas', function () {
    $this->post('/TraerVacia', \MesaApi::class . '::TraerMesaVacia')->add(\MWComanda::class . '::VerificarMozo');;
    $this->post('/Cobrar',\MesaApi::class . '::CobrarMesa')->add(\MWComanda::class . '::VerificarMozo');
    $this->post('/Cerrar',\MesaApi::class . '::CerrarMesa')->add(\MWComanda::class . '::VerificarSocio'); //Solo socio
    $this->post('/Abrir',\MesaApi::class . '::Abrir')->add(\MWComanda::class . '::VerificarSocio'); //Solo socio
    $this->post('/TraerMesas',\MesaApi::class . '::TraerMesas')->add(\MWComanda::class . '::VerificarSocio')->add(\MWComanda::class . '::VerificarMozo');; //Solo socio
    
    $this->get('/MasUsada',\MesaApi::class . '::MasUtilizada');
    $this->get('/MenosUsada',\MesaApi::class . '::MenosUtilizada');
    $this->get('/NoSeUso',\MesaApi::class . '::NoSeUso');

    $this->get('/MasFacturo',\MesaApi::class . '::MasFacturo');
    $this->get('/MenosFacturo',\MesaApi::class . '::MenosFacturo');
    $this->get('/MenorFactura',\MesaApi::class . '::MenorFactura');
    $this->get('/MayorFactura',\MesaApi::class . '::MayorFactura');
    
    $this->post('/FacturadoEntreFechas',\MesaApi::class . '::FacturadoEntreFechas');
});

$app->group('/Sesion', function () {
    $this->post('/', \SesionApi::class . '::Login');//Funciona
    $this->put('/Salir', \SesionApi::class . '::Unlog');
});

$app->run();
