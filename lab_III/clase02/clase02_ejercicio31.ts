function KeyPressed(event: Event) {
    var char = (<KeyboardEvent>event).key;
   
    (<HTMLElement>document.getElementById("demo")).innerHTML = "Key Pressed: " + char;

    var key = (<KeyboardEvent>event).keyCode;
    console.log(key);
    console.log(char);
    (<HTMLElement>document.getElementById("demo2")).innerHTML = "Key Code: " + key;

    (<HTMLElement>document.getElementById("all")).style.backgroundColor = "#CCE6FF";
}

function MousePressed(event: Event)
{
    var char = "-1";
    var mouseId = (<MouseEvent>event).button;
    
    if(mouseId == 0)
    {
        char = "Left Click";
    }
    else if (mouseId ==1)
    {
        char = "Whell Button";
    }
    else if (mouseId == 2)
    {
        char = "Right Click";
    }

    (<HTMLElement>document.getElementById("demo")).innerHTML = "Key Pressed: " + char;
    (<HTMLElement>document.getElementById("demo2")).innerHTML = "";
    (<HTMLElement>document.getElementById("all")).style.backgroundColor = "#FFFFCC";
}

function WhiteBackGound(event: Event)
{
    (<HTMLElement>document.getElementById("all")).style.backgroundColor = "white";
}

document.addEventListener("keydown", KeyPressed);
document.addEventListener("click", MousePressed);
document.addEventListener("mousemove", WhiteBackGound );