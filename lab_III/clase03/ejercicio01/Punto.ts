namespace FigurasNameSpace
{
    export class Punto
    {
        private _x : number; 
        private _y : number; 

        public constructor(x: number, y :number)
        {
            this._x = x;
            this._y = y;
        }

        public get GetX(): number
        {
            return this._x;
        }

        public get GetY(): number
        {
            return this._y;
        }
    }
}