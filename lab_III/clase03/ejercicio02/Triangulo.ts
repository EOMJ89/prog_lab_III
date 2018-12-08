/// <reference path="./FiguraGeometrica.ts" />

namespace Ejercicio02
{
    export class Triangulo extends FiguraGeometrica
    {
        private _base: number;
        private _altura: number;

        public constructor(color: string, b:number, h:number)
        {
            super(color);

            this._base=b;
            this._altura=h;
        }

        protected CalcularDatos()
        {
            this._perimetro = this._base*3;
            this._superficie = (this._base*this._altura)/2;
        }

        public Dibujar(): string
        {
            let auxRetorno ="";

            for(let k=1;k<=this._altura;k++)
            {
                for(let j=(this._base-k);j>=1;j--)
                {
                    auxRetorno+="_";
                }
                for(let i=1;i<=((k*2)-1);i++)
                {
                    auxRetorno+= "*";
                }
                
                auxRetorno+="\n";
            }

            return auxRetorno;
        }

        public ToString():string
        {
            return `${super.ToString()}-${this._base}-${this._altura}`;
        }
    }
}