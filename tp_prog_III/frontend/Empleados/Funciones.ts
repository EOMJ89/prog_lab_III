/// <reference path="./Login.ts" />
/// <reference path="./Empleados.ts" />
/// <reference path="./Mesas.ts" />
/// <reference path="./Productos.ts" />
/// <reference path="./Pedidos.ts" />
/// <reference path="./Pendientes.ts" />

$(document).ready(function () {
    /*Cuando el formulario esté completamente cargado*/

    /*Manejadores para el Login*/
    $('#loginForm').off('submit').submit(function (event) {
        //console.log("Hello login");
        Login.ManejadorLogin.Logear();
        event.preventDefault();
    });

    $('#loginDiv').prop('hidden', false);

    $('#idUserLogin').off('change').change(function (event) {
        $('#errorLogin').html('');
    });

    $('#idClaveLogin').off('change').change(function (event) {
        $('#errorLogin').html('');
    });

    Login.ManejadorLogin.VerificarLogin();

    /*Manejadores para la Alta de Pedidos*/
    $("#btnObtenerMesa").off('click').click(function () {
        Mesa.ManejadorMesa.TraerMesaVacia();
    });

    $("#mesasForm").off('submit').submit(function (event) {
        Pedidos.ManejadoraPedidos.IngresarPedido();
        event.preventDefault();
    });

    /*Traer el menú a la sección de pedidos*/
    Productos.ManejadoraProducto.TraerMenu();

    /*Manejadores para Empleados*/
    $("#empleadosForm").off('submit').submit(function (event) {
        Empleados.ManejadorEmpleados.Ingresar();
        event.preventDefault();
    });

    $("#btnTraer").off('click').click(function () {
        Empleados.ManejadorEmpleados.Traer();
    });

    /*Manejadores para los pendientes*/
    $('#btnTraerPendientes').off('click').click(function () {
        //console.log("PEEEENDIENTES");
        Pendientes.ManejadoraPendientes.ListaPendientes();
    });

    /*Manejador para ver el pedido*/
    $("#btnPedido").off('click').click(function () {
        window.location.replace('index.html');
    })

    /*Manejador para ver las comandas*/
    $('#btnTraerComandas').off('click').click(function () {
        Pedidos.ManejadoraPedidos.TraerPedidos();
    });

    /*Manejador para Mesas*/
    $('#btnTraerMesas').off('click').click(function () {
        Mesa.ManejadorMesa.TraerMesas();
    });

    $('#btnOperaciones').off('click').click(function () {
        Empleados.ManejadorEmpleados.CantOperaciones();
    });

    $('#btnResponseLogs').off('click').click(function () {
        Empleados.ManejadorEmpleados.MostrarLogs();
    });

    $('#btnOperacionesLogs').off('click').click(function () {
        Empleados.ManejadorEmpleados.MostrarOperaciones();
    });    

    $('#btnOpSector').off('click').click(function () {
        Empleados.ManejadorEmpleados.MostrarOperacionesSector();
    });
      
    $('#btnOperacionesSectorEmpleado').off('click').click(function () {
        Empleados.ManejadorEmpleados.MostrarOperacionesSectorEmpleado();
    });
      
    $('#btnCancelados').off('click').click(function () {
        Pedidos.ManejadoraPedidos.TraerCancelados();
    });

    $('#btnRetrasados').off('click').click(function () {
        Pedidos.ManejadoraPedidos.TraerRetrasados();
    });
    
    $('#btnMasVendido').off('click').click(function () {
        Productos.ManejadoraProducto.MasVendido();
    });
    
    $('#btnMenosVendido').off('click').click(function () {
        Productos.ManejadoraProducto.MenosVendido();
    });
    
    $('#btnMesas').off('click').click(function () {
        Mesa.ManejadorMesa.TraerEstadisticas();
    });
    
    $('#btnFacturas').off('click').click(function () {
        Mesa.ManejadorMesa.TraerFacturas();
    });    
    
    $('#btnFacturaEntre').off('click').click(function () {
        Mesa.ManejadorMesa.TraerFacturasFechas();
    });
    
    $('#btnReviews').off('click').click(function () {
        Mesa.ManejadorMesa.TraerPeorReview();
        Mesa.ManejadorMesa.TraerMejorReview();
    });
});
