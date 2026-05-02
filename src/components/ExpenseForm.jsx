import { useState } from "react";
import { CATS } from "../App";
import "./ExpenseForm.css";

function ExpenseForm({ addExpense }) {
  const [form, setForm] = useState({
    desc: "",
    amount: "",
    category: "Food",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.desc || !form.amount) return;

    addExpense({
      desc: form.desc,
      amount: Number(form.amount),
      category: form.category,
    });

    setForm({
      desc: "",
      amount: "",
      category: "Food",
    });
  };

  return (
    <form
      className="expense-form"
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <input
          type="text"
          name="desc"
          placeholder="Expense title"
          value={form.desc}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {CATS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;