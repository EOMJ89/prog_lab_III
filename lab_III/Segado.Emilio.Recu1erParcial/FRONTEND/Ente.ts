namespace Entidades {
    export class Ente {
        protected _cuadrante : string;
        protected _edad : number;
        protected _altura : number;

        public constructor(cuadrante: string, edad: number, altura : number)
        {
            this._cuadrante = cuadrante;
            this._edad = edad;
            this._altura = altura;
        }

        public ToString() : string {
            return '"cuadrante":"'+this._cuadrante+'","edad": '+this._edad+',"altura":'+this._altura;
        }
    }
}