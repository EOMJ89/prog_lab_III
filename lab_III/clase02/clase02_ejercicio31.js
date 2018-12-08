"use strict";
function KeyPressed(event) {
    var char = event.key;
    document.getElementById("demo").innerHTML = "Key Pressed: " + char;
    var key = event.keyCode;
    console.log(key);
    console.log(char);
    document.getElementById("demo2").innerHTML = "Key Code: " + key;
    document.getElementById("all").style.backgroundColor = "#CCE6FF";
}
function MousePressed(event) {
    var char = "-1";
    var mouseId = event.button;
    if (mouseId == 0) {
        char = "Left Click";
    }
    else if (mouseId == 1) {
        char = "Whell Button";
    }
    else if (mouseId == 2) {
        char = "Right Click";
    }
    document.getElementById("demo").innerHTML = "Key Pressed: " + char;
    document.getElementById("demo2").innerHTML = "";
    document.getElementById("all").style.backgroundColor = "#FFFFCC";
}
function WhiteBackGound(event) {
    document.getElementById("all").style.backgroundColor = "white";
}
document.addEventListener("keydown", KeyPressed);
document.addEventListener("click", MousePressed);
document.addEventListener("mousemove", WhiteBackGound);
//# sourceMappingURL=clase02_ejercicio31.js.map