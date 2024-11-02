import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const useStore = create(
  devtools((set) => ({
    expenses: [],
    total: 0,

    // Fetching expenses
    fetchExpenses: async () => {
      const response = await axios.get(API_URL);
      set({
        expenses: response.data,
        total: response.data.reduce((acc, currVal) => {
          acc = acc + parseInt(currVal.amount);
          return acc;
        }, 0),
      });
    },

    // Adding a new expense
    addExpense: async (name, amount) => {
      const payload = { name, amount };

      const response = await axios.post(API_URL, payload);

      set((state) => ({
        ...state,
        expenses: [...state.expenses, response.data],
        total: state.total + parseInt(amount),
      }));
    },

    // Editing an expense
    editExpense: async (id, name, amount) => {
      const payload = { id, name, amount };
      const response = await axios.put(`${API_URL}update/${id}`, payload);

      set((state) => {
        const updatedExpenses = state.expenses.map((expense) =>
          expense.id === id ? response.data : expense
        );

        const updatedTotal = updatedExpenses.reduce((acc, currVal) => {
          acc = acc + parseInt(currVal.amount);
          return acc;
        }, 0);

        return { ...state, expenses: updatedExpenses, total: updatedTotal };
      });
    },

    // Delete an expense
    deleteExpense: async (id) => {
      await axios.delete(`${API_URL}update/${id}`);

      set((state) => {
        const updatedExpenses = state.expenses.filter(
          (expense) => expense.id !== id
        );

        const updatedTotal = updatedExpenses.reduce((acc, currVal) => {
          acc = acc + parseInt(currVal.amount);
          return acc;
        }, 0);

        return { ...state, expenses: updatedExpenses, total: updatedTotal };
      });
    },
  }))
);
