import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "delete-expense", payload: { id: Expense['id'] } } |
    { type: "select-expense-by-id", payload: { id: Expense['id'] } } |
    { type: "edit-expense", payload: { expense: Expense } } |
    { type: "reset-app" } |
    { type: "select-category", payload: { id: Category['id'] } }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategoryId: string
}

//Find or set initial budget
const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

//Find or set initial expenses
const initialExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategoryId: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export function budgetReducer(
    state: BudgetState = initialState,
    action: BudgetActions
) {
    if (action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if (action.type === "add-expense") {
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense]
        }
    }

    if (action.type === "delete-expense") {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === "select-expense-by-id") {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === "edit-expense") {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ?
                action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if (action.type === "reset-app") {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if (action.type === "select-category") {
        return {
            ...state,
            currentCategoryId: action.payload.id
        }
    }

    return state
}