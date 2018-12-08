namespace Ejercicio02
{
    export abstract class FiguraGeometrica
    {
        protected _color: string;
        protected _perimetro: number;
        protected _superficie: number;

        public constructor(color: string)
        {
            this._color = color;
            this._perimetro = 0;
            this._superficie = 0;
        }

        public get GetColor(): string
        {
            return this._color;
        }

        public ToString(): string
        {
            return `${this._color}-${this._perimetro}-${this._superficie}`;
        }

        public abstract Dibujar(): string;

        protected abstract CalcularDatos(): void;
    }
}