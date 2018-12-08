/// <reference path="./Rectangulo.ts" />

namespace Ejercicio01{
let punto1 = new FigurasNameSpace.Punto(2,3);
let punto2 = new FigurasNameSpace.Punto(6,9);

let rectangulo1 =  new FigurasNameSpace.Rectangulo(punto1, punto2);

console.log(rectangulo1.ToString());
}
//tsc -target "es5" --outFile ./ejercicio01/ejercicio01_main.js ./ejercicio01/Punto ./ejercicio01/Rectangulo