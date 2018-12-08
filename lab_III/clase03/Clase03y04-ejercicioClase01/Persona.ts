namespace PersonaAlumno
{
    export class Persona
    {
        private _nombre: string;
        private _apellido: string;

        public constructor(nombre: string, apellido: string)
        {
            this._nombre = nombre;
            this._apellido = apellido;
        }

        public get GetNombre(): string
        {
            return this._nombre;
        }
         
        public set SetNombre(value: string)
        {
            this._nombre = value;
        }

        public get GetApellido(): string
        {
            return this._apellido;
        }
         
        public set SetApellido(value: string)
        {
            this._apellido = value;
        }

        public ToString()
        {
            return this.GetNombre+"-"+this.GetApellido;
        }
    }
}