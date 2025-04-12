import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import { useMemo } from "react"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
    const { dispatch } = useBudget()
    const categoryInfo = useMemo(() => categories.filter(cat => cat.name === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => { dispatch({ type: "select-expense-by-id", payload: { id: expense.id } }) }}
            >
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        < TrailingActions >
            <SwipeAction
                onClick={() => { dispatch({ type: "delete-expense", payload: { id: expense.id } }) }}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions >
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-14 w-full flex gap-8 items-center border-b-2 border-slate-200" style={{ userSelect: 'none' }}>
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} className="w-20" style={{ pointerEvents: 'none' }} />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-sm uppercase text-blue2">{expense.category}</p>
                        <p className="font-bold text-lg">{expense.expenseName}</p>
                        <p className="text-sm text-gray-600 font-bold">{formatDate(expense.date!.toString())}</p>
                    </div >

                    <AmountDisplay
                        amount={expense.amount}
                    />

                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}