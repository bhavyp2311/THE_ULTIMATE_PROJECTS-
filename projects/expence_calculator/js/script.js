let expenses = [];
window.onload = function () {
  const saved = localStorage.getItem("expenseData");
  if (saved) {
    expenses = JSON.parse(saved);
    renderExpenses();
    updateTotals();
  }
};

function addExpense() {
  const pieces = parseInt(document.getElementById("pieces").value);
  const pricePerPiece = parseFloat(document.getElementById("pricePerPiece").value);

  if (isNaN(pieces) || isNaN(pricePerPiece) || pieces <= 0 || pricePerPiece < 0) {
    alert("Please enter valid inputs!");
    return;
  }

  const total = pieces * pricePerPiece;
  const now = new Date();

  const expense = {
    date: now.toISOString(),
    pieces,
    pricePerPiece,
    total
  };

  expenses.push(expense);
  localStorage.setItem("expenseData", JSON.stringify(expenses));

  renderExpenses();
  updateTotals();

  document.getElementById("pieces").value = "";
  document.getElementById("pricePerPiece").value = "";
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach(exp => {
    const li = document.createElement("li");
    const date = new Date(exp.date).toLocaleDateString();
    li.textContent = `${date} — ${exp.pieces} × ₹${exp.pricePerPiece.toFixed(2)} = ₹${exp.total.toFixed(2)}`;
    list.appendChild(li);
  });
}

function updateTotals() {
  const now = new Date();
  const today = now.toDateString();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let dailyTotal = 0;
  let monthlyTotal = 0;

  expenses.forEach(exp => {
    const expDate = new Date(exp.date);
    if (expDate.toDateString() === today) {
      dailyTotal += exp.total;
    }
    if (expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear) {
      monthlyTotal += exp.total;
    }
  });

  document.getElementById("dailyTotal").textContent = dailyTotal.toFixed(2);
  document.getElementById("monthlyTotal").textContent = monthlyTotal.toFixed(2);
}

function refreshUI() {
  document.getElementById("pieces").value = "";
  document.getElementById("pricePerPiece").value = "";
  renderExpenses();
  updateTotals();
}

function clearAllExpenses() {
  if (confirm("Are you sure you want to delete all expenses?")) {
    expenses = [];
    localStorage.removeItem("expenseData");
    renderExpenses();
    updateTotals();
  }
}
