function toggleCalculator(action) {
  const calculator = document.getElementById("calculator");
  if (action === "show") {
    calculator.showModal();
    calculator.style.display = "flex";
  } else if (action === "hide") {
    calculator.style.display = "none";
    calculator.close();
  }
}

let base1 = 2;
let base2 = 2;
let resultBase = 2;

function updateFirstBase() {
  const select = document.querySelector("#first_num select");
  base1 = parseInt(select.value);
}

function updateSecondBase() {
  const select = document.querySelector("#second_num select");
  base2 = parseInt(select.value);
}

function updateResultBase() {
    clearResult();
    const operationSelect = document.querySelector("#operations select");
    resultBase = parseInt(operationSelect.value);
}

function updatePattern() {
  updateFirstBase();
  setPattern(document.querySelector("#first_num input"), base1);
  updateSecondBase();
  setPattern(document.querySelector("#second_num input"), base2);
  updateResultBase();
}

function setPattern(input, base) {
  let pattern = "";
  let title = "";

  switch (base) {
    case 2:
      pattern = "[01]+";
      title = "Only 0 and 1 allowed";
      break;
    case 5:
      pattern = "[0-4]+";
      title = "Only digits 0–4 allowed";
      break;
    case 8:
      pattern = "[0-7]+";
      title = "Only digits 0–7 allowed";
      break;
    case 16:
      pattern = "[0-9A-Fa-f]+";
      title = "Digits 0–9 and letters A–F allowed";
      break;
    default:
      pattern = ".*";
      title = "Any input";
  }

  input.pattern = pattern;
  input.title = title;
}

function calculate(operator) {
  const inputs = document.querySelectorAll("#first_num input, #second_num input");
  const output = document.querySelector("#calculator output");

  const firstInput = inputs[0].value.trim();
  const secondInput = inputs[1].value.trim();

  let num1 = parseInt(firstInput, base1);
  let num2 = parseInt(secondInput, base2);

  if (isNaN(num1) || isNaN(num2)) {
    output.textContent = "Invalid input!";
    return;
  }

  let result;
  let resultHTML = "";

  switch (operator) {
    case "+":
      result = num1 + num2;
      resultHTML = `(${firstInput})<sub>${base1}</sub>&nbsp;+&nbsp;(${secondInput})<sub>${base2}</sub>&nbsp;=&nbsp;(${result.toString(resultBase)})<sub>${resultBase}</sub>`;
      break;
    case "-":
      result = num1 - num2;
      resultHTML = `(${firstInput})<sub>${base1}</sub>&nbsp;-&nbsp;(${secondInput})<sub>${base2}</sub>&nbsp;=&nbsp;(${result.toString(resultBase)})<sub>${resultBase}</sub>`;
      break;
    case "*":
      result = num1 * num2;
      resultHTML = `(${firstInput})<sub>${base1}</sub>&nbsp;×&nbsp;(${secondInput})<sub>${base2}</sub>&nbsp;=&nbsp;(${result.toString(resultBase)})<sub>${resultBase}</sub>`;
      break;
    case "/":
      if (num2 === 0) {
        output.textContent = "Division by zero!";
        return;
      }
      const quotient = Math.floor(num1 / num2);
      const remainder = num1 % num2;
      resultHTML = `Quotient&nbsp;=&nbsp;(${quotient.toString(resultBase)})<sub>${resultBase}</sub>
                    <br>
                    Remainder&nbsp;=&nbsp;(${remainder.toString(resultBase)})<sub>${resultBase}</sub>`;
      break;
    default:
      output.textContent = "Unknown operation";
      return;
  }

  output.innerHTML = resultHTML;
}

function clearResult() {
    document.querySelector("#calculator output").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  updatePattern();
});