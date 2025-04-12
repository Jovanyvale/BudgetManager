import { useContext } from "react";
import { BudgetConstext } from "../Context/BudgetContex";

export const useBudget = () => {
    const context = useContext(BudgetConstext)
    if (!context) {
        throw new Error('useOrder must be used within a budgetProvider')
    }
    return context
}