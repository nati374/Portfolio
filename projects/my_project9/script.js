// Advanced Calculator with Unique Operations

// Display element
let display = document.getElementById("display");

// Function to append input to the display
function appendToDisplay(value) {
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    display.value = "";
}

// Function to calculate the result
function calculateResult() {
    try {
        // Evaluate the expression in the display
        let result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

// Function to calculate square root
function calculateSquareRoot() {
    let value = parseFloat(display.value);
    if (value >= 0) {
        display.value = Math.sqrt(value);
    } else {
        display.value = "Error";
    }
}

// Function to calculate exponentiation
function calculatePower(exponent) {
    let base = parseFloat(display.value);
    display.value = Math.pow(base, exponent);
}

// Function to calculate factorial
function calculateFactorial() {
    let value = parseInt(display.value);
    if (value >= 0) {
        let factorial = 1;
        for (let i = 2; i <= value; i++) {
            factorial *= i;
        }
        display.value = factorial;
    } else {
        display.value = "Error";
    }
}

// Function to calculate percentage
function calculatePercentage() {
    let value = parseFloat(display.value);
    display.value = value / 100;
}

// Function to calculate logarithm (base 10)
function calculateLog() {
    let value = parseFloat(display.value);
    if (value > 0) {
        display.value = Math.log10(value);
    } else {
        display.value = "Error";
    }
}

// Function to calculate natural logarithm (base e)
function calculateLn() {
    let value = parseFloat(display.value);
    if (value > 0) {
        display.value = Math.log(value);
    } else {
        display.value = "Error";
    }
}

// Function to calculate sine (in degrees)
function calculateSin() {
    let value = parseFloat(display.value);
    display.value = Math.sin((value * Math.PI) / 180);
}

// Function to calculate cosine (in degrees)
function calculateCos() {
    let value = parseFloat(display.value);
    display.value = Math.cos((value * Math.PI) / 180);
}

// Function to calculate tangent (in degrees)
function calculateTan() {
    let value = parseFloat(display.value);
    display.value = Math.tan((value * Math.PI) / 180);
}

// Function to calculate absolute value
function calculateAbs() {
    let value = parseFloat(display.value);
    display.value = Math.abs(value);
}

// Function to calculate modulus
function calculateModulus() {
    let value = parseFloat(display.value);
    if (value !== 0) {
        display.value = value % 2; // Example: Modulus by 2
    } else {
        display.value = "Error";
    }
}