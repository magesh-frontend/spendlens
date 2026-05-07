import { useEffect, useMemo, useState } from "react";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filter from "./components/Filter";

export const CATS = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Health",
  "Other",
];

export const catMap = {
  Food: "🍔",
  Travel: "✈️",
  Shopping: "🛍️",
  Bills: "💡",
  Health: "💊",
  Other: "📦",
};

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("spendlens-expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [toast, setToast] = useState("");

  const monthlyBudget = 15000;

  useEffect(() => {
    localStorage.setItem(
      "spendlens-expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  // ➕ Add Expense
  const addExpense = (expense) => {
    const updated = [
      { ...expense, id: Date.now() },
      ...expenses,
    ];

    setExpenses(updated);
    setToast("✅ Expense added");

    setTimeout(() => setToast(""), 2000);
  };

  // ❌ Delete Expense
  const deleteExpense = (id) => {
    setExpenses(
      expenses.filter((item) => item.id !== id)
    );

    setToast("❌ Expense removed");

    setTimeout(() => setToast(""), 2000);
  };

  // 🔍 Filter
  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter(
          (item) => item.category === filter
        );

  // 📊 Sort
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => {
      if (sortBy === "high") return b.amount - a.amount;
      if (sortBy === "low") return a.amount - b.amount;
      return b.id - a.id;
    }
  );

  // 💰 Total spent
  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );
  }, [expenses]);

  // ⚡ Budget percentage
  const budgetPercent = Math.min(
    (totalSpent / monthlyBudget) * 100,
    100
  );

  // 📢 Insight
  const monthlyInsight = useMemo(() => {
    if (totalSpent > monthlyBudget)
      return "⚠️ Budget Exceeded";
    if (totalSpent > monthlyBudget * 0.7)
      return "⚡ High Spending";
    return "✅ Budget Under Control";
  }, [totalSpent]);

  // 🔥 Top category
  const topCategory = useMemo(() => {
    const map = {};

    expenses.forEach((item) => {
      map[item.category] =
        (map[item.category] || 0) +
        Number(item.amount);
    });

    let top = "";
    Object.keys(map).forEach((cat) => {
      if (!top || map[cat] > map[top]) {
        top = cat;
      }
    });

    return top || "No data";
  }, [expenses]);

  return (
    <div className="app">

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}

      {/* HEADER */}
      <header className="header">
        <div className="header-title">
          <div className="logo">SL</div>
          <h1>SpendLens</h1>
        </div>
      </header>

      {/* STATS */}
      <section className="stats">

        <div className="stat-card">
          <p>Total Spending</p>
          <h2>₹{totalSpent}</h2>
        </div>

        <div className="stat-card">
          <p>Monthly Insight</p>
          <h2>{monthlyInsight}</h2>
        </div>

        <div className="stat-card">
          <p>Top Category</p>
          <h2>{topCategory}</h2>
        </div>

      </section>

      {/* 📊 BUDGET PROGRESS BAR */}
      <div className="budget-box">
        <p>
          Budget: ₹{totalSpent} / ₹{monthlyBudget}
        </p>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${budgetPercent}%` }}
          ></div>
        </div>
      </div>

      {/* WARNING */}
      {totalSpent > monthlyBudget && (
        <div className="budget-warning">
          ⚠️ Monthly Budget Exceeded
        </div>
      )}

      {/* FORM */}
      <ExpenseForm addExpense={addExpense} />

      {/* TOOLBAR */}
      <div className="toolbar">
        <Filter
          filter={filter}
          setFilter={setFilter}
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="latest">Latest</option>
          <option value="high">Highest</option>
          <option value="low">Lowest</option>
        </select>
      </div>

      {/* LIST */}
      <ExpenseList
        expenses={sortedExpenses}
        deleteExpense={deleteExpense}
      />

    </div>
  );
}

export default App;