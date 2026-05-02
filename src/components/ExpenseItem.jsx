import React from 'react';
import './ExpenseItem.css';
import { catMap } from '../App';

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const cat = catMap[expense.category] || catMap['other'];

  return (
    <div className="expense-item">
      <div className="cat-icon" style={{ background: cat.color }}>
        <span>{cat.icon}</span>
      </div>

      <div className="expense-info">
        <div className="expense-desc">{expense.desc}</div>
        <div className="expense-meta">
          {new Date(expense.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
          <span
            className="cat-tag"
            style={{ background: cat.color, color: cat.tc }}
          >
            {cat.label}
          </span>
        </div>
      </div>

      <div className="expense-amount">
        ₹{parseFloat(expense.amount).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
        })}
      </div>

      <div className="item-actions">
        <button className="icon-btn" title="Edit" onClick={() => onEdit(expense)}>
          ✎
        </button>
        <button
          className="icon-btn del-btn"
          title="Delete"
          onClick={() => onDelete(expense.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
