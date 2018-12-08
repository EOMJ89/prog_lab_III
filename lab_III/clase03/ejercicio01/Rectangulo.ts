/// <reference path="./Punto.ts" />

namespace FigurasNameSpace
{
    export class Rectangulo
    {
        private _area: number;
        private _ladoUno: number; //Inicializado
        private _ladoDos: number; //Inicializado
        private _perimetro: number;
        private _vertice1: Punto; //Inicializado
        private _vertice2: Punto; //Inicializado
        private _vertice3: Punto; //Inicializado
        private _vertice4: Punto; //Inicializado

        public constructor(punto1 : Punto, punto3: Punto)
        {
            this._vertice1 = punto1;
            this._vertice3 = punto3;
            this._vertice2 = new Punto(punto1.GetX, punto3.GetY);
            this._vertice4 = new Punto(punto3.GetX, punto1.GetY);
            this._ladoUno = Math.abs(punto1.GetX - punto3.GetX);
            this._ladoDos = Math.abs(punto1.GetY - punto3.GetY);
            this._perimetro = (this._ladoUno*2) + (this._ladoDos*2);
            this._area = this._ladoUno * this._ladoDos;
        }

        public get GetArea():number
        {
            return this._area;
        }

        public get GetPerimetro():number
        {
            return this._perimetro;
        }

        public ToString(): string
        { 
            let auxRetorno = "Lado 1: " + this._ladoUno + " - Lado 2: " + this._ladoDos + " - Area: " + this.GetArea + " - Perimetro: " + this.GetPerimetro;
            return auxRetorno;
        }
    }
}