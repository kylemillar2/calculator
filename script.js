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
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function populateDisplay(event) {
    let displayText = displaySpan.textContent;
    let char = event.target.textContent;
    let lastChar = displayText.slice(-1);
    if (!(["+", "-", "*", "/"].includes(char) && ["+", "-", "*", "/"].includes(lastChar))) {
        let num = displayText.split(/(\+-\*\/)/).length - 1;
        if (num === 1) {
            calculate(displayText);
            return;
        }
        displayText += char;
        displaySpan.textContent = displayText;
    }
}

function calculate(displayText) {
    let op;
    if (displayText.includes("+")) {
        op = "+";
    } else if (displayText.includes("-")) {
        op = "-";
    } else if (displayText.includes("*")) {
        op = "*";
    } else if (displayText.includes("/")) {
        op = "/";
    } else {
        console.log("ERROR");
        return;
    }
    let a = displayText.split(op)[0];
    let b = displayText.split(op)[1];
    let result = operate(op, a, b);
    
    displaySpan.textContent = result;
}

function equals() {
    let displayText = displaySpan.textContent;
    calculate(displayText);
}

function clear() {
    displaySpan.textContent = "";
}

function del() {
    let displayText = displaySpan.textContent;
    displaySpan.textContent = displayText.slice(0, -1);
}

let displaySpan = document.querySelector(".display span");

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
        button.addEventListener("click", clear)
    } else if (button.id === "del") {
        button.addEventListener("click", del)
    }
})