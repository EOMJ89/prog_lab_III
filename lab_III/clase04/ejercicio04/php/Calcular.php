<?php

    $priOp = $_POST["priOp"];
    $segOp = $_POST["segOp"];
    $operator = $_POST["operator"];

    switch ($operator) {
        case '+': {
            echo ($priOp+$segOp);
            break;
        }
        case '-': {
            echo ($priOp-$segOp);
            break;
        }
        case '*': {
            echo ($priOp*$segOp);
            break;
        }
        case '/': {
            if($segOp != 0) {
                echo ($priOp/$segOp);
            }
            else {
                echo "false/";
            }
            break;
        }
        default: {
            break;
        }
    }
?>