/// <reference path="./Fabrica.ts"/>

let empleado1 = new EmpleadosEnFabrica.Empleado("A","B",1,"M",100,5000);
let empleado2 = new EmpleadosEnFabrica.Empleado("Z","X",2,"F",101,6000);
let fabrica1 = new EmpleadosEnFabrica.Fabrica("Razón1");

console.log(empleado1.ToString());
console.log(empleado2.ToString());

if(fabrica1.AgregarEmpleado(empleado1))
{
    console.log("Se ha agregado al Empleado 1");
}
if(fabrica1.AgregarEmpleado(empleado2))
{
    console.log("Se ha agregado al Empleado 2");
}

console.log(fabrica1.ToString());

if(fabrica1.EliminarEmpleado(empleado1))
{
    console.log("Se ha eliminado al Empleado 1");
}
if(fabrica1.EliminarEmpleado(empleado2))
{
    console.log("Se ha eliminado al Empleado 2");
}

//tsc -target "es5" --outFile ./ejercicio03/ejercicio03_main.js ./ejercicio03/Persona ./ejercicio03/Empleado ./ejercicio03/Fabrica ./ejercicio03/ejercicio03_main