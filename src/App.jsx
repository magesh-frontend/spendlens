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

  const addExpense = (expense) => {
    const updated = [
      {
        ...expense,
        id: Date.now(),
      },
      ...expenses,
    ];

    setExpenses(updated);

    setToast("Expense added");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const deleteExpense = (id) => {
    setExpenses(
      expenses.filter((item) => item.id !== id)
    );

    setToast("Expense removed");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter(
          (item) => item.category === filter
        );

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => {
      if (sortBy === "high") {
        return b.amount - a.amount;
      }

      if (sortBy === "low") {
        return a.amount - b.amount;
      }

      return b.id - a.id;
    }
  );

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );
  }, [expenses]);

  const monthlyInsight = useMemo(() => {
    if (totalSpent > monthlyBudget) {
      return "Budget exceeded";
    }

    if (totalSpent > monthlyBudget * 0.7) {
      return "High spending";
    }

    return "Budget under control";
  }, [totalSpent]);

  const topCategory = useMemo(() => {
    const categoryMap = {};

    expenses.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) +
        Number(item.amount);
    });

    let highest = "";

    Object.keys(categoryMap).forEach((cat) => {
      if (
        !highest ||
        categoryMap[cat] >
          categoryMap[highest]
      ) {
        highest = cat;
      }
    });

    return highest || "No data";
  }, [expenses]);

  return (
    <div className="app">
      {toast && (
        <div className="toast">{toast}</div>
      )}

      <header className="header">
        <div className="header-title">
          <div className="logo">SL</div>
          <h1>SpendLens</h1>
        </div>
      </header>

      <section className="stats">
        <div className="stat-card">
          <p className="stat-label">
            Total Spending
          </p>

          <h2 className="stat-value accent">
            ₹{totalSpent}
          </h2>
        </div>

        <div className="stat-card">
          <p className="stat-label">
            Monthly Insight
          </p>

          <h2 className="stat-value">
            {monthlyInsight}
          </h2>
        </div>

        <div className="stat-card">
          <p className="stat-label">
            Top Category
          </p>

          <h2 className="stat-value">
            {topCategory}
          </h2>
        </div>
      </section>

      {totalSpent > monthlyBudget && (
        <div className="budget-warning">
          Monthly budget exceeded
        </div>
      )}

      <ExpenseForm addExpense={addExpense} />

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
          <option value="high">
            Highest Amount
          </option>
          <option value="low">
            Lowest Amount
          </option>
        </select>
      </div>

      <ExpenseList
        expenses={sortedExpenses}
        deleteExpense={deleteExpense}
      />
    </div>
  );
}

export default App;