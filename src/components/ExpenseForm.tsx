import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import type { DraftExpense } from "../types";
import { Value } from "react-calendar/src/shared/types.js";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const { dispatch, state, displayAviable } = useBudget()
    const [previousExpense, setPreviousExpense] = useState(0)

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousExpense(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleChangeDate = (e: Value) => {
        setExpense({
            ...expense,
            date: e
        })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Validate inputs
        if (Object.values(expense).includes('')) {
            setError('All fields must be filled')
            return
        }
        //Validate budget limit
        if ((expense.amount - previousExpense) > displayAviable) {
            setError("You don't have enough budget")
            return
        }
        //Edit or add new expense
        if (state.editingId) {
            dispatch({ type: "edit-expense", payload: { expense: { id: state.editingId, ...expense } } })
        }
        else {
            dispatch({ type: "add-expense", payload: { expense } })
        }

        //Restart the form
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
        setPreviousExpense(0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue2 py-4">
                {state.editingId ? "Edit expense" : "New expense"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <div className="mt-2 flex flex-col">
                    <label htmlFor="expenseName" className="text-xl opacity-75 mb-1">
                        Expense name:
                    </label>
                    <input type="text"
                        id="expenseName"
                        name="expenseName"
                        placeholder="Add expense name"
                        className="p-2 decoration-none bg-gray-200 rounded-md"
                        value={expense.expenseName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-2 flex flex-col">
                    <label htmlFor="expenseQuantity" className="text-xl opacity-75 mb-1">
                        Expense quantity:
                    </label>
                    <input type="text"
                        id="expenseQuantity"
                        name="amount"
                        placeholder="$0"
                        className="p-2 decoration-none bg-gray-200 rounded-md"
                        value={expense.amount}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-2 flex flex-col">
                    <label htmlFor="expenseCategory" className="text-xl opacity-75 mb-1">
                        Expense category:
                    </label>
                    <select id="expenseCategory" className="p-2 rounded-md  bg-gray-200"
                        value={expense.category}
                        name="category"
                        onChange={handleChange}
                    >
                        <option value="">-Select-</option>
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-2 flex flex-col">
                    <label htmlFor="expenseDate" className="text-xl opacity-75 mb-1">
                        Expense date:
                    </label>
                    <DatePicker className="p-2 text-xl bg-gray-200 rounded-m"
                        value={expense.date}
                        onChange={handleChangeDate}
                    />
                </div>

                <button type="submit" className=" bg-blue3 text-white p-2 text-xl rounded-md w-56 mt-4">
                    Save expense
                </button>
            </div>
        </form >
    )
}