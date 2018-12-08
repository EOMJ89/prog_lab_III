namespace EmpleadosEnFabrica
{
    export abstract class Persona
    {
        protected _apellido: string;
        protected _dni: number;
        protected _nombre: string;
        protected _sexo: string;

        public constructor(nombre: string, apellido:string, dni:number, sexo:string)
        {
            this._apellido = apellido;
            this._dni = dni;
            this._nombre = nombre;
            this._sexo = sexo[0].toLowerCase();
        }

        public get GetApellido():string
        {
            return this._apellido;
        }
        
        public get GetDni(): number
        {
            return this._dni;
        }
        
        public get GetNombre(): string
        {
            return this._nombre;
        }
        
        public get GetSexo(): string
        {
            return this._sexo;
        }
        
        public abstract Hablar(idioma: string): string;

        public ToString()
        {
            return `${this.GetNombre}-${this.GetApellido}-${this.GetDni}-${this.GetSexo}`;
        }
    }
}