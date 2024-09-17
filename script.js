function createButtons() {
  const buttonsContainer = document.getElementById("buttons");

  // Array of button labels
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

  // Loop through the array and create buttons
  buttonLabels.forEach((label, index) => {
    const button = document.createElement("div");
    button.id = `button_${label === "." ? "p" : label === "=" ? "e" : label}`;
    button.textContent = label;
    button.addEventListener("click", () => {
      display.textContent = button.textContent;
      console.log(button.textContent);
    });
    buttonsContainer.appendChild(button);
  });
}

function buttonEffect(button_name) {
  const num = Number(button_name);
  if (Number.isInteger(num)) {
    if (state !== "waiting_for_operator") {
      if (state == "waiting_for_operand_1") {
        operand1 = operand1 * 10 + num;
      } else if (state == "waiting_for_operand_2") {
        operand2 = operand2 * 10 + num;
      }
    }
  } else {
  }
}

function advanceState(state) {
  if (state == "waiting_for_operand_1") {
    state = "waiting_for_operator";
  } else if (state == "waiting_for_operator") {
    state = "waiting_for_operand_2";
  } else if (state == "waiting_for_operand_2") {
    state = "waiting_for_operand_1";
  }
  return state;
}

function operate(operand1, operand2, operator) {
  if (!operator in ["+", "-", "*", "/"]) {
    return "ERROR";
  }
  if (operator == "+") {
    return operand1 + operand2;
  } else if (operator == "-") {
    return operand1 - operand2;
  } else if (operator == "*") {
    return operand1 / operand2;
  } else if (operator == "/") {
    return operand1 / operand2;
  }
}

var display = document.querySelector("#display");

createButtons();
