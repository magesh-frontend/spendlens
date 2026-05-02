import React from 'react';
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, total, onEdit, onDelete }) {
  return (
    <div>
      <div className="section-header">
        <div className="section-title">Transactions</div>
        <span className="count-badge">{expenses.length} items</span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🔍</div>
          <p>
            {total === 0
              ? 'No expenses yet. Add your first one!'
              : 'No results found.'}
          </p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map(e => (
            <ExpenseItem
              key={e.id}
              expense={e}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
