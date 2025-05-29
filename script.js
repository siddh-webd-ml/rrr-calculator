const weights = {
  age: 1,
  income: 1,
  loans: -1,
  expenses: 1,
  goal: 1,
  returns: 1
};

const customer = {};

customer.Age = parseInt(prompt("Age: "));
customer["Monthly Income"] = parseFloat(prompt("Monthly Income ($): "));
customer["Existing Loans"] = parseFloat(prompt("Existing Loans ($): "));
customer["Monthly Expenses"] = parseFloat(prompt("Average Monthly Expenses ($): "));
customer.Goal = prompt("Goal for Investing (short-term/medium-term/long-term): ");
customer["Expected Return (%)"] = parseFloat(prompt("Expected Return (%): "));
customer["Minimum Return (%)"] = parseFloat(prompt("Minimum Return (%): "));
customer["principal capital"] = parseFloat(prompt("Enter the principal capital ($): "));

// Calculate Risk Score (RS)
let ageFactor = customer.Age <= 35 ? 1 : (customer.Age <= 50 ? 0.8 : 0.5);
let incomeFactor = Math.min(customer["Monthly Income"] / 50000, 1);
let loanFactor = Math.max(1 - (customer["Existing Loans"] / (customer["Monthly Income"] * 12)), 0);
let expenseFactor = Math.max(1 - (customer["Monthly Expenses"] / customer["Monthly Income"]), 0);

const goalMapping = {
  "short-term": 0.5,
  "medium-term": 0.8,
  "long-term": 1.0
};
let goalFactor = goalMapping[customer.Goal.toLowerCase()] || 0.7;
let returnFactor = Math.max(customer["Expected Return (%)"] - customer["Minimum Return (%)"], 0) / 100;

let rs = (
  weights.age * ageFactor +
  weights.income * incomeFactor +
  weights.loans * loanFactor +
  weights.expenses * expenseFactor +
  weights.goal * goalFactor +
  weights.returns * returnFactor
);

customer["Risk Score"] = parseFloat(rs.toFixed(2));

// Assign RRR
if (rs >= 4.0) {
  customer.RRR = "1:3 (High Risk & Reward)";
} else if (rs >= 2.5) {
  customer.RRR = "1:2 (Moderate Risk & Reward)";
} else if (rs >= 1.0) {
  customer.RRR = "1:1 (Balanced)";
} else {
  customer.RRR = "1:0.5 (Low Risk & Reward)";
}

console.log("Customer Details:");
console.log(customer);






// --------------------------------------


const finalmessage = document.querySelector(".c-welcome")
finalmessage.textContent = console.log("Your risk score is: " + rs)
const middlemessage  =  dpocument.querySelector(".")