var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ejercicio02;
(function (Ejercicio02) {
    var FiguraGeometrica = /** @class */ (function () {
        function FiguraGeometrica(color) {
            this._color = color;
            this._perimetro = 0;
            this._superficie = 0;
        }
        Object.defineProperty(FiguraGeometrica.prototype, "GetColor", {
            get: function () {
                return this._color;
            },
            enumerable: true,
            configurable: true
        });
        FiguraGeometrica.prototype.ToString = function () {
            return this._color + "-" + this._perimetro + "-" + this._superficie;
        };
        return FiguraGeometrica;
    }());
    Ejercicio02.FiguraGeometrica = FiguraGeometrica;
})(Ejercicio02 || (Ejercicio02 = {}));
/// <reference path="./FiguraGeometrica.ts" />
var Ejercicio02;
(function (Ejercicio02) {
    var RectanguloFig = /** @class */ (function (_super) {
        __extends(RectanguloFig, _super);
        function RectanguloFig(color, lado1, lado2) {
            var _this = _super.call(this, color) || this;
            _this._ladoUno = lado1;
            _this._ladoDos = lado2;
            return _this;
        }
        RectanguloFig.prototype.CalcularDatos = function () {
            this._perimetro = this._ladoUno * 2 + this._ladoDos * 2;
            this._superficie = this._ladoUno * this._ladoDos;
        };
        RectanguloFig.prototype.Dibujar = function () {
            var auxReturn = "";
            for (var i = 0; i < this._ladoUno; i++) {
                for (var j = 0; j < this._ladoDos; j++) {
                    auxReturn += "*";
                }
                auxReturn += "\n";
            }
            return auxReturn;
        };
        RectanguloFig.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + "-" + this._ladoUno + "-" + this._ladoDos;
        };
        return RectanguloFig;
    }(Ejercicio02.FiguraGeometrica));
    Ejercicio02.RectanguloFig = RectanguloFig;
})(Ejercicio02 || (Ejercicio02 = {}));
/// <reference path="./FiguraGeometrica.ts" />
var Ejercicio02;
(function (Ejercicio02) {
    var Triangulo = /** @class */ (function (_super) {
        __extends(Triangulo, _super);
        function Triangulo(color, b, h) {
            var _this = _super.call(this, color) || this;
            _this._base = b;
            _this._altura = h;
            return _this;
        }
        Triangulo.prototype.CalcularDatos = function () {
            this._perimetro = this._base * 3;
            this._superficie = (this._base * this._altura) / 2;
        };
        Triangulo.prototype.Dibujar = function () {
            var auxRetorno = "";
            for (var k = 1; k <= this._altura; k++) {
                for (var j = (this._base - k); j >= 1; j--) {
                    auxRetorno += "_";
                }
                for (var i = 1; i <= ((k * 2) - 1); i++) {
                    auxRetorno += "*";
                }
                auxRetorno += "\n";
            }
            return auxRetorno;
        };
        Triangulo.prototype.ToString = function () {
            return _super.prototype.ToString.call(this) + "-" + this._base + "-" + this._altura;
        };
        return Triangulo;
    }(Ejercicio02.FiguraGeometrica));
    Ejercicio02.Triangulo = Triangulo;
})(Ejercicio02 || (Ejercicio02 = {}));
/// <reference path="./RectanguloFig.ts"/>
console.log("A");
var rectangulo2 = new Ejercicio02.RectanguloFig("red", 4, 5);
var triangulo1 = new Ejercicio02.Triangulo("blue", 6, 9);
console.log("B");
console.log(rectangulo2.ToString());
console.log(rectangulo2.Dibujar());
console.log(triangulo1.ToString());
console.log(triangulo1.Dibujar());
//tsc -target "es5" --outFile ./ejercicio02/ejercicio02_main.js ./ejercicio02/FiguraGeometrica ./ejercicio02/RectanguloFig ./ejercicio02/Triangulo
