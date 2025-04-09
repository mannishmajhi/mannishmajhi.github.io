function calculateLoan() {
    let loan = parseFloat(document.getElementById("loan").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let installment = parseFloat(document.getElementById("installment").value);
    
    if (isNaN(loan) || isNaN(rate) || isNaN(installment) || loan <= 0 || rate <= 0 || installment <= 0) {
        document.getElementById("result").innerText = "Please enter valid values.";
        document.getElementById("loanTableBody").innerHTML = "";
        return;
    }
    
    const averageDaysInMonth = 30;
    let count = 0;
    let loanHistory = [];
    
    while (loan > 0) {
        let interest = (rate / 100.0) * loan * (averageDaysInMonth / 365.0);
        let reducedPrincipal = installment - interest;
        loan = loan - reducedPrincipal;
        count++;
        
        loanHistory.push({ count, interest: interest.toFixed(2), reducedPrincipal: reducedPrincipal.toFixed(2), loan: loan.toFixed(2) });
    }
    
    let tableBody = document.getElementById("loanTableBody");
    tableBody.innerHTML = "";
    loanHistory.forEach(entry => {
        let row = `<tr><td>${entry.count}</td><td>${entry.interest}</td><td>${entry.reducedPrincipal}</td><td>${entry.loan}</td></tr>`;
        tableBody.innerHTML += row;
    });
    
    const result = document.getElementById("result");
    result.innerHTML = `If you pay Rs.${installment.toFixed(2)} for ${count} times, your loan will be cleared`
    result.innerHTML += "<br>and<br>"
    result.innerHTML += `Rs.${(-1)*loan.toFixed(2)} will be deposited in your account!`;
}