document.addEventListener("DOMContentLoaded", () => {
  const queryStringInput = document.getElementById("query_string");

  if (queryStringInput) {
    queryStringInput.addEventListener("input", () => {
      if (queryStringInput.value.trim() !== "") {
        queryStringInput.addEventListener("keydown", handleKeyDown);
      } else {
        queryStringInput.removeEventListener("keydown", handleKeyDown);
      }
    });

    function handleKeyDown(event) {
      if (event.key === "Enter") {
        search();
      }
    }
  }
});

function search() {
  var text = document.getElementById("query").value;
  var engine = document.querySelector('input[name="company"]:checked').value;

  if (engine === "bing") {
    var searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(text)}`;
  } else if (engine === "google") {
    var searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      text
    )}`;
  } else if (engine === "yahoo") {
    var searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(
      text
    )}`;
  }
  window.location.href = searchUrl;
}

function toggleCalculator(action) {
  const calculator = document.getElementById("calculator");
  if (action === "show") {
    calculator.showModal();
    calculator.style.display = "flex";
    return;
  } else if (action === "hide") {
    calculator.style.display = "none";
    calculator.close();
    return;
  }
}

function toggleDropdown(action) {
  const options = document.getElementById("domain_dropdown");
  if (action === "show") {
    options.style.display = "block";
    return;
  } else if (action === "hide") {
    options.style.display = "none";
    return;
  }
}
function changeDomain(domain) {
  const firstNumber = document.getElementById("first_num");
  const secondNumber = document.getElementById("second_num");

  firstNumber.placeholder = `First ${domain.toLowerCase()} number`;
  secondNumber.placeholder = `Second ${domain.toLowerCase()} number`;

  if (domain === "Binary") {
    firstNumber.setAttribute("pattern", "^[01]+$");
    secondNumber.setAttribute("pattern", "^[01]+$");
  } else if (domain === "Quinary") {
    firstNumber.setAttribute("pattern", "^[0-4]+$");
    secondNumber.setAttribute("pattern", "^[0-4]+$");
  } else if (domain === "Octal") {
    firstNumber.setAttribute("pattern", "^[0-7]+$");
    secondNumber.setAttribute("pattern", "^[0-7]+$");
  } else if (domain === "Hex") {
    firstNumber.setAttribute("pattern", "^[0-9a-fA-F]+$");
    secondNumber.setAttribute("pattern", "^[0-9a-fA-F]+$");
  }

  document.getElementById("domain").innerText = domain;
  document.getElementById("calculation_result").innerHTML = "";
  document.getElementById("domain_dropdown").style.display = "none";
}

function calculate(operator) {
  const firstInput = document.getElementById("first_num");
  const secondInput = document.getElementById("second_num");
  const domain = document.getElementById("domain").innerText;
  const a = firstInput.value;
  const b = secondInput.value;

  if (a === "" || b === "") {
    alert("Both numbers are required for calculation!");
    return;
  }

  const firstPattern = new RegExp(firstInput.getAttribute("pattern"));
  const secondPattern = new RegExp(secondInput.getAttribute("pattern"));

  if (!firstPattern.test(a) || !secondPattern.test(b)) {
    alert(`Please enter valid ${domain.toLowerCase()} numbers!`);
    return;
  }

  let base = 10;
  if (domain === "Binary") {
    base = 2;
  } else if (domain === "Quinary") {
    base = 5;
  } else if (domain === "Octal") {
    base = 8;
  } else if (domain === "Hex") {
    base = 16;
  }

  let firstNumber = parseInt(a, base);
  let secondNumber = parseInt(b, base);
  let result = 0;

  if (operator === "/") {
    if (secondNumber === 0) {
      alert("Division by zero is not possible!");
      return;
    }
    result = Math.floor(firstNumber / secondNumber);
    document.getElementById("calculation_result").innerHTML = `
        <div>(${a})<sub>${base}</sub></div>
        <div>&#247;&nbsp;(${b})<sub>${base}</sub></div>
        <hr/>
        <div>Q: (${result.toString(base)})<sub>${base}</sub></div>
        <div>R: (${(firstNumber % secondNumber).toString(
          base
        )})<sub>${base}</sub></div>`;
    return;
  } else if (operator === "+") {
    result = firstNumber + secondNumber;
  } else if (operator === "-") {
    result = firstNumber - secondNumber;
  } else if (operator === "*") {
    result = firstNumber * secondNumber;
  }

  document.getElementById("calculation_result").innerHTML = `
      <div>(${a})<sub>${base}</sub></div>
      <div>${operator}&nbsp;(${b})<sub>${base}</sub></div>
      <hr/>
      <div>(${result.toString(base)})<sub>${base}</sub></div>`;
}
