/// <reference path="./Persona.ts"/>

namespace EmpleadosEnFabrica
{
    export class Empleado extends Persona
    {
        protected _legajo: number;
        protected _sueldo: number;

        public constructor(nombre: string, apellido:string, dni:number, sexo:string, legajo:number, sueldo:number)
        {
            super(nombre, apellido, dni, sexo);
            this._sueldo = sueldo;
            this._legajo = legajo;
        }

        public get GetSueldo():number
        {
            return this._sueldo;
        }
        
        public get GetLegajo(): number
        {
            return this._legajo;
        }
        
        public Hablar(idioma: string): string
        {
            return `El empleado habla ${idioma}`;
        }

        public ToString()
        {
            return `${this.GetLegajo}-${super.ToString()}-${this.GetSueldo}`;
        }
    }
}