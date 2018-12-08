/// <reference path="./Empleado.ts"/>

namespace EmpleadosEnFabrica
{
    export class Fabrica
    {
        protected _empleados: Array<Empleado>;
        protected _razonSocial: string;

        public constructor(razon: string)
        {
            this._empleados = new Array();
            this._razonSocial = razon;
        }

        private HayEmpleado(persona: Empleado): boolean
        {
            let auxRetorno = false;

            this._empleados.forEach(personaComp =>
            {
                if(personaComp.GetDni == persona.GetDni)
                {
                    auxRetorno = true;
                }               
            })

            return auxRetorno;
        }

        public AgregarEmpleado(persona: Empleado): boolean
        {
            let auxRetorno = false;

            if(!(this.HayEmpleado(persona)))
            {
                this._empleados.push(persona);
                auxRetorno = true;
            }

            return auxRetorno;
        }

        public EliminarEmpleado(persona: Empleado): boolean
        {
            let auxRetorno = false;

            if(this.HayEmpleado(persona))
            {
                let index: number = this._empleados.indexOf(persona);
                this._empleados.splice(index,1);
                auxRetorno = true;
            }

            return auxRetorno;
        }

        public CalcularSueldos(): number
        {
            let auxRetorno: number = 0;

            this._empleados.forEach(personaComp =>
            {
                auxRetorno+= personaComp.GetSueldo;           
            })

            return auxRetorno;
        }

        public ToString():string
        {
            let auxRetorno: string = `${this._razonSocial};`;

            this._empleados.forEach(personaComp =>
            {
                auxRetorno+= `${personaComp.ToString()};`;              
            })

            return auxRetorno;
        }
    }
}