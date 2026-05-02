import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filter from './components/Filter';

export const CATS = [
  { id: 'all',    label: 'All',    icon: '◎' },
  { id: 'food',   label: 'Food',   icon: '🍜', color: 'var(--tag-food)',   tc: 'var(--tag-food-t)'   },
  { id: 'travel', label: 'Travel', icon: '✈️', color: 'var(--tag-travel)', tc: 'var(--tag-travel-t)' },
  { id: 'bills',  label: 'Bills',  icon: '🧾', color: 'var(--tag-bills)',  tc: 'var(--tag-bills-t)'  },
  { id: 'health', label: 'Health', icon: '💊', color: 'var(--tag-health)', tc: 'var(--tag-health-t)' },
  { id: 'other',  label: 'Other',  icon: '📦', color: 'var(--tag-other)',  tc: 'var(--tag-other-t)'  },
];

export const catMap = Object.fromEntries(
  CATS.filter(c => c.id !== 'all').map(c => [c.id, c])
);

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const EMPTY_FORM = {
  desc: '',
  amount: '',
  category: 'food',
  date: new Date().toISOString().slice(0, 10),
};

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('sl-theme') || 'light'
  );
  const [expenses, setExpenses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sl-expenses') || '[]'); }
    catch { return []; }
  });
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [editId,   setEditId]   = useState(null);
  const [filter,   setFilter]   = useState('all');
  const [search,   setSearch]   = useState('');
  const [showForm, setShowForm] = useState(false);

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sl-theme', theme);
  }, [theme]);

  // Persist expenses
  useEffect(() => {
    localStorage.setItem('sl-expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Stats
  const total = expenses.reduce((a, e) => a + parseFloat(e.amount), 0);

  const thisMonth = expenses
    .filter(e => {
      const d = new Date(e.date), n = new Date();
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    })
    .reduce((a, e) => a + parseFloat(e.amount), 0);

  const topCat = () => {
    const sums = {};
    expenses.forEach(e => {
      sums[e.category] = (sums[e.category] || 0) + parseFloat(e.amount);
    });
    const top = Object.entries(sums).sort((a, b) => b[1] - a[1])[0];
    return top ? catMap[top[0]]?.label : '—';
  };

  // Filtered & sorted list
  const filtered = expenses
    .filter(e => {
      const matchCat    = filter === 'all' || e.category === filter;
      const matchSearch =
        e.desc.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // CRUD handlers
  function handleSubmit() {
    if (!form.desc.trim() || !form.amount || !form.date) return;
    if (editId) {
      setExpenses(prev =>
        prev.map(e => e.id === editId ? { ...e, ...form, amount: parseFloat(form.amount) } : e)
      );
      setEditId(null);
    } else {
      setExpenses(prev => [
        { ...form, id: uid(), amount: parseFloat(form.amount) },
        ...prev,
      ]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function startEdit(e) {
    setForm({ desc: e.desc, amount: e.amount, category: e.category, date: e.date });
    setEditId(e.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function delExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  function cancelForm() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-title">
          <div className="logo">SL</div>
          <h1>SpendLens</h1>
        </div>
        <div className="header-actions">
          <button
            className="theme-btn"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            title="Toggle theme"
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
          {!showForm && (
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              + Add Expense
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value accent">
            ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">This Month</div>
          <div className="stat-value">
            ₹{thisMonth.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Top Category</div>
          <div className="stat-value" style={{ fontSize: 18 }}>{topCat()}</div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <ExpenseForm
          form={form}
          setForm={setForm}
          editId={editId}
          onSubmit={handleSubmit}
          onCancel={cancelForm}
        />
      )}


      {/* Filter + Search */}
      <Filter
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      {/* List */}
      <ExpenseList
        expenses={filtered}
        total={expenses.length}
        onEdit={startEdit}
        onDelete={delExpense}
      />
    </div>
  );
}
