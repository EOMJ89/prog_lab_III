function CalcularSignoZodiaco(fechaNacimiento:string): void
{
    var fechaSplit: Array<string>=fechaNacimiento.split("-");
    var mes: number = +fechaSplit[1];
    var dia: number = +fechaSplit[0];
    var signo: number = 0;
    var msj: string;

    switch (mes)
    {
        case 1:
        {
            signo = dia<20? 12:1;
            break;
        }
        case 2:
        {    
            signo = dia<20? 1:2;
            break;
        }
        case 3:
        {
            signo = dia<21? 2:3;
            break;
        }
        case 4:
        {
            signo = dia<21? 3:4;
            break;
        }
        case 5:
        {
            signo = dia<21? 4:5;
            break;
        }
        case 6:
        {
            signo = dia<22? 5:6;
            break;
        }
        case 7:
        {
            signo = dia<23? 6:7;
            break;
        }
        case 8:
        {
            signo = dia<24? 7:8;
            break;
        }
        case 9:
        {
            signo = dia<24? 8:9;
            break;
        }
        case 10:
        {
            signo = dia<23? 9:10;
            break;
        }
        case 11:
        {
            signo = dia<22? 10:11;
            break;
        }
        default:
        {
            signo = dia<22? 11:12;
            break;
        }
    }

    switch (signo) {
        case 1:
        {
            msj="Acuario"
            break;  
        }  
        case 2:
        {
            msj="Piscis"
            break; 
        }   
        case 3:
        {
            msj="Aries"
            break;
        }    
        case 4:
        {
            msj="Tauro"
            break;
        }    
        case 5:
        {
            msj="Geminis"
            break; 
        }   
        case 6:
        {
            msj="Cancer"
            break; 
        }   
        case 7:
        {
            msj="Leo"
            break; 
        }   
        case 8:
        {
            msj="Virgo"
            break;   
        } 
        case 9:
        {
            msj="Libra"
            break; 
        }   
        case 10:
        {
            msj="Escorpio"
            break;  
        }  
        case 11:
        {
            msj="Sagitario"
            break;  
        }
        default:
        {
            msj="Capricornio"
            break;
        }
    }

    console.log(`El signo es ${msj}`);
}

CalcularSignoZodiaco("22-01-12");
CalcularSignoZodiaco("25-02-12");
CalcularSignoZodiaco("25-03-12");
CalcularSignoZodiaco("25-04-12");
CalcularSignoZodiaco("25-05-12");
CalcularSignoZodiaco("25-06-12");
CalcularSignoZodiaco("25-07-12");
CalcularSignoZodiaco("25-08-12");
CalcularSignoZodiaco("25-09-12");
CalcularSignoZodiaco("25-10-12");
CalcularSignoZodiaco("25-11-12");
CalcularSignoZodiaco("25-12-12");