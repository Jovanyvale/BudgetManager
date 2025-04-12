import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    const categoryList = state.currentCategoryId ? state.expenses.filter(expense => expense.category === state.currentCategoryId)
        : state.expenses

    const isEmpty = useMemo(() => categoryList.length === 0, [categoryList])

    return (
        <div className="mt-10">
            {isEmpty ? <p className="text-2xl text-gray-600 font-bold">You haven’t added any expenses yet</p> : (
                <>
                    <p className="text-2xl text-gray-600 font-bold mb-4">Expense list</p>

                    {categoryList.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />

                    ))}
                </>
            )}
        </div>
    )
}
