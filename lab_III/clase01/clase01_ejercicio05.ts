/**Guardar su nombre y apellido en dos variables distintas. Dichas variables serán pasadas
 * como parámetro de la función MostrarNombreApellido, que mostrará el apellido en
 * mayúscula y el nombre solo con la primera letra en mayúsculas y el resto en minúsculas.
 * El apellido y el nombre se mostrarán separados por una coma (,).
 * 
 * Nota: Utilizar console.log()*/

 function MapearTexto(texto: string)
 {
    texto = texto.charAt(0).toLocaleUpperCase() + texto.slice(1).toLocaleLowerCase();
    return texto;
 }

 function MostrarNombreApellido(nombre: string, apellido: string) :void
 {
    console.log(`${MapearTexto(nombre)},${MapearTexto(apellido)}`);
 }

 MostrarNombreApellido("emilio","segado");