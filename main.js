async function calculateRRR() {
    // Run Python function
    const result = pyodide.runPython(`
calc_rrr(${JSON.stringify(customer)})
    `);

    // Show results
    document.getElementById("question-container").style.display = "none";
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
      <strong>Risk Score:</strong> ${result.risk_score}<br>
      <strong>Risk-Reward Ratio:</strong> ${result.rrr}
    `;
}

