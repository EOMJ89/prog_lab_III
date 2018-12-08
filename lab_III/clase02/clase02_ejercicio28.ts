function CrearTabla(filas: string, columnas: string)
{
    var table: HTMLTableElement = (<HTMLTableElement>document.createElement("table"));
    (<HTMLTableElement>table).border = "1";
    (<HTMLTableElement>table).createTBody();

    for(let i=0; i<parseInt(filas, 10);i++)
    {
        let row: HTMLTableRowElement =(<HTMLTableElement>table).insertRow(0);

       for(let j=0; j<parseInt(columnas, 10);j++)
        {
            let cell: HTMLTableDataCellElement = (<HTMLTableRowElement>row).insertCell(0);
            (<HTMLTableDataCellElement>cell).innerHTML="HEY!";
        }
    }

    var nodeSpecialNode: HTMLElement = (<HTMLElement> document.getElementById("auxDiv"));
    (<HTMLElement>nodeSpecialNode).appendChild((<HTMLElement>table));
}