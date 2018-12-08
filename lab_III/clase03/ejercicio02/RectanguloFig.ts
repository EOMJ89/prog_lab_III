/// <reference path="./FiguraGeometrica.ts" />

namespace Ejercicio02
{
    export class RectanguloFig extends FiguraGeometrica
    {
        private _ladoUno: number;
        private _ladoDos: number;

        public constructor(color: string, lado1:number, lado2:number)
        {
            super(color);

            this._ladoUno=lado1;
            this._ladoDos=lado2;
        }

        protected CalcularDatos()
        {
            this._perimetro = this._ladoUno*2 + this._ladoDos*2;
            this._superficie = this._ladoUno*this._ladoDos;
        }

        public Dibujar(): string
        {
            let auxReturn="";

            for(let i=0; i<this._ladoUno; i++)
            {
                for(let j=0; j<this._ladoDos;j++)
                {
                    auxReturn+="*";
                }

                auxReturn+="\n";
            }

            return auxReturn;
        }

        public ToString():string
        {
            return `${super.ToString()}-${this._ladoUno}-${this._ladoDos}`;
        }
    }
}