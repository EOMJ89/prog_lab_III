/// <reference path="./RectanguloFig.ts"/>

let rectangulo2 = new Ejercicio02.RectanguloFig("red", 4,5);
let triangulo1 = new Ejercicio02.Triangulo("blue",6,9);

console.log(rectangulo2.ToString());
console.log(rectangulo2.Dibujar());
console.log(triangulo1.ToString());
console.log(triangulo1.Dibujar());
//tsc -target "es5" --outFile ./ejercicio02/ejercicio02_main.js ./ejercicio02/FiguraGeometrica ./ejercicio02/RectanguloFig ./ejercicio02/Triangulo ./ejercicio02/ejercicio02_main