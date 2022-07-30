function add (a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

function populateDisplay(event, key=false) {
    let char;
    if (key === true){
        char = event.key
    } else {
        char = event.target.textContent;
    }
    let displayText = displaySpan.textContent;

    let lastChar = displayText.slice(-1);
    let secondLastChar = displayText.slice(-2, -1);
    let numOfOps = displayText.split(/[\+\-x÷]/).filter(Boolean).length - 1;

    // replaces number 0
    if (displayText === "0" && !["+", "-", "x", "÷", "."].includes(char)) {
        displayText = char;
        displaySpan.textContent = displayText;
        return;
    }

    if (["+", "-", "x", "÷"].includes(char) && numOfOps === 1) { // if there is already an operator
        calculate(displayText);
        displaySpan.textContent += char;
        return;
    }

     if (char === "."){
        let split = displayText.split(".");

        // if there are already 2 decimals, or if there is one decimal without an operator
        if (split.length === 3
            || (split.length === 2 && !["+", "-", "x", "÷"].some(el => split[1].includes(el)))) {
            return;
        }
     }

    // prevents double negatives at the start and triple negatives in the middle
    if (char === "-" && lastChar === "-"
        && secondLastChar !== "" && secondLastChar !== "-") {
        displayText += char;
        displaySpan.textContent = displayText;
        return;
    }

    // checks for double operators and operators at the start of the equation
    // allows negatives and decimals after another operator
    if (!(["+", "-", "x", "÷"].includes(char) && ["+", "-", "x", "÷"].includes(lastChar))
        && !(["+", "x", "÷"].includes(char) && lastChar === "")
        && !(char === "." && lastChar === ".")) {

        if (numOfOps === 1 && ["+", "-", "x", "÷"].includes(char)) {
            calculate(displayText);
            return;
        } else {
            displayText += char;
            displaySpan.textContent = displayText;
        }
    }
}

function calculate(displayText) {
    let op;
    let firstChar = displayText[0];
    let displayTextTemp;

    if (firstChar === "-") { // handle negative number
        displayTextTemp = displayText;
        displayText = displayText.slice(1);
    }

    let negativeSecondNumber = true;

    if (displayText.includes("+-")) {
        op = "+";
    } else if (displayText.includes("--")) {
        op = "-";
    } else if (displayText.includes("x-")) {
        op = "x";
    } else if (displayText.includes("÷-")) {
        op = "÷";
    }

    if (!op) {
        negativeSecondNumber = false;
        if (displayText.includes("+")) {
            op = "+";
        } else if (displayText.includes("-")) {
            op = "-";
        } else if (displayText.includes("x")) {
            op = "x";
        } else if (displayText.includes("÷")) {
            op = "÷";
        } else {
            console.log("ERROR");
            return;
        }
    }

    let [a, ...b] = displayText.split(op); // first occurrence
    if (b.length > 1){ // if there is an empty element, b was negative
        b = b.join("-");
    }
    // console.log(a,b);

    if (displayTextTemp) { // add negative sign to number
        a = firstChar + a;
        displayText = displayTextTemp;
    }

    let result = operate(op, a, b);
    
    prevSpan.textContent = displayText;
    displaySpan.textContent = Math.round(result * 100) / 100;
}

function equals() {
    let displayText = displaySpan.textContent;
    calculate(displayText);
}

function clear() {
    displaySpan.textContent = "";
    prevSpan.textContent = "";
}

function del() {
    let displayText = displaySpan.textContent;
    displaySpan.textContent = displayText.slice(0, -1);
}

document.addEventListener("keydown", event => {
    let possibleKeys = ["7", "8", "9", "+",
                        "4", "5", "6", "-", "1", "2", "3",
                        "x", ".", "0", "/"];
    if (possibleKeys.includes(event.key)) {
        populateDisplay(event);
    } else if (event.key === "c") {
        clear();
    } else if (event.key === "Delete") {
        del();
    } else if (event.key === "=") {
        equals();
    }
});

let displaySpan = document.querySelector("#current");
let prevSpan = document.querySelector("#prev");

let buttons = document.querySelector(".buttons");
let allButtons = buttons.querySelectorAll("button");
allButtons.forEach(button => {
    if (button.id === "equals") {
        button.addEventListener("click", equals);
    } else {
        button.addEventListener("click", populateDisplay);
    }
})

let clearDel = document.querySelector(".clear-del");
let clearDelButtons = clearDel.querySelectorAll("button");
clearDelButtons.forEach(button => {
    if (button.id === "clear") {
        button.addEventListener("click", clear);
    } else if (button.id === "del") {
        button.addEventListener("click", del);
    }
})