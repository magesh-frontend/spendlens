import React from 'react';
import './ExpenseForm.css';
import { CATS } from '../App';

export default function ExpenseForm({ form, setForm, editId, onSubmit, onCancel }) {
  return (
    <div className="form-card">
      <h2>{editId ? 'Edit Expense' : 'New Expense'}</h2>
      <div className="form-grid">

        <div className="field full">
          <label>Description</label>
          <input
            placeholder="What did you spend on?"
            value={form.desc}
            onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && onSubmit()}
          />
        </div>

        <div className="field">
          <label>Amount (₹)</label>
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          />
        </div>

        <div className="field">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          />
        </div>

        <div className="field">
          <label>Category</label>
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          >
            {CATS.filter(c => c.id !== 'all').map(c => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={onSubmit}>
            {editId ? '✓ Save Changes' : '+ Add'}
          </button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>

      </div>
    </div>
  );
}
