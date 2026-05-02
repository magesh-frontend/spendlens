import { catMap } from "../App";
import "./ExpenseItem.css";

function ExpenseItem({
  expense,
  deleteExpense,
}) {
  return (
    <div className="expense-item">
      <div className="expense-info">
        <h4>
          {catMap[expense.category]}{" "}
          {expense.desc}
        </h4>

        <p>{expense.category}</p>
      </div>

      <div className="expense-price">
        ₹{expense.amount}
      </div>

      <button
        className="btn-cancel"
        onClick={() =>
          deleteExpense(expense.id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default ExpenseItem;