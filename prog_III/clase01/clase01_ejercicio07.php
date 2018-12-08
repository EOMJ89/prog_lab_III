<?php

	echo "Ejercicio 07<br/>";
	
	echo date(DATE_RFC2822);
	echo "<br/>";
	/* echo date('d - m - y');	
	echo "<br/>";
	echo date('d \o\f F, \Y\e\a\r Y (l)');
	echo "<br/>"; */
	
	switch(date('m'))
	{
		case 1:
		case 2:
		case 3:
			echo date('d - m - y');	
			if(date('d') < 21 && date('m') === 3)
			{ echo " Summer"; }
			else
			{echo " Fall"; }
			break;
		case 4:
		case 5:
		case 6:
			echo date('d - m - y');	
			if(date('d') < 21 && date('m') === 6)
			{ echo " Fall"; }
			else
			{echo " Winter"; }
			break;
		case 7:
		case 8:
		case 9:
			echo date('d - m - y');	
			if(date('d') < 21 && date('m') === 9)
			{ echo " Winter"; }
			else
			{echo " Spring"; }
			break;
		case 10:
		case 11:
		case 12:
			echo date('d - m - y');	
			if(date('d') < 21 && date('m') === 12)
			{ echo " Spring"; }
			else
			{echo " Summer"; }
			break;
		default:
			break;
	}
	
?>