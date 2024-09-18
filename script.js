class Calculator {
  constructor() {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = null;
    this.result = 0;
    this.displayValue = "0";
    this.isResultDisplayed = false;
    this.isOperationPending = false;
  }

  handleInput(input) {
    if (Number.isInteger(parseInt(input))) {
      this.handleNumber(parseInt(input));
    } else {
      this.handleOperation(input);
    }
  }

  handleNumber(number) {
    if (this.isResultDisplayed) {
      this.currentInput = number.toString();
      this.isResultDisplayed = false;
    } else {
      this.currentInput += number.toString();
    }
    this.displayValue = this.currentInput;
    this.updateDisplay();
  }

  handleOperation(op) {
    if (this.currentInput) {
      if (this.isOperationPending) {
        this.calculateResult();
      }
      this.previousInput = this.currentInput;
      this.currentInput = "";
      this.operation = op;
      this.isOperationPending = true;
    }
    this.updateDisplay();
  }

  handleEqual() {
    if (this.operation && this.currentInput) {
      this.calculateResult();
      this.isOperationPending = false;
      this.isResultDisplayed = true;
    }
    this.updateDisplay();
  }

  calculateResult() {
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);

    switch (this.operation) {
      case "+":
        this.result = prev + current;
        break;
      case "-":
        this.result = prev - current;
        break;
      case "*":
        this.result = prev * current;
        break;
      case "/":
        this.result = prev / current;
        break;
      default:
        return;
    }

    this.displayValue = this.result.toString();
    this.currentInput = this.result.toString();
    this.previousInput = "";
    this.operation = null;
  }

  handleClear() {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = null;
    this.result = 0;
    this.displayValue = "0";
    this.isResultDisplayed = false;
    this.isOperationPending = false;
    this.updateDisplay();
  }

  getDisplayValue() {
    return this.displayValue;
  }

  updateDisplay() {
    document.getElementById("display").textContent = this.displayValue;
  }
}

function createButtons() {
  const buttonsContainer = document.getElementById("buttons");

  const buttonLabels = [
    "1",
    "2",
    "3",
    "/",
    "4",
    "5",
    "6",
    "*",
    "7",
    "8",
    "9",
    "+",
    "0",
    ".",
    "=",
    "-",
    "AC",
  ];

  buttonLabels.forEach((label, index) => {
    const button = document.createElement("div");
    button.id = `button_${label === "." ? "p" : label === "=" ? "e" : label}`;
    button.classList.add("button");
    if (index % 4 === 3) {
      button.classList.add("button_special");
    }
    button.textContent = label;
    button.addEventListener("click", () => {
      handleButton(button.textContent);
    });
    buttonsContainer.appendChild(button);
  });
}

const calculator = new Calculator();

function handleButton(text) {
  if (Number.isInteger(parseInt(text))) {
    calculator.handleNumber(parseInt(text));
  } else if (text === "AC") {
    calculator.handleClear();
  } else if (text === "=") {
    calculator.handleEqual();
  } else {
    calculator.handleOperation(text);
  }
}

createButtons();
