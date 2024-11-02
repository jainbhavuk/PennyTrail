import React, { useEffect, useState } from "react";
import "./styles.css";
import { useStore } from "../store/store";

const ExpenseTracker = () => {
  const {
    expenses,
    total,
    fetchExpenses,
    addExpense,
    editExpense,
    deleteExpense,
  } = useStore();
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseID, setExpenseID] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async () => {
    if (expenseID !== null) {
      await editExpense(expenseID, expenseName, amount);
      setExpenseID(null);
    } else {
      await addExpense(expenseName, amount);
    }

    setExpenseName("");
    setAmount("");
  };

  const handleEditExpense = (index, expenseID) => {
    setExpenseID(expenseID);
    setExpenseName(expenses[index].name);
    setAmount(expenses[index].amount);
  };

  return (
    <>
      <h5>ExpenseTracker</h5>
      <div className="container">
        <div className="add-expense-box">
          <input
            placeholder="Enter Expense"
            value={expenseName}
            onChange={(e) => {
              setExpenseName(e.target.value);
            }}
          ></input>
          <input
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></input>
          <button className="add-expense-btn" onClick={handleAddExpense}>
            {expenseID !== null ? "Edit Expense" : "Add Expense"}
          </button>
        </div>

        <div className="expense-list-box">
          {expenses &&
            expenses?.map((expense, index) => (
              <div key={index} className="expense-item">
                <div className="expense-details">
                  <h4 className="expense-name">{expense.name}</h4>
                  <h4 className="expense-amount">₹{expense.amount}</h4>
                </div>
                <span
                  className="icons"
                  onClick={() => handleEditExpense(index, expense.id)}
                >
                  ✏️
                </span>
                <span
                  className="icons"
                  onClick={async () => await deleteExpense(expense.id)}
                >
                  ❌
                </span>
              </div>
            ))}
        </div>

        <div className="total-expenses">TOTAL: {total}</div>
      </div>
    </>
  );
};

export default ExpenseTracker;
