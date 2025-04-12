import { useReducer, createContext, ReactNode, useMemo } from "react";
import { budgetReducer, initialState, BudgetState, BudgetActions } from "../reducers/budget-reducer";

export type BudgetConstextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses: number
    displayAviable: number
}

export const BudgetConstext = createContext<BudgetConstextProps>(null!)

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0)
        , [state.expenses])
    const displayAviable = state.budget - totalExpenses

    return (
        <BudgetConstext.Provider value={{ state, dispatch, totalExpenses, displayAviable }}>
            {children}
        </BudgetConstext.Provider>
    )
}