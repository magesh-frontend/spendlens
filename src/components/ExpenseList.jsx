import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

function ExpenseList({
  expenses,
  deleteExpense,
}) {
  if (expenses.length === 0) {
    return (
      <p className="empty-text">
        No expenses found
      </p>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          deleteExpense={deleteExpense}
        />
      ))}
    </div>
  );
}

export default ExpenseList;