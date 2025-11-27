const questions = [
  { key: "age", label: "Age:", type: "number" },
  { key: "income", label: "Monthly Income (₹):", type: "number" },
  { key: "loans", label: "Existing Loans (₹):", type: "number" },
  { key: "expenses", label: "Average Monthly Expenses (₹):", type: "number" },
  { key: "goal", label: "Goal for Investing:", type: "select", options: ["short-term", "medium-term", "long-term"] },
  { key: "expectedReturn", label: "Expected Return (%):", type: "number" },
  { key: "minReturn", label: "Minimum Return (%):", type: "number" },
  { key: "capital", label: "Principal Capital (₹):", type: "number" },
];

const weights = {
  age: 1.0,
  income: 1.5,
  loans: -1.2,
  expenses: -1.0,
  goal: 1.5,
  returns: 2.0,
};

let step = 0;
let customer = {};

function updateBackgroundProgress() {
  const total = questions.length;
  const percent = (step / total) * 100;
  document.body.style.backgroundSize = `${percent}% 100%`;
}

function renderQuestion() {
  const container = document.getElementById("question-container");
  container.classList.remove("fade");

  setTimeout(() => {
    const question = questions[step];
    let html = `<label>${question.label}</label>`;

    if (question.type === "select") {
      html += `<select id="input">`;
      question.options.forEach(opt => {
        html += `<option value="${opt}">${opt}</option>`;
      });
      html += `</select>`;
    } else {
      const value = customer[question.key] || '';
      html += `<input type="${question.type}" id="input" value="${value}" required />`;
    }

    html += `
      <div class="buttons">
        ${step > 0 ? '<button onclick="prevStep()">Back</button>' : '<div></div>'}
        <button onclick="nextStep()">Next</button>
      </div>
    `;

    container.innerHTML = html;
    container.classList.add("fade");
    updateBackgroundProgress();
  }, 100);
}

function nextStep() {
  const inputEl = document.getElementById("input");
  if (!inputEl || !inputEl.value) {
    alert("Please enter a valid input.");
    return;
  }

  const value = inputEl.value;
  customer[questions[step].key] = questions[step].type === "number" ? parseFloat(value) : value;

  step++;
  if (step >= questions.length) {
    calculateRRR();
  } else {
    renderQuestion();
  }
}

function prevStep() {
  if (step > 0) {
    step--;
    renderQuestion();
  }
}

function calculateRRR() {
  const ageFactor = customer.age <= 35 ? 1 : (customer.age <= 50 ? 0.8 : 0.5);
  const incomeFactor = Math.min(customer.income / 50000, 1);
  const loanFactor = Math.max(1 - (customer.loans / (customer.income * 12)), 0);
  const expenseFactor = Math.max(1 - (customer.expenses / customer.income), 0);

  const goalMap = {
    "short-term": 0.5,
    "medium-term": 0.8,
    "long-term": 1.0,
  };
  const goalFactor = goalMap[customer.goal] || 0.7;

  const returnFactor = Math.max((customer.expectedReturn - customer.minReturn), 0) / 100;

  const rs = (
    weights.age * ageFactor +
    weights.income * incomeFactor +
    weights.loans * loanFactor +
    weights.expenses * expenseFactor +
    weights.goal * goalFactor +
    weights.returns * returnFactor
  );

  let rrr = "";
  if (rs >= 4.0) {
    rrr = "1:3 (High Risk & Reward)";
  } else if (rs >= 2.5) {
    rrr = "1:2 (Moderate Risk & Reward)";
  } else if (rs >= 1.0) {
    rrr = "1:1 (Balanced)";
  } else {
    rrr = "1:0.5 (Low Risk & Reward)";
  }

  document.getElementById("question-container").style.display = "none";
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <strong>Risk Score:</strong> ${rs.toFixed(2)}<br>
    <strong>Risk-Reward Ratio:</strong> ${rrr}
  `;
  updateBackgroundProgress();
}

// Start on load
window.onload = () => {
  renderQuestion();
  updateBackgroundProgress();
};
